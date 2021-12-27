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

  getTravelPathPolyline({coordinates, travelledPathRenderOptions}) {
    const positions = [];
    for (let i = 0; i < coordinates.length; i++) {
      const position = coordinates[i];
      positions.push([position.latitude, position.longitude]);
    }
    return L.polyline(positions, travelledPathRenderOptions);
  }
}
