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
  logo = document.querySelector(".logo"),
  restaurantHeading = document.querySelector(".restaurant-heading"),
  inputSearch = document.querySelector(".input-search");

let loginVar = localStorage.getItem("gloDelivery");


//Function declarations/expressions go right after variables;

//This is an asynchronous function 
const getData = async function (url) {

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Ошибка по адресу ${url}, cтатус ошибки ${response.status}!`); //Interpolation
  }

  return await response.json();
};

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
function createCardRestaurant({ image, kitchen, name,
  price, products, stars, time_of_delivery: timeOfDelivery }) { //Destructuring

  const card = `
      <a class="card card-restaurant" data-products="${products}" >
          <img src="${image}" alt="${name}" class="card-image" />
          <div class="card-text">
              <div class="card-heading">
                  <h3 class="card-title">${name}</h3>
                  <span class="card-tag tag">${timeOfDelivery}</span>
              </div>
              <div class="card-info">
                  <div class="rating">
                      ${stars}
                  </div>
                  <div class="price">От ${price} ₽</div>
                  <div class="category">${kitchen}</div>
              </div>
          </div>
      </a>`;


  cardsRestaurants.insertAdjacentHTML("beforeend", card);
}


//this function generates dishes for every restaurant card;
function createCardGood({ description, image, name, price }) {

  const card = document.createElement("div");
  card.className = "card";
  card.insertAdjacentHTML("beforeend", ` 
          <img src="${image}" alt="${name}" class="card-image" />
          <div class="card-text">
                <div class="card-heading">
                    <h3 class="card-title card-title-reg">${name}</h3>
                </div>
                <div class="card-info">
                    <div class="ingredients">${description}
                    </div>
                </div>
                <div class="card-buttons">
                    <button class="button button-primary button-add-cart">
                        <span class="button-card-text">В корзину</span>
                        <span class="button-cart-svg"></span>
                    </button>
                    <strong class="card-price-bold">${price} ₽</strong>
          </div>
  `); //insertAdjacentHTML is more effective than innerHTML. Works faster.


  cardsMenu.insertAdjacentElement("beforeend", card);
}

function createRestaurantHeading({ name, stars, price, kitchen }) {
  const headingContent = `
  <h2 class="section-title restaurant-title">${name}</h2>
        <div class="card-info">
            <div class="rating">
               ${stars}
            </div>
            <div class="price">От ${price} ₽</div>
            <div class="category">${kitchen}</div>
        </div>
`;
  restaurantHeading.insertAdjacentHTML('beforeend', headingContent);

}

/*this function opens restaurant dishes after the user clicked on any of them. if they're not logged in, 
they will be asked to log in first*/
function openGoods(event) {

  if (loginVar) {
    const target = event.target;
    const restaurant = target.closest(".card-restaurant"); //this method looks for the closest element with the given name;

    if (restaurant) {
      cardsMenu.textContent = "";
      restaurantHeading.textContent = "";
      containerPromo.classList.add('hide');
      allRestaurants.classList.add('hide');
      menu.classList.remove('hide');
    }

    getData('./db/partners.json').then(function (data) {   //getData for restaurant heading
      let filteredData = data.filter(function (element) {

        if (element.products === restaurant.dataset.products) {

          return true;
        }
        return false;


      });

      createRestaurantHeading(filteredData[0]);
    });

    getData(`./db/${restaurant.dataset.products}`).then(function (data) {
      data.forEach(createCardGood);

    });

  } else {
    toggleModalAuth();
  }

}

function searchFieldProcessing(event) {

  if (event.keyCode === 13) {
    const target = event.target;

    const value = target.value.toLowerCase().trim();

    target.value = "";

    if (!value || value.length < 3) {
      target.style.backgroundColor = "tomato";
      setTimeout(function () {
        target.style.backgroundColor = "";
      }, 2000);
      return;
    }

    const goods = [];

    getData('./db/partners.json').then(function (data) {
      const products = data.map(function (item) {
        return item.products;
      });

      products.forEach(function (product) {
        getData(`./db/${product}`).then(function (data) {
          goods.push(...data); //spread operator

          const searchGoods = goods.filter(function (item) {
            return item.name.toLowerCase().includes(value);
          });

          cardsMenu.textContent = "";
          containerPromo.classList.add('hide');
          allRestaurants.classList.add('hide');
          menu.classList.remove('hide');

          return searchGoods;
        }).then(function (data) {
          data.forEach(createCardGood);
        })
      })

    });

    let resultHeading = `<h2 class="section-title restaurant-title">Результат поиска</h2>`;
    restaurantHeading.insertAdjacentHTML("beforeend", resultHeading);
  }

}



//event listeners are added at the end. They can be put in a general code initialization function;

function init() {
  //"then" processes Promises to give us actual data
  getData('./db/partners.json').then(function (data) {
    data.forEach(createCardRestaurant);
  });

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
    restaurantHeading.textContent = "";


  });

  //this listener registers every click on the close button placed in the error message box;
  closeError.addEventListener("click", function () {
    errorMessage.classList.remove("alert-modal-show");
  });



  //this listener registers when and what user enters in the search box;
  inputSearch.addEventListener("keydown", searchFieldProcessing);

  checkAuth();

  //This is an inicialization code of the slider provided by the Swiper library;
  new Swiper(".swiper-container", {
    loop: true,
    autoplay: {
      delay: 3000
    },
    slidesPerView: 1,
  });
}

init();

