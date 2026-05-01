const shortid = require("shortid");
const URL = require("../modeljs/url");

// CREATE
async function handleGenerateNewShortURL(req, res) {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "url is required" });
  }

  const shortID = shortid();

  await URL.create({
    shortId: shortID,
    redirectURL: url,
    visitHistory: [],
    userId: req.user.id,
  });

  return res.json({
    shortId: shortID,
    shortUrl: `http://localhost:8001/url/${shortID}`,
  });
}

// REDIRECT
async function redirect(req, res) {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    }
  );

  if (!entry) {
    return res.status(404).json({ error: "URL not found" });
  }

  res.redirect(entry.redirectURL);
}

// ANALYTICS
async function handleGetAnalytics(req, res) {
  const { shortId } = req.params;

  const result = await URL.findOne({
    shortId,
    userId: req.user.id,
  });

  if (!result) {
    return res.status(404).json({ error: "URL not found" });
  }

  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

// 🔥 NEW — GET ALL USER URLS
async function getUserUrls(req, res) {
  try {
    const urls = await URL.find({ userId: req.user.id });
    return res.json(urls);
  } catch {
    return res.status(500).json({ error: "Failed to fetch URLs" });
  }
}

module.exports = {
  handleGenerateNewShortURL,
  redirect,
  handleGetAnalytics,
  getUserUrls,
};