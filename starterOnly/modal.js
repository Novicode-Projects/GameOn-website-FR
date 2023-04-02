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

// Fermeture de la modale
closeBtn.addEventListener("click", () => {
  modalbg.style.display = "none";
});

function validate(params) {
  formData.forEach((e) => {
    console.log(e.querySelector("input[value]"));
  });
}

/*
const [firstName, lastName, Email] = formData;
console.log(firstName);*/

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}
