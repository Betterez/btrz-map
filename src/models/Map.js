/** Class representing a Betterez Map. */
class Map {
  constructor({leafletMap, tripsRepository}) {
    this.leafletMap = leafletMap;
    this.trip = null;
    this.tripsRepository = tripsRepository;
  }

  /**
   * Shows the current bus position on the map for the specified trip. If trip is not started will show only the stations.
   *
   * After you are done with this trip, please call {@link removeTrip} to free resources and stop listeners.
   * @param {Object} tripOptions - The params needed to identify a trip.
   * @param {string} btrzMapOptions.routeId - Id of the route for the trip you want to show.
   * @param {string} btrzMapOptions.scheduleId - Id of the schedule for the trip you want to show.
   * @param {string} btrzMapOptions.date - Date of departure for the trip in format "YYYY-MM-DD".
   * @param {string} btrzMapOptions.productId - Product id enabled for that trip".
   * @returns {Object} A trip instance.
   */
  addTrip({routeId, scheduleId, date, productId}) {
    this.removeTrip();
    return this.tripsRepository.findAsync({
      routeId,
      productId,
      scheduleId,
      date,
    })
      .then((trip) => {
        this.trip = trip;
        this.trip.addTo(this.leafletMap);
      })
      .catch((err) => {
        console.log("There was a problem with the trip: ", err);
      });
  }

  /**
   * Removes the current trip from the map to free resources.
   */
  removeTrip() {
    if (this.trip) {
      this.trip.removeFrom(this.leafletMap);
    }
  }
}

export {Map};
