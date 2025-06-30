import {
  getAndShowHeaderCityLocation,
  getAndShowSocials,
} from "../../utils/shared.js";
import {
  addParamToUrl,
  getFromLocalStorage,
  getUrlParam,
  hideModal,
  showModal,
} from "../../utils/utils.js";

window.addEventListener("load", () => {
  getAndShowSocials();
  getAndShowHeaderCityLocation();

  let selectedCities = [];

  const globalSearchInput = document.querySelector("#global_search_input");
  const mostSearchedContainer = document.querySelector("#most_searched");
  const headerCity = document.querySelector(".header__city");
  const deleteAllSelectedCities = document.querySelector("#delete-all-cities");

  const searchbarModalOverlay = document.querySelector(
    ".searchbar__modal-overlay"
  );

  const mostSearchKeyWords = ["ماشین", "ساعت", "موبایل", "لپ تاپ", "تلویزیون"];

  globalSearchInput?.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      if (event.target.value.trim()) {
        // location.href = `posts.html?value=${event.target.value.trim()}`;
        addParamToUrl("value", event.target.value.trim());
      }
    }
  });

  mostSearchKeyWords.forEach((keyword) => {
    const categoryID = getUrlParam("categoryID");

    let href = `posts.html?value=${keyword}${
      categoryID ? `&categoryID=${categoryID}` : ""
    }`;

    mostSearchedContainer.insertAdjacentHTML(
      "beforeend",
      `
        <li class="header__searchbar-dropdown-item">
          <a href="${href}" class="header__searchbar-dropdown-link">${keyword}</a>
        </li>
      `
    );
  });

  headerCity?.addEventListener("click", () => {
    showModal("city-modal", "city-modal--active");
    const cities = getFromLocalStorage("cities");
    selectedCities = cities;
    deleteAllSelectedCities.style.display = "block";

    addCityToModal(selectedCities);
  });

  const addCityToModal = (cities) => {
    const citySelected = document.querySelector("#city-selected");

    cities.forEach((city) => {
      citySelected.insertAdjacentHTML(
        "beforeend",
        `
          <div>${city.title}</div>
        `
      );
    });
  };

  globalSearchInput?.addEventListener("click", () => {
    showModal(
      "header__searchbar-dropdown",
      "header__searchbar-dropdown--active"
    );
  });

  searchbarModalOverlay?.addEventListener("click", () => {
    hideModal(
      "header__searchbar-dropdown",
      "header__searchbar-dropdown--active"
    );
  });
});
