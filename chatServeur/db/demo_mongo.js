require("dotenv").config();
const { MongoClient } = require("mongodb");

const MONGO_URI =
  "mongodb://uq6uyt020a3iwte4amvc:EP2YZPueMLVHWrnAdcuu@bnzzp8d394kena7-mongodb.services.clever-cloud.com:27017/bnzzp8d394kena7";
const client = new MongoClient(MONGO_URI);

async function main() {
  await client.connect(); // on se connecte au serveur mongo
  const db = client.db("bnzzp8d394kena7"); // use DaMovies

  // const coll_list = await db.collections()
  // console.log({ colls: coll_list[0].s })
}
module.exports = client;
main();
