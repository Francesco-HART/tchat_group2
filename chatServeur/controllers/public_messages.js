const db = require('../db/mongo')

exports.getRoomsMessages = async function (req, res, next) {
  const { room_id } = req.query;
  if (!room_id) {
    return res.status(404).send({ error: "Aucun ID" });
  }

  const messages = await db.users.getPublicMessages(room_id);
  return res.status(200).json(messages);
};

exports.createRoomMessage = async function (req, res, next) {
  const { sender_id, room_id, message } = req.body;

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

  const messages = await db.users.insertNewPulicMessage(params);
  return res.status(200).send(messages);
};
