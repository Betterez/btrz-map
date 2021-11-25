import L from "leaflet";

const travelledPathRenderOptions = {
  color: "red"
};

export class TravelledPath {
  constructor(coordinates) {
    this.coordinates = coordinates;
    const positions = [];
    for (let i = 0; i < coordinates.length; i++) {
      const position = coordinates[i];
      positions.push([position.latitude, position.longitude]);
    }
    this.polyline = L.polyline(positions, travelledPathRenderOptions);
  }

  addTo(map) {
    this.polyline.addTo(map);
  }

  removeFrom(map) {
    this.polyline.removeFrom(map);
  }
}
