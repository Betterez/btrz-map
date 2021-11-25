import btrzApi from "btrz-api-client";
import {getConfig} from "../btrzAPIs/conf";

export class StationsService {
  constructor({apiKey, env}) {
    this.apiKey = apiKey;
    this.client = btrzApi.createApiClient({baseURL: getConfig(env).inventory});
  }

  getStationsFromIds(stationIds) {
    let stationIdsForAPI = "";

    for (let i=0; i < stationIds.length; i++) {
      if (i === stationIds.length - 1) {
        stationIdsForAPI = stationIdsForAPI.concat(stationIds[i] + "");
      } else {
        stationIdsForAPI = stationIdsForAPI.concat(stationIds[i] + ",");
      }
    };

    const query = {stationIds: stationIdsForAPI};
    return this.client.inventory.stations.all({token: this.apiKey, query})
      .then((response) => {
        return response.data.stations;
      });
  }
}
