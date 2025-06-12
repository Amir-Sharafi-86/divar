const saveInLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}

const getFromLocalStorage = (key) => {
    return localStorage.getItem(key)
}

export {
    saveInLocalStorage,
    getFromLocalStorage
}