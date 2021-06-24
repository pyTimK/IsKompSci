const setFromLocalStorage = <T>(key: string, value: T) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error.message);
  }
};
export default setFromLocalStorage;
