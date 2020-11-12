//const { requireAuth, requireAdmin } = require("../middlewares");
const User = require("../controllers/user");

module.exports = (app) => {
  //app.get("/api/message", Auth.signIn);
  app.get("/api/user", User.get);
  //app.put("/api/user", Auth.get);
};
