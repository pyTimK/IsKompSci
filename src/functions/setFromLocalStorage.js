const setFromLocalStorage = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error.message);
  }
};
export default setFromLocalStorage;
