const {MongoClass} = require('./Mongo.Class');

const db = {
    users: new MongoClass(),
}
module.exports = db;