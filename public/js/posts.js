import { getPosts } from "../../utils/shared.js";
import { getFromLocalStorage } from "../../utils/utils.js";

window.addEventListener("load", () => {
  const loadingContainer = document.querySelector("#loading-container");
  const postsContainer= document.querySelector("#posts-container");

  const cities = getFromLocalStorage("cities");
  
  getPosts(cities[0].id).then((response) => {
    console.log(response.data.posts);
    
    loadingContainer.style.display = "none";
    
    response.data.posts.forEach(post => {
      postsContainer.insertAdjacentHTML("beforeend" , `
        
        `)
    });
    
    

  });


});
