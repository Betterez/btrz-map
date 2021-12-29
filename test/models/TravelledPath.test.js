const Chance = require("chance");
const chance = new Chance();
const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");

const {polyline, map} = require("../leaflet-mocks");
const {MarkerProvider, TravelledPath} = require("../../dist-test/btrz-map-test").testAPI;

describe("TravelledPath", () => {
  let travelledPath;
  let markerProvider;
  let coordinates;

  beforeEach(() => {
    markerProvider = {
      getTravelPathPolyline: sinon.fake.returns(polyline)
    };
    travelledPath = new TravelledPath(markerProvider);
    coordinates = [
      {
        latitude: chance.latitude(),
        longitude: chance.longitude()
      },
      {
        latitude: chance.latitude(),
        longitude: chance.longitude()
      },
      {
        latitude: chance.latitude(),
        longitude: chance.longitude()
      }
      ];
      sinon.spy(polyline, "addTo");
      sinon.spy(polyline, "removeFrom");
      sinon.spy(polyline, "setLatLngs");
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("addTo", () => {
    it("should create the polyline and add it to the map", () => {
      travelledPath.addTo(map, coordinates);
      expect(markerProvider.getTravelPathPolyline.calledWith({
          latLongs: [
            [coordinates[0].latitude, coordinates[0].longitude],
            [coordinates[1].latitude, coordinates[1].longitude],
            [coordinates[2].latitude, coordinates[2].longitude]
          ],
        travelledPathRenderOptions: {
          color: "red"
        }
      })).to.be.true;
      expect(polyline.addTo.calledWith(map)).to.be.true;
    });

    it("should update the polyline", () => {
      travelledPath.addTo(map, coordinates);

      coordinates.push({
        latitude: chance.latitude(),
        longitude: chance.longitude()
      })

      travelledPath.addTo(map, coordinates);

      console.log(polyline.setLatLngs.getCall(0).args[0]);
      expect(polyline.setLatLngs.calledWith([
        [coordinates[0].latitude, coordinates[0].longitude],
        [coordinates[1].latitude, coordinates[1].longitude],
        [coordinates[2].latitude, coordinates[2].longitude],
        [coordinates[3].latitude, coordinates[3].longitude]
      ])).to.be.true;
    });
  });

  describe("removeFrom", () => {
    it("should remove the polyline from the map", () => {
      travelledPath.addTo(map, coordinates);
      travelledPath.removeFrom(map, coordinates);
      expect(polyline.removeFrom.calledWith(map)).to.be.true;
    });

    it("should not break if called when no added previously to a map", () => {
      travelledPath.removeFrom(map, coordinates);
      expect(travelledPath.removeFrom.bind(travelledPath, map, coordinates)).to.not.throw();
    });
  });
})
