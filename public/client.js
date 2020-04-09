import { portfolio, skillset, filters } from "./data.js"

// smooth scroll nav links
/* const navLinks = document.querySelectorAll(".navLink");
navLinks.forEach( x => {
  x.addEventListener("click", smoothScroll);
});

function smoothScroll(event) {
  event.preventDefault();
  const element = document.getElementById(event.target.dataset.navLink);
  element.scrollIntoView({behavior: "smooth", block: "start"});
} */

// use return key to navigate page links
const navLinks = document.querySelectorAll(".navLink");
navLinks.forEach( x => {
  x.addEventListener("keydown", navKeydown)
});

function navKeydown(event) {
  if (event.keyCode == 13) {
    location.href = event.target.dataset.navLink;
  }
}

// draw transitions between sections of page
function drawTransitions() {
  const transitionCanvas = document.querySelectorAll(".transitionCanvas");
  let fillColor;

  transitionCanvas.forEach( x => {
    x.width = innerWidth;
    x.height = x.width * .09;
    
    if (x.className == "transitionCanvas intro") {
      fillColor = "rgb(25, 25, 31)";
      x.style.backgroundColor = "rgb(64, 66, 68)";
    } else if (x.className == "transitionCanvas about") {
      fillColor = "rgb(64, 66, 68)";
      x.style.backgroundColor = "rgb(25, 25, 31)";
    } else if (x.className == "transitionCanvas projects") {
      fillColor = "rgb(25, 25, 31)"
      x.style.backgroundColor = "rgb(64, 66, 68)"
    } else {
      fillColor = "transparent";
      x.style.backgroundColor = "transparent";
    }
    
    const tc = x.getContext("2d");

    function tcInit() {
      tc.beginPath();
      tc.moveTo(0, 0);
      tc.lineTo(x.width, 0);
      tc.lineTo(x.width / 2, x.height);
      tc.lineTo(0, 0);
      tc.fillStyle = fillColor;
      tc.fill();
    }
    tcInit();
  });
}
drawTransitions();

addEventListener("resize", () => {
  drawTransitions();
});

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

  const projectSkillList = document.createElement("div");
  projectSkillList.className = "projectSkillList";
  x.skills.forEach( skill => {
    let p = document.createElement("p");
    p.className = "projectSkill";
    p.innerText = skill;
    projectSkillList.appendChild(p);
    //overlayText.appendChild(p);
  });
  overlayText.appendChild(projectSkillList);

  let buttonDiv = document.createElement("div");
  buttonDiv.className = "buttonDiv";

  let view = document.createElement("a");
  view.className = "projectView";
  view.href = x.view;
  view.target = "_blank"
  view.rel = "noopener noreferrer";
  view.innerText = "VIEW  ";
  let viewIcon = document.createElement("i");
  viewIcon.className = "fas fa-chevron-right";
  view.appendChild(viewIcon);
  buttonDiv.appendChild(view);

  let code = document.createElement("a");
  code.className = "projectCode";
  code.href = x.code;
  code.target = "_blank";
  code.rel = "noopener noreferrer";
  code.innerText = "CODE  ";
  let codeIcon = document.createElement("i");
  codeIcon.className = "fas fa-chevron-right";
  code.appendChild(codeIcon);
  buttonDiv.appendChild(code);
  overlayText.appendChild(buttonDiv);
  
  overlay.appendChild(overlayText);
  div.appendChild(overlay);
});

// add project filters to DOM
const filterOptions = document.querySelector(".filterOptions");
filterOptions.style.visibility = "hidden";
filterOptions.style.height = 0;

const filterUl = document.createElement("ul");
filterUl.className = "filterBySkill";
filterOptions.appendChild(filterUl);

filters.forEach( x => {
  let li = document.createElement("li");
  li.className = "selectSkill";
  li.innerText = x;
  filterUl.appendChild(li);
});

// hide / show filter options on click
const filterBy = document.querySelector("#filterBy");
const filterArrow = document.querySelector(".filterArrow");
filterBy.addEventListener("click", showHideFilterOptions);

