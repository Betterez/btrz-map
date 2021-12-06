import L from "leaflet";
import origin from '../images/circle-origin.png';
import origin2x from '../images/origin-2x.png';
import station from '../images/circle-station.png';
import station2x from '../images/station-2x.png';
import destination from '../images/circle-destination.png';
import destination2x from '../images/destination-2x.png';
import {getUserLang, timeWithZero} from "../utils/utils"

const StationIcon = L.Icon.extend({
  options: {
    iconSize:     [20, 20],
    iconAnchor:   [10, 10],
    popupAnchor:  [0, -25]
  }
});

const StationIcon2X = L.Icon.extend({
  options: {
    iconSize:     [66, 93],
    iconAnchor:   [33, 90],
    popupAnchor:  [0, -35]
  }
});

const stationIcon = new StationIcon({iconUrl: station});
const firstStationIcon = new StationIcon({iconUrl: origin});
const lastStationIcon = new StationIcon({iconUrl: destination});

const stationIcon2x = new StationIcon2X({iconUrl: station2x});
const firstStationIcon2x = new StationIcon2X({iconUrl: origin2x});
const lastStationIcon2x = new StationIcon2X({iconUrl: destination2x});


export class Station {
  constructor(stationData) {
    console.log("Station constructor: ", stationData)
    console.log("userLang: ", getUserLang());
    this.id = stationData._id;
    this.name = stationData.name;
    this.departureTimestamp = stationData.departureTimestamp;
    this.arrivalTimestamp = stationData.arrivalTimestamp;
    this.latitude = stationData.latitude;
    this.longitude = stationData.longitude;
    this.currentZoom = 0;
    this.isLastStation = stationData.isLastStation;
    this.positionInTrip = stationData.positionInTrip;

    const initialIcon = this._getIcon("normal");
    this.marker = L.marker([stationData.latitude, stationData.longitude], {icon: initialIcon});

    if (this.positionInTrip === 0) {
      const ETD = new Date(this.departureTimestamp);
      const hours = ETD.getHours();
      const minutes = timeWithZero(ETD.getMinutes());
      this.marker.bindPopup(`<b>${this.name}</b><br>ETD ${hours}:${minutes} hs.`);
    } else {
      const ETA = new Date(this.arrivalTimestamp);
      const hours = ETA.getHours();
      const minutes = timeWithZero(ETA.getMinutes());
      this.marker.bindPopup(`<b>${this.name}</b><br>ETA ${hours}:${minutes} hs.`);
    }
  }

  _getIcon(size) {
    if (this.isLastStation) {
      return size === "normal" ? lastStationIcon : lastStationIcon2x;
    } else if (this.positionInTrip === 0) {
      return size === "normal" ? firstStationIcon : firstStationIcon2x;
    } else {
      return size === "normal" ? stationIcon : stationIcon2x;
    }
  }

  _adjustIcon(zoom) {
    if (zoom < 9 && this.currentZoom >= 9) {
      this.marker.setIcon(this._getIcon("normal"));
    } else if (zoom >= 9 && this.currentZoom < 9) {
      this.marker.setIcon(this._getIcon("normal"));
    }

    this.currentZoom = zoom;
  }

  addTo(map) {
    map.on('zoomend', () => {
      const newZoom = map.getZoom();
      this._adjustIcon(newZoom);
      console.log("currentZoom: ", newZoom);
    });

    this.marker.addTo(map);
  }

  removeFrom(map) {
    this.marker.removeFrom(map);
  }
}
