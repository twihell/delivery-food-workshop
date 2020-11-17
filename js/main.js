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
  inputSearch = document.querySelector(".input-search"),
  cartContainer = document.querySelector(".modal-body"),
  modalPrice = document.querySelector(".modal-pricetag"),
  buttonClearCart = document.querySelector(".clear-cart");


// let loginVar = localStorage.getItem("gloDelivery");

// const cart = [];

// //Function declarations/expressions go right after variables;
// const saveCartData = () => {
//   localStorage.setItem(loginVar, JSON.stringify(cart));
// }

// const loadCart = () => {
//   if (localStorage.getItem(loginVar)) {
//     let fromStorage = localStorage.getItem(loginVar);
//     JSON.parse(fromStorage).forEach(item => cart.push(item));
//   }
// }


// //This is an asynchronous function 
// const getData = async (url) => {

//   const response = await fetch(url);

//   if (!response.ok) {
//     throw new Error(`Ошибка по адресу ${url}, cтатус ошибки ${response.status}!`); //Interpolation
//   }

//   return await response.json();
// };

// //This function validates whether login name is correct via regular expression;
// const valid = (str) => {
//   if (str != null) {
//     const nameReg = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/; /*login should be min 2, max 20 symbols; it can contain
//   capital and lowercase letters, numbers, first symbol must be a letter; */
//     return nameReg.test(str);
//   } else {
//     return false;
//   }
// };


// //This function checks whether modal login window is open. If it's open, error box can be shown and vice versa.
// const toggleModalAuth = () => {
//   modalAuth.classList.toggle("is-open");
//   errorMessage.classList.remove("alert-modal-show");
// }

// /*This finction logs user out from the website if the logout button is clicked; 
// in other cases, userName is shown near the logout button;*/
// const authorizedUser = () => {

//   const logOut = () => {
//     cart.length = 0;
//     localStorage.removeItem(loginVar);
//     localStorage.removeItem("gloDelivery");
//     buttonAuth.style.display = ""; //empty strings state that the value will be equal to the original css value;
//     userName.style.display = "";
//     buttonOut.style.display = "";
//     cartButton.style.display = "";
//     buttonOut.removeEventListener("click", logOut);
//     loginVar = null;
//     checkAuth();

//   }

//   userName.textContent = loginVar;

//   buttonAuth.style.display = "none";
//   userName.style.display = "inline";
//   buttonOut.style.display = "flex";
//   cartButton.style.display = "flex";
//   loadCart();

//   buttonOut.addEventListener("click", logOut);

// }

// //this function logs user in after they click the login button;
// const notAuthorizedUser = () => {

//   const logIn = (event) => {
//     event.preventDefault();
//     loginVar = loginInput.value.trim();
//     localStorage.setItem("gloDelivery", loginVar);

//     if (valid(loginVar)) {
//       toggleModalAuth();
//       buttonAuth.removeEventListener("click", toggleModalAuth);
//       buttonCloseAuth.removeEventListener("click", toggleModalAuth);
//       authForm.removeEventListener("submit", logIn);
//     } else {
//       errorMessage.classList.add("alert-modal-show");
//       loginInput.value = "";
//     }

//     authForm.reset();
//     checkAuth();
//   }

//   buttonAuth.addEventListener("click", toggleModalAuth);
//   buttonCloseAuth.addEventListener("click", toggleModalAuth);
//   authForm.addEventListener("submit", logIn);
// }

// //this function checks whether the user is logged in or not;
// const checkAuth = () => {
//   valid(loginVar) ? authorizedUser() : notAuthorizedUser();
// }

class Cart {
  constructor(cart = []) {
    this.cart = cart;
  }

  addItems(item) {
    let currentItem = this.findItem(item.id);
    if (currentItem) {
      currentItem.count++;
    } else {
      this.cart.push(item);
    }
  }

  findItem(id) {
    return this.cart.find(item => {
      return item.id === id;
    })
  }

  getItems() {
    return [...this.cart];
  }

  clear() {
    this.cart.length = 0;
  }

  reduceItem(itemId) {
    let currentItem = this.findItem(itemId);
    if (currentItem.count > 1) {

      currentItem.count--;
    } else {
      this.cart.splice(this.cart.indexOf(currentItem), 1);
    }

  }

  incrementItem(itemId) {
    let currentItem = this.findItem(itemId);
    currentItem.count++;
  }


}

let cart = new Cart();

class DataStorage {
  loginVar = localStorage.getItem("gloDelivery");

