//const { requireAuth, requireAdmin } = require("../middlewares");
const Rooms = require("../controllers/rooms");
const { requireAuth } = require("../middlewares");

module.exports = (app) => {
  app.post("/api/rooms", requireAuth,  Rooms.createRoom);
  app.get("/api/rooms", Rooms.getRoomWithMessages);
  app.get("/api/all-rooms", Rooms.getRoom);

};
