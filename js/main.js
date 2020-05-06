"use strict";

const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".close");
const buttonAuth = document.querySelector(".button-auth");
const modalAuth = document.querySelector(".modal-auth");
const buttonCloseAuth = document.querySelector(".close-auth");
const authForm = document.querySelector("#logInForm");
const loginInput = document.querySelector("#login");
const userName = document.querySelector(".user-name");
const buttonOut = document.querySelector(".button-out");
const errorMessage = document.querySelector(".alert-modal");
const closeError = document.querySelector(".close-error");
const cardsRestaurants = document.querySelector(".cards-restaurants");
const containerPromo = document.querySelector(".container-promo");
const allRestaurants = document.querySelector(".restaurants");
const menu = document.querySelector(".menu");
const logo = document.querySelector(".logo");
const cardsMenu = document.querySelector(".cards-menu");

let loginVar = localStorage.getItem("gloDelivery");

function toggleModal() {
  modal.classList.toggle("is-open");
}

function toggleModalAuth() {
  modalAuth.classList.toggle("is-open");
  errorMessage.classList.remove("alert-modal-show");
}


function authorizedUser() {
  console.log("Success");

  function logOut() {
    loginVar = null;
    localStorage.removeItem("gloDelivery");
    buttonAuth.style.display = ""; //empty strings state that the value will be equal to the original css value;
    userName.style.display = "";
    buttonOut.style.display = "";
    buttonOut.removeEventListener("click", logOut);

    checkAuth();
  }

  userName.textContent = loginVar;

  buttonAuth.style.display = "none";
  userName.style.display = "inline";
  buttonOut.style.display = "block";

  buttonOut.addEventListener("click", logOut);
}

function maskInput(string) {
  return string != null && !!string.trim();
}

function notAuthorizedUser() {

  function logIn(event) {
    event.preventDefault();
    loginVar = loginInput.value;
    localStorage.setItem("gloDelivery", loginVar);

    if (maskInput(loginVar)) {
      toggleModalAuth();
      buttonAuth.removeEventListener("click", toggleModalAuth);
      buttonCloseAuth.removeEventListener("click", toggleModalAuth);
      authForm.removeEventListener("submit", logIn);
    } else {
      errorMessage.classList.add("alert-modal-show");
    }

    authForm.reset();
    checkAuth();
  }

  buttonAuth.addEventListener("click", toggleModalAuth);
  buttonCloseAuth.addEventListener("click", toggleModalAuth);
  authForm.addEventListener("submit", logIn);



}

function checkAuth() {
  if (maskInput(loginVar)) {
    authorizedUser();

  } else {

    notAuthorizedUser();

  }

}

function createCardRestaurant() {
  const card = `
      <a class="card card-restaurant">
          <img src="img/tanuki/preview.jpg" alt="image" class="card-image" />
          <div class="card-text">
              <div class="card-heading">
                  <h3 class="card-title">Тануки</h3>
                  <span class="card-tag tag">60 мин</span>
              </div>
              <div class="card-info">
                  <div class="rating">
                      4.5
                  </div>
                  <div class="price">От 1 200 ₽</div>
                  <div class="category">Суши, роллы</div>
              </div>
          </div>
      </a>`;

  cardsRestaurants.insertAdjacentHTML("beforeend", card);
}

function createCardGood() {
  const card = document.createElement("div");
  card.className = "card";
  card.insertAdjacentHTML("beforeend", `   
          <img src="img/pizza-plus/pizza-classic.jpg" alt="image" class="card-image" />
          <div class="card-text">
                <div class="card-heading">
                    <h3 class="card-title card-title-reg">Пицца Классика</h3>
                </div>
                <div class="card-info">
                    <div class="ingredients">Соус томатный, сыр «Моцарелла», сыр «Пармезан», ветчина, салями,
                              грибы.
                    </div>
                </div>
                <div class="card-buttons">
                    <button class="button button-primary button-add-cart">
                        <span class="button-card-text">В корзину</span>
                        <span class="button-cart-svg"></span>
                    </button>
                    <strong class="card-price-bold">510 ₽</strong>
          </div>
  `); //insertAdjacentHTML is more effective than innerHTML. Works faster.

  cardsMenu.insertAdjacentElement("beforeend", card);
}

function openGoods(event) {
 
  if (loginVar) {
    const target = event.target;
    const restaurant = target.closest(".card-restaurant"); //this method looks for the closest element with the given name;

    if (restaurant) {

      cardsMenu.textContent = "";
      containerPromo.classList.add('hide');
      allRestaurants.classList.add('hide');
      menu.classList.remove('hide');



      createCardGood();
      createCardGood();
      createCardGood();
    }
  } else {
    toggleModalAuth();
  }

}



cartButton.addEventListener("click", toggleModal);

closeBtn.addEventListener("click", toggleModal);

cardsRestaurants.addEventListener("click", openGoods);

logo.addEventListener("click", function () {
  containerPromo.classList.remove('hide');
  allRestaurants.classList.remove('hide');
  menu.classList.add('hide');

  
});

closeError.addEventListener("click", function () {
  errorMessage.classList.remove("alert-modal-show");
})



checkAuth();

createCardRestaurant();
createCardRestaurant();
createCardRestaurant();