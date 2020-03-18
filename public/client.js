import { portfolio, skillset } from "./data.js"

// add portfolio to DOM
const projects = document.querySelector("#projects");

portfolio.forEach( (x, i) => {
  // div wrapper parent element to apply css perspective
  let div = document.createElement("div");
  div.className = "projectDiv projectActive";
  
  let img = document.createElement("img");
  img.className = "project";
  /* img.style.visibility = "hidden"; */
  img.id = `photo${i}`
  img.src = x.src;
  img.alt = x.alt;
  div.appendChild(img);
  projects.appendChild(div);
  
  // overlay on hover
  let overlay = document.createElement("div");
  overlay.className = "overlay";
  
  let overlayText = document.createElement("div");
  overlayText.className = "overlayText";
  
  let title = document.createElement("h3");
  title.className = "projectTitle";
  title.innerText = x.alt;
  overlayText.appendChild(title);
  
  let about = document.createElement("p");
  about.className = "projectAbout";
  about.innerText = x.about;
  overlayText.appendChild(about);

  let buttonDiv = document.createElement("div");
  buttonDiv.className = "buttonDiv";

  let view = document.createElement("a");
  view.className = "projectView";
  view.href = x.view;
  view.target = "_blank"
  view.rel = "noopener noreferrer";
  view.innerText = "View ";
  let viewIcon = document.createElement("i");
  viewIcon.className = "fas fa-chevron-right";
  view.appendChild(viewIcon);
  buttonDiv.appendChild(view);

  let code = document.createElement("a");
  code.className = "projectCode";
  code.href = x.code;
  code.target = "_blank";
  code.rel = "noopener noreferrer";
  code.innerText = "Code ";
  let codeIcon = document.createElement("i");
  codeIcon.className = "fas fa-chevron-right";
  code.appendChild(codeIcon);
  buttonDiv.appendChild(code);

  overlayText.appendChild(buttonDiv);
  /* x.skills.forEach( skill => {
    let p = document.createElement("p");
    p.innerText = skill;
    overlayText.appendChild(p);
  }); */
  overlay.appendChild(overlayText);
  div.appendChild(overlay);
});

// add skills to DOM
const skills = document.querySelector("#skills");

skillset.forEach( (x, i) => {
  let button = document.createElement("button");
  button.className = "skillBtn";
  button.innerText = x;
  button.id = `skill${i}`;
  button.addEventListener("click", filter);
  skills.appendChild(button);
});

function filter(event) {
  let projects = document.querySelectorAll(".projectDiv");
  let buttons = document.querySelectorAll(".skillBtn");
  projects.forEach( (x, i) => {
    if (portfolio[i].skills.includes(event.target.innerText) || event.target.innerText == "All Skills") {
      x.classList.add("projectActive");
    } else {
      x.classList.remove("projectActive");
    }
  });
  buttons.forEach( x => {
    if (event.target.id === x.id) {
      x.classList.add("activeBtn");
    } else {
      x.classList.remove("activeBtn");
    }
  });
}

// fade in and flip images on scroll
/* (function() {
  let images, windowHeight;

  function init() {
    images = document.querySelectorAll(".project");
    windowHeight = window.innerHeight;
  }
  
  function imgPosition() {
    let i = 0;
    for (i; i < images.length; i++) {
      let positionFromTop = images[i].getBoundingClientRect().top;
      if (positionFromTop + 5 - windowHeight <= 0) {
        images[i].classList.add("animated", "slideInUp")
        images[i].style.visibility = "visible";
      } else {
        images[i].className = "project";
        images[i].style.visibility = "hidden";
      }
    }
  } 

  window.addEventListener("scroll", imgPosition);
  window.addEventListener("resize", init);

  init();
  imgPosition();
})(); */

// draw footer canvas
const fCanvas = document.getElementById("footerCanvas");

fCanvas.width = innerWidth;
fCanvas.height = fCanvas.width * 0.12;
const fc = fCanvas.getContext("2d");

// resize canvas if window resized
addEventListener("resize", () => {
  fCanvas.width = window.innerWidth;
  fCanvas.height = fCanvas.width * 0.12;
  console.log(fCanvas.width, fCanvas.height);
  fcInit();
})

function fcInit() {
  let x0 = 0.2, y0 = 0,
      x1 = innerWidth / 2, y1 = 0.2,
      x2 = 0.8, y2 = 0,
      x3 = x1, y3 = fCanvas.height,
      fontSize = 50;

  if (innerWidth < 900) {
    x0 = 0.1, x2 = 0.9, fontSize = 40;
  }
  if (innerWidth < 440) {
    x0 = 0.05, x2 = 0.95, fontSize = 20;
  }

  fc.beginPath();
  fc.moveTo(innerWidth * x0, y0);
  fc.lineTo(x1, fCanvas.height * y1);
  fc.lineTo(innerWidth * x2, y2);
  fc.lineTo(x3, y3);
  fc.lineTo(innerWidth * x0, y0);
  fc.fillStyle = "#8AABBF";
  fc.strokeStyle = "#1C3240";
  fc.lineWidth = 2;
  fc.fill();
  fc.stroke();

  fc.font = `${fontSize}px monospace`;
  fc.fillStyle = "#1C3240";
  fc.textAlign = "center";
  fc.fillText("Contact", innerWidth / 2, fCanvas.height * 0.6);
}
fcInit();
