const client = require("../db/demo_mongo");
const ObjectId = require("mongoose").Types.ObjectId;

exports.getRoomsMessages = async function (req, res, next) {
  await client.connect();
  const db = client.db("bnzzp8d394kena7");
  const { room_id } = req.query;
  if (!room_id) {
    return res.status(404).send({ error: "Aucun ID" });
  }

  const messages = await db
    .collection("public_messages")
    .find({ room_id: ObjectId(room_id) })
    .toArray();

  return res.status(200).json(messages);
};

exports.createRoomMessage = async function (req, res, next) {
  await client.connect();
  const db = client.db("bnzzp8d394kena7");

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

  const messages = await db.collection("public_messages").insertOne(params);
  return res.status(200).send(messages);
};
