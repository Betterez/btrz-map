import {TravelledPath} from "./TravelledPath";
import {Bus} from "./Bus";

export class Trip {
  constructor({tripFromBackend, stationsMap, gpsService}) {
    this.routeId = tripFromBackend.routeId;
    this.scheduleId = tripFromBackend.scheduleName;
    this.date = tripFromBackend.date;
    this.legs = tripFromBackend.legs;
    this.stationsMap = stationsMap;
    this.travelledPath = null;
    this.gpsIntervalId = null;
    this.gpsService = gpsService;
    this.centerControl = null;
  }

  _addStationsTo(map) {
    const keys = Object.keys(this.stationsMap);
    for (let i = 0; i < keys.length; i++) {
      const station = this.stationsMap[keys[i]];
      station.addTo(map);
    }
  }

  _removeStationsFrom(map) {
    const keys = Object.keys(this.stationsMap);
    for (let i = 0; i < keys.length; i++) {
      const station = this.stationsMap[keys[i]];
      station.removeFrom(map);
    }
  }

  _addTravelledPathTo(map, coordinates) {
    this._removeTravelledPathFrom(map);
    this.travelledPath = new TravelledPath(coordinates);
    this.travelledPath.addTo(map);
  }

  _removeTravelledPathFrom(map) {
    if (this.travelledPath) {
      this.travelledPath.removeFrom(map);
    }
  }

  _addBusTo(map, position) {
    this._removeBusFrom(map);
    this.bus = new Bus(position);
    this.bus.addTo(map);
  }

  _removeBusFrom(map) {
    if (this.bus) {
      this.bus.removeFrom(map);
    }
  }

  _getFirstStation() {
    const firstLeg = this.legs.find((l) => l.legord === 0);
    return this.stationsMap[firstLeg.fromId];
  }

  _updatePosition(map, firstTime) {
    return this.gpsService.getScannerAppLocation({
      routeId: this.routeId,
      scheduleId: this.scheduleId,
      date: this.date,
      includeTravelledPath: true
    })
    .then((position) => {
      if (position.travelledPath) {
        this._addTravelledPathTo(map, position.travelledPath);
      }

      if (position.lastKnown) {
        this._addBusTo(map, position.lastKnown);
        map.setView([position.lastKnown.latitude, position.lastKnown.longitude], 14);
      } else if (firstTime) {
        const firstStation = this._getFirstStation();
        map.setView([firstStation.latitude, firstStation.longitude], 14);
      }
    });
  }

  _startLiveTracking(map) {
    if (this.gpsIntervalId) {
      this._stopLiveTracking();
    }

    this.gpsIntervalId = setInterval(() => {
      this._updatePosition(map, false);
    }, 10000);

    return this._updatePosition(map, true);
  }

  _stopLiveTracking() {
    clearInterval(this.gpsIntervalId);
    this.gpsIntervalId = null;
  }

  _removeCenterButton(map) {
    if (this.centerControl) {
      this.centerControl.removeFrom(map);
    }
  }

  _addCenterButton(map) {
    this._removeCenterButton(map);

    this.centerControl = L.control.centerButton({
      position: "topleft"
    });
    this.centerControl.addTo(map);
    this.centerControl.getContainer().onclick = () => {
      console.log("user pressed center button");
      //this.autoCenterEnabled = true;
      //this.centerMap();
    };
  }

  addTo(map) {
    this._addCenterButton(map);
    this._addStationsTo(map);
    return this._startLiveTracking(map);
  }

  removeFrom(map) {
    this._removeStationsFrom(map);
    this._removeTravelledPathFrom(map);
    this._removeBusFrom(map);
  }
}
