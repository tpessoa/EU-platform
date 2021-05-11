const router = require("express").Router();
let Work = require("../models/work.model");
let Poll = require("../models/poll.model");
const { route } = require("./upload");

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
    const { id } = req.query;
    Poll.findById(id, (err, poll) => {
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
    const { _id, title, description, thumbnail } = req.body;
    console.log(req.body);
    Poll.findOneAndUpdate(
      { _id: _id },
      { title: title, description: description, thumbnail: thumbnail },
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

router.delete("/delete-poll/:id", async (req, res) => {
  try {
    const { id } = req.params;
    Poll.findOneAndDelete({ _id: id }, function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
    // delete works
    // delete image in server
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

router.get("/all-poll-works/:id", async (req, res) => {
  try {
    const { id } = req.params;
    Work.find({ poll_id: id }, (err, works) => {
      if (err) throw err;
      if (!works) return res.status(500).send({ message: "works not found" });
      res.send(works);
    });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

router.get("/work", async (req, res) => {
  try {
    const { id } = req.query;
    Work.findById(id, (err, work) => {
      if (err) throw err;
      if (!work) return res.status(500).send({ message: "work not found" });
      res.send(work);
    });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

router.post("/save-work", async (req, res) => {
  try {
    console.log(req.body);
    const newWork = new Work({
      ...req.body,
    });
    if (req.body._id) {
      newWork.isNew = false;
    }
    newWork.save(function (err, saved) {
      if (err) {
        console.log(err);
      } else {
        res.send(newWork);
      }
    });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

router.delete("/delete-work/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    Work.findOneAndDelete({ _id: id }, function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
    // delete image
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

module.exports = router;
