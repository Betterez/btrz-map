const Chance = require("chance");
const chance = new Chance();
const chai = require("chai");
const expect = chai.expect;

const {TripsRepository, Station, GPSService} = require("../../dist-test/btrz-map-test").testAPI;

describe("TripsRepository", function() {
  describe("#findAsync()", function() {
    const station1 = new Station({id: "1111", name: "station1", latitude: chance.latitude(), longitude: chance.longitude()});
    const station2 = new Station({id: "2222", name: "station2", latitude: chance.latitude(), longitude: chance.longitude()});
    const station3 = new Station({id: "3333", name: "station3", latitude: chance.latitude(), longitude: chance.longitude()});
    const station4 = new Station({id: "4444", name: "station4", latitude: chance.latitude(), longitude: chance.longitude()});

    const routeId = chance.guid();
    const scheduleId = chance.guid();
    const date = "2019-01-01";

    const stationsRepositoryMock = {
      findAsync: () => {
        return Promise.resolve([station1, station2, station3, station4]);
      }
    };

    const tripFromBackend = {
      date,
      scheduleName: scheduleId,
      routeId
    };

    const tripsServiceMock = {
      getTrip: () => {
        return Promise.resolve(tripFromBackend);
      }
    };

    const gpsServiceMock = {};

    it("should build and return the trip", function() {
      const repository = new TripsRepository({stationsRepository: stationsRepositoryMock, tripsService: tripsServiceMock, gpsService: gpsServiceMock})
      return repository.findAsync({
        routeId,
        scheduleId,
        date,
        productId: chance.guid()
      })
        .then((trip) => {
          expect(trip.stations).to.eql([station1, station2, station3, station4]);
          expect(trip.routeId).to.equal(routeId);
          expect(trip.scheduleId).to.equal(scheduleId);
          expect(trip.date).to.equal(date);
        });
    });
  });
});
