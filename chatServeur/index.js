// Prepare to include the server code into our web_server
const express = require("express");
const http = require("http");
const cors = require("cors");
const Cookies = require("cookies");
const app = express();
const server = http.createServer(app);
const bodyParser = require("body-parser");
const express = require('express')
const http = require('http')
const cors = require('cors')
const app = express()
const server = http.createServer(app)
/* End setup webserver */

const createHandlers = require('./src/PacketHandlers')

//Cors
app.use(cors({ origin: true, credentials: true }));
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        // allowedHeaders: ["my-custom-header"],
        credentials: true
    }
})

const router = require("./router");
// services
require("./services/auth");
app.use(Cookies.express({ keys: ["vjeqckHAvFOzxrKr6nJQI9Myl2yAOfTp"] }));
const pseudos = []
const clients = {
    'client.id': 'pseudo'
}

router(app);
const PORT = 5000;
server.listen(PORT, () => {
  console.log("started " + PORT);
});
options = {
  cors: true,
  origins: ["*"],
};
let connected = 0

io.on('connection', function(socket_client) {
    console.log('Client connected', socket_client.id)

    const handlers = createHandlers(io, socket_client)

    socket_client.on('change_pseudo', handlers.ChangePseudo)
    socket_client.on('send_message', handlers.SendMessage)
    socket_client.on('disconnect', handlers.Disconnect)

const io = require("socket.io")(server, options);

exports.io = io


})

server.listen(5055, () => {
    console.log('started')
})




