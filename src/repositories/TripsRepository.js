import {Trip} from "../models/Trip";

export class TripsRepository {
  constructor({stationsRepository, tripsService, gpsService, markerProvider, bus}) {
    this.tripsService = tripsService;
    this.stationsRepository = stationsRepository;
    this.gpsService = gpsService;
    this.markerProvider = markerProvider;
    this.bus = bus;
  }

  findAsync({routeId, scheduleId, date, productId}) {
    let _tripFromBackend = null;

    return this.tripsService.getTrip({
      routeId,
      scheduleId,
      date,
      productId
    })
    .then((tripFromBackend) => {
      _tripFromBackend = tripFromBackend;
      console.log("_tripFromBackend: ", _tripFromBackend)
      return this.stationsRepository.findAsync(_tripFromBackend.legs);
    })
    .then((stations) => {
      return new Trip({
        tripFromBackend: _tripFromBackend,
        stations,
        gpsService: this.gpsService,
        markerProvider: this.markerProvider,
        bus: this.bus
      });
    })
  }
}
