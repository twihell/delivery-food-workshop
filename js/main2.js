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


class DataStorage {
    loginVar = localStorage.getItem("gloDelivery");

    constructor(cart = []) {
        this.cart = cart;
    }

    saveCartData() {
        localStorage.setItem(this.loginVar, JSON.stringify(this.cart));
    }

    loadCart() {
        if (localStorage.getItem(this.loginVar)) {
            let fromStorage = localStorage.getItem(this.loginVar);
            JSON.parse(fromStorage).forEach(item => this.cart.push(item));
        }
    }

    removeCartData() {
        localStorage.removeItem("gloDelivery");
    }

    removeLoginData() {
        localStorage.removeItem(this.loginVar);
    }

}


class UserAuthentication extends DataStorage {

    authorizedUserHandle() {

        const logOut = () => {
            this.cart.length = 0;
            buttonAuth.style.display = ""; //empty strings state that the value will be equal to the original css value;
            userName.style.display = "";
            buttonOut.style.display = "";
            cartButton.style.display = "";
            buttonOut.removeEventListener("click", logOut);
            this.loginVar = null;
            this.checkAuth();

        }

        userName.textContent = this.loginVar;

        buttonAuth.style.display = "none";
        userName.style.display = "inline";
        buttonOut.style.display = "flex";
        cartButton.style.display = "flex";
        this.loadCart();

        buttonOut.addEventListener("click", logOut);

    }

    isValid(str) {
        if (str != null) {
            const nameReg = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/; /*login should be min 2, max 20 symbols; it can contain
        capital and lowercase letters, numbers, first symbol must be a letter; */
            return nameReg.test(str);
        } else {
            return false;
        }
    };

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

const toggleMixin = {
    toggleModalAuth() {
        modalAuth.classList.toggle("is-open");
        errorMessage.classList.remove("alert-modal-show");
    }
}

Object.assign(UserAuthentication.prototype, toggleMixin);


//This is an asynchronous function 
const getData = async (url) => {

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Ошибка по адресу ${url}, cтатус ошибки ${response.status}!`); //Interpolation
    }

    return await response.json();
};


