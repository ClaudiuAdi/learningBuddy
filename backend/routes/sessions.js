const express = require("express");
const {
  createSession,
  getSessions,
  getSession,
  deleteSession,
  updateSession,
} = require("../controllers/sessionController");

const router = express.Router();

// GET all sessions
router.get("/", getSessions);

// GET a single session
router.get("/:id", getSession);

// POST a new session
router.post("/", createSession);

// DELETE a session
router.delete("/:id", deleteSession);

// UPDATE a session
router.patch("/:id", updateSession);

module.exports = router;
