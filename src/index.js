import L from "leaflet";
import {TripsRepository} from "./repositories/TripsRepository";
import {StationsRepository} from "./repositories/StationsRepository";
import {StationsService} from "./services/StationsService";
import {TripsService} from "./services/TripsService";
import {GPSService} from "./services/GPSService";
import {Map} from "./models/Map";
import {registerCustomControls} from "./customControls";
import "./leaflet-styles-override.css"

registerCustomControls(L);

export function init({env, apiKey}) {
  const stationsService = new StationsService({apiKey, env});
  const tripsService = new TripsService({apiKey, env});
  const stationsRepository = new StationsRepository({stationsService});
  const gpsService = new GPSService({apiKey, env});
  const tripsRepository = new TripsRepository({tripsService, stationsRepository, gpsService});

  function map({containerId, tilesProviderUrl, tilesLayerOptions}) {
    if (!L) {
      console.log("leaftlet dependency is missing!");
      return;
    }

    const leafletMap = L.map(containerId);
    L.tileLayer(tilesProviderUrl, tilesLayerOptions).addTo(leafletMap);
    const map = new Map({leafletMap, tripsRepository});
    console.log("btrz-map ready");
    return map;
  }
  return {
    map
  }
}
