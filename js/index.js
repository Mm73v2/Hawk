let gamesApiLength = 11; // to limit the data coming from the Api
// toggling the hamburger menu for smaller screens
function toggleMenu() {
  const sideNav = document.querySelector(".side-nav");
  sideNav.classList.toggle("side-nav-active");
  document.querySelector(".fa-bars").classList.toggle("fa-window-close");
}
//displaying games on the main page
async function displayGames(length) {
  const data = await fetchApiData(`games`);
  const gameItems = document.getElementById("game-items");
  data.forEach((game, index) => {
    if (index <= length) {
      const gameItem = document.createElement("div");
      gameItem.classList.add("game-box");
      gameItem.innerHTML = `
        <a href="game-details.html?id=${game.id}"><img src="${
        game.thumbnail
      }" alt="" /></a>
        <div class="game-info">
          <h3>${game.title}</h3>
          <p class="game-type">${game.publisher}</p>
          ${
            game.platform === "PC (Windows)"
              ? `<i class="fab fa-windows" title="Avaiable On Windows"></i>`
              : `<i class="fas fa-window-maximize" title="Avaiable On Browser"></i>`
          }
          <p class="desc">
            ${game.short_description}
          </p>
          <p class="genre">${game.genre}</p>
        </div>
        <button class="game-btn">
        <a href="game-details.html?id=${
          game.id
        }">details <i class="fas fa-info-circle"></i></a>
        </button>
      `;
      gameItems.appendChild(gameItem);
    }
  });
}
// displaying the game details on it's page
async function displayGameDetails() {
  const gameId = window.location.search.split("=")[1];
  const game = await fetchApiData(`game?id=${gameId}`);
  displayOverlay(game.screenshots[0].image);
  const div = document.createElement("div");
  div.classList.add("game-details-container");
  div.innerHTML = `
    <div class="game-details-wrapper">
    <div class="game-short-info">
        <button class="back-btn"><a href="index.html">home page</a> <i class="fas fa-chevron-circle-right"></i></button>
        <img src="${game.thumbnail}" alt="${game.title}" />
        <h3>${game.title}</h3>
        <p>free</p>
        ${
          game.platform === "Windows"
            ? `<i class="fab fa-windows" title="Avaiable On Windows"></i>`
            : `<i class="fas fa-window-maximize" title="Avaiable On Browser"></i>`
        }
      </div>
      <div class="game-long-info">
        <p><span>title:</span> ${game.title}</p>
        <p><span>game url:</span> <a href="${game.game_url}" target="_blanc">${
    game.title
  } official website</a></p>
        <p><span>genre:</span> ${game.genre}</p>
        <p><span>publisher:</span> ${game.publisher}</p>
        <p>
          <span>platfrom:</span> ${game.platform}
          ${
            game.platform === "Windows"
              ? `<i class="fab fa-windows" title="Avaiable On Windows"></i>`
              : `<i class="fas fa-window-maximize" title="Avaiable On Browser"></i>`
          }
        </p>
        <p><span>release date:</span> ${game.release_date}</p>
        <p><span>status:</span> ${game.status}</p>
        <p>
          <span>description:</span> ${game.description}
        </p>
      </div>
    </div>
    <div class="game-pics">
    <img src="${game.screenshots[0].image}" alt="${game.title}" />
    <img src="${game.screenshots[1].image}" alt="${game.title}" />
    <img src="${game.screenshots[2].image}" alt="${game.title}" />
    </div>
  `;

  document.getElementById("game-details").appendChild(div);
}
// the overlay background for the game details page
function displayOverlay(bgPath) {
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  overlay.style.backgroundImage = `url("${bgPath}")`;
  document.querySelector(".game-details-sec").appendChild(overlay);
}
// fetching the data from freetogame Api
async function fetchApiData(endpoint) {
  const url = `https://free-to-play-games-database.p.rapidapi.com/api/${endpoint}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "8e58d655d8mshca824b4f5651e7fp149808jsn0c02bc1ef474",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };
  const res = await fetch(url, options);
  const data = await res.json();
  return data;
}
// to scroll games infinity on the games page
// function infinitScroll() {
//   if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
//     gamesApiLength += 10;
//     displayGames(gamesApiLength);
//   }
//   document.getElementById("top-btn").addEventListener("click", topPage);
// }
// the button that takes you to the top of the page
function topPage() {
  window.scrollTo(0, 0);
}
// to show the modal for the sign up or login
function toggleAuth(el) {
  const loginWrapper = document.getElementById(el);
  loginWrapper.classList.add("modal-pop");
  const layout = document.querySelector(".layout");
  layout.classList.add("modal-pop");
}
// to show either the sign up button or the login button on the main page
function toggleAuthUi(e) {
  if (e.target.id === "signup") {
    toggleAuth("signup-wrapper");
  } else if (e.target.id === "login") {
    toggleAuth("login-wrapper");
  }
}
// to remove the backgroud layout for the modal sign up or login
function removeLayoutAuth() {
  const layout = document.querySelector(".layout");
  layout.classList.remove("modal-pop");
}
// the button that closes the modal for the sign up or the login
function closeAuthBtn(e) {
  if (e.target.classList.contains("close")) {
    e.target.parentElement.classList.remove("modal-pop");
  } else if (e.target.classList.contains("fa-times")) {
    e.target.parentElement.parentElement.classList.remove("modal-pop");
  }
  removeLayoutAuth();
}
// the buttons that switches from login and sign up viceversa from inside the modal itself
function signupInside(e) {
  e.target.parentElement.parentElement.parentElement.classList.remove(
    "modal-pop"
  );
  removeLayoutAuth();
  toggleAuth("signup-wrapper");
}

function loginInside(e) {
  e.target.parentElement.parentElement.parentElement.classList.remove(
    "modal-pop"
  );
  removeLayoutAuth();
  toggleAuth("login-wrapper");
}
// function to start the whole applictaion
function init() {
  switch (window.location.pathname) {
    case "/index.html":
    case "/":
      displayGames(gamesApiLength);
      document
        .querySelector(".landing-btns")
        .addEventListener("click", toggleAuthUi);
      document
        .getElementById("close-signup")
        .addEventListener("click", closeAuthBtn);
      document
        .getElementById("close-login")
        .addEventListener("click", closeAuthBtn);
      document
        .getElementById("signup-opt")
        .addEventListener("click", signupInside);
      document
        .getElementById("login-opt")
        .addEventListener("click", loginInside);
      break;
    case "/game-details.html":
      displayGameDetails();
      break;
    default:
      break;
  }
}

document.querySelector(".ham-menu").addEventListener("click", toggleMenu);
document.addEventListener("DOMContentLoaded", init());
export { displayGames, fetchApiData, topPage };
