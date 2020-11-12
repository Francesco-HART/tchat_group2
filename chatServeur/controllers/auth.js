//exports.signIn = (req, res, next) => signIn(req, res, next);
const db = require("../db/demo_mongo");

//exports.signOut = (req, res, next) => signOut(req, res, next);
exports.fetchCurrentUser = async (req, res, next) => {
  const user = await db.collection("users").find();
  console.log(user);
  return res.status(200).send();
};
