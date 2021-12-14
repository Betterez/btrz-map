import {TripsRepository} from "../src/repositories/TripsRepository";
import {StationsRepository} from "../src/repositories/StationsRepository";
import {StationsService} from "../src/services/StationsService";
import {TripsService} from "../src/services/TripsService";
import {GPSService} from "../src/services/GPSService";
import {Station} from "../src/models/Station";
import {Trip} from "../src/models/Trip";

export const testAPI = {
  TripsService,
  StationsService,
  StationsRepository,
  TripsRepository,
  GPSService,
  Station,
  Trip
}
