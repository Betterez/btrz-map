import L from "leaflet";

import {busIcon} from "../icons/bus-icons";
import {
  firstStationIcon,
  lastStationIcon,
  stationIcon
} from "../icons/station-icons";

/** This class should be the only one which depends on leaflet **/
export class MarkerProvider {
  getBusMarker({position}) {
    return L.marker([position.latitude, position.longitude], {icon: busIcon});
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

    return L.marker([position.latitude, position.longitude], {icon});
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
