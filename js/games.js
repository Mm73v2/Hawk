import { displayGames, fetchApiData, topPage } from "./index.js";

let gamesApiLength = 11; // to limit the data coming from the Api
function infinitScroll() {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    gamesApiLength += 10;
    displayGames(gamesApiLength);
  }
  document.getElementById("top-btn").addEventListener("click", topPage);
}

window.addEventListener("scroll", infinitScroll);

console.log(displayGames());
