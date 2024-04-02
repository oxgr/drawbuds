import express from "express";
import { Server } from "socket.io";

// init our express web app
const app = express();

// serve static files from the `public` directory
app.use(express.static("public"));

// serve on the port e.g. `http://localhost:{PORT}`
const PORT = 3000;

// start our express web server, listening on provided port
const server = app.listen(PORT, () => {
  console.log("server listening on " + PORT);
});

// start our websocket server
const io = new Server(server);

// set up a listener to run a callback funciton every time we receive a new "connection" event
io.on("connection", newConnection);

function newConnection(socket) {
  console.log("new connection @ ", socket.id);

  // define a "mouse" event and run callback every time we receive it
  socket.on("mouse", mouseMessage);

  function mouseMessage(data) {
    // send the given mouse event to every connected client other than sender
    socket.broadcast.emit("mouse", data);

    // io.socket.emit('mouse', data); // global emit - includes client that sent data
    // console.log(data);
  }
}
