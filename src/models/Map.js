export class Map {
  constructor({leafletMap, tripsRepository}) {
    this.leafletMap = leafletMap;
    this.trip = null;
    this.tripsRepository = tripsRepository;
  }

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

  removeTrip() {
    if (this.trip) {
      this.trip.removeFrom(this.leafletMap);
    }
  }
}
