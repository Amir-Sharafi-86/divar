const baseUrl = "https://divarapi.liara.run";

const getAllCities = async () => {
  const res = await fetch(`${baseUrl}/v1/location`);
  const cities = await res.json();

  return cities;
};

const getAndShowSocials = async () => {
  const socialMediaContainer = document.querySelector("#footer__social-media");
  const res = await fetch(`${baseUrl}/v1/social`);
  const socialsResponse = await res.json();

  socialsResponse.data.socials.forEach((social) => {
    socialMediaContainer.insertAdjacentHTML(
      "beforeend",
      `
        <a href="${social.link}" class="sidebar__icon-link">
            <img width="18px" height="18px" alt="${social.name}" src="${social.icon}" class="sidebar__icon bi bi-twitter" />
        </a>
      `
    );
  });
};

export { baseUrl, getAllCities, getAndShowSocials };
