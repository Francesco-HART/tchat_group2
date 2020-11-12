require('dotenv').config()
const { MongoClient } = require('mongodb')
const passwordHash = require('password-hash');
const ObjectId = require('mongoose').Types.ObjectId;

//model du user = {pseudo: "", password:"", }
//voir pour les message, msg (user: {msg:[id1, id2, id3]}
//si on fait une collection users et une messages, ou direct les messages associé aux user (tableau de msg)

class MongoClass{
    constructor() {
        this.db = this.dbConnect()
    }

    // pourrait surement etre ameliorer, pour ne pas avoir a faire un await sur chaque getDb()
    async dbConnect(dbName = "bnzzp8d394kena7"){
        const client = new MongoClient('mongodb://uq6uyt020a3iwte4amvc:EP2YZPueMLVHWrnAdcuu@bnzzp8d394kena7-mongodb.services.clever-cloud.com:27017/bnzzp8d394kena7')
        await client.connect() //  connexion au serveur mongo
        return client.db(dbName) // use our database
    }

    getDb(){
        return this.db;
    }

    //region user collection
    async getCollectionUser(){
        const db = await this.getDb();
        return db.collection("users");
    }

    async findUserByPseudo(pseudo) {
        const collection = await this.getCollectionUser();
        return await collection.findOne({pseudo: pseudo})
    }

    /*async findSeveralUserByPseudo(pseudos) {
        const collection = await this.getCollectionUser();
        const result = await collection.find({pseudo: {$in: pseudos}});
        const res = await result.toArray(async function (err, res) {
            if (err) throw err;
            console.log(res);
            return res;
        });
        console.log(res)
        return res;
    }*/

    async insertUser(data){
        const dbData = this.findUserByPseudo(data.pseudo)
        if (dbData===null || dbData===undefined){
            const hashedPassword = passwordHash.generate(data.password);
            const collection = await this.getCollectionUser();
            await collection.insertOne( { "pseudo" : data.pseudo, "password": hashedPassword } )
            return true;
        }
        else{
            return false;
        }
    }

    async isUserAuth(data){
        const dbData = this.findUserByPseudo(data.pseudo)
        const hashedPassword = dbData.password;
        return passwordHash.verify(data.password, hashedPassword);
    }
    //endregion

    //region  private msg
    async getCollectionPrivateMessage(){
        const db = await this.getDb();
        return db.collection("private_messages");
    }

    async getSenderUserPrivateMessage(user_id){
        const collection = await this.getCollectionPrivateMessage();
        const messages = await collection.find({sender_id : ObjectId(user_id)}).toArray();
        return messages;

    }

    async getReceiverUserPrivateMessage(user_id){
        const collection = await this.getCollectionPrivateMessage();
        const messages = await collection.find({receiver_id : ObjectId(user_id)}).toArray();
        return messages;
    }

    async getAddPrivateMessage(params){
        const collection = await this.getCollectionPrivateMessage();
        const messages = await collection.insertOne(params);
    }
    //endregion

    async findMessageByUserName(data) {
        const collection = await this.getCollectionPrivateMessage();
        return await collection.find({pseudo: data.pseudo})
    }


    async getCollectionRooms(){
        const db = await this.getDb();
        return db.collection("rooms");
    }

    async createRoom(params){
        const collection = this.getCollectionRooms();
        await collection.insertOne(params);

    }



    //region public message
    async getCollectionPublicMessage(){
        const db = await this.getDb();
        return db.collection("public_messages");
    }

    async getPublicMessages(room_id){
        const collection = await this.getCollectionPublicMessage();
        const messages = await collection.find({ room_id: ObjectId(room_id) }).toArray();
        return messages;
    }

    async insertNewPulicMessage(params){
        const collection = await this.getCollectionPublicMessage();
        const messages = await collection.insertOne(params);
        return messages;
    }
    //endregion public message
    
}

exports.MongoClass = MongoClass
