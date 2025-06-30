import { getAndShowSocials } from "../../utils/shared.js";
import { addParamToUrl } from "../../utils/utils.js";

window.addEventListener("load", () => {
  getAndShowSocials();

  const globalSearchInput = document.querySelector("#global_search_input");
  const header__searchbar__dropdown = document.querySelector("#header__searchbar-dropdown")
  const overlay = document.querySelector(".searchbar__modal-overlay")
  console.log(overlay);
  
  globalSearchInput?.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      if (event.target.value.trim()) {
        // location.href = `posts.html?value=${event.target.value.trim()}`;
        addParamToUrl("value", event.target.value.trim());
      }
    }
  });

  globalSearchInput.addEventListener("click" , () => {
    header__searchbar__dropdown.classList.add("header__searchbar-dropdown--active")
  })
  overlay?.addEventListener("click" , () => {
    header__searchbar__dropdown.classList.remove("header__searchbar-dropdown--active")
  })
});
