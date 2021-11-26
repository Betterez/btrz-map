export default {
  onAdd: (map) => {
    const container = L.DomUtil.create("div", "leaflet-bar leaflet-control leaflet-control-center-button");
    // TODO: include icon here or replace img in leaflet-control-center-button
    // const icon = L.DomUtil.create("i", "fa fa-crosshairs");
    container.style.backgroundColor = "white";
    container.style.width = "34px";
    container.style.height = "34px";
    container.style["line-height"] = "30px";

    // container.appendChild(icon);

    return container;
  }
}
