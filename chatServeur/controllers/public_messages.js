const db = require("../db/mongo");
const socket = require("../services/socket");

exports.getPublicMessage = async function (req, res, next) {
  const { room_id } = req.query;
  if (!room_id) {
    return res.status(404).send({ error: "Aucun ID" });
  }

  const messages = await db.publicMessage.getPublicMessages(room_id);
  return res.status(200).json(messages);
};

exports.sendPublicMessage = async function (req, res, next) {
  const { sender_id, room_id, message } = req.body;
  console.log(req.body);
  if (
    sender_id == null ||
    sender_id == undefined ||
    room_id == null ||
    room_id == undefined ||
    message == null ||
    message == undefined
  ) {
    return res.status(404).send({ error: "Champs manquant" });
  }

  const params = {
    sender_id,
    room_id,
    message,
  };

  const new_message = await db.publicMessage.insertNewPulicMessage(params);
  // socket.to(room_id).emit(room_id, new_message);
  return res.status(200).send(new_message);
};
