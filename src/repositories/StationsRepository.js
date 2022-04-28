import {Station} from "../models/Station";

export class StationsRepository {
  constructor({stationsService, markerProvider}) {
    this.stationService = stationsService;
    this.markerProvider = markerProvider;
  }

  findAsync(legs) {
    const stationsMap = {};
    const sortedLegs = legs.slice().sort((l1, l2) => {
      return l1.departureTimestamp < l2.departureTimestamp ? -1 : 1
    });
    for (let i = 0; i < sortedLegs.length; i++) {
      const leg = sortedLegs[i];
      const isFirstLeg = i === 0;
      const isLastLeg = i === (sortedLegs.length - 1);
      const fromId = leg.fromId;
      const toId = leg.toId;

      if (fromId && !stationsMap[fromId]) {
        stationsMap[fromId] = {
          id: fromId,
          name: leg.from,
          positionInTrip: leg.legord,
          departureTimestamp: leg.departureTimestamp,
          arrivalTimestamp: isFirstLeg ? null : sortedLegs[i-1].arrivalTimestamp,
          isLastStation: false
        }
      }

      if (toId && !stationsMap[toId]) {
        stationsMap[toId] = {
          id: toId,
          name: leg.to,
          positionInTrip: leg.legord ? leg.legord + 1 : undefined,
          departureTimestamp: isLastLeg ? null : sortedLegs[i+1].departureTimestamp,
          arrivalTimestamp: leg.arrivalTimestamp,
          isLastStation: isLastLeg
        }
      }
    }

    return this.stationService.getStationsFromIds(Object.keys(stationsMap))
      .then((stationsFromBackend) => {
        stationsFromBackend.forEach((s) => {
          stationsMap[s._id].latitude = s.latitude;
          stationsMap[s._id].longitude = s.longitude;
        });

        return Object.values(stationsMap);
      })
      .then((stations) => {
        return stations.map((station) => new Station(station, this.markerProvider));
      });
  }
}
