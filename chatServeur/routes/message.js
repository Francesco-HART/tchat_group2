//const { requireAuth, requireAdmin } = require("../middlewares");
const Message = require("../controllers/private_messages");

module.exports = (app) => {
  //app.get("/api/message", Auth.signIn);
  app.post("/api/message", Message.createMessage);
  app.get("/api/getusersentmessages", Message.getUserSentMessages);
  app.get("/api/getuserreceivedmessages", Message.getUserReceivedMessages);

};
