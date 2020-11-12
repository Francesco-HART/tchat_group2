module.exports = (app) => {
  require("./routes/auth")(app);
  require("./routes/rooms")(app);
  require("./routes/message")(app);
};
