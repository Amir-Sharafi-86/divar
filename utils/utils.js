const saveInLocalStorage = (key , value) => {
  localStorage.setItem(key , JSON.stringify(value))
}

const getLocalStorage = (key) => {
 return localStorage.getItem(key)
}

export {
  saveInLocalStorage , 
  getLocalStorage
}
