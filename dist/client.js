import { portfolio, filters } from "./data.js";

const body = document.querySelector("body"),
      fadeInDown = document.getElementById("fadeInDown"),
      fadeInUp = document.getElementById("fadeInUp");

body.onload = function() {
  fadeInDown.classList.add("animated", "fadeInDown");
  fadeInDown.style.visibility = "visible";
  fadeInUp.classList.add("animated", "fadeInUp");
  fadeInUp.style.visibility = "visible";
}

// gsap scrollTo animation for nav links
const links = document.querySelectorAll(".navLink");
links.forEach( link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const hash = link.firstElementChild.getAttribute("href");
    gsap.to(window, {
      duration: .8,
      scrollTo: hash,
      ease: "sine.out",
      onComplete: setHash
    });

    // Add hash (#) to URL when done scrolling (default click behavior)
    function setHash() {
      window.location.hash = hash;
    }
  });
});

// animation of #intro background
const introBgImg = document.getElementById("introBgImg");
introBgImg.style.backgroundPosition = "50% 0px"
gsap.to(introBgImg, {
  backgroundPosition: `50% ${innerHeight / 2}px`,
  ease: "none",
  scrollTrigger: {
    trigger: introBgImg,
    start: "top top",
    end: "bottom top",
    scrub: true
  }
});

// add portfolio to DOM
const projects = document.querySelector("#projects");

