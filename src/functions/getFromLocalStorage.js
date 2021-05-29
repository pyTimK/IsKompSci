const getFromLocalStorage = (key, fallBackValue = null) => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : fallBackValue;
  } catch (error) {
    console.log(error);
    return fallBackValue;
  }
};
export default getFromLocalStorage;
