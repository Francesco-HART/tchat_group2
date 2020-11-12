//exports.signIn = (req, res, next) => signIn(req, res, next);
const client = require("../db/demo_mongo");

//exports.signOut = (req, res, next) => signOut(req, res, next);
exports.fetchCurrentUser = async (req, res, next) => {
  await client.connect(); // on se connecte au serveur mongo
  const db = client.db("bnzzp8d394kena7"); // use DaMovies
  const user = await db.collection("users").find();
  console.log(user);
  return res.status(200).send();
};
