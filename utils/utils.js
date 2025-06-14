const saveInLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

const addParamToUrl = (param , value) => {
  const url =  new URL(location.href)
  const searchParam  =  url.searchParams

  searchParam.set(param ,value)
  url.search =  searchParam.toString()

  location.href = url.toString()

}


export { saveInLocalStorage, getFromLocalStorage  ,addParamToUrl};
