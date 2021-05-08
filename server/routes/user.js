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
        return done(null, user);
      });
    }
  )
);

router.post("/login", (req, res, next) => {
  try {
    const { username, password } = req.body;

    passport.authenticate("local", (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res
          .status(500)
          .send({ message: "Username ou Password incorreto(s)!" });
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
    return res.status(500).send({ message: e.message });
  }
});

router.get(
  "/secret",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (!req.user) {
      res.json({ username: "nobody" });
    } else {
      res.json({ id: req.user._id, username: req.user.username });
    }
  }
);

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    // Store hash in your password DB.
    console.log(hash);

    res.send("ok");
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

// get user data to change it
router.get("/user-data", async (req, res) => {
  try {
    const { userId } = req.query;
    User.findById(userId, (err, user) => {
      if (err) throw err;
      if (!user) return res.status(500).send({ message: "user not found" });
      // decrypt password
      // if (bcrypt.compareSync("B4c0/\/", hash)) {
      // }
      res.send("#todo");
    });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

router.post("/user-edit", async (req, res) => {
  try {
    const { userId, username, password } = req.body;
    // encrypt new password
    const salt = bcrypt.genSaltSync(saltRounds);
    const new_hash = bcrypt.hashSync(password, salt);
    User.findOneAndUpdate(
      userId,
      { username: username, password: new_hash },
      { new: true },
      function (err, result) {
        if (err) {
          res.send(err);
        } else {
          const body = {
            _id: userId,
            username: username,
          };
          // new token
          const newToken = jwt.sign({ user: body }, process.env.SECRET_KEY);
          const newObj = {
            ...result._doc,
            token: newToken,
          };
          res.send(newObj);
        }
      }
    );
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

router.post("/user-verification", async (req, res) => {
  try {
    const { userId, password } = req.body;
    let message = "";
    User.findById(userId, async (err, user) => {
      if (err) throw err;
      if (!user) return res.status(500).send({ message: "user not found" });
      // decrypt password
      await bcrypt
        .compare(password, user.password)
        .then((res) => {
          message = res;
        })
        .catch((e) => {
          console.log(e);
          throw new Error(e); // Express will catch this on its own.
        });
      return res.json({ message: message });
    });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

module.exports = router;
