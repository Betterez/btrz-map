import L from "leaflet";

import {busIcon} from "../icons/bus-icons";
import {
  firstStationIcon,
  lastStationIcon,
  stationIcon
} from "../icons/station-icons";

import {validateCoordinates} from "../utils/utils";

/** This class should be the only one which depends on leaflet **/
export class MarkerProvider {
  getBusMarker({position}) {
    try {
      validateCoordinates({
        latitude: position.latitude,
        longitude: position.longitude
      })
      return L.marker([position.latitude, position.longitude], {icon: busIcon});
    } catch(error) {
      console.log("can't get a marker for bus: ", error);
      return null;
    }
  }

  getStationIcon({position, isLastStation, isFirstStation}) {
    let icon;

    if (isLastStation) {
      icon = lastStationIcon;
    } else if (isFirstStation) {
      icon = firstStationIcon;
    } else {
      icon = stationIcon;
    }

    try {
      validateCoordinates({
        latitude: position.latitude,
        longitude: position.longitude
      })
      return L.marker([position.latitude, position.longitude], {icon});
    } catch(error) {
      console.log("can't get a marker for station: ", error);
      return null;
    }
  }

  getTravelPathPolyline({latLongs, travelledPathRenderOptions}) {
    return L.polyline(latLongs, travelledPathRenderOptions);
  }

  getCenterControl() {
    return L.control.centerButton({
      position: "topleft"
    });
  }
}
