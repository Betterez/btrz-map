const Chance = require("chance");
const chance = new Chance();
const chai = require("chai");
const expect = chai.expect;

const {StationsRepository, MarkerProvider} = require("../../dist-test/btrz-map-test").testAPI;

describe("StationsRepository", function() {
  describe("#findAsync()", function() {
    const stationsFromBackend = [
      {_id: "1111", latitude: chance.latitude(), longitude: chance.longitude()},
      {_id: "2222", latitude: chance.latitude(), longitude: chance.longitude()},
      {_id: "3333", latitude: chance.latitude(), longitude: chance.longitude()},
      {_id: "4444", latitude: chance.latitude(), longitude: chance.longitude()},
    ];

    const stationsServiceMock = {
      getStationsFromIds: () => {
        return Promise.resolve(stationsFromBackend);
      }
    }

    const legs = [
      {legord: 1, fromId: "1111", toId: "2222", from: "station1", to:"station2", departureTimestamp: "2020-01-01T20:45:00", arrivalTimestamp: "2020-01-01T21:00:00"},
      {legord: 2, fromId: "2222", toId: "3333", from: "station2", to:"station3", departureTimestamp: "2020-01-01T21:05:00", arrivalTimestamp: "2020-01-01T22:00:00"},
      {legord: 3, fromId: "3333", toId: "4444", from: "station3", to:"station4", departureTimestamp: "2020-01-01T22:05:00", arrivalTimestamp: "2020-01-01T22:30:00"},
    ];


    it("should return the stations list in order", function() {
      const markerProvider = new MarkerProvider();
      const repository = new StationsRepository({stationsService: stationsServiceMock, markerProvider})
      return repository.findAsync(legs)
        .then((stations) => {
          expect(stations.length).to.equal(4);

          expect(stations[0].id).to.equal("1111");
          expect(stations[0].name).to.equal("station1");
          expect(stations[0].departureTimestamp).to.equal("2020-01-01T20:45:00");
          expect(stations[0].arrivalTimestamp).to.be.null;
          expect(stations[0].positionInTrip).to.equal(1);

          expect(stations[1].id).to.equal("2222");
          expect(stations[1].name).to.equal("station2");
          expect(stations[1].departureTimestamp).to.equal("2020-01-01T21:05:00");
          expect(stations[1].arrivalTimestamp).to.equal("2020-01-01T21:00:00");
          expect(stations[1].positionInTrip).to.equal(2);

          expect(stations[2].id).to.equal("3333");
          expect(stations[2].name).to.equal("station3");
          expect(stations[2].departureTimestamp).to.equal("2020-01-01T22:05:00");
          expect(stations[2].arrivalTimestamp).to.equal("2020-01-01T22:00:00");
          expect(stations[2].positionInTrip).to.equal(3);

          expect(stations[3].id).to.equal("4444");
          expect(stations[3].name).to.equal("station4");
          expect(stations[3].departureTimestamp).to.equal(null);
          expect(stations[3].arrivalTimestamp).to.equal("2020-01-01T22:30:00");
          expect(stations[3].positionInTrip).to.equal(4);
        });
    });
  });
});
