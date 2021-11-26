import L from "leaflet";
import busIcon from '../images/bus.png';
import busIcon2x from '../images/bus-2x.png';


const busRenderOptions = {
  color: "red",
  fillColor: "#f03",
  fillOpacity: 0.5,
  radius: 500
}

const locationIcon2x = L.icon({
  iconUrl: busIcon2x,
  iconSize:     [82, 82],
  iconAnchor:   [41, 41],
  popupAnchor:  [-3, -56]
});

const locationIcon = L.icon({
  iconUrl: busIcon,
  iconSize:     [40, 40],
  iconAnchor:   [20, 20],
  popupAnchor:  [-3, -56]
});
export class Bus {
  constructor(position) {
    this.latitude = position.latitude;
    this.longitude = position.longitude;
    this.marker = L.marker([position.latitude, position.longitude], {icon: locationIcon});
  }

  addTo(map) {
    this.marker.addTo(map);
  }

  removeFrom(map) {
    this.marker.removeFrom(map);
  }
}
