const store = require("../store");
const db = require('../db/mongo')


function filterDate(timeStamp) {
  var date = new Date(timeStamp);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();

  var formattedTime =
    day +
    "/" +
    month +
    "/" +
    year +
    " - " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;

  return formattedTime;
}
function createHandlers(io, socket_client) {
  const InsertUser = async (data) => {
    const isInsert = await db.users.insertUser({pseudo: "new user", password:"password"})
    if (!isInsert) {
      console.log("already exist");
      socket_client.emit("pseudo_error", { error: true });
    } else {
      socket_client.emit('change_pseudo', {pseudo:data.pseudo});
    }
  };

  const FindUSer = async (data) => {
    const isFind = await db.users.isUserAuth({pseudo: "new user", password:"password"})
    if (isFind){
      socket_client.emit('check_connected', {isConnected:true, pseudo:data.pseudo});
    }
    else{
      socket_client.emit('check_connected', {isConnected:false, pseudo:data.pseudo});
    }
  }

  const SendMessage = (data) => {
    const packet_msg = {
      message: data.message,
      date: filterDate(new Date()),
      client: socket_client.id,
      pseudo: store.clients[socket_client.id], // get pseudo from global store
    };
    io.emit("new_message", packet_msg);
    // socket_client.broadcast.emit('new_message', packet_msg)
  };

  const Disconnect = () => {
    const pseudo = store.clients[socket_client.id];
    delete store.clients[socket_client.id];
    delete store.clientsByPseudo[pseudo];
  };

  return {
    SendMessage,
    InsertUser,
    Disconnect,
    FindUSer
  };
}

module.exports = createHandlers;
