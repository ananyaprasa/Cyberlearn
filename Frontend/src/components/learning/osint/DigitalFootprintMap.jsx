import { memo, useState } from 'react';

const DigitalFootprintMap = memo(function DigitalFootprintMap() {
  const [activeNode, setActiveNode] = useState(null);

  const nodes = [
    { id: 'target', x: 450, y: 250, label: 'Target', color: '#2dd68f', size: 50 },
    { id: 'domain', x: 300, y: 150, label: 'Domains', color: '#02a89a', size: 40 },
    { id: 'email', x: 600, y: 150, label: 'Emails', color: '#02a89a', size: 40 },
    { id: 'social', x: 200, y: 300, label: 'Social Media', color: '#02a89a', size: 40 },
    { id: 'docs', x: 700, y: 300, label: 'Documents', color: '#02a89a', size: 40 },
    { id: 'infra', x: 350, y: 400, label: 'Infrastructure', color: '#02a89a', size: 40 },
    { id: 'people', x: 550, y: 400, label: 'People', color: '#02a89a', size: 40 },
  ];

  const connections = [
    { from: 'target', to: 'domain' },
    { from: 'target', to: 'email' },
    { from: 'target', to: 'social' },
    { from: 'target', to: 'docs' },
    { from: 'target', to: 'infra' },
    { from: 'target', to: 'people' },
  ];

  return (
    <div style={{ width: '100%', maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
      <svg viewBox="0 0 900 500" style={{ width: '100%', height: 'auto' }}>
        {/* Connections */}
        {connections.map((conn, i) => {
          const from = nodes.find(n => n.id === conn.from);
          const to = nodes.find(n => n.id === conn.to);
          return (
            <line
              key={i}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="rgba(45, 214, 143, 0.3)"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => (
          <g
            key={node.id}
            transform={`translate(${node.x}, ${node.y})`}
            onMouseEnter={() => setActiveNode(node.id)}
            onMouseLeave={() => setActiveNode(null)}
            style={{ cursor: 'pointer' }}
          >
            {/* Glow effect when active */}
            {activeNode === node.id && (
              <circle
                r={node.size + 10}
                fill="none"
                stroke={node.color}
                strokeWidth="2"
                opacity="0.3"
              />
            )}
            
            {/* Node circle */}
            <circle
              r={node.size}
              fill={node.id === 'target' ? 'rgba(45, 214, 143, 0.2)' : 'rgba(2, 168, 154, 0.2)'}
              stroke={node.color}
              strokeWidth="3"
            />
            
            {/* Label */}
            <text
              y={node.size + 25}
              fill="#e6e9f0"
              fontSize="16"
              fontWeight="600"
              textAnchor="middle"
              fontFamily="'Sora', sans-serif"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>

      {/* Info card */}
      {activeNode && (
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(10, 15, 25, 0.95)',
          border: '1px solid rgba(45, 214, 143, 0.3)',
          borderRadius: '12px',
          padding: '1rem 1.5rem',
          backdropFilter: 'blur(8px)',
          minWidth: '300px',
          textAlign: 'center',
        }}>
          <p style={{ margin: 0, color: '#2dd68f', fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: '1rem' }}>
            {nodes.find(n => n.id === activeNode)?.label}
          </p>
          <p style={{ margin: '0.5rem 0 0 0', color: 'rgba(224, 224, 224, 0.9)', fontFamily: "'Oxanium', sans-serif", fontSize: '0.9rem' }}>
            {getDescription(activeNode)}
          </p>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          svg text {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
});

function getDescription(nodeId) {
  const descriptions = {
    target: 'Central entity under investigation',
    domain: 'Registered domains, subdomains, DNS records',
    email: 'Email addresses, patterns, compromised accounts',
    social: 'Public profiles, posts, connections, metadata',
    docs: 'PDFs, spreadsheets, presentations with metadata',
    infra: 'IP addresses, servers, hosting providers',
    people: 'Employees, roles, relationships, backgrounds',
  };
  return descriptions[nodeId] || '';
}

export default DigitalFootprintMap;
