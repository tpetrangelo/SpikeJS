const express = require("express");
const router = express.Router();
const pool = require("../../db");

//Get All Subreddits
router.get("/", async (req, res) => {
  try {
    const allSubreddits = await pool.query("SELECT * from ts");

    res.json(allSubreddits.rows);
  } catch (err) {
    console.err(err.message);
  }
});

// Get Single Subreddit
router.get("/:subreddit", async (req, res) => {
  try {
    const subredditRequested = req.params.subreddit;
    const selectSubreddit = await pool.query(
      "SELECT * FROM ts WHERE subreddit=$1",
      [subredditRequested]
    );
    res.json(selectSubreddit.rows[0]);
  } catch (err) {
    console.err(err.message);
  }
});

//Post Subreddit
router.post("/", async (req, res) => {
  try {
    const newSubreddit = req.body.subreddit;
    const newThreshold = req.body.threshold;

    if (!newSubreddit || !newThreshold) {
      return res
        .status(400)
        .json({ msg: "Please include a subreddit and threshold" });
    }

    console.log(newSubreddit + " " + newThreshold);

    const newSubredditEntry = await pool.query(
      "INSERT INTO ts (subreddit, threshold) VALUES($1,$2) RETURNING *",
      [newSubreddit, newThreshold]
    );

    res.json(newSubredditEntry.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Update Subreddit
router.put("/:subreddit", async (req, res) => {
  try {
    const updatedThreshold = req.body.threshold;
    const subredditRequested = req.params.subreddit;
    await pool.query("UPDATE ts SET threshold=$1 WHERE subreddit=$2", [
      updatedThreshold,
      subredditRequested,
    ]);
    res.json(
      subredditRequested + " was updated to threshold " + updatedThreshold
    );
  } catch (err) {
    console.log(err.message);
  }
});

// Delete Subreddit
router.delete("/:subreddit", async (req, res) => {
  try {
    const subredditRequested = req.params.subreddit;
    await pool.query("DELETE FROM ts WHERE subreddit=$1", [subredditRequested]);
    res.json(subredditRequested + " was deleted");
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
