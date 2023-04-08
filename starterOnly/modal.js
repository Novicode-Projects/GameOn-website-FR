// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");
const content = document.querySelector(".content");
const modalBody = document.querySelector(".modal-body");

let GlobalFormValidate = false;

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}
function closeModal() {
  // GlobalFormValidate = false
  if (GlobalFormValidate == false) {
    // Hidde modal form
    modalbg.style.display = "none";
  }

  // GlobalFormValidate = true
  else {
    // Delete Message Div
    const contentDiv = document.querySelector(".validate");
    const buttonDiv = document.querySelector(".validate button");

    // Remove Event Button and Div
    buttonDiv.removeEventListener("click", closeModal);
    content.removeChild(contentDiv);

    // Form
    modalBody.style.display = "block";
    modalbg.style.display = "none";

    // Reset GlobalFormValidate Variable
    GlobalFormValidate = false;
  }
}
// close modal event
closeBtn.addEventListener("click", closeModal);

function editNav() {
  const x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += "responsive";
  } else {
    x.className = "topnav";
  }
}

// Validation
function validate() {
  // Error ?
  //const arrayError = isValidateInput();

  const isError = false;

  // True
  if (isError) {
    /*
    isError.map((err) => {
      const [parent, errorMessage] = err;
      //createMessage(parent, errorMessage);
    });*/
  }

  // False
  else {
    GlobalFormValidate = true;
    modalBody.style.display = "none";

    // Div
    const div = document.createElement("div");
    div.classList.add("validate");
    div.style.display = "flex";
    div.style.flexDirection = "column";
    div.style.justifyContent = "center";
    div.style.alignItems = "center";
    div.style.height = "100%";
    div.style.textAlign = "center";

    // P
    const p = document.createElement("p");
    p.style.fontSize = "35px";
    p.style.fontWeight = "400";
    p.innerHTML = "Merci pour <br/>votre inscription";

    // Button
    const button = document.createElement("button");
    button.classList.add("btn-submit");
    button.style.position = "absolute";
    button.style.bottom = "20px";
    button.textContent = "Fermer";
    button.addEventListener("click", closeModal);

    // Add Element to DOM
    div.appendChild(p);
    div.appendChild(button);
    content.appendChild(div);
  }
}

function createMessage(parentElement, errorMessage) {
  const input = parentElement.querySelector("input");
  const div = document.createElement("div");
  const span = document.createElement("span");
  span.textContent = errorMessage;
  div.appendChild(span);
  parentElement.dataset.error = "";
  input.dataset.error = "";
  parentElement.appendChild(div);
}

function removeMessage(parentElement, errorMessage) {}

/*
function isValidateInput() {
  const arrayError = [];

  formData.forEach((formData) => {
    const input = formData.querySelector("input");


    if ((input.name == "first" && input.value == "") || input.lenght < 2) {
      arrayError.push([
        formData,
        "Veuillez entrer 2 caractères ou plus pour le champ du prénom.",
      ]);
    }


    else if ((input.name == "last" && input.value == "") || input.lenght < 2) {
      arrayError.push([
        formData,
        "Veuillez entrer 2 caractères ou plus pour le champ du nom.",
      ]);
    }


    else if (input.name == "email") {
      const validRegex = `/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/`;

      if (!input.value.match(validRegex)) {
        arrayError.push([formData, "Email incorrect."]);
      }
    } else if (input.name == "birthdate") {
      const date = new Date(input.value); // date valide + date différente du jour même
    } else if (input.name == "quantity" && !input.checked) {
      arrayError.push([formData, "Vous devez choisir une option."]);
    } else if (input.name == "location" && !input.checked) {
      arrayError.push([
        formData,
        "Vous devez vérifier que vous acceptez les termes et conditions.",
      ]);
    }
  });

  return arrayError;
}*/

/* Sucess
modalBody.textContent = "";

const div = document.createElement("div");

const p = document.createElement("p");
p.textContent = "Merci pour";

const p2 = document.createElement("p");
p2.textContent = "votre inscription";

const button = document.createElement("button");
button.classList.add("btn-submit");
button.textContent = "Fermer";

div.appendChild(p);
div.appendChild(p2);
div.appendChild(button);

modalBody.appendChild(div);*/
