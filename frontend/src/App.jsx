import TrafficAnalytics from "./TrafficAnalytics";
import AzureArchitecture from "./AzureArchitecture";
import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [time, setTime] = useState(new Date());

  const [selected, setSelected] = useState({
    title: "KLU HUB",
    vnet: "Connected VNets",
    subnet: "HubSubnet",
    gateway: "Azure Virtual WAN",
    status: "Healthy",
    traffic: "391 Mbps",
  });

  const [sites, setSites] = useState([]);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/network");
      const data = await res.json();

      setSites(data.campuses);
      setTime(new Date(data.timestamp));
    } catch (err) {
      console.log("Backend not connected", err);
    }
  };

  fetchData();
  const timer = setInterval(fetchData, 1000);

  return () => clearInterval(timer);
}, []);

  const totalTraffic = sites.reduce((sum, s) => sum + s.traffic, 0);

  return (
    <div className="min-h-screen bg-[#07152b] text-white p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">KLU Virtual WAN</h1>
          <p className="text-blue-300">
            Enterprise Multi-Campus Network Monitoring Dashboard
          </p>
        </div>

        <div className="text-right">
          <div className="bg-green-600 px-4 py-2 rounded-xl font-semibold mb-2">
            ● Connected
          </div>
          <p className="text-sm text-blue-200">
            {time.toLocaleTimeString()}
          </p>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <Card title="Virtual Hubs" value="1" />
        <Card title="Campuses" value="3" />
        <Card title="VPN Gateway" value="Healthy" />
        <Card title="Total Traffic" value={`${totalTraffic} Mbps`} />
      </div>

      {/* Traffic Graph */}
      <TrafficAnalytics />

      {/* Live Network Topology */}
      <div className="bg-[#102544] rounded-2xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-5">Live Network Topology</h2>

        <div className="topology">
          <div className="campusColumn">
            {sites.map((site, index) => (
              <div
                key={site.name}
                className="campusNode"
                onClick={() =>
                  setSelected({
                    title: site.name,
                    vnet: index === 2 ? "VNet2" : "VNet1",
                    subnet: index === 2 ? "DBSubnet" : "AppSubnet",
                    gateway: "KLU-HUB Gateway",
                    status: "Connected",
                    traffic: `${site.traffic} Mbps`,
                  })
                }
              >
                <div className="greenDot"></div>
                <strong>{site.name}</strong>
                <span>{site.traffic} Mbps</span>
              </div>
            ))}
          </div>

          <div className="line">
            <div className="packet p1"></div>
            <div className="packet p2"></div>
            <div className="packet p3"></div>
          </div>

          <div
            className="hubNode"
            onClick={() =>
              setSelected({
                title: "KLU HUB",
                vnet: "Connected VNets",
                subnet: "Hub 10.0.0.0/24",
                gateway: "Azure Virtual WAN",
                status: "Healthy",
                traffic: `${totalTraffic} Mbps`,
              })
            }
          >
            KLU HUB
          </div>

          <div className="line">
            <div className="packet p4"></div>
            <div className="packet p5"></div>
          </div>

          <div
            className="cloudNode"
            onClick={() =>
              setSelected({
                title: "Azure Cloud",
                vnet: "Virtual WAN",
                subnet: "VPN Gateway",
                gateway: "Central India",
                status: "Running",
                traffic: `${totalTraffic} Mbps`,
              })
            }
          >
            Azure Cloud
          </div>
        </div>
      </div>

      {/* Azure Resource Inspector */}
      <div className="bg-[#102544] rounded-2xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">
          Azure Resource Inspector
        </h2>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-blue-300">Selected Resource</p>
            <h1 className="text-3xl font-bold mb-5">{selected.title}</h1>

            <div className="space-y-3">
              <Info label="VNet" value={selected.vnet} />
              <Info label="Subnet" value={selected.subnet} />
              <Info label="Gateway" value={selected.gateway} />
              <Info label="Status" value={selected.status} />
              <Info label="Traffic" value={selected.traffic} />
            </div>
          </div>

          <div className="bg-[#163765] rounded-xl p-5">
            <h3 className="font-bold mb-3">Live Azure Metrics</h3>

            <Metric name="CPU Usage" value="24%" />
            <Metric name="Memory" value="61%" />
            <Metric name="Packets/sec" value="12,548" />
            <Metric name="VPN Tunnel" value="Healthy" />
            <Metric name="Encryption" value="AES-256" />
          </div>
        </div>
      </div>

      {/* NEW AZURE ARCHITECTURE SECTION */}
      <AzureArchitecture />

      {/* Global VPN Backbone */}
      <div className="bg-[#102544] rounded-2xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">
          Global VPN Backbone
        </h2>

        <div className="worldMap">
          <div className="mapCampus">
            <div className="pulseNode green">Campus</div>
            <p>India</p>
          </div>

          <div className="vpnLine">
            <div className="vpnPacket"></div>
          </div>

          <div className="mapHub">
            <div className="pulseNode cyan">KLU HUB</div>
            <p>Central India</p>
          </div>

          <div className="vpnLine">
            <div className="vpnPacket delay"></div>
          </div>

          <div className="mapCloud">
            <div className="pulseNode purple">Azure</div>
            <p>Microsoft Cloud</p>
          </div>
        </div>
      </div>

      {/* Live VPN Status */}
      <div className="bg-[#102544] rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-4">Live VPN Status</h2>

        <table className="w-full">
          <thead className="text-blue-300">
            <tr className="border-b border-blue-700">
              <th className="text-left py-3">Campus</th>
              <th className="text-left">IP</th>
              <th className="text-left">Latency</th>
              <th className="text-left">Traffic</th>
              <th className="text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {sites.map((s) => (
              <tr key={s.name} className="border-b border-blue-900">
                <td className="py-4">{s.name}</td>
                <td>{s.ip}</td>
                <td>{s.latency} ms</td>
                <td>{s.traffic} Mbps</td>
                <td>
                  <span className="bg-green-600 px-3 py-1 rounded-full text-sm">
                    Connected
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

/* Reusable Components */

function Card({ title, value }) {
  return (
    <div className="bg-[#14315c] rounded-xl p-5">
      <p className="text-blue-300 text-sm">{title}</p>
      <h3 className="text-3xl font-bold mt-2">{value}</h3>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="flex justify-between border-b border-blue-800 pb-2">
      <span className="text-blue-300">{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Metric({ name, value }) {
  return (
    <div className="flex justify-between py-2 border-b border-blue-900">
      <span>{name}</span>
      <span className="text-cyan-300">{value}</span>
    </div>
  );
}