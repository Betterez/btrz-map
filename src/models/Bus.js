import L from "leaflet";
import busIconImage from '../images/bus.png';
import busIconImage2x from '../images/bus-2x.png';

const BusIcon = L.Icon.extend({
  options: {
    iconSize:     [40, 40],
    iconAnchor:   [20, 20],
    popupAnchor:  [-3, -56]
  }
});
const BusIcon2x = L.Icon.extend({
  options: {
    iconSize:     [82, 82],
    iconAnchor:   [41, 41],
    popupAnchor:  [-3, -56]
  }
});

const busIcon = new BusIcon({iconUrl: busIconImage});
const busIcon2x = new BusIcon2x({iconUrl: busIconImage2x});

export class Bus {
  constructor(position) {
    this.latitude = position.latitude;
    this.longitude = position.longitude;
    this.currentZoom = 0;
    const initialIcon = this._getIcon("normal");
    this.marker = L.marker([position.latitude, position.longitude], {icon: initialIcon});
  }

  _getIcon(size) {
    return size === "normal" ? busIcon : busIcon2x;
  }

  _adjustIcon(zoom) {
    if (zoom < 9 && this.currentZoom >= 9) {
      this.marker.setIcon(this._getIcon("2x"));
    } else if (zoom >= 9 && this.currentZoom < 9) {
      this.marker.setIcon(this._getIcon("normal"));
    }

    this.currentZoom = zoom;
  }

  addTo(map) {
    map.on('zoomend', () => {
      const newZoom = map.getZoom();
      this._adjustIcon(newZoom);
    });
    this.marker.addTo(map);
  }

  removeFrom(map) {
    this.marker.removeFrom(map);
  }
}
