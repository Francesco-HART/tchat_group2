require('dotenv').config()
const { MongoClient } = require('mongodb')
const passwordHash = require('password-hash');

class MongoClass{
    constructor() {
        this.db = this.dbConnect()
    }

    async dbConnect(dbName = "bnzzp8d394kena7"){
        const client = new MongoClient('mongodb://uq6uyt020a3iwte4amvc:EP2YZPueMLVHWrnAdcuu@bnzzp8d394kena7-mongodb.services.clever-cloud.com:27017/bnzzp8d394kena7')
        await client.connect() //  connexion au serveur mongo
        return client.db(dbName) // use our database
    }

    getDb(){
        return this.db;
    }

    async getCollectionUser(){
        const db = await this.getDb();
        return db.collection("users");
    }

    async findUser(data) {
        console.log("try get user")
        const collection = await this.getCollectionUser();
        return await collection.findOne({pseudo: data.pseudo})
    }

    async insertUser(data){
        const dbData = this.findUser(data)
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

    async isUserAuth(data){
        const dbData = this.findUser(data)
        const hashedPassword = dbData.password;
        return passwordHash.verify(data.password, hashedPassword);
    }
}

exports.MongoClass = MongoClass
