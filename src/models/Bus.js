import L from "leaflet";

const busRenderOptions = {
  color: "red",
  fillColor: "#f03",
  fillOpacity: 0.5,
  radius: 500
}

export class Bus {
  constructor(position) {
    this.latitude = position.latitude;
    this.longitude = position.longitude;
    this.marker = L.circle([position.latitude, position.longitude], busRenderOptions);
  }

  addTo(map) {
    this.marker.addTo(map);
  }

  removeFrom(map) {
    this.marker.removeFrom(map);
  }
}
