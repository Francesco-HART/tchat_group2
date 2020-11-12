module.exports = (app) => {
  require("./routes/auth")(app);
  //require("./routes/user")(app);
  require("./routes/public_message")(app);
  require("./routes/private_message")(app);
};
