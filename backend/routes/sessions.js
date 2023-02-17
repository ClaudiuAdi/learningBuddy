const express = require("express");
const {
  createSession,
  getSessions,
  getSession,
  deleteSession,
  updateSession,
} = require("../controllers/sessionController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all sessions routes
router.use(requireAuth);

// GET all sessions
router.get("/", getSessions);

// GET a single session
router.get("/:id", getSession);

// POST a new session
router.post("/", createSession);

// DELETE a session
router.delete("/:id", deleteSession);

// UPDATE a session
router.put("/:id", updateSession);

module.exports = router;
