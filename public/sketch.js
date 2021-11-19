let socket;

function setup() {
    createCanvas(600, 600);
    background('pink');
    socket = io.connect('http://10.0.0.48:8000')
    socket.on('mouse', newDrawing);
}

function newDrawing(data) {
    // noStroke();
    fill('purple');
    circle(data.x, data.y, 60);
}

function mouseDragged() {
    // console.log(mouseX + ',' + mouseY);

    let data = {
        x: mouseX,
        y: mouseY
    }

    socket.emit('mouse', data);
    fill('white');
    circle(mouseX, mouseY, 60);
}

function draw() {
    
    
}