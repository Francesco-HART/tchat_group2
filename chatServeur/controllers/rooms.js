const db = require('../db/mongo')

exports.createRoom = async function(req, res, next) {
    const {creator_id, room_name} = req.body;

    if (creator_id == null || creator_id == undefined || room_name == null || room_name == undefined)
    {
        return res.status(404).send({error : "Champs manquant"});
    }

    const params = {creator_id : creator_id, room_name : room_name, users : [creator_id]};
    await db.users.createRoom(params);
    return res.status(200).send(params);
}