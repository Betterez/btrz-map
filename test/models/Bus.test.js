const Chance = require("chance");
const chance = new Chance();
const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");

const {Bus, MarkerProvider} = require("../../dist-test/btrz-map-test").testAPI;
const {map, marker} = require("../leaflet-mocks");

describe("Bus", () => {
  let bus;
  let markerProvider;
  let position;

  beforeEach(() => {
    markerProvider = new MarkerProvider();
    bus = new Bus(markerProvider);
    position = {
      latitude: chance.latitude(),
      longitude: chance.longitude()
    };
    sinon.spy(marker, "addTo");
    sinon.spy(marker, "removeFrom");
    sinon.spy(marker, "setLatLng");

    sinon.replace(
      markerProvider,
      "getBusMarker",
      sinon.fake.returns(marker)
    );
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("addTo", () => {
    it("should init the marker and add it to the map", () => {
      bus.addTo(map, position);

      expect(markerProvider.getBusMarker.calledWith({position})).to.be.true;
      expect(marker.addTo.calledWith(map)).to.be.true;
      expect(marker.setLatLng.called).to.be.false;
    });

    it("should change the coords of the marker", () => {
      bus.addTo(map, position);

      const newPosition = {
        latitude: chance.latitude(),
        longitude: chance.longitude()
      };
      bus.addTo(map, newPosition);

      expect(marker.setLatLng.calledOnce).to.be.true;
    });

    it("set the current position on the bus instance", () => {
      bus.addTo(map, position);
      expect(bus.latitude).to.eql(position.latitude);
      expect(bus.longitude).to.eql(position.longitude);
    });
  });

  describe("removeFrom", () => {
    it("should not break if no marker is set", () => {
      bus.removeFrom();
      expect(1).to.eql(1); //We test that call doesn't throw exception
    });

    it("should remove the marker", () => {
      bus.addTo(map, position);

      bus.removeFrom(map);
      expect(marker.removeFrom.calledWith(map)).to.be.true;
    });
  });
});
