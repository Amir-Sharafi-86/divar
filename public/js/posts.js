import { baseUrl, getPostCategories, getPosts } from "../../utils/shared.js";
import {
  addParamToUrl,
  calcuteRelativeTimeDifference,
  getFromLocalStorage,
  getUrlParam,
  removeParamFromUrl,
} from "../../utils/utils.js";

window.addEventListener("load", () => {
  const categoryID = getUrlParam("categoryID");
  const searchValue = getUrlParam("value");
  const loadingContainer = document.querySelector("#loading-container");

  const cities = getFromLocalStorage("cities");

  let posts = null;
  let backupPosts = null;

  getPosts(cities[0].id).then((response) => {
    loadingContainer.style.display = "none";

    posts = response.data.posts;
    backupPosts = response.data.posts;

    generatePosts(posts);
  });

  const generatePosts = (posts) => {
    const postsContainer = document.querySelector("#posts-container");

    postsContainer.innerHTML = "";

    if (posts.length) {
      posts.forEach((post) => {
        const date = calcuteRelativeTimeDifference(post.createdAt);
        postsContainer.insertAdjacentHTML(
          "beforeend",
          `
            <div class="col-4">
              <a href="post.html/id=${post._id}" class="product-card">
                <div class="product-card__right">
                  <div class="product-card__right-top">
                    <p class="product-card__link">${post.title}</p>
                  </div>
                  <div class="product-card__right-bottom">
                    <span class="product-card__condition">${
                      post.dynamicFields[0]?.data
                    }</span>
                    <span class="product-card__price">
                      ${
                        post.price === 0
                          ? "توافقی"
                          : post.price.toLocaleString() + " تومان"
                      }
                    </span>
                    <span class="product-card__time">${date}</span>
                  </div>
                </div>
                <div class="product-card__left">
                ${
                  post.pics.length
                    ? `
                      <img
                        class="product-card__img img-fluid"
                        src="${baseUrl}/${post.pics[0].path}"
                      />`
                    : `
                      <img
                        class="product-card__img img-fluid"
                        src="/public/images/main/noPicture.PNG"
                      />`
                }
                  
                </div>
              </a>
            </div>
        
          `
        );
      });
    } else {
      postsContainer.innerHTML = '<p class="empty">آگهی یافت نشد</p>';
    }
  };

  window.categoryClickHandler = (categoryID) => {
    addParamToUrl("categoryID", categoryID);
  };

  window.backToAllCategories = () => {
    removeParamFromUrl("categoryID");
  };

  getPostCategories().then((categories) => {
    const categoriesContainer = document.querySelector("#categories-container");
    loadingContainer.style.display = "none";

    categoriesContainer.innerHTML = "";

    if (categoryID) {
      const categoryInfos = categories.filter(
        (category) => category._id === categoryID
      );

      if (!categoryInfos.length) {
        const subCategory = findSubCategoryById(categories, categoryID);

        subCategory?.filters.forEach((filter) => filterGenerator(filter));

        if (subCategory) {
          categoriesContainer.insertAdjacentHTML(
            "beforeend",
            `
                <div class="all-categories" onclick="backToAllCategories()">
                  <p>همه اگهی ها</p>
                  <i class="bi bi-arrow-right"></i>
                </div>
                <div
                  class="sidebar__category-link active-category"
                  href="#"
                  id="category-${subCategory._id}"
                >
                  <div class="sidebar__category-link_details">
                    <i class="sidebar__category-icon bi bi-house"></i>
                    <p>${subCategory.title}</p>
                  </div>
                  <ul class="subCategory-list">
                    ${subCategory.subCategories
                      .map(createSubCategoryHtml)
                      .join("")}
                  </ul>
                </div>
            `
          );
        } else {
          const subSubCategory = findSubSubCategoryById(categories, categoryID);
          const subSubCategoryParent = findSubCategoryById(
            categories,
            subSubCategory.parent
          );

          subSubCategory?.filters.forEach((filter) => filterGenerator(filter));

          categoriesContainer.insertAdjacentHTML(
            "beforeend",
            `
              <div class="all-categories" onclick="backToAllCategories()">
                <p>همه اگهی ها</p>
                <i class="bi bi-arrow-right"></i>
              </div>
              <div class="sidebar__category-link active-category" href="#" onclick="categoryClickHandler('${
                subSubCategoryParent._id
              }')">
                <div class="sidebar__category-link_details">
                  <i class="sidebar__category-icon bi bi-house"></i>
                  <p>${subSubCategoryParent.title}</p>
                </div>
                <ul class="subCategory-list">
                  ${subSubCategoryParent.subCategories
                    .map(createSubCategoryHtml)
                    .join("")}
                </ul>
              </div>
            `
          );
        }
      } else {
        categoryInfos.forEach((category) => {
          categoriesContainer.insertAdjacentHTML(
            "beforeend",
            `
              <div class="all-categories" onclick="backToAllCategories()">
                <p>همه اگهی ها</p>
                <i class="bi bi-arrow-right"></i>
              </div>

              <div class="sidebar__category-link active-category" href="#">
                <div class="sidebar__category-link_details">
                  <i class="sidebar__category-icon bi bi-house"></i>
                  <p>${category.title}</p>
                </div>
                <ul class="subCategory-list">
                  ${category.subCategories.map(createSubCategoryHtml).join("")}
                </ul>
              </div>
          
            `
          );
        });
      }
    } else {
      categories.forEach((category) => {
        categoriesContainer.insertAdjacentHTML(
          "beforeend",
          `
            <div class="sidebar__category-link" id="category-${category._id}">
              <div class="sidebar__category-link_details" onclick="categoryClickHandler('${category._id}')">
                <i class="sidebar__category-icon bi bi-house"></i>
                <p>${category.title}</p>
              </div>
            </div>
          `
        );
      });
    }
  });

  const createSubCategoryHtml = (subCategory) => {
    return `
      <li class="${categoryID === subCategory._id ? "active-subCategory" : ""}"
        onclick="categoryClickHandler('${subCategory._id}')"
      >
        ${subCategory.title}
      </li>
    `;
  };

  const findSubCategoryById = (categories, categoryID) => {
    const allSubCategories = categories.flatMap(
      (category) => category.subCategories
    );

    return allSubCategories.find(
      (subCategory) => subCategory._id === categoryID
    );
  };

  const findSubSubCategoryById = (categories, categoryID) => {
    const allSubCategories = categories.flatMap(
      (category) => category.subCategories
    );

    const allSubSubCategories = allSubCategories.flatMap(
      (subCategory) => subCategory.subCategories
    );

    return allSubSubCategories.find(
      (subSubCategory) => subSubCategory._id === categoryID
    );
  };

  const filterGenerator = (filter) => {
    console.log("Filter ->", filter);
    const sidebarFiltersContainer = document.querySelector("#sidebar-filters");

    sidebarFiltersContainer.insertAdjacentHTML(
      "beforebegin",
      `
        ${
          filter.type === "selectbox"
            ? `
                <div class="accordion accordion-flush" id="accordionFlushExample">
                  <div class="accordion-item">
                    <h2 class="accordion-header">
                      <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#accordion-${filter.slug}"
                        aria-expanded="false"
                        aria-controls="accordion-${filter.name}"
                      >
                        <span class="sidebar__filter-title">${
                          filter.name
                        }</span>
                      </button>
                    </h2>
                    <div
                      id="accordion-${filter.slug}"
                      class="accordion-collapse collapse"
                      aria-labelledby="accordion-${filter.name}"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div class="accordion-body">
                        <select class="selectbox">
                          ${filter.options
                            .sort((a, b) => b - a)
                            .map(
                              (option) =>
                                `<option value='${option}'>${option}</option>`
                            )}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              `
            : ""
        }

        ${
          filter.type === "checkbox"
            ? `
                <div class="sidebar__filter">
                  <label class="switch">
                    <input id="exchange_controll" class="icon-controll" type="checkbox" />
                    <span class="slider round"></span>
                  </label>
                  <p>${filter.name}</p>
                </div>
              `
            : ""
        }
      `
    );
  };

  const removeSearchValueIcon = document.querySelector(
    "#remove-search-value-icon"
  );

  if (searchValue) {
    const searchInput = document.querySelector("#global_search_input");
    searchInput.value = searchValue;
    removeSearchValueIcon.style.display = "block";
  }

  removeSearchValueIcon.addEventListener("click", () => {
    removeParamFromUrl("value");
  });

  const justPhotoController = document.querySelector("#just_photo_controll");
  const exchangeController = document.querySelector("#exchange_controll");
  const min__price__selectbox = document.getElementById("min-price-selectbox")
  const max__price__selectbox = document.getElementById("max-price-selectbox") 

  const applyFilters = (posts) => {
    console.log("Filter");
    let filteredPosts = backupPosts;


    if (justPhotoController.checked) {
      filteredPosts = filteredPosts.filter((post) => post.pics.length);
    }

    if (exchangeController.checked) {
      filteredPosts = filteredPosts.filter((post) => post.exchange);
    }

    //! handle filter price max & min
    const minPrice = min__price__selectbox.value
    const maxPrice = max__price__selectbox.value

    if(minPrice !== "default") {
      if(maxPrice !== "default") {
        filteredPosts = filteredPosts.filter(post => post.price > minPrice && post.price < maxPrice)
      }
    }
    generatePosts(filteredPosts);
  };

  min__price__selectbox.addEventListener("change" , () => {
    applyFilters()
  })
  max__price__selectbox.addEventListener("change" , () => {
    applyFilters()
  })  
  justPhotoController.addEventListener("change", () => {
    applyFilters();
  });

  exchangeController.addEventListener("change", () => {
    applyFilters();
  });
});
