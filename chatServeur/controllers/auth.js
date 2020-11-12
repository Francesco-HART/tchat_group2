//exports.signIn = (req, res, next) => signIn(req, res, next);
//exports.signOut = (req, res, next) => signOut(req, res, next);
const db = require("../db/mongo");

exports.loginUser = async (req, res, next) => {
  const { pseudo, password } = req.query;
  console.log(password);
  if (
    password === null ||
    password === undefined ||
    pseudo === null ||
    password === undefined
  )
    return res.status(404).json({ error: "Champs manquant" });
  const dataUser = await db.users.isUserAuth({
    pseudo, password
  });
  if (dataUser && !dataUser.error) {
    return res.status(200).json(dataUser);
  } else {
    return res.status(404).json(dataUser.error);
  }
};
