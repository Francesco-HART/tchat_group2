// ne fonctionne pas , pk? idk

require('dotenv').config()
const { MongoClient } = require('mongodb')
const passwordHash = require('password-hash');
/*
const MONGO_URI = /*process.env.MONGO_URI || */ 'mongodb://uq6uyt020a3iwte4amvc:EP2YZPueMLVHWrnAdcuu@bnzzp8d394kena7-mongodb.services.clever-cloud.com:27017/bnzzp8d394kena7'
const DB_NAME =  "bnzzp8d394kena7";
const DB_COLLECTION_USERS =  "users";
const DB_COLLECTION_MSG =  "message";
*/

class MongoClass{
    constructor() {
        this.db = this.dbConnect()
    }


    getDb(){
        return this.db;
    }


    async getCollectionUser(){
        const db = await this.getDb();
        return db.collection("users");
    }

    async getUser(data) {
        console.log("try get user")
        const collection = await this.getCollectionUser();
        return await collection.findOne({pseudo: data.pseudo})
    }
    async insertUSer(data){
        const dbData = this.getUser(data)
        if (dbData===null || dbData===undefined){
            const hashedPassword = passwordHash.generate(data.password);
            const db = await this.getDb();
            await db.collection("users").insertOne( { "pseudo" : data.pseudo, "password": hashedPassword } )
            return true;
        }
        else{
            return false;
        }
    }
    async isUserExist(data){
        const dbData = this.getUser(data)
        const hashedPassword = dbData.password;
        return passwordHash.verify(data.password, hashedPassword);
    }
    async dbConnect(dbName = "bnzzp8d394kena7"){
        const client = new MongoClient('mongodb://uq6uyt020a3iwte4amvc:EP2YZPueMLVHWrnAdcuu@bnzzp8d394kena7-mongodb.services.clever-cloud.com:27017/bnzzp8d394kena7')
        await client.connect() // on se connecte au serveur mongo
        return client.db(dbName) // use DaMovies
    }
}

exports.MongoClass = MongoClass
