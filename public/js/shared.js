import { getAndShowSocials } from "../../utils/shared.js";

window.addEventListener("load", () => {
  getAndShowSocials();
  
  
  
    const global_search_input = document.getElementById("global_search_input")
    console.log(global_search_input);
    global_search_input?.addEventListener("keyup" , (e) => {
        if(e.keyCode === 13)  {
          e.preventDefault() ;
          location.href = "posts.html"
          location.href = `posts.html?value=${e.target.value}`   
        }
    })

});
