import L from "leaflet";
import origin from '../images/origin.png';
import origin2x from '../images/origin-2x.png';
import station from '../images/station.png';
import station2x from '../images/station-2x.png';
import destination from '../images/destination.png';
import destination2x from '../images/destination-2x.png';

const StationIcon = L.Icon.extend({
  options: {
    iconSize:     [36, 49],
    iconAnchor:   [18, 47],
    popupAnchor:  [0, -45]
  }
});

const StationIcon2X = L.Icon.extend({
  options: {
    iconSize:     [66, 93],
    iconAnchor:   [33, 90],
    popupAnchor:  [0, -45]
  }
});

const stationIcon = new StationIcon({iconUrl: station});
const firstStationIcon = new StationIcon({iconUrl: origin});
const lastStationIcon = new StationIcon({iconUrl: destination});

const stationIcon2x = new StationIcon2X({iconUrl: station2x});
const firstStationIcon2x = new StationIcon2X({iconUrl: origin2x});
const lastStationIcon2x = new StationIcon2X({iconUrl: destination2x});


export class Station {
  constructor(stationData, indexInTrip, isLastStation) {
    console.log("Station constructor")
    this.id = stationData._id;
    this.name = stationData.name;
    this.latitude = stationData.latitude;
    this.longitude = stationData.longitude;
    this.currentZoom = 0;
    this.isLastStation = isLastStation;
    this.indexInTrip = indexInTrip;

    const initialIcon = this._getIcon("normal");
    this.marker = L.marker([stationData.latitude, stationData.longitude], {icon: initialIcon});

    if (indexInTrip === 0) {
      this.marker.bindPopup(`<b>${this.name}</b><br>ETD ${this.departure}`);
    } else {
      this.marker.bindPopup(`<b>${this.name}</b><br>ETA ${this.arrival}`);
    }
  }

  _getIcon(size) {
    if (this.isLastStation) {
      return size === "normal" ? lastStationIcon : lastStationIcon2x;
    } else if (this.indexInTrip === 0) {
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
