import btrzApi from "btrz-api-client";
import {getConfig} from "./conf";

export function getTrip({env, apiKey, routeId, scheduleId, date, productId}) {
  const client = btrzApi.createApiClient({baseURL: getConfig(env).operations});
  const query = {stationIds}
  return client.operations.outlookTrips.get({token: apiKey, query});
}
