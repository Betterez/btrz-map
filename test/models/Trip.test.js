const Chance = require("chance");
const chance = new Chance();
const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");

const {Trip, MarkerProvider} = require("../../dist-test/btrz-map-test").testAPI;
const {map, control} = require("../leaflet-mocks");

describe("Trip", () => {
  const tripFromBackend = {
    routeId: chance.guid(),
    scheduleId: chance.guid(),
    scheduleDisplayName: chance.word(),
    legs: [{departureTimestamp: new Date().toISOString()}],
    date: "2019-01-01"
  };
  let stations;
  let station1;
  let station2;
  let station3;
  let bus;
  let travelledPath;
  let gpsService;
  let markerProvider;
  let trip;
  let clock;
  let currentPosition;

  function createMockStation() {
    return {
      addTo: sinon.spy(),
      removeFrom: sinon.spy(),
    }
  }
  station1 = createMockStation();
  station2 = createMockStation();
  station3 = createMockStation();

  beforeEach(() => {
    stations = [station1, station2, station3];
    bus = {
      addTo: () => {},
      removeFrom: sinon.fake.returns(),
      foo: "bar"
    };
    travelledPath = {
      addTo: sinon.fake.returns(),
      removeFrom: sinon.fake.returns()
    };
    gpsService = {
      getScannerAppLocation: () => {}
    };
    sinon.spy(control, "addTo");
    sinon.spy(control, "remove");
    sinon.spy(bus, "addTo");
    markerProvider = new MarkerProvider();
    sinon.replace(markerProvider, "getCenterControl", sinon.fake.returns(control));
    trip = new Trip({tripFromBackend, stations, bus, travelledPath, gpsService, markerProvider});
    currentPosition = {
      latitude: chance.latitude(),
      longitude: chance.longitude()
    };
    sinon.replace(gpsService, "getScannerAppLocation", sinon.fake.resolves({
      lastKnown: currentPosition
    }));
    clock = sinon.useFakeTimers();
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("addTo", () => {
    afterEach(() => {
      trip.removeFrom(map); //stops the intervals
    });

    it("should add the center button to the map", () => {
      trip.addTo(map);
      expect(control.addTo.calledWith(map)).to.be.true;
    });

    it("should add the stations to the map", () => {
      trip.addTo(map);
      expect(station1.addTo.calledWith(map)).to.be.true;
      expect(station2.addTo.calledWith(map)).to.be.true;
      expect(station3.addTo.calledWith(map)).to.be.true;
    });

    it("should continuously update the bus position", () => {
      return trip.addTo(map)
        .then(() => {
          expect(bus.addTo.calledOnce).to.be.true;
          expect(bus.addTo.calledWith(map, currentPosition)).to.be.true;
          // TODO: fix the next lines
          /*clock.tick(10000);
          expect(bus.addTo.callCount).to.eql(2);
          clock.tick(10000 * 4);
          expect(bus.addTo.callCount).to.eql(6);*/
        });
    });
  });

  describe("removeFrom", () => {
    beforeEach(() => {
      trip.addTo(map);
    });

    it("should remove the center button from the map", () => {
      trip.removeFrom(map);
      expect(control.remove.calledOnce).to.be.true;
    });

    it("should remove the stations from the map", () => {
      trip.removeFrom(map);
      expect(station1.removeFrom.calledWith(map)).to.be.true;
      expect(station2.removeFrom.calledWith(map)).to.be.true;
      expect(station3.removeFrom.calledWith(map)).to.be.true;
    });

    it("should stop updating the bus position", () => {
      trip.removeFrom(map);
      expect(bus.removeFrom.calledWith(map)).to.be.true;
      expect(trip.gpsIntervalId).to.be.null;
    });
  });
});
