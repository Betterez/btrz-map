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

      const sortedLegs = tripFromBackend.legs.slice();
      sortedLegs.sort((l1, l2) => l1.legord < l2.legord ? -1 : 1);
      for (let i = 0; i < sortedLegs.length; i++) {
        if (sortedLegs[i].fromId) {
          stationIds.push(sortedLegs[i].fromId);
        }

        if (sortedLegs[i].toId) {
          stationIds.push(sortedLegs[i].toId);
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
