// Prepare to include the server code into our web_server
const express = require("express");
const http = require("http");
const cors = require("cors");
const Cookies = require("cookies");
const app = express();
const server = http.createServer(app);
const io = require("socket.io")();
const bodyParser = require("body-parser");
/* End setup webserver */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Cors
app.use(cors({ origin: true, credentials: true }));

const router = require("./router");

// services
require("./services/auth");
app.use(Cookies.express({ keys: ["vjeqckHAvFOzxrKr6nJQI9Myl2yAOfTp"] }));

router(app);
const PORT = 5000;
server.listen(PORT, () => {
  console.log("started " + PORT);
});
io.listen(server);
