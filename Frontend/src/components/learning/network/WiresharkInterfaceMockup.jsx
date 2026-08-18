import { memo } from 'react';

const WiresharkInterfaceMockup = memo(function WiresharkInterfaceMockup() {
  return (
    <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
      <svg viewBox="0 0 1000 700" style={{ width: '100%', height: 'auto' }}>
        {/* Main container */}
        <rect x="20" y="20" width="960" height="660" rx="8" fill="rgba(10, 15, 25, 0.95)" stroke="rgba(45, 214, 143, 0.3)" strokeWidth="2" />
        
        {/* Title bar */}
        <rect x="20" y="20" width="960" height="40" rx="8" fill="rgba(45, 214, 143, 0.1)" />
        <text x="40" y="45" fill="#2dd68f" fontSize="16" fontWeight="700" fontFamily="'Sora', sans-serif">
          Wireshark Interface
        </text>

        {/* Filter bar */}
        <rect x="40" y="80" width="920" height="35" rx="4" fill="rgba(0, 0, 0, 0.6)" stroke="rgba(45, 214, 143, 0.3)" strokeWidth="1.5" />
        <text x="55" y="103" fill="rgba(171, 207, 201, 0.7)" fontSize="14" fontFamily="'Courier New', monospace">
          tcp.port == 443
        </text>
        <text x="880" y="103" fill="#2dd68f" fontSize="12" fontWeight="600" fontFamily="'Sora', sans-serif">
          Apply
        </text>
        <text x="940" y="60" fill="rgba(171, 207, 201, 0.6)" fontSize="11" fontFamily="'Oxanium', sans-serif">
          Display Filter
        </text>

        {/* Packet List Pane */}
        <g>
          <rect x="40" y="130" width="920" height="180" rx="4" fill="rgba(0, 0, 0, 0.5)" stroke="rgba(2, 168, 154, 0.3)" strokeWidth="1.5" />
          
          {/* Header */}
          <rect x="40" y="130" width="920" height="30" fill="rgba(45, 214, 143, 0.12)" />
          <text x="60" y="150" fill="#2dd68f" fontSize="12" fontWeight="700" fontFamily="'Sora', sans-serif">No.</text>
          <text x="120" y="150" fill="#2dd68f" fontSize="12" fontWeight="700" fontFamily="'Sora', sans-serif">Time</text>
          <text x="220" y="150" fill="#2dd68f" fontSize="12" fontWeight="700" fontFamily="'Sora', sans-serif">Source</text>
          <text x="380" y="150" fill="#2dd68f" fontSize="12" fontWeight="700" fontFamily="'Sora', sans-serif">Destination</text>
          <text x="560" y="150" fill="#2dd68f" fontSize="12" fontWeight="700" fontFamily="'Sora', sans-serif">Protocol</text>
          <text x="660" y="150" fill="#2dd68f" fontSize="12" fontWeight="700" fontFamily="'Sora', sans-serif">Info</text>
          
          {/* Sample rows */}
          {[
            { no: '1', time: '0.000000', src: '192.168.1.10', dst: '93.184.216.34', proto: 'TCP', info: 'SYN Seq=0', color: 'rgba(255, 200, 100, 0.3)' },
            { no: '2', time: '0.015234', src: '93.184.216.34', dst: '192.168.1.10', proto: 'TCP', info: 'SYN, ACK Seq=0 Ack=1', color: 'rgba(255, 200, 100, 0.3)' },
            { no: '3', time: '0.015456', src: '192.168.1.10', dst: '93.184.216.34', proto: 'TCP', info: 'ACK Seq=1 Ack=1', color: 'rgba(255, 200, 100, 0.3)' },
            { no: '4', time: '0.016789', src: '192.168.1.10', dst: '8.8.8.8', proto: 'DNS', info: 'Standard query A example.com', color: 'rgba(100, 150, 255, 0.3)' },
            { no: '5', time: '0.025123', src: '8.8.8.8', dst: '192.168.1.10', proto: 'DNS', info: 'Standard query response', color: 'rgba(100, 150, 255, 0.3)' },
          ].map((row, i) => (
            <g key={i}>
              <rect x="40" y={170 + i * 25} width="920" height="25" fill={row.color} />
              <text x="60" y={187 + i * 25} fill="rgba(224, 224, 224, 0.9)" fontSize="11" fontFamily="'Courier New', monospace">{row.no}</text>
              <text x="120" y={187 + i * 25} fill="rgba(224, 224, 224, 0.9)" fontSize="11" fontFamily="'Courier New', monospace">{row.time}</text>
              <text x="220" y={187 + i * 25} fill="rgba(224, 224, 224, 0.9)" fontSize="11" fontFamily="'Courier New', monospace">{row.src}</text>
              <text x="380" y={187 + i * 25} fill="rgba(224, 224, 224, 0.9)" fontSize="11" fontFamily="'Courier New', monospace">{row.dst}</text>
              <text x="560" y={187 + i * 25} fill={row.proto === 'TCP' ? '#ffc864' : '#6496ff'} fontSize="11" fontWeight="600" fontFamily="'Courier New', monospace">{row.proto}</text>
              <text x="660" y={187 + i * 25} fill="rgba(224, 224, 224, 0.9)" fontSize="11" fontFamily="'Courier New', monospace">{row.info}</text>
            </g>
          ))}
          
          <text x="50" y="120" fill="rgba(171, 207, 201, 0.6)" fontSize="11" fontFamily="'Oxanium', sans-serif">
            Packet List — Summary of captured packets
          </text>
        </g>

        {/* Packet Details Pane */}
        <g>
          <rect x="40" y="330" width="920" height="180" rx="4" fill="rgba(0, 0, 0, 0.5)" stroke="rgba(2, 168, 154, 0.3)" strokeWidth="1.5" />
          
          <text x="60" y="355" fill="#2dd68f" fontSize="12" fontWeight="700" fontFamily="'Sora', sans-serif">▼ Ethernet II</text>
          <text x="80" y="378" fill="rgba(171, 207, 201, 0.7)" fontSize="11" fontFamily="'Courier New', monospace">Destination: aa:bb:cc:dd:ee:ff</text>
          <text x="80" y="395" fill="rgba(171, 207, 201, 0.7)" fontSize="11" fontFamily="'Courier New', monospace">Source: 11:22:33:44:55:66</text>
          
          <text x="60" y="420" fill="#02a89a" fontSize="12" fontWeight="700" fontFamily="'Sora', sans-serif">▼ Internet Protocol Version 4</text>
          <text x="80" y="443" fill="rgba(171, 207, 201, 0.7)" fontSize="11" fontFamily="'Courier New', monospace">Source: 192.168.1.10</text>
          <text x="80" y="460" fill="rgba(171, 207, 201, 0.7)" fontSize="11" fontFamily="'Courier New', monospace">Destination: 93.184.216.34</text>
          
          <text x="60" y="485" fill="#2dd68f" fontSize="12" fontWeight="700" fontFamily="'Sora', sans-serif">▼ Transmission Control Protocol</text>
          <text x="80" y="505" fill="rgba(171, 207, 201, 0.7)" fontSize="11" fontFamily="'Courier New', monospace">Flags: 0x002 (SYN)</text>
          
          <text x="50" y="320" fill="rgba(171, 207, 201, 0.6)" fontSize="11" fontFamily="'Oxanium', sans-serif">
            Packet Details — Protocol tree dissection
          </text>
        </g>

        {/* Packet Bytes Pane */}
        <g>
          <rect x="40" y="530" width="920" height="130" rx="4" fill="rgba(0, 0, 0, 0.5)" stroke="rgba(2, 168, 154, 0.3)" strokeWidth="1.5" />
          
          <text x="60" y="555" fill="rgba(171, 207, 201, 0.7)" fontSize="11" fontFamily="'Courier New', monospace">0000  aa bb cc dd ee ff 11 22 33 44 55 66 08 00 45 00</text>
          <text x="60" y="575" fill="rgba(171, 207, 201, 0.7)" fontSize="11" fontFamily="'Courier New', monospace">0010  00 3c 1c 46 40 00 40 06 b1 e6 c0 a8 01 0a 5d b8</text>
          <text x="60" y="595" fill="rgba(171, 207, 201, 0.7)" fontSize="11" fontFamily="'Courier New', monospace">0020  d8 22 00 14 01 bb 00 00 00 00 00 00 00 00 a0 02</text>
          <text x="60" y="615" fill="rgba(171, 207, 201, 0.7)" fontSize="11" fontFamily="'Courier New', monospace">0030  72 10 fe 30 00 00 02 04 05 b4 04 02 08 0a 00 00</text>
          <text x="60" y="635" fill="rgba(171, 207, 201, 0.7)" fontSize="11" fontFamily="'Courier New', monospace">0040  00 00 00 00 00 00 01 03 03 07</text>
          
          <text x="50" y="520" fill="rgba(171, 207, 201, 0.6)" fontSize="11" fontFamily="'Oxanium', sans-serif">
            Packet Bytes — Raw hexadecimal and ASCII
          </text>
        </g>
      </svg>

      <style>{`
        @media (max-width: 768px) {
          svg text {
            font-size: 9px;
          }
        }
      `}</style>
    </div>
  );
});

export default WiresharkInterfaceMockup;
