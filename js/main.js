const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("is-open");
}

//-------------------day 1------------------------------------

const buttonAuth = document.querySelector(".button-auth");
const modalAuth = document.querySelector(".modal-auth");
const buttonCloseAuth = document.querySelector(".close-auth");
const authForm = document.querySelector("#logInForm");
const loginInput = document.querySelector("#login");
const userName = document.querySelector(".user-name");
const buttonOut = document.querySelector(".button-out");
const errorMessage = document.querySelector(".alert-modal");
const closeError = document.querySelector(".close-error");

let loginVar = localStorage.getItem("gloDelivery");

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

closeError.addEventListener("click", function () {
  errorMessage.classList.remove("alert-modal-show");
})

function checkAuth() {
  if (maskInput(loginVar)) {
    authorizedUser();

  } else {

    notAuthorizedUser();

  }
 
}

checkAuth();