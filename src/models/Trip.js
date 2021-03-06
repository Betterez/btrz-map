/**
 * Class representing a Betterez Trip. It exposes the following props for convenience:
 *
 * routeId,
 *
 * scheduleId,
 *
 * scheduleName,
 *
 * departureTimestamp - The departure date and time in ISO 8601 date-time format,
 *
 * stations - List of [stations]{@link Station} for the trip
 */
import {validateCoordinates} from "../utils/utils";

export class Trip {
  constructor({tripFromBackend, stations, bus, travelledPath, gpsService, markerProvider}) {
    this.routeId = tripFromBackend.routeId;
    this.scheduleId = tripFromBackend.scheduleName;
    this.scheduleName = tripFromBackend.scheduleDisplayName;
    this.departureTimestamp = tripFromBackend.legs[0].departureTimestamp;
    this.date = tripFromBackend.date;
    this.stations = stations;
    this.travelledPath = null;
    this.gpsIntervalId = null;
    this.gpsService = gpsService;
    this.centerControl = null;
    this.autoCenterEnabled =  true;
    this.discardMovement = false;
    this.bus = bus;
    this.travelledPath = travelledPath;
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

  _removeTravelledPathFrom(map) {
    if (this.travelledPath) {
      this.travelledPath.removeFrom(map);
    }
  }

  _removeBusFrom(map) {
    this.bus.removeFrom(map);
  }

  _getFirstStation() {
    return this.stations[0];
  }

  _discardMovement() {
    this.discardMovement = true;
    setTimeout(() => this.discardMovement = false, 5000);
  }

  _centerMap(map) {
    this._discardMovement();
    let centerPoint = null;
    if (this.currentPosition && this.currentPosition.lastKnown) {
      console.log("centering map on current position")
      centerPoint = {
        latitude: this.currentPosition.lastKnown.latitude,
        longitude: this.currentPosition.lastKnown.longitude
      }
    } else {
      console.log("centering map on first station")
      const firstStation = this._getFirstStation();
      centerPoint = {
        latitude: firstStation.latitude,
        longitude: firstStation.longitude
      }
    }

    try {
      validateCoordinates(centerPoint);
      map.setView([centerPoint.latitude, centerPoint.longitude], 14);
    } catch(error) {
      console.log("Couldn't center map because: ", error);
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
        this.travelledPath.addTo(map, position.travelledPath);
      }

      if (position.lastKnown) {
        console.log("adding bus")
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
      console.log("interval running")
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

    this.centerControl = this.markerProvider.getCenterControl();
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
