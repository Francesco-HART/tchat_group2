const passport = require("passport");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const Cookies = require("cookies");
const jwt = require("jsonwebtoken");
const COOKIE_KEY = "vjeqckHAvFOzxrKr6nJQI9Myl2yAOfTp";
const JWT_SECRET_KEY = "LHKXFeep6gxRMC4sdAEFICdOAXBW6Jnb";
const db = require("../db/mongo");
// ------------------------------------- \\
// Local strategy
// ------------------------------------- \\

const localLogin = new LocalStrategy(
  { usernameField: "pseudo" },
  async function (pseudo, password, done) {
    if (
      pseudo === null ||
      pseudo === undefined ||
      password === null ||
      pseudo === undefined
    )
      return done(null, false, {
        error: "champs manquant (pseudo / password)",
      });

    // Compare password
    const dataUser = await db.users.isUserAuth({
      pseudo,
      password,
    });
    if (dataUser && !dataUser.error) {
      delete dataUser.password;
      return done(null, dataUser);
    } else {
      return done(null, false, {
        error: dataUser.error,
      });
    }
  }
);

// ------------------------------------- \\
// JWT Strategy
// ------------------------------------- \\
const cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies && req.cookies.get("jwt"))
    token = req.cookies.get("jwt");
  return token;
};

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    cookieExtractor,
    ExtractJwt.fromAuthHeaderAsBearerToken(),
  ]),
  secretOrKey: JWT_SECRET_KEY,
};

const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  if (payload.sub) done(null, payload.sub);
  else done(null, false);
});

// ------------------------------------- \\
// Signin function
// ------------------------------------- \\
exports.login = (req, res, next) =>
  passport.authenticate("local", { session: false }, (err, auth, info) => {
    if (err) return res.status(500).send(info);
    if (!auth) return res.status(404).send(info);
    // generate JWT
    const timestamp = new Date().getTime() / 1000;
    const token_infos = { auth };
    const token = jwt.sign(
      { sub: token_infos, iat: timestamp },
      JWT_SECRET_KEY,
      { expiresIn: "12h" }
    );
    // set the token into the cookies
    new Cookies(req, res, { keys: [COOKIE_KEY] }).set("jwt", token, {
      maxAge: 12 * 60 * 60 * 1000, // 12h
      signed: true,
      overwrite: true,
    });
    // return
    res.status(200).send(auth);
  })(req, res, next);

// ------------------------------------- \\
// Signout function
// ------------------------------------- \\

exports.signOut = (req, res) => {
  new Cookies(req, res, { keys: [COOKIE_KEY] }).set("jwt");
  res.redirect("/");
};

// use strategies
passport.use(localLogin);
passport.use(jwtLogin);
