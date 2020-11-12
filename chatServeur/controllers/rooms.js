const db = require("../db/mongo");
const socket = require("../services/socket");

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

exports.getRoomWithMessages = async function (req, res, next) {
  const { room_name, last_room_name } = req.query;
  if (room_name === null || room_name === undefined) {
    return res.status(404).send({ error: "Aucun nom de room" });
  }
  try {
    let room = await db.rooms.getRoomByName(room_name);
    const messages = await db.publicMessage.getPublicMessages(room._id);
    room["message"] = messages;

    if (last_room_name !== null || last_room_name !== undefined)
      socket.leave(last_room_name);

    socket.join(room.name);

    return res.status(200).json(room);
  } catch (e) {
    return res.status(500).json({ error: "error serveur" });
  }
};
