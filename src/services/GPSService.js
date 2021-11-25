import btrzApi from "btrz-api-client";
import {getConfig} from "../btrzAPIs/conf";

export class GPSService {
  constructor({apiKey, env}) {
    this.apiKey = apiKey;
    this.client = btrzApi.createApiClient({baseURL: getConfig(env).gps});
  }

  getScannerAppLocation({routeId, scheduleId, date, includeTravelledPath}) {
    const query = {
      routeId, scheduleId, date, includeTravelledPath
    }

    return this.client.gps.scannerAppLocation.get({token: this.apiKey, query});
  }
}
