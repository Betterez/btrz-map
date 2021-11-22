import btrzApi from "btrz-api-client";
import {getConfig} from "./conf";

export function getStationsFromIds({env, apiKey, stationIds}) {
  const client = btrzApi.createApiClient({baseURL: getConfig(env).inventory});
  const query = {stationIds}
  return client.inventory.stations.all({token: apiKey, query});
}
