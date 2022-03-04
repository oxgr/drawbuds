let socket;
const randomCol = () => Math.floor( Math.random() * Math.pow(16, 6) ).toString(16);
let thisId = randomCol();
// const thisDrawer = {
//   col: thisCol
// }
const idList = [thisId];

let stroke = true;

function setup() {
  createCanvas(800, 800);
  background('white');
  const spacing = 20;
  noStroke();
  fill(200);
  
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      if(x % spacing == 0 && y % spacing == 0 )
        circle(x, y, 2);
    } 
  }
  
    socket = io.connect('https://drawbuds.glitch.me');
    socket.on('mouse', newDrawing);
}

function newDrawing(data) {
  const brushSize = 10;
  const col = '#' + data.id;
  fill(col);
  circle(data.x, data.y, brushSize);
}

function mouseDragged() {
    let data = {
      x: mouseX,
      y: mouseY,
      id: thisId
    }

    socket.emit('mouse', data);
    newDrawing( data );
}

function keyPressed() {
  if (keyCode == 32) thisId = randomCol();
}

function draw() {
    
    
}