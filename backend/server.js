const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let campuses = [
  {
    name: "Vijayawada",
    ip: "20.20.20.1",
    latency: 12,
    traffic: 148,
    status: "Connected",
  },
  {
    name: "Hyderabad",
    ip: "20.20.20.2",
    latency: 15,
    traffic: 172,
    status: "Connected",
  },
  {
    name: "Research Campus",
    ip: "20.20.20.3",
    latency: 18,
    traffic: 135,
    status: "Connected",
  },
];

// Simulate live traffic
setInterval(() => {
  campuses = campuses.map((c) => ({
    ...c,
    latency: Math.max(
      8,
      Math.min(30, c.latency + Math.floor(Math.random() * 5) - 2)
    ),
    traffic: Math.max(
      80,
      Math.min(250, c.traffic + Math.floor(Math.random() * 25) - 12)
    ),
  }));
}, 1000);

// Health check
app.get("/", (req, res) => {
  res.send("KLU Virtual WAN Backend Running");
});

// Live campus status
app.get("/api/network-status", (req, res) => {
  res.json(campuses);
});

// Dashboard metrics
app.get("/api/metrics", (req, res) => {
  const totalTraffic = campuses.reduce((sum, c) => sum + c.traffic, 0);

  res.json({
    virtualHubs: 1,
    campuses: 3,
    vpnGateway: "Healthy",
    totalTraffic,
  });
});

// Azure resources
app.get("/api/resources", (req, res) => {
  res.json({
    hub: "KLU HUB",
    location: "Central India",
    vnets: ["VNet1", "VNet2"],
    gateway: "Azure VPN Gateway",
    virtualWan: "KLU Virtual WAN",
  });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});