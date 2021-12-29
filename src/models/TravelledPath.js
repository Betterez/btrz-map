const travelledPathRenderOptions = {
  color: "red"
};

function coordinatesToLatLong(coordinates) {
  const positions = [];
  for (let i = 0; i < coordinates.length; i++) {
    const position = coordinates[i];
    positions.push([position.latitude, position.longitude]);
  }

  return positions;
}

export class TravelledPath {
  constructor(markerProvider) {
    this.markerProvider = markerProvider;
    this.polyline = null;
  }

  addTo(map, coordinates) {
    const latLongs = coordinatesToLatLong(coordinates);
    if (!this.polyline) {
      this.polyline = this.markerProvider.getTravelPathPolyline({
        latLongs,
        travelledPathRenderOptions
      });
      this.polyline.addTo(map);
    } else {
      this.polyline.setLatLngs(latLongs)
    }
  }

  removeFrom(map) {
    if (this.polyline) {
      this.polyline.removeFrom(map);
    }
  }
}
