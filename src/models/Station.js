import {timeWithZero} from "../utils/utils"

/**
 * Class representing a Station in the Trip
 * @property {string} id - The station id.
 * @property {string} name - The station name.
 * @property {string} departureTimestamp - The departure date and time in ISO 8601 date-time format.
 * @property {string} arrivalTimestamp - The arrival date and time in ISO 8601 date-time format.
 * @property {number} positionInTrip - zero-indexed position of the station for this trip.
 * @property {number} latitude - latitude of the station location.
 * @property {number} longitude - longitude of the station location.
 *
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
      this.marker.bindPopup(`<b>${this.name}</b><br>ETD ${hours}:${minutes} hs.`);
    } else {
      const ETA = new Date(this.arrivalTimestamp);
      const hours = ETA.getHours();
      const minutes = timeWithZero(ETA.getMinutes());
      this.marker.bindPopup(`<b>${this.name}</b><br>ETA ${hours}:${minutes} hs.`);
    }
  }

  addTo(map) {
    this.marker.addTo(map);
  }

  removeFrom(map) {
    this.marker.removeFrom(map);
  }
}
