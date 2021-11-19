let express = require('express');
let socket = require('socket.io');

// this will be true if this server is running on Heroku
const IS_HEROKU = (process.env._ && process.env._.indexOf("heroku") !== -1);
// what port should this server be accessed on?
const PORT = process.env.PORT || 3000
// where static HTML etc. files are found
const PUBLIC_PATH = path.join(__dirname, "public")


// create an Express app:
const app = express();
// serve static files from PUBLIC_PATH:
app.use(express.static(PUBLIC_PATH)); 
// default to index.html if no file given:
app.get("/", function(req, res) {
    res.sendFile(path.join(PUBLIC_PATH, "index.html"))
});



const message = "My server is running!";
console.log(message);

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

let server = app.listen(PORT);