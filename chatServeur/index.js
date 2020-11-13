// Prepare to include the server code into our web_server
const express = require("express");
const http = require("http");
const cors = require("cors");
const Cookies = require("cookies");
const app = express();
const server = http.createServer(app);
const bodyParser = require("body-parser");
/* End setup webserver */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

import axios from 'axios'
import VueAxios from 'vue-axios'
axios.defaults.withCredentials = true
Vue.use(VueAxios, axios)
//Cors
app.use(
    cors({ origin: true, credentials: true, exposedHeaders: ["set-cookie"] })
);

const router = require("./router");
// services
require("./services/auth");
app.use(Cookies.express({ keys: ["vjeqckHAvFOzxrKr6nJQI9Myl2yAOfTp"] }));

router(app);
const PORT = 5000;
server.listen(PORT, () => {
  console.log("started " + PORT);
});
options = {
  cors: true,
  origins: ["*"],
};

const io = require("socket.io")(server, options);

exports.io = io

