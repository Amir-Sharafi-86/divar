const baseUrl = "https://divarapi.liara.run"

const getAllCities = async () => {
    const res = await fetch(`${baseUrl}/v1/location`)
    const cities = await res.json()

    return cities
}

export {
    baseUrl,
    getAllCities
}