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

// add images to DOM
const images = document.querySelector(".images");

imgs.forEach( (x, i) => {
  // div wrapper parent element to apply css perspective
  let div = document.createElement("div");
  div.className = "photoDiv";
  let img = document.createElement("img");
  img.className = "photoNotFlipped"
  img.id = `photo${i}`
  img.src = x.src;
  img.alt = x.alt;
  div.appendChild(img);
  images.appendChild(div);
});

// fade in and flip images on scroll
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
      if (positionFromTop + 75 - windowHeight <= 0) {
        images[i].className = "photoFlipped"
      } else {
        images[i].className = "photoNotFlipped";
      }
    }
  }

  window.addEventListener("scroll", imgPosition);
  window.addEventListener("resize", init);

  init();
  imgPosition();
})();

// draw footer canvas
const fCanvas = document.getElementById("footerCanvas");

fCanvas.width = innerWidth;
fCanvas.height = fCanvas.width * 0.12;
fc = fCanvas.getContext("2d");

// resize canvas if window resized
addEventListener("resize", () => {
  fCanvas.width = window.innerWidth;
  fCanvas.height = fCanvas.width * 0.12;
  console.log(fCanvas.width, fCanvas.height);
  fcInit();
})

function fcInit() {
  let x0 = 0.2, y0 = 0;
      x1 = innerWidth / 2, y1 = 0.2,
      x2 = 0.8, y2 = 0;
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