function showHideFilterOptions() {
  if (filterOptions.style.visibility == "hidden" && filterOptions.style.height == "0px") {
    showFilter();
  } else {
    hideFilter();
  }
}
function showFilter() {
  filterArrow.classList.replace("fa-chevron-down", "fa-chevron-up");
  filterOptions.style.visibility = "visible";
  filterOptions.style.height = (31.8 * filters.length) + "px";
  document.addEventListener("click", closeFilterOptions, true);
}
function hideFilter() {
  filterArrow.classList.replace("fa-chevron-up", "fa-chevron-down");
  filterOptions.style.visibility = "hidden";
  filterOptions.style.height = 0;
  document.removeEventListener("click", closeFilterOptions, true);
}
function closeFilterOptions(event) {
  const classesAndIds = ["filterBy", "filter", "selectSkill", "fas fa-chevron-down filterArrow", "fas fa-chevron-up filterArrow"];
  if (classesAndIds.includes(event.target.id) || classesAndIds.includes(event.target.className)) {
    return;
  } else {
    hideFilter();
  }
}

// filter projects
const selectSkill = document.querySelectorAll(".selectSkill");
selectSkill.forEach( x => x.addEventListener("click", filter));
const project = document.querySelectorAll(".projectDiv");

function filter(event) {
  project.forEach( (x, i) => {
    x.classList.replace("zoomIn", "zoomOut");
    x.classList.remove("projectActive");
    
  /* }); */
  /* let projects = document.querySelectorAll(".projectDiv"); */
  /* project.forEach( (x, i) => {
    if (portfolio[i].skills.includes(event.target.innerText) || event.target.innerText == "All") {
      
      x.classList.replace("zoomOutDown", "zoomInUp");

      x.classList.add("projectActive");
    } else {
      x.classList.remove("projectActive");
    }
  }); */

    setTimeout(filtered(event), 1000);
    function filtered(event) {
      //console.log("in timeout")
      //console.log(event.target.innerText)
      x.classList.remove("zoomOut");
      if (portfolio[i].skills.includes(event.target.innerText) || event.target.innerText == "All") {
        //console.log("in if timeout")
        x.classList.add("zoomIn");
        x.classList.add("projectActive");
      } else {
        x.classList.remove("projectActive");
      }
    }
  });

  document.getElementById("filter").innerText = event.target.innerText;

  hideFilter();
}

// fade in project images on scroll
(function() {
  let images, windowHeight;
  function init() {
    /* images = document.querySelectorAll(".project"); */
    windowHeight = window.innerHeight;
  }
  
  // section header and header bar
  const sectionHeader = document.querySelectorAll(".sectionHeader");
  const headerBarContainer = document.querySelectorAll(".headerBarContainer");

  function headerPosition() {
    let i = 0;
    for (i; i < sectionHeader.length; i++) {
      let positionFromTop = sectionHeader[i].getBoundingClientRect().top;
      if (positionFromTop - windowHeight <= 0) {
        sectionHeader[i].classList.add("animated", "fadeInRight");
        sectionHeader[i].style.visibility = "visible";
        headerBarContainer[i].classList.add("animated", "fadeInRight");
        headerBarContainer[i].style.visibility = "visible";
      }
    }
  }

  window.addEventListener("scroll", headerPosition);

  // projects
  function imgPosition() {
    let i = 0;
    for (i; i < project.length; i++) {
      let positionFromTop = project[i].getBoundingClientRect().top;
      if (positionFromTop - windowHeight <= 0) {
        project[i].classList.add("animated", "zoomIn")
        project[i].style.visibility = "visible";
      }  
    }    
  } 

  window.addEventListener("scroll", imgPosition);
  window.addEventListener("resize", init);

  init();
  imgPosition();
})();

// draw footer canvas
/* const fCanvas = document.getElementById("footerCanvas");

fCanvas.width = innerWidth;
fCanvas.height = fCanvas.width * 0.12;
const fc = fCanvas.getContext("2d"); */

// resize canvas if window resized
/* addEventListener("resize", () => {
  drawTransitions();
  fCanvas.width = window.innerWidth;
  fCanvas.height = fCanvas.width * 0.12;
  console.log(fCanvas.width, fCanvas.height);
  fcInit();
}); */

/* function fcInit() {
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
  fc.fillStyle = "rgb(34, 170, 182)";//"#8AABBF";
  fc.strokeStyle = "rgb(34, 170, 182)" //"#1C3240";
  fc.lineWidth = 2;
  fc.fill();
  fc.stroke();

  fc.font = `${fontSize}px helvetica`;
  fc.fillStyle = "rgb(25, 25, 31, .9)"; //"#1C3240";
  fc.textAlign = "center";
  fc.fillText("Contact", innerWidth / 2, fCanvas.height * 0.6);
}
fcInit(); */
