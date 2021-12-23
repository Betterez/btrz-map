import L from "leaflet";
import {busIcon, busIcon2x} from "../icons/bus-icons";

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
    });
    this.marker.addTo(map);
  }

  removeFrom(map) {
    this.marker.removeFrom(map);
  }
}
