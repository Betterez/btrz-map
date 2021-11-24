import L from "leaflet";
import {Trip}  from "./models/Trip";
import {Station}  from "./models/Station";
import {GPSService} from "./services/GPSService";
import {TripsRepository} from "./repositories/TripsRepository";
import {StationsRepository} from "./repositories/StationsRepository";

import {StationsService} from "./services/StationsService";
import {TripsService} from "./services/TripsService";


export function map({containerId, tilesProviderUrl, tilesLayerOptions}) {
  if (!L) {
    console.log("leaftlet dependency is missing!");
    return;
  }

  const map = L.map(containerId);
  L.tileLayer(tilesProviderUrl, tilesLayerOptions).addTo(map);
  console.log("btrz-map ready");
  return map;
}

export function trip({env, apiKey, routeId, scheduleId, date, productId}) {
  const stationsRepository = new StationsRepository({apiKey, env})
  const tripsRepository = new TripsRepository({env, apiKey, stationsRepository});
  return tripsRepository.findAsync({
    routeId,
    productId,
    scheduleId,
    date,
  })
  .catch((err) => {
    console.log("There was a problem getting the trip: ", err);
  });
}

/**
 * API proposal
 *
 * type BtrzOptions = {
 *  publicKey: string,
 *  accountId: string,
 *  routeId: string,
 *  scheduleId: string,
 *  tripDate: string,
 *  productId: string TODO: see if API can do it without productId
 *  env: string // one of ["production", "sandbox"]. Defaults to sandbox.
 * };
 *
 * type TripRenderOptions = {
 *   travelledPathColor: string,
 * }
 *
 * type MapOptions = {
 *   attribution: string // String to be shown in the attribution control, e.g. "© OpenStreetMap contributors". It describes the layer data and is often a legal obligation towards copyright holders and tile providers.
 * }
 *
 * // Initializes the map with the proper tiles
 * // Returns a leaftlet Map
 * const map = btrzMap.map({containerId: string, tilesProviderUrl: string, options: MapOptions});
 *
 * //Get the trip information with all the needed data to display it on a map
 * // Returns a promise which will resolve with the trip when is ready or reject if there was a problem
 * const trip = await btrzMap.trip({btzOptions: BtrzOptions, tripRenderOptions: TripRenderOptions});
 *
 * // Renders the map and show the data associated with the trip: Stations & Bus Live Position
 * // A map can only be associated to one trip.
 * // The map will center on the bus position. If bus position is not available, it will center on first station.
 * // (like trip not found)
 * trip.addTo(map: Map);
 *
 * // When you no longer need to show the trip, make sure to call this method to stop listening live data for the trip
 * // This will free resources and avoid memory leaks.
 * trip.removeFrom(map: Map);
 */
