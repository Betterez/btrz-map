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

/**
 * Initializes the lib. This is your entry point.
 * @param {Object} initOptions - Options to init the library.
 * @param {string} initOptions.env - The environment to point to. Accepted values: "production", "sandbox".
 * @param {string} initOptions.apiKey - The Betterez public key of your account.
 * @returns {Object} Initialized instance of the btrz-map lib
 */
export function init({env, apiKey}) {
  const stationsService = new StationsService({apiKey, env});
  const tripsService = new TripsService({apiKey, env});
  const stationsRepository = new StationsRepository({stationsService});
  const gpsService = new GPSService({apiKey, env});
  const tripsRepository = new TripsRepository({tripsService, stationsRepository, gpsService});

  /**
   * Builds and returns the map interface. This is a Betterez Map, not the leaflet map.
   * @param {Object} btrzMapOptions - Options to build the map.
   * @param {string} btrzMapOptions.containerId - Id of the HTML element that is going to contain the map.
   * @param {string} btrzMapOptions.tilesProviderUrl - Url of the map tiles provider.
   * @param {string} btrzMapOptions.attribution - Attribution to the map tiles provider to show on the map. Check your map tiles provider docs.
   * @returns {Object} The Betterez Map. It is a wrapper around the leaflet map
   */
  function map({containerId, tilesProviderUrl, attribution}) {
    if (!L) {
      console.log("leaftlet dependency is missing!");
      return;
    }

    const leafletMap = L.map(containerId);
    L.tileLayer(tilesProviderUrl, {attribution}).addTo(leafletMap);
    const map = new Map({leafletMap, tripsRepository});
    console.log("btrz-map ready");
    return map;
  }
  return {
    map
  }
}
