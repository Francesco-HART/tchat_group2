const { signIn, signOut } = require("../services/auth");
const Config = require("../config");
const bcrypt = require("bcryptjs");

exports.fetchCurrentUser = function (req, res, next) {
  return res.status(200).send(req.user);
};
