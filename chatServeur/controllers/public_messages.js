const client = require("../db/demo_mongo");
const ObjectId = require('mongoose').Types.ObjectId;

exports.createRoom = async function(req, res, next) {
    await client.connect();
    const db = client.db("bnzzp8d394kena7");

    const {senderID, message} = req.body;

    if (senderID == null || senderID == undefined || message == null || message == undefined)
    {
        return res.status(404).send({error : "Champs manquant"});
    }

    const params = {sender_id : senderID, message : message};
    db.collection("rooms").insertOne(params);
    return res.status(200).send(params);
}