const saveInLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

const addParamToUrl = (param, value) => {
  const url = new URL(location.href);
  const searchParams = url.searchParams;

  searchParams.set(param, value);
  url.search = searchParams.toString();

  location.href = url.toString();
};

const getUrlParam = (param) => {
  const urlParams = new URLSearchParams(location.search);
  return urlParams.get(param);
};

const removeParamFromUrl = (param) => {
  const url = new URL(location.href);
  url.searchParams.delete(param);
  window.history.replaceState(null, null, url);
  location.reload();
};

const getAndShowCityName = () => {
 let showCityName =  getFromLocalStorage("cities")
 const header_city_title = document.getElementById("header-city-title")
  header_city_title.innerHTML = showCityName[0].name;
}

const calcuteRelativeTimeDifference = (createdAt) => {
  const currentTime = new Date();
  const createdTime = new Date(createdAt);

  const timeDifference = currentTime - createdTime;
  const hours = Math.floor(timeDifference / (60 * 60 * 1000));

  if (hours < 24) {
    return `${hours} ساعت پیش`;
  } else {
    const days = Math.floor(hours / 24);
    return `${days} روز پیش`;
  }
};

const showModal = (id, className) => {
  const element = document.querySelector(`#${id}`);
  element?.classList.add(className);
};

const hideModal = (id, className) => {
  const element = document.querySelector(`#${id}`);
  element?.classList.remove(className);
};

export {
  saveInLocalStorage,
  getFromLocalStorage,
  addParamToUrl,
  getUrlParam,
  calcuteRelativeTimeDifference,
  removeParamFromUrl,
  showModal,
  hideModal,
  getAndShowCityName
};
