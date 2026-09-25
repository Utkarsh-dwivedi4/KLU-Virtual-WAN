const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

let campuses = [
  {
    id: 1,
    name: "Campus 1",
    ip: "20.20.20.1",
    latency: 12,
    traffic: 148,
    status: "Connected",
  },
  {
    id: 2,
    name: "Campus 2",
    ip: "20.20.20.2",
    latency: 15,
    traffic: 172,
    status: "Connected",
  },
  {
    id: 3,
    name: "Campus 3",
    ip: "20.20.20.3",
    latency: 18,
    traffic: 135,
    status: "Connected",
  },
];

app.get("/", (req, res) => {
  res.send("KLU Virtual WAN Backend Running");
});

app.get("/api/network", (req, res) => {
  campuses = campuses.map((site) => ({
    ...site,
    latency: Math.max(
      8,
      Math.min(30, site.latency + Math.floor(Math.random() * 5) - 2)
    ),
    traffic: Math.max(
      100,
      Math.min(220, site.traffic + Math.floor(Math.random() * 20) - 10)
    ),
  }));

  const totalTraffic = campuses.reduce((sum, s) => sum + s.traffic, 0);

  res.json({
    hub: "KLU-HUB",
    region: "Central India",
    gateway: "Healthy",
    totalTraffic,
    timestamp: new Date(),
    campuses,
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});