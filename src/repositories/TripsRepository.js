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
      const stationIds = [];
      const legs = tripFromBackend.legs;
      for (let i = 0; i < legs.length; i++) {
        if (legs[i].fromId) {
          stationIds.push(legs[i].fromId);
        }

        if (legs[i].toId) {
          stationIds.push(legs[i].toId);
        }
      }

      return this.stationsRepository.findAsync(stationIds);
    })
    .then((stations) => {
      const stationsMap = {};
      for (let i = 0; i < stations.length; i++) {
        const currentStation = stations[i];
        stationsMap[currentStation.id] = currentStation;
      }

      return new Trip({
        tripFromBackend: _tripFromBackend,
        stationsMap,
        gpsService: this.gpsService
      });
    })
  }
}
