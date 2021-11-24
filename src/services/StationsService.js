import btrzApi from "btrz-api-client";
import {getConfig} from "./conf";

export class StationsService {
  constructor({apiKey, env}) {
    this.apiKey = apiKey;
    this.client = btrzApi.createApiClient({baseURL: getConfig(env).inventory});
  }

  getStationsFromIds(stationIds) {
    const query = {stationIds}
    return this.client.inventory.stations.all({token: this.apiKey, query});
  }
}
