import btrzApi from "btrz-api-client";
import {getConfig} from "./conf";

export function getScannerAppLocation({env, apiKey, routeId, scheduleId, date, includeTravelledPath}) {
  const client = btrzApi.createApiClient({baseURL: getConfig(env).gps});
  const query = {
    routeId, scheduleId, date, includeTravelledPath
  }
  return client.gps.scannerAppLocation.get({token: apiKey, query});
}
