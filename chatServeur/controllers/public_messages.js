const io = require("../index");


const db = require("../db/mongo");
// const socket = require("../services/socket");

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
  if (
    sender_id == null ||
    sender_id == undefined ||
    room_id == null ||
    room_id == undefined ||
    message == null ||
    message == undefined
  )
    return res.status(404).send({ error: "Champs manquant" });

  const sender_user = await db.users.findUserById(sender_id);
  const params = {
    sender_id,
    pseudo: sender_user.pseudo,
    room_id,
    message,
  };

  const newMessage = await db.publicMessage.insertNewPulicMessage(params);

  io.io.emit('sendMessage', newMessage.ops)


  return res.status(200).send(newMessage);
};
