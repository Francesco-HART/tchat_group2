//const { requireAuth, requireAdmin } = require("../middlewares");
const MessagePrivate = require("../controllers/private_messages");
const MessagePublic = require("../controllers/public_messages");
module.exports = (app) => {
  //app.get("/api/message", Auth.signIn);
  app.post("/api/message/private", MessagePrivate.createMessage);
  app.get("/api/message/user/sent", MessagePrivate.getUserSentMessages);
  app.get("/api/message/user/receive", MessagePrivate.getUserReceivedMessages);
  app.post("/api/message/public", MessagePublic.createRoomMessage);
  app.get("/api/message/public", MessagePublic.getRoomsMessages);
};
