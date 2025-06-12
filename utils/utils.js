const saveInLocalStorage = (key , value) => {
  localStorage.setItem(key , JSON.stringify(value))
}

const getLocalStorage = (key) => {
  localStorage.getItem(key)
}

export {
  saveInLocalStorage , 
  getLocalStorage
}
