//exports.signIn = (req, res, next) => signIn(req, res, next);

//exports.signOut = (req, res, next) => signOut(req, res, next);
const db = require('../db/mongo')

exports.loginUser = async (req, res, next) => {
  const data = req.query;
  const isFind = await db.users.isUserAuth({pseudo: "new user", password:"password"})
  if (isFind){
    return res.status(200).json({isConnected:true, pseudo:data.pseudo});

  }
  else {
    return res.status(200).json({isConnected: false, pseudo: data.pseudo});
  }
};
