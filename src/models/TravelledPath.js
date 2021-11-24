import L from "leaflet";

const travelledPathRenderOptions = {
  color: "red"
};

export class TravelledPath {
  constructor(coordinates) {
    this.coordinates = coordinates;
    this.polyline = L.polyline(coordinates, travelledPathRenderOptions);
  }

  addTo(map) {
    this.polyline.addTo(map);
  }

  removeFrom(map) {
    this.polyline.removeFrom(map);
  }
}
