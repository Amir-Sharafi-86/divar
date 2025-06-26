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
  const getUrl = new URLSearchParams(location.search)
  return  getUrl.get(param)
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

export {
  saveInLocalStorage,
  getFromLocalStorage,
  addParamToUrl,
  calcuteRelativeTimeDifference,
  getUrlParam
};
