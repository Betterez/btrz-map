import btrzApi from "btrz-api-client";
import {getConfig} from "./conf";

export class TripsService {
  constructor({apiKey, env}) {
    this.apiKey = apiKey;
    this.client = btrzApi.createApiClient({baseURL: getConfig(env).operations});
  }

  getTrip({routeId, scheduleId, date, productId}) {
    const query = {
      routeId: routeId,
      scheduleId: scheduleId,
      date: date,
      productId: productId
    }
    return this.client.operations.outlookTrips.get({token: this.apiKey, query});
  }
}