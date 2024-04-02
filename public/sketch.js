/**
 * @typedef {Object} MouseData
 * @prop {string} id - hex colour code used to identify mouse data sender
 * @prop {number} x - x-position of mouse
 * @prop {number} y - y-position of mouse
 */

const WS_URL = "https://drawbuds.glitch.me";

// socket variable is global only because p5 mouse/key handler functions are global.
let socket;

// id used to identify this client. also global because of p5
let thisId = randomColor();

main();

function main() {
  // set up our drawing space.
  createCanvas(800, 800);
  drawBackground();

  // connect to our websocket server
  socket = io.connect(WS_URL);

  // listen for an websocket event ( "mouse" defined at the server ).
  // run the callback function every time we receive said event.
  socket.on("mouse", drawCircle);
}

/**
 * Mouse event handler from p5.
 */
function mouseDragged() {
  let data = {
    id: thisId,
    x: mouseX,
    y: mouseY,
  };

  socket.emit("mouse", data);
  newDrawing(data);
}

/**
 * Key event handler from p5.
 */
function keyPressed() {
  // Randomises colour when spacebar is pressed.
  if (keyCode == 32) thisId = randomColor();
}

function randomColor() {
  Math.floor(Math.random() * Math.pow(16, 6)).toString(16);
}

function drawBackground() {
  const GAPS = 20;

  background("white");
  noStroke();
  fill(200);

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      if (x % GAPS == 0 && y % GAPS == 0) circle(x, y, 2);
    }
  }
}

/**
 * Draws a circle at the color and point given.
 * @param {MouseData} data - position and color to draw the circle at
 */
function drawCircle(data) {
  const SIZE = 10;
  const color = "#" + data.id;

  fill(color);
  circle(data.x, data.y, SIZE);
}

