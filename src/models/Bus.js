export class Bus {
  constructor(position, markerProvider) {
    this.latitude = position.latitude;
    this.longitude = position.longitude;
    this.currentZoom = 0;
    this.marker = markerProvider.getBusMarker({position});
  }

  addTo(map) {
    this.marker.addTo(map);
  }

  removeFrom(map) {
    this.marker.removeFrom(map);
  }
}
