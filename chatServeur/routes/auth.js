const { requireAuth } = require("../middlewares");
const Auth = require("../controllers/auth");

module.exports = (app) => {
  //app.post("/api/signin", Auth.signIn);
  app.get("/api/signout", requireAuth, Auth.signOut);
  app.get("/api/login", Auth.login);
  app.get("/api/curren", Auth.fetchCurrentUser);
};
