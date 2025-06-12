const baseUrl = "https://divarapi.liara.run"

const getAllCities = async () => {
    const res = await fetch(`${baseUrl}/v1/location`)
    const cities = await res.json()

    return cities
}

const getAllSocialMedia = async () => {
    const footer__social__media = document.querySelector("#footer__social-media")

    const res = await  fetch(`${baseUrl}/v1/social`)
    const data = await res.json() ;

    data.data.socials.forEach(social => {
        console.log(social);
        
        footer__social__media.insertAdjacentHTML("beforeend" , `
            <a href="${social.link}" >
              <img src="${social.icon}" alt="">
            
            </a>
            `)
    });    
}

export {
    getAllSocialMedia , 
    baseUrl,
    getAllCities
}