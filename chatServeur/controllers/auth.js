//exports.signIn = (req, res, next) => signIn(req, res, next);
//exports.signOut = (req, res, next) => signOut(req, res, next);
const db = require("../db/mongo");
const { login, signOut } = require("../services/auth");
exports.login = (req, res, next) => login(req, res, next);
exports.signOut = (req, res, next) => signOut(req, res, next);
exports.fetchCurrentUser = function (req, res, next) {
  return res.status(200).send(req.user);
};
