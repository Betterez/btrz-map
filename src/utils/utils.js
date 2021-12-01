export function getUserLang() {
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
