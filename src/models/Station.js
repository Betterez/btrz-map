import L from "leaflet";

const stationIcon = L.icon({
  iconUrl: '/cart/assets/images/leaf-green.png',
  shadowUrl: '/cart/assets/images/leaf-shadow.png',
  iconSize:     [38, 95], // size of the icon
  shadowSize:   [50, 64], // size of the shadow
  iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

export class Station {
  constructor(stationData, orderInTrip) {
    this.id = stationData._id;
    this.name = stationData.name;
    this.latitude = stationData.latitude;
    this.longitude = stationData.longitude;
    this.marker = L.marker([stationData.latitude, stationData.longitude], {icon: stationIcon});
    this.orderInTrip = orderInTrip;

    if (orderInTrip === 0) {
      this.marker.bindPopup(`<b>${this.name}</b><br>ETD ${this.departure}`);
    } else {
      this.marker.bindPopup(`<b>${this.name}</b><br>ETA ${this.arrival}`);
    }
  }

  addTo(map) {
    this.marker.addTo(map);
  }

  removeFrom(map) {
    this.marker.removeFrom(map);
  }
}
