import {TripsRepository} from "../src/repositories/TripsRepository";
import {StationsRepository} from "../src/repositories/StationsRepository";
import {StationsService} from "../src/services/StationsService";
import {TripsService} from "../src/services/TripsService";
import {GPSService} from "../src/services/GPSService";
import {Station} from "../src/models/Station";
import {Trip} from "../src/models/Trip";
import Utils from "../src/utils/utils";

/* This API is exposed to the testing framework so we can access Services, Models, etc so we can do regression testing.
   Users of this library has access to a much restricted API in index.js
 */
export const testAPI = {
  TripsService,
  StationsService,
  StationsRepository,
  TripsRepository,
  GPSService,
  Station,
  Trip,
  Utils
}
