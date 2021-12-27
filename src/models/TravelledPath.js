const travelledPathRenderOptions = {
  color: "red"
};

export class TravelledPath {
  constructor(coordinates, markerProvider) {
    this.polyline = markerProvider.getTravelPathPolyline({
      coordinates,
      travelledPathRenderOptions
    });
  }

  addTo(map) {
    this.polyline.addTo(map);
  }

  removeFrom(map) {
    this.polyline.removeFrom(map);
  }
}
