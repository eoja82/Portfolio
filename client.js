const imgs = [
  {src: "img/IMG_0887.jpeg", alt: "bear"},
  {src: "img/IMG_0926.jpeg", alt: "cat and dog"},
  {src: "img/IMG_0928.jpeg", alt: "cat and dog"},
  {src: "img/IMG_0933.jpeg", alt: "cat and dog"},
  {src: "img/IMG_0983.jpg", alt: "cat and dog"},
  {src: "img/IMG_1003.jpg", alt: "bear"},
  {src: "img/IMG_1004.jpg", alt: "bear"},
  {src: "img/IMG_5949.jpg", alt: "cat and dog"}
];

const images = document.querySelector(".images");

imgs.forEach( (x, i) => {
  // figure wrapper parent element to apply css perspective
  let figure = document.createElement("figure");
  figure.className = "photoFigure";
  let img = document.createElement("img");
  img.className = "photoNotFlipped"
  img.id = `photo${i}`
  img.src = x.src;
  img.alt = x.alt;
  /* img.addEventListener("click", perspective); */
  figure.appendChild(img);
  images.appendChild(figure);
});

/* function perspective(e) {
  let img = document.getElementById(e.target.id);
  img.className = "photoFlipped"
} */

(function() {
  let images, windowHeight;

  function init() {
    images = document.querySelectorAll(".photoNotFlipped");
    windowHeight = window.innerHeight;
    //console.log("windowHeight: " + windowHeight);
  }
  
  function imgPosition() {
    let i = 0;
    for (i; i < images.length; i++) {
      let positionFromTop = images[i].getBoundingClientRect().top;
      //console.log(positionFromTop);
      if (positionFromTop + 75 - windowHeight <= 0) {
        //console.log("scrolled into view " + images[i].id + " fromtop: " + positionFromTop);
        images[i].className = "photoFlipped"
      } /* else {
        images[i].className = "photoNotFlipped";
      } */
    }
  }

  window.addEventListener("scroll", imgPosition);
  window.addEventListener("resize", init);

  init();
  imgPosition();
})();