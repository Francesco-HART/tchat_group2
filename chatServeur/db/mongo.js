const UserClass = require("./User.Class");
const RoomClass = require("./Room.Class");
const PublicMessageClass = require("./PublicMessage.Class");
const PrivateMessageClass = require("./PrivateMessage.Class");

const db = {
  users: new UserClass(),
  rooms: new RoomClass(),
  publicMessage: new PublicMessageClass(),
  privateMessage: new PrivateMessageClass(),
};
module.exports = db;
