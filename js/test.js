// document.querySelectorAll('.circle').forEach(circle => {
//   const startVW = 0;
//   const circleWidth = 80; // same as CSS
  
//   dx = [];
//   dx[0] = Math.random() * (window.innerWidth - circleWidth);
//   for (let i = 1; i < 4 ; i++) {
//     dx[i] = Math.min(
//       Math.max(dx[i - 1] + (Math.random() * 2 - 1) * 200, 0),
//       window.innerWidth - circleWidth
//     );
//   } 

//   const delay = Math.random() * 0.6;  //staggers animations
//   const duration = 3 + Math.random() * 5;  //images fall at diff speeds to add variation

//   const impact = 0.5 + Math.random() * 0.2; // impact timing between 50%–70%

//   circle.style.left = `${startVW}vw`;
//   circle.style.animationDelay = `${delay}s`;
//   circle.style.animationDuration = `${duration}s`;

//   circle.style.setProperty('--launchdx', `${dx[0]}px`);
//   circle.style.setProperty('--dxOne', `${dx[1]}px`);
//   circle.style.setProperty('--dxTwo', `${dx[2]}px`);
//   circle.style.setProperty('--dxThree', `${dx[3]}px`);
//   circle.style.setProperty('--impact', impact);
// });


//constants
// const num_circles = 16;
// const float_speed = 1;
// const transition_speed = 0.05;
// const circle_size_divisor = 25;

// //variables
// let circles = [];
// let float = true;
// let circleSize;

// windowWidth = window.innerWidth;
// windowHeight = window.innerHeight

// function setup() {
//   createCanvas(windowWidth, windowHeight);
//   noStroke();

// const circles = document.querySelectorAll('.circle');
// const num_circles = circles.length;

// for (let i = 0; i < num_circles; i++) {
//     circleSize = width / circle_size_divisor;
//     let circle = {
//       //x and y dimensions
//       x: random(circleSize / 2, width - circleSize / 2),
//       y: random(circleSize / 2, height - circleSize / 2),
//       speedX: random(-float_speed, float_speed),
//       speedY: random(-float_speed, float_speed),
//       targetX: null,
//       targetY: null,
//     };
//     circles.push(circle);
//   }
// }

// function draw() {
//   background(30);

//   for (let i = 0; i < num_circles; i++) {
//     let circle = circles[i];

//     if (float) {
//       circle.x += circle.speedX;
//       circle.y += circle.speedY;

//       //check for collisions
//       if (circle.x < 0 + circleSize / 2 || circle.x > width - circleSize / 2) {
//         circle.speedX = -circle.speedX;
//       }
//       if (circle.y < 0 + circleSize / 2 || circle.y > width - circleSize / 2) {
//         circle.speedY = -circle.speedY;
//       }

//     } else {
//       let spacing = width / num_circles;
//       circle.targetX = i * spacing + circleSize * 0.75;
//       circle.targetY = height/2;

//       circle.x = lerp(circle.x, circle.targetX, transition_speed);
//       circle.y = lerp(circle.y, circle.targetY, transition_speed);
//     }

//     ellipse (circle.x, circle.y, circleSize, circleSize);
//   }
// }

// function mouseWheel() {
//   float = false;
// }

// function mouseClicked() {
//   float = !float;
// }

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
//   circleSize = width / circle_size_divisor;
// }


const float_speed = 1;
const transition_speed = 0.05;
const circle_size_divisor = 25;

let circles = [];
let floating = true;
let circleSize;
let num_circles = 6; // ← set this manually, or tie it to DOM later

function setup() {
  const container = document.getElementById("sketch-container");

  const canvas = createCanvas(
    container.offsetWidth,
    container.offsetHeight
  );
  canvas.parent(container);

  noStroke();

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
  background(30);

  for (let i = 0; i < circles.length; i++) {
    let c = circles[i];

    if (floating) {
      c.x += c.speedX;
      c.y += c.speedY;

      if (c.x < circleSize / 2 || c.x > width - circleSize / 2) {
        c.speedX *= -1;
      }
      if (c.y < circleSize / 2 || c.y > height - circleSize / 2) {
        c.speedY *= -1;
      }

    } else {
      let spacing = width / circles.length;
      c.targetX = i * spacing + circleSize;
      c.targetY = height / 2;

      c.x = lerp(c.x, c.targetX, transition_speed);
      c.y = lerp(c.y, c.targetY, transition_speed);
    }

    ellipse(c.x, c.y, circleSize);
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


// Intro animation
// document.querySelectorAll('.circle').forEach(circle => {
//     const circles = document.querySelectorAll('.circle');
//     const numCircles = circles.length;
//     const circleSize = window.innerWidth / numCircles; // diameter each circle can have if they exactly fill the width

//     const launchdx = Math.random() * (window.innerWidth - circleSize);

//     const dx = Math.min(
//         Math.max(launchdx + (Math.random() * 2 - 1) * 300, 0),
//         window.innerWidth - circleSize);

//     circles.forEach((circle, index) => {
//         const xCenter = circleSize * index + circleSize / 2;
//         circle.style.setProperty('--finalx', `${xCenter - circleSize / 2}px`)
//     });

//     const delay = Math.random() * 0.6;  //stagger animations
//     const duration = 10 + Math.random() * 5;  //images fall at diff speeds to add variation
//     const impact = 0.5 + Math.random() * 0.2; // impact timing between 50%–70%
  
//     circle.style.left = '0vw';
//     circle.style.animationDelay = `${delay}s`;
//     circle.style.animationDuration = `${duration}s`;

//     circle.style.setProperty('--diameter', `${circleSize}px`);
//     circle.style.setProperty('--launchdx', `${launchdx}px`);
//     circle.style.setProperty('--dx', `${dx}px`);
//     circle.style.setProperty('--impact', impact);
// });
  
