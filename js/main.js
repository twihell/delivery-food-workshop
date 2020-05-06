"use strict"; //strict mode that checks whether js syntax rules are followed properly;

//all variables needed for the code work are created at the very beginning of the js document;
const cartButton = document.querySelector("#cart-button"),
modal = document.querySelector(".modal"),
closeBtn = document.querySelector(".close"),
buttonAuth = document.querySelector(".button-auth"),
modalAuth = document.querySelector(".modal-auth"),
buttonCloseAuth = document.querySelector(".close-auth"),
authForm = document.querySelector("#logInForm"),
loginInput = document.querySelector("#login"),
userName = document.querySelector(".user-name"),
buttonOut = document.querySelector(".button-out"),
errorMessage = document.querySelector(".alert-modal"),
closeError = document.querySelector(".close-error"),
cardsRestaurants = document.querySelector(".cards-restaurants"),
containerPromo = document.querySelector(".container-promo"),
menu = document.querySelector(".menu"),
allRestaurants = document.querySelector(".restaurants"),
cardsMenu = document.querySelector(".cards-menu"),
logo = document.querySelector(".logo");

let loginVar = localStorage.getItem("gloDelivery");


//Function declarations/expressions go right after variables;

//This function validates whether login name is correct via regular expression;
const valid = function (str) {
  if (str != null) {
    const nameReg = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/; /*login should be min 2, max 20 symbols; it can contain
  capital and lowercase letters, numbers, first symbol must be a letter; */
    return nameReg.test(str);
  } else {
    return false;
  }
};

//This function checks whether modal window for cart checkout is opened or closed.
function toggleModal() {
  modal.classList.toggle("is-open");
}

//This function checks whether modal login window is open. If it's open, error box can be shown and vice versa.
function toggleModalAuth() {
  modalAuth.classList.toggle("is-open");
  errorMessage.classList.remove("alert-modal-show");
}

/*This finction logs user out from the website if the logout button is clicked; 
in other cases, userName is shown near the logout button;*/
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

//this function logs user in after they click the login button;
function notAuthorizedUser() {

  function logIn(event) {
    event.preventDefault();
    loginVar = loginInput.value.trim();
    localStorage.setItem("gloDelivery", loginVar);

    if (valid(loginVar)) {
      toggleModalAuth();
      buttonAuth.removeEventListener("click", toggleModalAuth);
      buttonCloseAuth.removeEventListener("click", toggleModalAuth);
      authForm.removeEventListener("submit", logIn);
    } else {
      errorMessage.classList.add("alert-modal-show");
      loginInput.value = "";
    }

    authForm.reset();
    checkAuth();
  }

  buttonAuth.addEventListener("click", toggleModalAuth);
  buttonCloseAuth.addEventListener("click", toggleModalAuth);
  authForm.addEventListener("submit", logIn);



}

//this function checks whether the user is logged in or not;
function checkAuth() {
  if (valid(loginVar)) {
    authorizedUser();

  } else {

    notAuthorizedUser();

  }

}

//this function generates an html card with a restaurant on the main page;
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

//this function generates dishes for every restaurant card;
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

/*this function opens restaurant dishes after the user clicked on any of them. if they're not logged in, 
they will be asked to log in first*/
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

//event listeners are added after all function declarations/expressions;

//this event listener registers every clieck on a cart button;
cartButton.addEventListener("click", toggleModal);

//this event listener registers every click on the close button of the card modal window;
closeBtn.addEventListener("click", toggleModal);

//this listener registers every click on any of the restaurant cards;
cardsRestaurants.addEventListener("click", openGoods);

//this listener registers every click on the logo of the website;
logo.addEventListener("click", function () {
  containerPromo.classList.remove('hide');
  allRestaurants.classList.remove('hide');
  menu.classList.add('hide');


});

//this listener registers every click on the close button placed in the error message box;
closeError.addEventListener("click", function () {
  errorMessage.classList.remove("alert-modal-show");
})

//the last elements in the js focument are function callbacks;


checkAuth();

createCardRestaurant();
createCardRestaurant();
createCardRestaurant();

//This is an inicialization code of the slider provided by the Swiper library;
new Swiper(".swiper-container", {
  loop: true,
  autoplay: {
    delay: 3000
  },
  slidesPerView: 1,
});