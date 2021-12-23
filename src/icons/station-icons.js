import L from "leaflet";

export let stationIcon = null;
export let firstStationIcon = null;
export let lastStationIcon = null;

export let stationIcon2x = null;
export let firstStationIcon2x = null;
export let lastStationIcon2x = null;

if (typeof process != "undefined" && process.env.IGNORE_IMAGES) {
  console.log("using fake images")
} else {
  console.log("using real images")
  const origin = require('../images/circle-origin.png');
  const origin2x = require('../images/circle-origin.png'); //TODO: missing 2x image
  const station = require('../images/circle-station.png');
  const station2x = require('../images/circle-station.png'); //TODO: missing 2x image
  const destination = require('../images/circle-destination.png');
  const destination2x = require('../images/circle-destination.png'); //TODO: missing 2x image

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