portfolio.forEach( (x, i) => {
  let div = document.createElement("div");
  div.className = "projectDiv projectActive";  
  
  let img = document.createElement("img");
  img.className = "project";
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

let tofadeOut,
    toFadeIn,
    delayOut,
    delayIn,
    animationIn = "fadeIn",
    animationOut = "fadeOut";

function filter(event) {
  const filter = document.getElementById("filter");

  // don't animate unless a different filter is selected  
  if (filter.innerText === event.target.innerText) {
    hideFilter();
    return;
  }

  tofadeOut = [];
  project.forEach( x => {
    x.classList.remove("animated", "fadeInLeft", animationIn, animationOut);
    if (x.classList.contains("projectActive")) {
      tofadeOut.push(x);
    } 
  });
  
  delayOut = 0;
  tofadeOut.forEach( x => {
    x.style.animationDelay = `${delayOut}s`;
    delayOut += .05;
    x.classList.add("animated", animationOut);
  });

  // only want event listener on last item in tofadeOut
  tofadeOut[tofadeOut.length - 1].addEventListener("animationend", fadeInFiltered);

  function fadeInFiltered() {
    // remove event listener so it doesn't fire at end of toFadeIn animation 
    tofadeOut[tofadeOut.length - 1].removeEventListener("animationend", fadeInFiltered);
    toFadeIn = [];
    delayIn = 0;
    project.forEach( (x, i) => {
      x.classList.remove("animated", animationIn, animationOut);
      if (portfolio[i].skills.includes(event.target.innerHTML) || event.target.innerHTML === "All") {
        toFadeIn.push(x);
        x.classList.add("projectActive");
      } else {
        x.classList.remove("projectActive");
      }
    });
    toFadeIn.forEach( (x, i) => {
      x.style.animationDelay = `${delayIn}s`;
      delayIn += .05;
      x.classList.add("animated", animationIn);
    });
  }

  filter.innerText = event.target.innerText;
  hideFilter();
}

// on scroll animations
(function() {
  let windowHeight;

  function init() {
    windowHeight = window.innerHeight;
  }

  // section header and header bar, highlight active nav link
  const sectionHeader = document.querySelectorAll(".sectionHeader");
  const headerBarContainer = document.querySelectorAll(".headerBarContainer");

  function headerPosition(event) {
    let i = 0;
    for (i; i < sectionHeader.length; i++) {
      let positionFromTop = sectionHeader[i].getBoundingClientRect().top;
      let positionFromBottom = sectionHeader[i].getBoundingClientRect().bottom;

      // section header and header bar
      if (positionFromTop - windowHeight <= 0) {
        sectionHeader[i].classList.add("animated", "fadeInRight");
        sectionHeader[i].style.visibility = "visible";
        headerBarContainer[i].classList.add("animated", "fadeInRight");
        headerBarContainer[i].style.visibility = "visible";
      }
      // highlight active nav link
      if ((positionFromTop <= windowHeight * .49 && positionFromTop > 0) || (positionFromBottom <= windowHeight * .75 && positionFromBottom < windowHeight)) {
        const navLinks = document.querySelectorAll(".navLink");
        navLinks.forEach( x => {
          if (`#${sectionHeader[i].parentElement.parentElement.id}` === x.firstElementChild.getAttribute("href")) {
            x.classList.add("active");
          } else {
            x.classList.remove("active");
          }
        });
      } 
    }
  }

  addEventListener("scroll", headerPosition);

  // about section aboutMe
  const aboutMe = document.getElementById("aboutMe");

  function aboutMePosition() {
    let positionFromTop = aboutMe.getBoundingClientRect().top;
    if (positionFromTop - windowHeight <= 0) {
      aboutMe.classList.add("animated", "fadeInLeft");
      aboutMe.style.visibility = "visible";
      removeEventListener("scroll", aboutMePosition);
    }
  }

  addEventListener("scroll", aboutMePosition);

  // about section skillSets
  const skillSets = document.querySelectorAll(".skillSet");

  function skillSetPosition() {
    let i = 0;
    for (i; i < skillSets.length; i++) {
      let positionFromTop = skillSets[i].getBoundingClientRect().top;
      if (positionFromTop - windowHeight <= 0) {
        skillSets[i].classList.add("animated", "fadeInLeft");
        skillSets[i].style.visibility = "visible";
      }
      if (skillSets[skillSets.length - 1].style.visibility == "visible") {
        removeEventListener("scroll", skillSetPosition);
      }
    }
  }

  addEventListener("scroll", skillSetPosition);

  // project filter
  const filterContainer = document.getElementById("filterContainer");

  function filterPosition() {
    let positionFromTop = filterContainer.getBoundingClientRect().top;
    if (positionFromTop - windowHeight <= 0) {
      filterContainer.classList.add("animated", "fadeInRight");
      filterContainer.style.visibility = "visible";
    }

    filterContainer.addEventListener("animationend", resizeFilterContainer);

    // keep filter dropdown on top of projects and not full width
    function resizeFilterContainer() {
      filterContainer.classList.remove("animated", "fadeInRight");
      filterContainer.style.width = "200px";
      removeEventListener("scroll", filterPosition);
    }

  }

  addEventListener("scroll", filterPosition);

  // projects
  function animateProjects() {
    let projectsPosition = projects.getBoundingClientRect().top,
        i = 0,
        delay = 0;
    if (projectsPosition - windowHeight <= 0) {
      // variable "project" previously defined in project filter section
      for (i; i < project.length; i++) {
        project[i].style.animationDelay = `${delay}s`;
        delay += .1;
        project[i].classList.add("animated", "fadeInLeft");
        project[i].style.visibility = "visible";
      }
    }

    project[project.length - 1].addEventListener("animationend", () => { 
      removeEventListener("scroll", animateProjects); 
    });
  }

  addEventListener("scroll", animateProjects);

  // hire me paragraph
  const hireMe = document.getElementById("hireMe");
  
  function hireMePosition() {
    let positionFromTop = hireMe.getBoundingClientRect().top;
    if (positionFromTop - windowHeight <= 0) {
      hireMe.classList.add("animated", "fadeInLeft");
      hireMe.style.visibility = "visible";
      removeEventListener("scroll", hireMePosition);
    }
  }

  addEventListener("scroll", hireMePosition);

  // contact icons
  const contact = document.getElementById("contact");
  const contactIcons = document.querySelectorAll(".contactIcon");

  function contactPosition() {
    let positionFromTop = contact.getBoundingClientRect().top;
    if (positionFromTop - windowHeight <= 0) {
      contactIcons.forEach( x => {
        x.classList.add("animated", "fadeInLeft");
        x.style.visibility = "visible";
      });
    }
    if (contactIcons[contactIcons.length - 1].style.visibility === "visible") {
      removeEventListener("scroll", contactPosition);
    }
  }

  addEventListener("scroll", contactPosition);

  addEventListener("resize", init);

  init();
 
})();