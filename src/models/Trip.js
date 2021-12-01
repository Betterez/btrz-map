import {TravelledPath} from "./TravelledPath";
import {Bus} from "./Bus";

export class Trip {
  constructor({tripFromBackend, stations, gpsService}) {
    this.routeId = tripFromBackend.routeId;
    this.scheduleId = tripFromBackend.scheduleName;
    this.date = tripFromBackend.date;
    this.stations = stations;
    this.travelledPath = null;
    this.gpsIntervalId = null;
    this.gpsService = gpsService;
    this.centerControl = null;
    this.autoCenterEnabled =  true;
    this.discardMovement = false
  }

  _addStationsTo(map) {
    this.stations.forEach((station) => {
      station.addTo(map);
    });
  }

  _removeStationsFrom(map) {
    this.stations.forEach((station) => {
      station.removeFrom(map);
    });
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
    return this.stations.find((s) => s.positionInTrip === 0);
  }

  _discardMovement() {
    this.discardMovement = true;
    setTimeout(() => this.discardMovement = false, 5000);
  }

  centerMap() {
    this._discardMovement();
    if (this.currentPosition && this.currentPosition.lastKnown) {
      map.setView([this.currentPosition.lastKnown.latitude, this.currentPosition.lastKnown.longitude], 14);
    } else {
      const firstStation = this._getFirstStation();
      map.setView([firstStation.latitude, firstStation.longitude], 14);
    }
  }

  _updatePosition(map) {
    return this.gpsService.getScannerAppLocation({
      routeId: this.routeId,
      scheduleId: this.scheduleId,
      date: this.date,
      includeTravelledPath: true
    })
    .then((position) => {
      this.currentPosition = position;

      if (position.travelledPath) {
        this._addTravelledPathTo(map, position.travelledPath);
      }

      if (position.lastKnown) {
        this._addBusTo(map, position.lastKnown);
      }

      if (this.autoCenterEnabled) {
        this.centerMap();
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
      this.autoCenterEnabled = true;
      this.centerMap();
    };
  }

  addTo(map) {
    this._addCenterButton(map);
    this._addStationsTo(map);
    return this._startLiveTracking(map)
      .then(() => {
        map.on("movestart", () => {
          if (!this.discardMovement) {
            console.log("movestart");
            this.autoCenterEnabled = false;
          }
        });
      });
  }

  removeFrom(map) {
    this._removeStationsFrom(map);
    this._removeTravelledPathFrom(map);
    this._removeBusFrom(map);
  }
}
