import {Station} from "../models/Station";

export class StationsRepository {
  constructor({stationsService}) {
    this.stationService = stationsService;
  }

  /**
   * Make sure the ids are sorted by position for a particular trip
   */
  findAsync(ids) {
    return this.stationService.getStationsFromIds(ids)
      .then((stationsFromBackend) => {
        return stationsFromBackend.map((s) => {
          const indexInTrip = ids.findIndex((id) => id === s._id);
          const isLastStation = indexInTrip === ids.length - 1;
          return new Station(s, indexInTrip, isLastStation);
        });
      })
  }
}
