import L from "leaflet";

import {busIcon} from "../icons/bus-icons";
import {
  firstStationIcon,
  lastStationIcon,
  stationIcon
} from "../icons/station-icons";

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
}
