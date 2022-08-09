export const setItem = (name, value) => {
  window.localStorage.setItem(name, JSON.stringify(value));
};

export const getItem = (name) => {
  try {
    return JSON.parse(window.localStorage.getItem(name));
  } catch (error) {
    console.log('error: ', error);
    return null;
  }
};

export const removeItem = (name) => {
  window.localStorage.removeItem(name);
};
