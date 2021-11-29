import L from "leaflet";
import {TripsRepository} from "./repositories/TripsRepository";
import {StationsRepository} from "./repositories/StationsRepository";
import {StationsService} from "./services/StationsService";
import {TripsService} from "./services/TripsService";
import {GPSService} from "./services/GPSService";
import {registerCustomControls} from "./customControls";
import "./leaflet-styles-override.css"

registerCustomControls(L);

export function init({env, apiKey}) {
  const stationsService = new StationsService({apiKey, env});
  const tripsService = new TripsService({apiKey, env});
  const stationsRepository = new StationsRepository({stationsService});
  const gpsService = new GPSService({apiKey, env});
  const tripsRepository = new TripsRepository({tripsService, stationsRepository, gpsService});

  function map({containerId, tilesProviderUrl, tilesLayerOptions}) {
    if (!L) {
      console.log("leaftlet dependency is missing!");
      return;
    }

    const map = L.map(containerId);
    L.tileLayer(tilesProviderUrl, tilesLayerOptions).addTo(map);
    console.log("btrz-map ready");
    return map;
  }

  function trip({routeId, scheduleId, date, productId}) {
    return tripsRepository.findAsync({
      routeId,
      productId,
      scheduleId,
      date,
    })
      .catch((err) => {
        console.log("There was a problem getting the trip: ", err);
      });
  }

  return {
    map,
    trip
  }
}
