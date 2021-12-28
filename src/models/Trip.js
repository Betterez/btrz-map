import {TravelledPath} from "./TravelledPath";

export class Trip {
  constructor({tripFromBackend, stations, bus, gpsService, markerProvider}) {
    this.routeId = tripFromBackend.routeId;
    this.scheduleId = tripFromBackend.scheduleName;
    this.date = tripFromBackend.date;
    this.stations = stations;
    this.travelledPath = null;
    this.gpsIntervalId = null;
    this.gpsService = gpsService;
    this.centerControl = null;
    this.autoCenterEnabled =  true;
    this.discardMovement = false;
    this.bus = bus;
    this.markerProvider = markerProvider;
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
    this.travelledPath = new TravelledPath(coordinates, this.markerProvider);
    this.travelledPath.addTo(map);
  }

  _removeTravelledPathFrom(map) {
    if (this.travelledPath) {
      this.travelledPath.removeFrom(map);
    }
  }

  _addBusTo(map) {
    this._removeBusFrom(map);
    this.bus.addTo(map);
  }

  _removeBusFrom(map) {
    this.bus.removeFrom(map);
  }

  _getFirstStation() {
    return this.stations.find((s) => s.positionInTrip === 0);
  }

  _discardMovement() {
    this.discardMovement = true;
    setTimeout(() => this.discardMovement = false, 5000);
  }

  _centerMap(map) {
    this._discardMovement();
    if (this.currentPosition && this.currentPosition.lastKnown) {
      console.log("centering map on current position")
      map.setView([this.currentPosition.lastKnown.latitude, this.currentPosition.lastKnown.longitude], 14);
    } else {
      console.log("centering map on first station")
      const firstStation = this._getFirstStation();
      map.setView([firstStation.latitude, firstStation.longitude], 14);
    }
  }

  _updateBusPosition(map) {
    console.log("updating position");
    return this.gpsService.getScannerAppLocation({
      routeId: this.routeId,
      scheduleId: this.scheduleId,
      date: this.date,
      includeTravelledPath: true
    })
    .then((position) => {
      this.currentPosition = position;
      console.log("currentPosition: ", this.currentPosition);

      if (position.travelledPath) {
        this._addTravelledPathTo(map, position.travelledPath);
      }

      if (position.lastKnown) {
        this.bus.addTo(map, position.lastKnown);
      }

      if (this.autoCenterEnabled) {
        this._centerMap(map);
      }
    });
  }

  _startLiveTracking(map) {
    console.log("starting live tracking")
    if (this.gpsIntervalId) {
      this._stopLiveTracking();
    }

    this.gpsIntervalId = setInterval(() => {
      this._updateBusPosition(map);
    }, 10000);

    return this._updateBusPosition(map);
  }

  _stopLiveTracking() {
    clearInterval(this.gpsIntervalId);
    this.gpsIntervalId = null;
  }

  _removeCenterButton() {
    if (this.centerControl) {
      this.centerControl.remove();
    }
  }

  _addCenterButton(map) {
    console.log("adding center control");
    this._removeCenterButton();

    this.centerControl = L.control.centerButton({
      position: "topleft"
    });
    this.centerControl.addTo(map);
    this.centerControl.getContainer().onclick = () => {
      console.log("user pressed center button");
      this.autoCenterEnabled = true;
      this._centerMap(map);
    };
  }

  addTo(map) {
    console.log("adding trip to map")
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
      })
      .catch((error) => {
        console.log("There was a problem adding trip to map: ", error);
      });
  }

  removeFrom(map) {
    this._stopLiveTracking();
    this._removeCenterButton();
    this._removeStationsFrom(map);
    this._removeTravelledPathFrom(map);
    this._removeBusFrom(map);
  }
}
