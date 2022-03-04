// const fs = require("fs");

// var options = {
//   key: fs.readFileSync('test/fixtures/keys/agent2-key.pem'),
//   cert: fs.readFileSync('test/fixtures/keys/agent2-cert.cert')
// };

const express = require("express");
const app = express();
const server = require("http").createServer(app);
const socket = require("socket.io")
const io = socket(server);

app.use(express.static("public"));

server.listen(process.env.PORT, () => {
  console.log("server listening on " + process.env.PORT);
});

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