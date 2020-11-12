//const { requireAuth, requireAdmin } = require("../middlewares");
const MessagePrivate = require("../controllers/private_messages");
const MessagePublic = require("../controllers/public_messages");
module.exports = (app) => {
  //app.get("/api/message", Auth.signIn);
  app.post("/api/message", MessagePrivate.createMessage);
  app.get("/api/getusersentmessages", MessagePrivate.getUserSentMessages);
  app.get(
    "/api/getuserreceivedmessages",
    MessagePrivate.getUserReceivedMessages
  );
  app.post("/api/message/public", MessagePublic.createRoomMessage);
  app.get("/api/message/public", MessagePublic.getRoomsMessages);
};
