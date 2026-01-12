/*!
* Start Bootstrap - Freelancer v7.0.7 (https://startbootstrap.com/theme/freelancer)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });
});

// New intro animation

const float_speed = 3;
const transition_speed = 0.05;
const circle_size_divisor = 12;

let floating = true;
let circleImgs = []; // array to hold your images
let num_circles = 6; // number of circles
let circles = [];
let circleSize;
let maskedImgs = [];

function preload() {
  // load images into the array
  for (let i = 0; i < num_circles; i++) {
    circleImgs[i] = loadImage(`assets/img/animation/img_${i+1}.webp`);
  }
}
  
function setup() {
  const container = document.getElementById("sketch-container");
  const canvas = createCanvas(
    container.offsetWidth,
    container.offsetHeight
  );
  canvas.parent(container);

  noStroke();
  imageMode(CENTER);

  circleSize = width / circle_size_divisor;

  for (let i = 0; i < num_circles; i++) {
    circles.push({
      x: random(circleSize / 2, width - circleSize / 2),
      y: random(circleSize / 2, height - circleSize / 2),
      speedX: random(-float_speed, float_speed),
      speedY: random(-float_speed, float_speed),
      targetX: null,
      targetY: null,
    });
  }
}

function draw() {
background(0,0,0);

  for (let i = 0; i < circles.length; i++) {
    let c = circles[i];

    if (floating) {

      //move circles
      c.x += c.speedX;
      c.y += c.speedY;

      //bounce off walls
      if (c.x < circleSize / 2 || c.x > width - circleSize / 2) {
        c.speedX *= -1;
      }
      if (c.y < circleSize / 2 || c.y > height - circleSize / 2) {
        c.speedY *= -1;
      }

    } else {
      let spacing = width / circles.length;
      c.targetX = i * spacing + circleSize;
      c.targetY = height / 2 - (circleSize * .75);

      c.x = lerp(c.x, c.targetX, transition_speed);
      c.y = lerp(c.y, c.targetY, transition_speed);
    }
    
    //make images circular
    push();
    drawingContext.save();
    drawingContext.beginPath();
    drawingContext.arc(c.x, c.y, circleSize / 2, 0, TWO_PI);
    drawingContext.clip();
    
    image(
      circleImgs[i % circleImgs.length],
      c.x,
      c.y,
      circleSize,
      circleSize
    );
    
    drawingContext.restore();
    pop();
  }
}

function mouseWheel() {
  floating = false;
}

function mouseClicked() {
  floating = !floating;
}

function windowResized() {
  const container = document.getElementById("sketch-container");
  resizeCanvas(container.offsetWidth, container.offsetHeight);
  circleSize = width / circle_size_divisor;
}
