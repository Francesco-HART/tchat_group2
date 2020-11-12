const client = require("../db/demo_mongo");
const ObjectId = require('mongoose').Types.ObjectId;

exports.createRoom = async function(req, res, next) {
    await client.connect();
    const db = client.db("bnzzp8d394kena7");

    const {creator_id, room_name} = req.body;

    if (creator_id == null || creator_id == undefined || room_name == null || room_name == undefined)
    {
        return res.status(404).send({error : "Champs manquant"});
    }


    const params = {creator_id : creator_id, room_name : room_name, users : [creator_id]};
    db.collection("rooms").insertOne(params);
    return res.status(200).send(params);
}