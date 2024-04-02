const express = require("express");
const app = express();
// const server = require("http").createServer(app);
const socket = require("socket.io");

app.use(express.static("public"));

const server = app.listen(process.env.PORT, () => {
  console.log("server listening on " + process.env.PORT);
});

const io = socket(server);
io.on("connection", newConnection);

function newConnection(socket) {
  console.log("new connection @ ", socket.id);

  socket.on("mouse", mouseMessage);

  function mouseMessage(data) {
    socket.broadcast.emit("mouse", data);
    // io.socket.emit('mouse', data); // global emit - includes client that sent data
    // console.log(data);
  }
}

