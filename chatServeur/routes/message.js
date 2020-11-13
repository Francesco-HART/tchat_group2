//const { requireAuth, requireAdmin } = require("../middlewares");
const MessagePrivate = require("../controllers/private_messages");
const MessagePublic = require("../controllers/public_messages");
const { requireAuth } = require("../middlewares");

module.exports = (app) => {
  //app.get("/api/message", Auth.signIn);
  app.post("/api/message/private", requireAuth,  MessagePrivate.createMessage);
  app.get("/api/message/user/sent", requireAuth, MessagePrivate.getUserSentMessages);
  app.get("/api/message/user/receive", requireAuth, MessagePrivate.getUserReceivedMessages);
  app.post("/api/message/public", requireAuth, MessagePublic.sendPublicMessage);
  app.get("/api/message/public", requireAuth, MessagePublic.getPublicMessage);
};
