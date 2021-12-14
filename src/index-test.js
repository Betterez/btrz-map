import {TripsRepository} from "../src/repositories/TripsRepository";
import {StationsRepository} from "../src/repositories/StationsRepository";
import {StationsService} from "../src/services/StationsService";
import {TripsService} from "../src/services/TripsService";
import {GPSService} from "../src/services/GPSService";

export const testAPI = {
  TripsService,
  StationsService,
  StationsRepository,
  TripsRepository,
  GPSService
}
