import "./center-button.css";

export default {
  onAdd: (map) => {
    const container = L.DomUtil.create("div", "leaflet-bar leaflet-control leaflet-control-center-button");
    container.style.width = "30px";
    container.style.height = "30px";
    container.style["line-height"] = "30px";

    return container;
  }
}
