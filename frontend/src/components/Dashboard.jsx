import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import UrlForm from "./UrlForm";
import API from "./api";
import "./styles.css";

export default function Dashboard() {
  const [urls, setUrls] = useState([]);
  const [analyticsMap, setAnalyticsMap] = useState({});

  const fetchUrls = async () => {
    try {
      const res = await API.get("/url");
      setUrls(res.data);
    } catch {
      alert("Failed to load URLs");
    }
  };

  const fetchAnalytics = async (shortId) => {
    try {
      const res = await API.get(`/url/analytics/${shortId}`);
      setAnalyticsMap((prev) => ({
        ...prev,
        [shortId]: res.data.totalClicks,
      }));
    } catch {
      alert("Failed to fetch analytics");
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  return (
    <div className="dashboard">
      <Navbar />

      <div className="main">
        <UrlForm />

        <div className="card" style={{ marginTop: "20px" }}>
          <h3>Your URLs</h3>

          <table style={{ width: "100%", marginTop: "15px" }}>
            <thead>
              <tr>
                <th>Short</th>
                <th>Original</th>
                <th>Clicks</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {urls.map((url) => (
                <tr key={url._id}>
                  <td>
                    <a
                      href={`http://localhost:8001/url/${url.shortId}`}
                      target="_blank"
                    >
                      {url.shortId}
                    </a>
                  </td>

                  <td>{url.redirectURL}</td>

                  <td>{analyticsMap[url.shortId] ?? "-"}</td>

                  <td>
                    <button
                      className="copy-btn"
                      onClick={() => fetchAnalytics(url.shortId)}
                    >
                      Stats
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}