  saveCartData(cart) {
    localStorage.setItem(this.loginVar, JSON.stringify(cart.getItems()));
  }

  loadCart(cart) {
    if (localStorage.getItem(this.loginVar)) {

      let fromStorage = localStorage.getItem(this.loginVar);
      JSON.parse(fromStorage).forEach(item => cart.addItems(item));
    }
  }

  removeCartData() {
    localStorage.removeItem("gloDelivery");
  }

  removeLoginData() {
    localStorage.removeItem(this.loginVar);
    this.loginVar = null;
  }

}


class UserAuthentication extends DataStorage {

  isValid(str) {
    if (str != null) {
      const nameReg = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/; /*login should be min 2, max 20 symbols; it can contain
      capital and lowercase letters, numbers, first symbol must be a letter; */
      return nameReg.test(str);
    } else {
      return false;
    }
  }

  authorizedUserHandle() {

    const logOut = () => {

      cart.length = 0;
      buttonAuth.style.display = ""; //empty strings state that the value will be equal to the original css value;
      userName.style.display = "";
      buttonOut.style.display = "";
      cartButton.style.display = "";
      buttonOut.removeEventListener("click", logOut);
      this.removeLoginData();
      this.removeCartData();
      this.checkAuth();

    }

    userName.textContent = this.loginVar;

    buttonAuth.style.display = "none";
    userName.style.display = "inline";
    buttonOut.style.display = "flex";
    cartButton.style.display = "flex";
    this.loadCart(cart);

    buttonOut.addEventListener("click", logOut);

  }


  //this function logs user in after they click the login button;
  notAuthorizedUserHandle() {

    const logIn = (event) => {

      event.preventDefault();
      this.loginVar = loginInput.value.trim();
      localStorage.setItem("gloDelivery", this.loginVar);

      if (this.isValid(this.loginVar)) {

        toggleModalAuth();
        buttonAuth.removeEventListener("click", toggleModalAuth);
        buttonCloseAuth.removeEventListener("click", toggleModalAuth);
        authForm.removeEventListener("submit", logIn);
      } else {
        console.log('does not work')
        errorMessage.classList.add("alert-modal-show");
        loginInput.value = "";
      }

      authForm.reset();
      this.checkAuth();
    }

    buttonAuth.addEventListener("click", toggleModalAuth);
    buttonCloseAuth.addEventListener("click", toggleModalAuth);
    authForm.addEventListener("submit", logIn);

  }

  //this function checks whether the user is logged in or not;
  checkAuth() {
    this.isValid(this.loginVar) ? this.authorizedUserHandle() : this.notAuthorizedUserHandle();
  }

}

let userAuthentication = new UserAuthentication();


//This function checks whether modal window for cart checkout is opened or closed.
const toggleModal = () => {
  modal.classList.toggle("is-open");
}

const toggleModalAuth = () => {
  modalAuth.classList.toggle("is-open");
  errorMessage.classList.remove("alert-modal-show");
};

//This is an asynchronous function 
const getData = async (url) => {

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Ошибка по адресу ${url}, cтатус ошибки ${response.status}!`); //Interpolation
  }

  return await response.json();
};

//this function generates an html card with a restaurant on the main page;
const createCardRestaurant = ({ image, kitchen, name,
  price, products, stars, time_of_delivery: timeOfDelivery }) => { //Destructuring

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

const renderCart = () => {
  cartContainer.textContent = "";
  let cartOfItems = cart.getItems();
  cartOfItems.forEach(({ id, cost, title, count }) => {

    const itemCart = `
          <div class="food-row">
              <span class="food-name">${title}</span>
              <strong class="food-price">${cost}</strong>
              <div class="food-counter">
                    <button class="counter-button counter-minus" data-id="${id}">-</button>
                    <span class="counter">${count}</span>
                    <button class="counter-button counter-plus" data-id="${id}">+</button>
              </div>
          </div>
          `;

    cartContainer.insertAdjacentHTML("afterbegin", itemCart);

  })



  const totalPrice = cartOfItems.reduce((result, item) => {
    return result + (parseFloat(item.cost) * item.count);

  }, 0);

  modalPrice.textContent = totalPrice + " ₽";
}


//this function generates dishes for every restaurant card;
const createCardGood = ({ description, image, name, price, id }) => {

  const card = document.createElement("div");
  card.className = "card";
  card.id = id;
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
                    <strong class="card-price card-price-bold">${price} ₽</strong>
          </div>
  `); //insertAdjacentHTML is more effective than innerHTML. Works faster.


  cardsMenu.insertAdjacentElement("beforeend", card);
}

