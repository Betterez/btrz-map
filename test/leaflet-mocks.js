const map = {
  on: () => {},
  setView: () => {},
};

const marker = {
  addTo: () => {},
  removeFrom: () => {},
  setLatLng: () => {},
  bindPopup: () => {},
};

const polyline = {
  addTo: () => {},
  removeFrom: () => {},
  setLatLngs: () => {},
};

const control = {
  addTo: () => {},
  remove: () => {},
  getContainer: () => {
    return {
      onclick: () => {}
    };
  },
};

module.exports = {
  map,
  marker,
  polyline,
  control
}

