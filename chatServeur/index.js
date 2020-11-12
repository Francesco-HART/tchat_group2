// Prepare to include the server code into our web_server
const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const bodyParser = require("body-parser");
/* End setup webserver */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const createHandlers = require("./src/PacketHandlers");

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    // allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});
const router = require("./router");
const pseudos = [];
const clients = {
  "client.id": "pseudo",
};

let connected = 0;

io.on("connection", function (socket_client) {
  console.log("Client connected", socket_client.id);

  const handlers = createHandlers(io, socket_client);
  socket_client.on("is_auth", handlers.IsAuth);
  socket_client.on("insert_user", handlers.InsertUser);
  socket_client.on("send_message", handlers.SendMessage);
  socket_client.on("disconnect", handlers.Disconnect);
});

router(app);

server.listen(5055, () => {
  console.log("started");
});
