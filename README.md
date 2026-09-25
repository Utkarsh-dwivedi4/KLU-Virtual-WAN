# 🌐 KLU Virtual WAN – Enterprise Multi-Campus Network Monitoring

A Microsoft Azure based Virtual WAN dashboard that simulates secure connectivity between multiple KLU campuses using Azure Virtual WAN, VPN Gateway, Virtual Networks and Hub architecture.

## 📌 Project Overview

KLU Virtual WAN is a network monitoring dashboard developed for a hackathon. It visualizes how three university campuses connect securely through a centralized Azure Virtual WAN Hub.

The project contains:

- 🎨 React + Vite Frontend Dashboard
- ⚙️ Node.js + Express Backend API
- ☁️ Azure Virtual WAN Architecture
- 📊 Real-time traffic & latency simulation

---

## 🏗️ Architecture

Campus 1 ─┐
           │
Campus 2 ──┼── Azure Virtual WAN Hub ── VPN Gateway ── Azure Cloud
           │
Campus 3 ─┘

Technologies used:

- Microsoft Azure Virtual WAN
- Azure Virtual Network (VNet)
- Azure VPN Gateway
- React + Vite
- Node.js + Express
- Recharts

---

## 📁 Repository Structure

KLU-Virtual-WAN/

├── frontend/ # React Dashboard

├── backend/ # Express Backend

├── Azure/ # Azure resource screenshots

└── README.md

---

## ✨ Features

- Live Network Topology
- VPN Site Status
- Azure Resource Inspector
- Global VPN Backbone
- Traffic Analytics Graph
- Dynamic latency simulation
- Interactive Azure architecture visualization

---

## 🚀 Frontend Setup

```bash
cd frontend
npm install
npm run dev
