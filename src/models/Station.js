import L from "leaflet";
import LeafIcon from '../images/leaf-green.png';
import LeafShadowIcon from '../images/leaf-shadow.png';
import origin from '../images/origin.png';
import origin2x from '../images/origin-2x.png';
import station from '../images/station.png';
import station2x from '../images/station-2x.png';
import destination from '../images/destination.png';
import destination2x from '../images/destination-2x.png';

const stationIcon = L.icon({
  iconUrl: station,
  iconSize:     [36, 49],
  iconAnchor:   [18, 47],
  popupAnchor:  [-3, -56] 
});

const firstStationIcon = L.icon({
  iconUrl: origin,
  iconSize:     [36, 49],
  iconAnchor:   [18, 47],
  popupAnchor:  [-3, -56] 
});

const lastStationIcon = L.icon({
  iconUrl: destination,
  iconSize:     [36, 49],
  iconAnchor:   [18, 47],
  popupAnchor:  [-3, -56] 
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
