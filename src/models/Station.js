import L from "leaflet";
let stationIcon = null;
let firstStationIcon = null;
let lastStationIcon = null;

let stationIcon2x = null;
let firstStationIcon2x = null;
let lastStationIcon2x = null;

if (typeof process != "undefined" && process.env.IGNORE_IMAGES) {
  console.log("using fake images")
} else {
  console.log("using real images")
  const origin = require('../images/circle-origin.png');
  const origin2x = require('../images/origin-2x.png');
  const station = require('../images/circle-station.png');
  const station2x = require('../images/station-2x.png');
  const destination = require('../images/circle-destination.png');
  const destination2x = require('../images/destination-2x.png');

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

  stationIcon = new StationIcon({iconUrl: station});
  firstStationIcon = new StationIcon({iconUrl: origin});
  lastStationIcon = new StationIcon({iconUrl: destination});

  stationIcon2x = new StationIcon2X({iconUrl: station2x});
  firstStationIcon2x = new StationIcon2X({iconUrl: origin2x});
  lastStationIcon2x = new StationIcon2X({iconUrl: destination2x});
}

import {getUserLang, timeWithZero} from "../utils/utils"

export class Station {
  constructor(stationData) {
    console.log("Station constructor: ", stationData)
    console.log("userLang: ", getUserLang());
    this.id = stationData.id;
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
    console.log(`adding station ${this.name} to map`);
    map.on('zoomend', () => {
      const newZoom = map.getZoom();
      this._adjustIcon(newZoom);
      console.log("currentZoom: ", newZoom);
    });

    this.marker.addTo(map);
    console.log("station added")
  }

  removeFrom(map) {
    this.marker.removeFrom(map);
  }
}
