import {Trip} from "../models/Trip";
import {GPSService} from "../services/GPSService";

export class TripsRepository {
  constructor({stationsRepository, tripsService, gpsService}) {
    this.tripsService = tripsService;
    this.stationsRepository = stationsRepository;
    this.gpsService = gpsService;
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
        gpsService: this.gpsService
      });
    })
  }
}
