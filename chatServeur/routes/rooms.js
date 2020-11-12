//const { requireAuth, requireAdmin } = require("../middlewares");
const Rooms = require("../controllers/rooms");

module.exports = (app) => {
  app.post("/api/rooms", Rooms.createRoom);
  app.get("/api/rooms", Rooms.getRoomWithMessages);
};
