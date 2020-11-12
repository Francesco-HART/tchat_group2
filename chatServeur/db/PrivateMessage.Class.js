require("dotenv").config();
const { MongoClient } = require("mongodb");
const passwordHash = require("password-hash");
const ObjectId = require("mongoose").Types.ObjectId;

//model du user = {pseudo: "", password:"", }
//voir pour les message, msg (user: {msg:[id1, id2, id3]}
//si on fait une collection users et une messages, ou direct les messages associé aux user (tableau de msg)

class PrivateMessageClass {
  constructor() {
    this.db = this.dbConnect();
  }

  // pourrait surement etre ameliorer, pour ne pas avoir a faire un await sur chaque getDb()
  async dbConnect(dbName = "bnzzp8d394kena7") {
    const client = new MongoClient(
      "mongodb://uq6uyt020a3iwte4amvc:EP2YZPueMLVHWrnAdcuu@bnzzp8d394kena7-mongodb.services.clever-cloud.com:27017/bnzzp8d394kena7"
    );
    await client.connect(); //  connexion au serveur mongo
    return client.db(dbName); // use our database
  }

  getDb() {
    return this.db;
  }

  //region  private msg
  async getCollectionPrivateMessage() {
    const db = await this.getDb();
    return db.collection("private_messages");
  }

  async getSenderUserPrivateMessage(user_id) {
    const collection = await this.getCollectionPrivateMessage();
    const messages = await collection
      .find({ sender_id: ObjectId(user_id) })
      .toArray();
    return messages;
  }

  async getReceiverUserPrivateMessage(user_id) {
    const collection = await this.getCollectionPrivateMessage();
    const messages = await collection
      .find({ receiver_id: ObjectId(user_id) })
      .toArray();
    return messages;
  }

  async getAddPrivateMessage(params) {
    const collection = await this.getCollectionPrivateMessage();
    const messages = await collection.insertOne(params);
  }
  //endregion

  async findMessageByUserName(data) {
    const collection = await this.getCollectionPrivateMessage();
    return await collection.find({ pseudo: data.pseudo });
  }
}

module.exports = PrivateMessageClass;
