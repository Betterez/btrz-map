import {TravelledPath} from "./TravelledPath";
import {Bus} from "./Bus";

export class Trip {
  constructor({routeId, scheduleId, date, stations}) {
    this.routeId = routeId;
    this.scheduleId = scheduleId;
    this.date = date;
    this.stations = stations;
    this.travelledPath = null;
  }

  _addStationsTo(map) {
    for (let i = 0; i < this.stations.length; i++) {
      const station = this.stations[i];
      station.addTo(map);
    }
  }

  _removeStationsFrom(map) {
    for (let i = 0; i < this.stations.length; i++) {
      const station = this.stations[i];
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
