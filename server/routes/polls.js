const router = require("express").Router();
const fs = require("fs");
let Work = require("../models/work.model");
let Poll = require("../models/poll.model");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

router.route("/").get((req, res) => {
  res.send("JOGOS");
});

const deleteFile = (path) => {
  // check if file exists
  fs.access(path, (err) => {
    if (!err) {
      fs.unlinkSync(path);
      console.log("image deleted");
      return true;
    }
    return false;
  });
};

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
router.get("/poll/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const poll = await Poll.findById(id);
    res.send(poll);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

router.post("/save-poll", async (req, res) => {
  try {
    const newPoll = new Poll({
      ...req.body,
    });
    if (req.body._id) {
      newPoll.isNew = false;
    }
    newPoll.save(function (err, saved) {
      if (err) {
        console.log(err);
      } else {
        res.send(newPoll);
      }
    });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

router.delete("/delete-poll/:id", async (req, res) => {
  try {
    const { id } = req.params;

    Poll.findById(id, async function (err, result) {
      if (err) {
        res.send(err);
      } else {
        // delete poll thumbnail
        deleteFile(result.thumbnail.server_path);

        await Poll.findOneAndDelete({ _id: result._id });
        res.send("Categoria eliminado com sucesso");
      }
    });
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

router.get("/work/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const work = await Work.findById(id);
    res.send(work);
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

    Work.findById(id, async function (err, result) {
      if (err) {
        res.send(err);
      } else {
        // delete image
        deleteFile(result.photo.server_path);
        await Work.findOneAndDelete({ _id: result._id });
        res.send("trabalho eliminado com sucesso");
      }
    });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

router.post("/vote", async (req, res) => {
  try {
    // verify email
    const work = await Work.findById(req.body.workId);
    // const voteExists = work.votes.findIndex(
    //   (vote) => vote.email === encryptedEmail
    // );
    let flagExists = false;
    for (const vote of work.votes) {
      let res = await bcrypt.compare(req.body.email, vote.email);
      if (res) flagExists = true;
    }
    // if email not exists in the work votes yet
    if (!flagExists) {
      // encrypt
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(req.body.email, salt);
      const encryptedEmail = hash;
      // store
      work.votes.push({
        email: encryptedEmail,
      });
      await work.save();
      res.send(work);
    } else {
      console.log("user already voted");
      res.status(500).send({ message: "Este email já votou neste trabalho!" });
    }
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

module.exports = router;
