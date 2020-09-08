import {
  defaultColor,
  themeColorStorageKey,
  themeRadiusStorageKey,
} from '../constants/defaultValues';






export const getCurrentColor = () => {
  let currentColor = defaultColor;
  try {
    if (localStorage.getItem(themeColorStorageKey)) {
      currentColor = localStorage.getItem(themeColorStorageKey);
    }
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js : getCurrentColor -> error', error);
    currentColor = defaultColor;
  }
  return currentColor;
};

export const setCurrentColor = (color) => {
  try {
    localStorage.setItem(themeColorStorageKey, color);
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js : setCurrentColor -> error', error);
  }
};

export const getCurrentRadius = () => {
  let currentRadius = 'rounded';
  try {
    if (localStorage.getItem(themeRadiusStorageKey)) {
      currentRadius = localStorage.getItem(themeRadiusStorageKey);
    }
  } catch (error) {
    console.log(
      '>>>>: src/helpers/Utils.js : getCurrentRadius -> error',
      error
    );
    currentRadius = 'rounded';
  }
  return currentRadius;
};
export const setCurrentRadius = (radius) => {
  try {
    localStorage.setItem(themeRadiusStorageKey, radius);
  } catch (error) {
    console.log(
      '>>>>: src/helpers/Utils.js : setCurrentRadius -> error',
      error
    );
  }
};



export const getCurrentUser = () => {
  let user = null;
  try {
    user =
      localStorage.getItem('current_user') != null
        ? JSON.parse(localStorage.getItem('current_user'))
        : null;
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js  : getCurrentUser -> error', error);
    user = null;
  }
  return user;
};

export const setCurrentUser = (user) => {
  try {
    if (user) {
      localStorage.setItem('current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('current_user');
    }
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js : setCurrentUser -> error', error);
  }
};

export const capF = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const isExpired = (date, hours) => {
  //true => yes the date is expired
  const d1 = new Date();
  const d2 = new Date(date).addHours(hours);
  if (d1 > d2) {
    if (d1.getTime() > d2.getTime()) {
      return true;
    } else {
      return false;
    }
  } else if (d1.getUTCDate() == d2.getUTCDate()) {
    if (d1.getTime() > d2.getTime()) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

Date.prototype.addHours = function (h) {
  this.setHours(this.getHours() + h);
  return this;
};
