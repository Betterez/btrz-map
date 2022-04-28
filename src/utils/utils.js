export function getUserLang(navigator) {
  if (!navigator) {
    return null;
  }

  return navigator.languages
    ? navigator.languages[0]
    : (navigator.language || navigator.userLanguage);
}

export function timeWithZero(time) {
  if (time < 10) {
    return "0" + time;
  }

  return "" + time;
};

export function validateCoordinates({latitude, longitude}) {
  if (Number.isNaN(parseFloat(latitude)) || latitude < -90 || latitude > 90) {
    throw new Error(`${latitude} is not a valid latitude. Should be between -90 and 90`);
  }

  if (Number.isNaN(parseFloat(longitude)) || longitude < -180 || longitude > 180) {
    throw new Error(`${longitude} is not a valid longitude. Should be between -180 and 180`);
  }
}

const Utils = {
  getUserLang,
  timeWithZero,
  validateCoordinates
};

export default Utils;
