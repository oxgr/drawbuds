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

//

const cmd = require('node-cmd');
const crypto = require('crypto'); 
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const onWebhook = (req, res) => {
  let hmac = crypto.createHmac('sha1', process.env.SECRET);
  let sig  = `sha1=${hmac.update(JSON.stringify(req.body)).digest('hex')}`;

  if (req.headers['x-github-event'] === 'push' && sig === req.headers['x-hub-signature']) {
    cmd.run('chmod 777 ./git.sh'); 
    
    cmd.run('./git.sh', (err, data) => {  
      if (data) {
        console.log(data);
      }
      if (err) {
        console.log(err);
      }
    })

    cmd.run('refresh');
  }

  return res.sendStatus(200);
}

app.post('/git', onWebhook);