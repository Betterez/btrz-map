import {timeWithZero, validateCoordinates} from "../utils/utils"

/**
 * Class representing a Station in the Trip. It exposes the following props for convenience:
 *
 * id - The station id.
 *
 * name - The station name.
 *
 * departureTimestamp - The departure date and time in ISO 8601 date-time format.
 *
 * arrivalTimestamp - The arrival date and time in ISO 8601 date-time format.
 *
 * positionInTrip - zero-indexed position of the station for this trip.
 *
 * latitude - latitude of the station location.
 *
 * longitude - longitude of the station location.
 *
 * Throws an error if latitude or longitude are invalid
 */
export class Station {
  constructor(stationData, markerProvider) {
    this.id = stationData.id;
    this.name = stationData.name;
    this.departureTimestamp = stationData.departureTimestamp;
    this.arrivalTimestamp = stationData.arrivalTimestamp;
    this.latitude = stationData.latitude;
    this.longitude = stationData.longitude;
    this.positionInTrip = stationData.positionInTrip;

    this.marker = markerProvider.getStationIcon({
      position: {latitude: stationData.latitude, longitude: stationData.longitude},
      isLastStation: stationData.isLastStation,
      isFirstStation: this.positionInTrip === 0
    });

    if (this.positionInTrip === 0) {
      const ETD = new Date(this.departureTimestamp);
      const hours = ETD.getHours();
      const minutes = timeWithZero(ETD.getMinutes());
      if (this.marker) {
        this.marker.bindPopup(`<b>${this.name}</b><br>ETD ${hours}:${minutes} hs.`);
      }
    } else {
      const ETA = new Date(this.arrivalTimestamp);
      const hours = ETA.getHours();
      const minutes = timeWithZero(ETA.getMinutes());
      if (this.marker) {
        this.marker.bindPopup(`<b>${this.name}</b><br>ETA ${hours}:${minutes} hs.`);
      }
    }
  }

  addTo(map) {
    if (this.marker) {
      this.marker.addTo(map);
    }
  }

  removeFrom(map) {
    if (this.marker) {
      this.marker.removeFrom(map);
    }
  }
}
