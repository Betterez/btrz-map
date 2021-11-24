import {Station} from "../models/Station";
import {StationsService} from "../services/StationsService";

export class StationsRepository {
  constructor({env, apiKey}) {
    this.stationService = new StationsService({env, apiKey});
  }

  findAsync(ids) {
    return this.stationService.getStationsFromIds(ids)
      .then((stationsFromBackend) => {
           return stationsFromBackend.map((s) => new Station(s));
      })
  }
}
