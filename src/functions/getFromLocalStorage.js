const getFromLocalStorage = (key, fallBackValue = null) => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : fallBackValue;
  } catch (error) {
    console.log(error.message);
    return fallBackValue;
  }
};
export default getFromLocalStorage;
