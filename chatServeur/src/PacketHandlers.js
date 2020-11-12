const store = require("../store");
//region db
require('dotenv').config()
const { MongoClient } = require('mongodb')
const passwordHash = require('password-hash');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://uq6uyt020a3iwte4amvc:EP2YZPueMLVHWrnAdcuu@bnzzp8d394kena7-mongodb.services.clever-cloud.com:27017/bnzzp8d394kena7'

const client = new MongoClient(MONGO_URI)
const DB_NAME =  "bnzzp8d394kena7";
const DB_COLLECTION_USERS =  "users";
const DB_COLLECTION_MSG =  "message";

async function dbConnect(collection){
  await client.connect() // on se connecte au serveur mongo
  const db = client.db(DB_NAME) // use DaMovies
  return db.collection(collection);
}
//endregion

const db = require('../db/mongo.js')
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
    if (Object.keys(store.clientsByPseudo).includes(data.pseudo)) {
      console.log("already exist");
      socket_client.emit("pseudo_error", { error: true });
    } else {
      const collection = dbConnect(DB_COLLECTION_USERS);
      const hashedPassword = passwordHash.generate(data.password);
      await collection.insertOne( { "pseudo" : data.pseudo, "password": hashedPassword } )
      socket_client.emit('change_pseudo', {pseudo:data.pseudo});
    }
  };

  const FindUSer = async (data) => {
    const collection = dbConnect(DB_COLLECTION_USERS);
    const dbData = collection.findOne({pseudo: data.pseudo})
    const hashedPassword = dbData.password;

    if (passwordHash.verify(data.password, hashedPassword)){
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
