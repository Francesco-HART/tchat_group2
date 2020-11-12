const client = require("../db/demo_mongo");
const ObjectId = require('mongoose').Types.ObjectId;

exports.getUserSentMessages = async function(req, res, next) {
  await client.connect();
  const db = client.db("bnzzp8d394kena7");
  const {user_id} = req.query
  if (!user_id)
  {
    return res.status(404).send({error : "Aucun ID"});
  }

  const messages = await db.collection("private_messages").find({sender_id : ObjectId(user_id)}).toArray();
  return res.status(200).json(messages);
}

exports.getUserReceivedMessages = async function(req, res, next) {
  await client.connect();
  const db = client.db("bnzzp8d394kena7");
  const {user_id} = req.query
  if (!user_id)
  {
    return res.status(404).send({error : "Aucun ID"});
  }

  const messages = await db.collection("private_messages").find({receiver_id : ObjectId(user_id)}).toArray();
  return res.status(200).json(messages);
}

exports.createMessage = async function(req, res, next) {
  await client.connect();
  const db = client.db("bnzzp8d394kena7");

  const {sender_id, receiver_id, message} = req.body;

  if (sender_id == null || sender_id == undefined || receiver_id == null || receiver_id == undefined || message == null || message == undefined)
  {
    return res.status(404).send({error : "Champs manquant"});
  }

  const params = {sender_id : sender_id, receiver_id : receiver_id, message : message};
  db.collection("private_messages").insertOne(params);
  return res.status(200).send(params);
}


