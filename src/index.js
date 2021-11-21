import L from "leaflet";

export function init() {
  if (!L) {
    console.log("leaftlet dependency is missing!");
    return;
  }

  console.log("btrz-map ready");
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
 * };
 *
 * type TripOptions = {
 *   travelledPathColor: string,
 * }
 *
 * type MapOptions = {
 *   attribution: string // String to be shown in the attribution control, e.g. "© OpenStreetMap contributors". It describes the layer data and is often a legal obligation towards copyright holders and tile providers.
 * }
 *
 * // Initializes the map with the proper tiles
 * const map = btrzMap.init({containerId: string, tilesProviderUrl: string, options: MapOptions});
 *
 * // Renders the map and show the data associated with the trip: Stations & Bus Live Position
 * // A map can only be associated to one trip.
 * // The map will center on the bus position. If bus position is not available, it will center on first station.
 * // Returns a promise which will resolve when the trip is ready to be shown or reject if there was a problem
 * // (like trip not found)
 * map.addTrip(btzOptions: BtrzOptions, tripOptions: TripOptions);
 *
 * // When you no longer need to show the trip, make sure to call this method to stop listening live data for the trip
 * // This will free resources and avoid memory leaks.
 * map.removeTrip();
 *
 * // This will remove the map tiles from your container
 * map.destroy();
 */
