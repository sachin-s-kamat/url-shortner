const express = require("express");
const {
  handleGenerateNewShortURL,
  redirect,
  handleGetAnalytics,
  getUserUrls,
} = require("../controllers/url");

const auth = require("../middlewear/auth");

const router = express.Router();

// 🔥 GET ALL USER URLS
router.get("/", auth, getUserUrls);

// CREATE
router.post("/", auth, handleGenerateNewShortURL);

// ANALYTICS
router.get("/analytics/:shortId", auth, handleGetAnalytics);

// REDIRECT (public)
router.get("/:shortId", redirect);

module.exports = router;