import L from "leaflet";
import CenterButtonDef from "./centerButton/CenterButton";

export function registerCustomControls() {
  if (!L.Control.CenterButton) {
    L.Control.CenterButton = L.Control.extend(CenterButtonDef);

    L.control.centerButton = (opts) => {
      return new L.Control.CenterButton(opts);
    };
  }
}
