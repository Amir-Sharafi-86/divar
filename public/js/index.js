import { getAllCities } from "../../utils/shared.js";

window.addEventListener("load", () => {
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
