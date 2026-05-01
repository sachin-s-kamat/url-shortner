import { useState } from "react";
import API from "./api";
import "./styles.css";

export default function UrlForm() {
  const [url, setUrl] = useState("");
  const [shortData, setShortData] = useState(null);
  const [analytics, setAnalytics] = useState(null);

  const handleSubmit = async () => {
    if (!url) return alert("Enter a URL");

    try {
      const res = await API.post("/url", { url });
      setShortData(res.data);
      setAnalytics(null);
    } catch {
      alert("Error creating short URL");
    }
  };

  const fetchAnalytics = async () => {
    try {
      const shortId = shortData.shortId;
      const res = await API.get(`/url/analytics/${shortId}`);
      setAnalytics(res.data);
    } catch {
      alert("Failed to fetch analytics");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortData.shortUrl);
    alert("Copied!");
  };

  return (
    <div className="card">
      <h2>Shorten your link</h2>

      <div className="url-box">
        <input
          placeholder="Paste your long URL here..."
          onChange={(e) => setUrl(e.target.value)}
        />
        <button className="btn-primary" onClick={handleSubmit}>
          Shorten
        </button>
      </div>

      {shortData && (
        <div className="result-box">
          <a href={shortData.shortUrl} target="_blank">
            {shortData.shortUrl}
          </a>

          <div style={{ display: "flex", gap: "5px" }}>
            <button className="copy-btn" onClick={copyToClipboard}>
              Copy
            </button>
            <button className="copy-btn" onClick={fetchAnalytics}>
              Stats
            </button>
          </div>
        </div>
      )}

      {analytics && (
        <div style={{ marginTop: "15px" }}>
          <h4>Total Clicks: {analytics.totalClicks}</h4>

          <div style={{ maxHeight: "150px", overflow: "auto" }}>
            {analytics.analytics.map((item, i) => (
              <div key={i} style={{ fontSize: "12px", color: "#94a3b8" }}>
                {new Date(item.timestamp).toLocaleString()}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}