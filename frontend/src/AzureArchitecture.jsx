export default function AzureArchitecture() {
  return (
    <div className="bg-[#102544] rounded-2xl p-6 mb-8">
      <h2 className="text-2xl font-bold mb-5 text-white">
        Azure Resource Architecture
      </h2>

      <div className="architecture">

        {/* Campus */}
        <div className="archBox campus">
          <div className="statusDot"></div>
          <h3>Campus 1</h3>
          <p>20.20.20.1</p>
        </div>

        <div className="archLine"></div>

        {/* VPN Site */}
        <div className="archBox site">
          <h3>VPN Site</h3>
          <p>Branch Office</p>
        </div>

        <div className="archLine"></div>

        {/* VPN Gateway */}
        <div className="archBox gateway">
          <h3>VPN GW</h3>
          <p>IPSec Tunnel</p>
        </div>

        <div className="archLine"></div>

        {/* Virtual Hub */}
        <div className="archBox hub">
          <h3>KLU HUB</h3>
          <p>Virtual WAN</p>
          <small>Central India</small>
        </div>

        <div className="archLine"></div>

        {/* VNet */}
        <div className="archBox vnet">
          <h3>VNet1</h3>
          <p>10.1.0.0/16</p>
        </div>

        <div className="archLine"></div>

        {/* Azure */}
        <div className="archBox cloud">
          <h3>Azure</h3>
          <p>Cloud</p>
        </div>

      </div>

      {/* Legend */}
      <div className="legend">
        <span><div className="lg green"></div> Campus Connected</span>
        <span><div className="lg blue"></div> IPSec Tunnel</span>
        <span><div className="lg yellow"></div> Hub Routing</span>
      </div>
    </div>
  );
}