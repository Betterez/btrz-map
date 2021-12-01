import {Station} from "../models/Station";

export class StationsRepository {
  constructor({stationsService}) {
    this.stationService = stationsService;
  }

  /**
   * Make sure the ids are sorted by position for a particular trip
   */
  findAsyncOld(ids) {
    return this.stationService.getStationsFromIds(ids)
      .then((stationsFromBackend) => {
        return stationsFromBackend.map((s) => {
          const indexInTrip = ids.findIndex((id) => id === s._id);
          const isLastStation = indexInTrip === ids.length - 1;
          return new Station(s, indexInTrip, isLastStation);
        });
      })
  }

  findAsync(legs) {
    const stationsMap = {};
    const sortedLegs = legs.slice().sort((l1, l2) => l1.legord < l2.legord ? -1 : 1);
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
          positionInTrip: leg.legord + 1,
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
        return stations.map((station => new Station(station)));
      })
  }
}
