const router = require("express").Router();
const User = require("../models/user.model");

const bcrypt = require("bcryptjs");
const saltRounds = 10;

const LocalStrategy = require("passport-local");
const passportJWT = require("passport-jwt");
const passport = require("passport");
const jwt = require("jsonwebtoken");

// Passport config
router.use(passport.initialize());

JWTStrategy = passportJWT.Strategy;

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) throw err;
      if (!user) return done(null, false);
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) throw err;
        if (result) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    });
  })
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY,
    },
    (jwt_payload, done) => {
      User.findById(jwt_payload.user._id, (err, user) => {
        if (err) throw err;
        if (!user)
          return done(null, false, {
            message: "Token not matched",
          });
        return done(null, { username: user.username });
      });
    }
  )
);

router.post("/login", (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);

    passport.authenticate("local", (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.json({ message: "Username ou Password incorreto(s)!" });
      }
      req.login(user, () => {
        const body = {
          _id: user.id,
          username: user.username,
        };
        const token = jwt.sign({ user: body }, process.env.SECRET_KEY);
        return res.json({ token: token, message: "Sucesso" });
      });
    })(req, res, next);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

router.get(
  "/secret",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (!req.user) {
      res.json({ username: "nobody" });
    } else {
      res.json(req.user);
    }
  }
);

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);

    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        // Store hash in your password DB.
        console.log(hash);
      });
    });

    res.send("ok");
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

module.exports = router;
