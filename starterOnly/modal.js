function editNav() {
  const x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += "responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");
const content = document.querySelector(".content");
const modalBody = document.querySelector(".modal-body");
const modalForm = document.querySelector(".modal-body>form");

let GlobalFormValidate = false;
content.style.minHeight = "766px";
content.style.overflow = "scroll";

// Disable refresh page
modalForm.setAttribute("onsubmit", "validate(); return false;");

// Launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Launch modal form
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

// Validation
function validate() {
  // Error ?
  const isError = validateForm();

  // True
  if (isError.length != 0) {
    formData.forEach((input) => {
      input.removeAttribute("data-error");
      input.removeAttribute("data-error-visible");
    });

    isError.map((err) => {
      const [parent, errorMessage] = err;

      parent.setAttribute("data-error-visible", "true");
      createMessage(parent, errorMessage);
    });
  }

  // False
  else {
    // Reset Form Input
    resetInput();

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

// Create message error
function createMessage(parentElement, errorMessage) {
  parentElement.dataset.error = errorMessage;
}

// Validate input form
function validateForm() {
  const arrayError = [];

  formData.forEach((formData) => {
    // Input
    const input = formData.querySelector("input");

    // First name
    if (
      (input.name == "first" && input.value == "") ||
      (input.name == "first" && input.value.length < 2)
    ) {
      arrayError.push([
        formData,
        "Veuillez entrer 2 caractères ou plus pour le champ du prénom.",
      ]);
    }

    // Last name
    else if (
      (input.name == "last" && input.value == "") ||
      (input.name == "last" && input.value.length < 2)
    ) {
      arrayError.push([
        formData,
        "Veuillez entrer 2 caractères ou plus pour le champ du nom.",
      ]);
    }

    // Email
    else if (input.name == "email") {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input.value)) {
        arrayError.push([formData, "Email incorrect."]);
      }
    }

    // Birthdate
    else if (input.name == "birthdate") {
      const inputDate = new Date(input.value).toLocaleDateString();
      const currentDate = new Date().toLocaleDateString();

      if (input.value == "" || inputDate >= currentDate) {
        arrayError.push([
          formData,
          "Vous devez entrer votre date de naissance.",
        ]);
      }
    }

    // Quantity
    else if (input.name == "quantity" && isNaN(input.value)) {
      arrayError.push([
        formData,
        "Pour le nombre de concours, une valeur numérique est saisie.",
      ]);
    }

    // Radio
    else if (input.type == "radio") {
      const inputRadioAll = formData.querySelectorAll("input[type=radio]");

      let isChecked = false;

      inputRadioAll.forEach((input) => input.checked && (isChecked = true));

      if (isChecked == false) {
        arrayError.push([formData, "Vous devez choisir une option."]);
      }
    }

    // Condition of use
    else if (input.name == "conditionOfUse" && !input.checked) {
      arrayError.push([
        formData,
        "Vous devez vérifier que vous acceptez les termes et conditions.",
      ]);
    }
  });

  return arrayError;
}

// Reset input value
function resetInput() {
  formData.forEach((formData) => {
    const input = formData.querySelector("input");

    // Input radio
    if (input.type == "radio") {
      const inputRadioAll = formData.querySelectorAll("input[type=radio]");
      inputRadioAll.forEach(
        (input) => input.checked && (input.checked = false),
      );
    }

    // Other input
    else {
      input.value = "";
    }
  });
}
