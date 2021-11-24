import {TravelledPath} from "./TravelledPath";
import {Bus} from "./Bus";

export class Trip {
  constructor({tripFromBackend, stationsMap}) {
    this.routeId = tripFromBackend.routeId;
    this.scheduleId = tripFromBackend.scheduleName;
    this.date = tripFromBackend.date;
    this.legs = tripFromBackend.legs;
    this.stationsMap = stationsMap;
    this.travelledPath = null;
  }

  _addStationsTo(map) {
    const keys = this.stationsMap.keys();
    for (let i = 0; i < keys.length; i++) {
      const station = this.stationsMap[keys[i]];
      station.addTo(map);
    }
  }

  _removeStationsFrom(map) {
    const keys = this.stationsMap.keys();
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

  addTo(map, location) {
    this._addStationsTo(map);
    this._addTravelledPathTo(map, location.travelledPath);
    this._addBusTo(map, location.lastKnown);
  }

  removeFrom(map) {
    this._removeStationsFrom(map);
    this._removeTravelledPathFrom(map);
    this._removeBusFrom(map);
  }
}
