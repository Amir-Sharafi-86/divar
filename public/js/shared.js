import { getAndShowSocials } from "../../utils/shared.js";
import { addParamToUrl } from "../../utils/utils.js";

window.addEventListener("load", () => {
  getAndShowSocials();

  const globalSearchInput = document.querySelector("#global_search_input");

  globalSearchInput?.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      if (event.target.value.trim()) {
        // location.href = `posts.html?value=${event.target.value.trim()}`;
        addParamToUrl("value", event.target.value.trim());
      }
    }
  });
});