const createRestaurantHeading = ({ name, stars, price, kitchen }) => {
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
const openGoods = (event) => {

  if (userAuthentication.loginVar) {
    const target = event.target;
    const restaurant = target.closest(".card-restaurant"); //this method looks for the closest element with the given name;

    if (restaurant) {
      cardsMenu.textContent = "";
      restaurantHeading.textContent = "";
      containerPromo.classList.add('hide');
      allRestaurants.classList.add('hide');
      menu.classList.remove('hide');
    }

    getData('./db/partners.json').then(data => {   //getData for restaurant heading
      let filteredData = data.filter(element => {

        if (element.products === restaurant.dataset.products) {

          return true;
        }
        return false;
      });

      createRestaurantHeading(filteredData[0]);
    });

    getData(`./db/${restaurant.dataset.products}`).then(data => {
      data.forEach(createCardGood);
    });

  } else {
    userAuthentication.toggleModalAuth();
  }

}

const searchFieldProcessing = (event) => {

  if (event.keyCode === 13) {
    const target = event.target;
    const value = target.value.toLowerCase().trim();
    target.value = "";

    if (!value || value.length < 3) {
      target.style.backgroundColor = "tomato";
      setTimeout(() => {
        target.style.backgroundColor = "";
      }, 2000);
      return;
    }

    const goods = [];

    getData('./db/partners.json').then(data => {
      const products = data.map(item => {
        return item.products;
      });

      products.forEach(product => {
        getData(`./db/${product}`).then(data => {
          goods.push(...data); //spread operator

          const searchGoods = goods.filter(item => {
            return item.name.toLowerCase().includes(value);
          });

          cardsMenu.textContent = "";
          containerPromo.classList.add('hide');
          allRestaurants.classList.add('hide');
          menu.classList.remove('hide');

          return searchGoods;
        }).then(data => {
          data.forEach(createCardGood);
        })
      })

    });

    let resultHeading = `<h2 class="section-title restaurant-title">Результат поиска</h2>`;
    restaurantHeading.insertAdjacentHTML("beforeend", resultHeading);
  }

}

const addToCart = (event) => {
  const target = event.target;

  const buttonAddToCart = target.closest(".button-add-cart");

  if (buttonAddToCart) {
    const card = target.closest(".card");
    const title = card.querySelector(".card-title-reg").textContent;
    const cost = card.querySelector(".card-price").textContent;
    const cardId = card.id;
    cart.findItem(cardId);

    cart.addItems({ id: cardId, cost, title, count: 1 });

  }
  userAuthentication.saveCartData(cart);
}

const changeCount = (event) => {
  const target = event.target;

  if (target.classList.contains("counter-button")) {
    let dataId = target.dataset.id;

    if (target.classList.contains("counter-minus")) {
      cart.reduceItem(dataId);
    }

    if (target.classList.contains("counter-plus")) cart.incrementItem(dataId);


    renderCart();
  }
  userAuthentication.saveCartData(cart);
}

//event listeners are added at the end. They can be put in a general code initialization function;

const init = () => {
  //"then" processes Promises to give us actual data
  getData('./db/partners.json').then(data => {
    data.forEach(createCardRestaurant);
  });

  //this event listener registers every click on a cart button;
  cartButton.addEventListener("click", renderCart);

  cartButton.addEventListener("click", toggleModal);

  //this event listener registers every click on the close button of the card modal window;
  closeBtn.addEventListener("click", toggleModal);

  //this listener registers every click on any of the restaurant cards;
  cardsRestaurants.addEventListener("click", openGoods);

  //this listener registers "+" and "-" button clicks within shopping cart
  cartContainer.addEventListener("click", changeCount);

  buttonClearCart.addEventListener("click", () => {
    cart.clear()
    renderCart();
  });

  //this listener registers every click on the logo of the website;
  logo.addEventListener("click", () => {
    containerPromo.classList.remove('hide');
    allRestaurants.classList.remove('hide');
    menu.classList.add('hide');
    restaurantHeading.textContent = "";
  });

  /*this listener registers every click within menu container of the website
   to check whether cart button was clicked;*/
  cardsMenu.addEventListener("click", addToCart);

  //this listener registers every click on the close button placed in the error message box;
  closeError.addEventListener("click", () => {
    errorMessage.classList.remove("alert-modal-show");
  });

  //this listener registers when and what user enters in the search box;
  inputSearch.addEventListener("keydown", searchFieldProcessing);

  userAuthentication.checkAuth();

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


