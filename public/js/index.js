import { getAllCities } from "../../utils/shared.js";

window.addEventListener("load", () => {
  const loadingContainer  = document.querySelector ("#loading-container")
  loadingContainer.style.display = 'none'
  getAllCities().then((response) => {
    const popularCitiesContainer = document.querySelector("#popular-cities");
    const popularCities = response.data.cities.filter((city) => city.popular);

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
