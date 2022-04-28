const Chance = require("chance");
const chance = new Chance();
const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");

const {marker} = require("../leaflet-mocks");
const {Station, Utils} = require("../../dist-test/btrz-map-test").testAPI;

describe("Station", () => {
  let stationData;
  let markerProvider;

  beforeEach(() => {
    sinon.spy(marker, "bindPopup");
    sinon.spy(marker, "addTo");
    sinon.spy(marker, "removeFrom");
    markerProvider = {
      getStationIcon: sinon.fake.returns(marker)
    };
    stationData = {
      id: chance.guid(),
      name: chance.word(),
      departureTimestamp: chance.date().toISOString(),
      arrivalTimestamp: chance.date().toISOString(),
      latitude: chance.latitude(),
      longitude: chance.longitude(),
      positionInTrip: chance.integer({min: 1, max: 20}),
      isLastStation: false
    }
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("constructor", () => {
    it("should have a different marker and use ETD for first station", () => {
      stationData.positionInTrip = 0;
      new Station(stationData, markerProvider);

      expect(markerProvider.getStationIcon.calledWith({
        position: {latitude: stationData.latitude, longitude: stationData.longitude},
        isLastStation: false,
        isFirstStation: true
      })).to.be.true;

      const ETD = new Date(stationData.departureTimestamp);
      const hours = ETD.getHours();
      const minutes = Utils.timeWithZero(ETD.getMinutes());
      expect(marker.bindPopup.calledWith(`<b>${stationData.name}</b><br>ETD ${hours}:${minutes} hs.`)).to.be.true;
    });

    it("should have a marker and use ETA for middle station", () => {
      new Station(stationData, markerProvider);
      expect(markerProvider.getStationIcon.calledWith({
        position: {latitude: stationData.latitude, longitude: stationData.longitude},
        isLastStation: false,
        isFirstStation: false
      })).to.be.true;

      const ETA = new Date(stationData.arrivalTimestamp);
      const hours = ETA.getHours();
      const minutes = Utils.timeWithZero(ETA.getMinutes());
      expect(marker.bindPopup.calledWith(`<b>${stationData.name}</b><br>ETA ${hours}:${minutes} hs.`)).to.be.true;
    });

    it("should use the marker for last station", () => {
      stationData.isLastStation = true;
      new Station(stationData, markerProvider);

      expect(markerProvider.getStationIcon.calledWith({
        position: {latitude: stationData.latitude, longitude: stationData.longitude},
        isLastStation: true,
        isFirstStation: false
      })).to.be.true;

      const ETA = new Date(stationData.arrivalTimestamp);
      const hours = ETA.getHours();
      const minutes = Utils.timeWithZero(ETA.getMinutes());
      expect(marker.bindPopup.calledWith(`<b>${stationData.name}</b><br>ETA ${hours}:${minutes} hs.`)).to.be.true;
    });
  });

  describe("addTo", () => {
    it("should add the station marker to the map", () => {
      const map = {foo: "bar"};
      const station = new Station(stationData, markerProvider);
      station.addTo(map);
      expect(marker.addTo.calledWith(map)).to.be.true;
    });
  });

  describe("removeFrom", () => {
    it("should remove the station marker from the map", () => {
      const map = {foo: "bar"};
      const station = new Station(stationData, markerProvider);
      station.removeFrom(map);
      expect(marker.removeFrom.calledWith(map)).to.be.true;
    });
  });
})
