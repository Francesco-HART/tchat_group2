const io = require("socket.io")();

//join socket groups
io.on("connection", (socket) => {
  console.log("I am connect");
});

module.exports = io;
