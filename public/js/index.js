import { getAllCities } from "../../utils/shared.js";

window.addEventListener("load", () => {
  const loadingContainer  = document.querySelector ("#loading-container")
  loadingContainer.style.display = 'none'
  getAllCities().then((response) => {
    console.log(response.data.cities);
    
    const popularCitiesContainer = document.querySelector("#popular-cities");
    const searchInput = document.querySelector("#search-input");
    const searchContainer = document.querySelector(".search-result-cities");
    const popularCities = response.data.cities.filter((city) => city.popular);

    searchInput.addEventListener("keyup" , (e) => {
        if(e.target.value.length) {
          searchContainer.classList.add("active")
          const filtredCity =   response.data.cities.filter(city => {
          const searchesValue = searchInput.value 
          return city.name.startsWith(searchesValue)          
          })
          if(filtredCity.length) {
            searchContainer.innerHTML = "" ;
            filtredCity.forEach(item => {
              searchContainer.innerHTML = "" ;
              searchContainer.insertAdjacentHTML("beforeend" , `
                <li>${item.name}</li>
                `)        
            });        
          }
          else {
            searchContainer.innerHTML = "" ;
            searchContainer.insertAdjacentHTML("beforeend" , `
              <li>همچین شهری یافت نشد </li>
              `)
          }
        }
        else {
          searchContainer.classList.remove("active")
        }
        
    })

    popularCities.forEach((city) => {
      popularCitiesContainer.insertAdjacentHTML(
        "beforeend",
    `
        <li class="main__cities-item">
            <p class="main__cities-link">${city.name}</p>
        </li>
      `
      );
    });
  });
});
