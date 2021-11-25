import {Station} from "../models/Station";

export class StationsRepository {
  constructor({stationsService}) {
    this.stationService = stationsService;
  }

  findAsync(ids) {
    return this.stationService.getStationsFromIds(ids)
      .then((stationsFromBackend) => {
        return stationsFromBackend.map((s) => new Station(s));
      })
  }
}
