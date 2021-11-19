let express = require('express');

let app = express();
let server = app.listen(8000);

app.use(express.static('public'));

const message = "My server is running!";

console.log(message);

let socket = require('socket.io');

let io = socket(server);

io.on('connection', newConnection);

function newConnection(socket) {
    console.log('new connection @ ', socket.id);

    socket.on('mouse', mouseMessage);

    function mouseMessage(data) {
        socket.broadcast.emit('mouse', data);
        // io.socket.emit('mouse', data); // global emit - includes client that sent data
        // console.log(data);
    }
}