import L from "leaflet";

export let busIcon = null;
export let busIcon2x = null;

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
