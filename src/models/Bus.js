export class Bus {
  constructor(markerProvider) {
    this.latitude = null;
    this.longitude = null;
    this.marker = null;
    this.markerProvider = markerProvider;
  }

  addTo(map, position) {
    this.latitude = position.latitude;
    this.longitude = position.longitude;
    if (!this.marker) {
      this.marker = this.markerProvider.getBusMarker({position});
      //Marker will be null if we send invalid coordinates
      if (this.marker) {
        this.marker.addTo(map);
      }
    } else {
      this.marker.setLatLng([position.latitude, position.longitude]);
    }
  }

  removeFrom(map) {
    if (this.marker) {
      this.marker.removeFrom(map);
    }
  }
}
