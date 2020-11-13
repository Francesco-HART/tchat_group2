const db = require("../db/mongo");
const io = require("../services/socket");
exports.createRoom = async function (req, res, next) {
  const { creator_id, room_name } = req.body;

  if (
    creator_id == null ||
    creator_id == undefined ||
    room_name == null ||
    room_name == undefined
  ) {
    return res.status(404).send({ error: "Champs manquant" });
  }

  const params = {
    creator_id: creator_id,
    room_name: room_name,
    users: [creator_id],
  };
  const new_room = await db.rooms.createRoom(params);
  socket.broadcast.emit("broadcast", new_room);
  return res.status(200).send(new_room);
};

exports.getRoom = async function (req, res, next) {
  const room = await db.rooms.getRoom();
  return res.status(200).send(room);
};

exports.getRoomWithMessages = async function (req, res, next) {
  const { room_id, last_room_name } = req.query;
  if (room_id === null || room_id === undefined) {
    return res.status(404).send({ error: "Aucun nom de room" });
  }
  try {
    let room = await db.rooms.getRoomById(room_id);
    console.log(room);
    if (room === null || room === undefined) {
      return res.status(404).send({ error: "Aucun nom de room" });
    }
    const messages = await db.publicMessage.getPublicMessages(room._id);
    room["message"] = messages;

    const roomFinal = room.message.map(async (message) => {
      const user = await db.users.findUserById(message.sender_id);
      message["pseudo"] = user.pseudo;
      return message;
    });

    Promise.all(roomFinal).then(function (results) {
      const resultFinal = {
        room_id: room._id,
        room_name: room.room_name,
        room_converse: results
      }
      console.log(resultFinal);
      return res.status(200).json(resultFinal);
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "error serveur" });
  }
};
