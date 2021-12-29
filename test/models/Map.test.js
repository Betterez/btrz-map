const Chance = require("chance");
const chance = new Chance();
const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");

const {map: leafletMapMock} = require("../leaflet-mocks");
const {Map} = require("../../dist-test/btrz-map-test").testAPI;

describe("Map", () => {
  let tripsRepository;
  let trip;
  let map;

  beforeEach(() => {
    trip = {
      addTo: () => {},
      removeFrom: () => {},
    };
    tripsRepository = {
      findAsync: sinon.fake.resolves(trip)
    };
    map = new Map({leafletMap: leafletMapMock, tripsRepository});
    sinon.spy(trip, "addTo");
    sinon.spy(trip, "removeFrom");
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("addTrip", () => {
    it("should add trip to the map and retrieve the trip instance", () => {
      return map.addTrip({
        routeId: chance.guid(),
        scheduleId: chance.guid(),
        date: new Date().toISOString().slice(0, 10),
        productId: chance.guid()
      })
        .then((result) => {
          expect(result).to.equal(trip);
          expect(trip.addTo.calledWith(leafletMapMock)).to.be.true;
        });
    });
  });

  describe("removeTrip", () => {
    it("should remove the trip from the map", () => {
      return map.addTrip({
        routeId: chance.guid(),
        scheduleId: chance.guid(),
        date: new Date().toISOString().slice(0, 10),
        productId: chance.guid()
      })
        .then(() => {
          map.removeTrip();
          expect(trip.removeFrom.calledWith(leafletMapMock)).to.be.true;
        });
    });

    it("should not break if there was no trip to remove", () => {
      expect(map.removeTrip.bind(map)).to.not.throw();
    });
  });
})
