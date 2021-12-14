import L from "leaflet";
let busIcon = null;
let busIcon2x = null;

if (typeof process != "undefined" && process.env.IGNORE_IMAGES) {
  console.log("using fake images")
} else {
  console.log("using real images")
  const busIconImage = require('../images/bus.png');
  const busIconShadow = require('../images/animated-circle.gif');
  const busIconImage2x = require('../images/bus-2x.png');

  const BusIcon = L.Icon.extend({
    options: {
      iconSize:     [40, 40],
      iconAnchor:   [20, 20],
      popupAnchor:  [0, -45],
      shadowSize:   [40, 40],
      shadowAnchor: [20, 20]
    }
  });
  const BusIcon2x = L.Icon.extend({
    options: {
      iconSize:     [82, 82],
      iconAnchor:   [41, 41],
      popupAnchor:  [0, -45]
    }
  });

  busIcon = new BusIcon({iconUrl: busIconImage, shadowUrl: busIconShadow});
  busIcon2x = new BusIcon2x({iconUrl: busIconImage2x});
}

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
