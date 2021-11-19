import L from "leaflet";

export function init({id}) {
  if (!L) {
    console.log("leaftlet dependency is missing!");
    return;
  }

  console.log("btrz-map ready");
}
