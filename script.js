 "use strict";


let data = [
  {
    id: 1,
    imageUrl:
      "https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300",
    title: "slider title 1",
  },
  {
    id: 2,
    imageUrl:
      "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    title: "slider title 2",
  },
  {
    id: 3,
    imageUrl:
      "https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300",
    title: "slider title 3",
  },
  {
    id: 4,
    imageUrl:
      "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    title: "slider title 4",
  },
];

const arrowLeft = document.getElementById("arrow-left");
const arrowRight = document.getElementById("arrow-right");
const sliderCOntent = document.getElementById("slider-content");
let sliderIndex = 0;
let dotItem = document.getElementsByClassName("dot");

//ამ ფუნქციის საშულებით შევქმენით დივ ტეგი
function createDivTag() {
  const divTag = document.createElement("div");
  divTag.classList.add("slide");

  return divTag;
}

//ამ ფუნქციის საშულებით შევქმენით სურათი
function createImgtag(item) {
  //   const tagImage = document.createElement("img");
  //   tagImage.setAttribute("src", item.imageUrl);
  //   tagImage.setAttribute("alt", item.title);

  //bg image example
  const tagImage = document.createElement("div");
  tagImage.style.backgroundImage = `url(${item.imageUrl})`;
  tagImage.classList.add("bg-image");

  return tagImage;
}

//ამ ფუნქციის საშულებით შევქმენით სათაური
function createTitletag(item) {
  const tagTitle = document.createElement("h3");
  tagTitle.textContent = item.title;

  return tagTitle;
}

//ამ ფუქნიის საშუალებიტ ვქმნი dot-ების ლოგიკას
function createDots() {
  const dotsParent = document.createElement("div");
  dotsParent.classList.add("dotParent");

  data.forEach((element) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dot.setAttribute("data-id", element.id - 1);
    dotsParent.appendChild(dot);

    dot.addEventListener("click", function (event) {
      // console.log(event.target);
      let id = event.target.getAttribute("data-id");
      sliderIndex = id;
      slide();
    });
  });

  return dotsParent;
}

function slide() {
  sliderCOntent.innerHTML = " ";
  const slideItem = createDivTag(data[sliderIndex]);
  const imgTag = createImgtag(data[sliderIndex]);
  const titleTag = createTitletag(data[sliderIndex]);
  const dotsElement = createDots();

  slideItem.appendChild(imgTag);
  slideItem.appendChild(titleTag);
  sliderCOntent.appendChild(slideItem);
  sliderCOntent.appendChild(dotsElement);

  dotItem[sliderIndex].classList.add("activeDot");
}

function arrowLeftClick() {
  if (sliderIndex == 0) {
    sliderIndex = data.length - 1;
    slide();
    return;
  }
  sliderIndex--;
  // sliderIndex-=1;
  slide();
}

function arrowRightClick() {
  if (sliderIndex == data.length - 1) {
    sliderIndex = 0;
    slide();
    return;
  }
  sliderIndex++;
  // sliderIndex+=1;
  slide();
}

arrowLeft.addEventListener("click", arrowLeftClick);
arrowRight.addEventListener("click", arrowRightClick);

// setInterval(() => {
//   arrowRightClick();
// }, 3000);

slide();

//form validation
let registrationForm = document.getElementById("resgitrationForm");

registrationForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let errors = {};

  //username
  let usernameValue = document.getElementById("usernameField").value;
  if (usernameValue == "" && usernameValue.length < 5) {
    errors.username =
      "Username field can not be empty and must be more then 5 chaarcters";
  }

  //password
  let passwordValue = document.getElementById("passwordField").value;
  let passwordValue2 = document.getElementById("passwordFieldrepeat").value;

  if (passwordValue == "") {
    errors.password = "Pasword field can not be empty";
  }
  if (passwordValue != passwordValue2) {
    errors.password2 = "Passwords do not macth";
  }

  //checkbox
  let agreeField = document.getElementById("agreeTerms").checked;

  if (!agreeField) {
    errors.agree = "You must egree our terms and contiions";
  }

  console.log(errors);

  document.querySelectorAll(".error-text").forEach((item) => {
    item.innerText = " ";
  });

  for (let key in errors) {
    // console.log(key); //errors obiektis satitaod titoetili key
    let spanText = document.getElementById("error_" + key);

    if (spanText) {
      spanText.innerText = errors[key];
    }
  }

  if (Object.keys(errors).length == 0) {
    registrationForm.submit();
  }
});

// let errors = {
// key = inputis name atributis mnishvnelobas
//     name-atributis mnishvneloba: 'shecdpmis texti romelic gamochndeba '
//   password:"Pasword field can not be empty";
// }

// span id saxeli da eerors obiektis key gvakvs ertidaigive

// Object.keys() -- obiejtis keys
// Object.values() -- obijentis mnisvnelobebs
// Object.entries() -- ertdroulad obiejtis keys asebe obiejtis mnisvnelobas

//show hide assword
let password = document.getElementById("passwordField");
let icon = document.getElementById("toogleIcon");

icon.addEventListener("click", function () {
  if (password.type == "password") {
    password.setAttribute("type", "text");
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  } else {
    password.setAttribute("type", "password");
    icon.classList.add("fa-eye");
    icon.classList.remove("fa-eye-slash");
  }
});

//email regec validation
let emailField = document.getElementById("emailField");

emailField.addEventListener("keyup", function () {
  let emailValue = document.getElementById("emailField").value;
  let errorSpan = document.getElementById("text");

  let emailPattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (emailValue.match(emailPattern)) {
    errorSpan.innerText = "Your emal is Valid";
    errorSpan.style.color = "green";
  } else {
    errorSpan.innerText = "Your emal is inalid";
    errorSpan.style.color = "red";
  }

  if (emailValue == "") {
    errorSpan.innerHTML = " ";
  }
});



// js navigation bg on scroll

let myNav = document.getElementById("nav");

window.onscroll = function() {
  if (document.documentElement.scrollTop >= 280) {
    myNav.classList.add("scroll");
  } else {
    myNav.classList.remove("scroll");
  }
};



//scrollTo
// button.addEventListener('click', function() {
//   window.scrollTo({

//   })
// })