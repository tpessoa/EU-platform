const router = require("express").Router();
let Work = require("../models/work.model");
let Poll = require("../models/poll.model");

router.route("/").get((req, res) => {
  res.send("JOGOS");
});

/**
 * POLLS
 */
router.get("/all-polls", async (req, res) => {
  try {
    Poll.find({}, (err, polls) => {
      if (err) throw err;
      if (!polls) return res.status(500).send({ message: "polls not found" });
      res.send(polls);
    });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

/**
 * POLL by ID
 */
router.get("/poll", async (req, res) => {
  try {
    const { pollId } = req.query;
    Poll.findById(pollId, (err, poll) => {
      if (err) throw err;
      if (!poll) return res.status(500).send({ message: "poll not found" });
      res.send(poll);
    });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

router.post("/add-poll", async (req, res) => {
  try {
    console.log(req.body);
    const newPoll = new Poll({
      ...req.body,
    });
    await newPoll.save();
    res.send(newPoll);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

router.post("/update-poll", async (req, res) => {
  try {
    const { _id } = req.body;
    Poll.findOneAndUpdate(
      _id,
      { username: username, password: new_hash },
      { new: true },
      function (err, result) {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      }
    );
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

/**
 * WORKS
 */
router.get("/all-works", async (req, res) => {
  try {
    Work.find({}, (err, works) => {
      if (err) throw err;
      if (!works) return res.status(500).send({ message: "works not found" });
      res.send(works);
    });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

module.exports = router;
