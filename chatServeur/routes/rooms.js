//const { requireAuth, requireAdmin } = require("../middlewares");
const Rooms = require("../controllers/rooms");

module.exports = (app) => {
  app.get("/api/add-room", Rooms.createRoom);
  app.get("/api/rooms", Rooms.getRoomWithMessages);
  app.get("/api/all-rooms", Rooms.getRoom);
};
