import L from "leaflet";
import LeafIcon from '../images/leaf-green.png';
import LeafShadowIcon from '../images/leaf-shadow.png';

const stationIcon = L.icon({
  iconUrl: LeafIcon,
  shadowUrl: LeafShadowIcon,
  iconSize:     [38, 95], // size of the icon
  shadowSize:   [50, 64], // size of the shadow
  iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

const firstStationIcon = L.icon({
  iconUrl: LeafIcon,
  shadowUrl: LeafShadowIcon,
  iconSize:     [38, 95], // size of the icon
  shadowSize:   [50, 64], // size of the shadow
  iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

const lastStationIcon = L.icon({
  iconUrl: LeafIcon,
  shadowUrl: LeafShadowIcon,
  iconSize:     [38, 95], // size of the icon
  shadowSize:   [50, 64], // size of the shadow
  iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

export class Station {
  constructor(stationData, indexInTrip, isLastStation) {
    this.id = stationData._id;
    this.name = stationData.name;
    this.latitude = stationData.latitude;
    this.longitude = stationData.longitude;

    if (isLastStation) {
      this.marker = L.marker([stationData.latitude, stationData.longitude], {icon: lastStationIcon});
      this.marker.bindPopup(`<b>${this.name}</b><br>ETA ${this.arrival}`);
    } else if (indexInTrip === 0) {
      this.marker = L.marker([stationData.latitude, stationData.longitude], {icon: firstStationIcon});
      this.marker.bindPopup(`<b>${this.name}</b><br>ETD ${this.departure}`);
    } else {
      this.marker = L.marker([stationData.latitude, stationData.longitude], {icon: stationIcon});
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
