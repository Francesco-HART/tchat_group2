module.exports = (app) => {
  require("./routes/auth")(app);
  require("./routes/rooms")(app);
  require("./routes/public_message")(app);
  require("./routes/private_message")(app);
};
