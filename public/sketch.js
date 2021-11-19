

function setup() {
    createCanvas(600, 600);
    background('pink');
    let addr = location.origin.replace(/^http/, 'ws')
    let socket = socket = io.connect(addr);
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