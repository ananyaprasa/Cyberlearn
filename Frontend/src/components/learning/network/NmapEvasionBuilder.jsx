import { useState } from 'react';
import { motion } from 'framer-motion';

export default function NmapEvasionBuilder() {
  const [selectedTechniques, setSelectedTechniques] = useState([]);

  const techniques = [
    { id: 'frag', flag: '-f', desc: 'Fragment packets (8 bytes per fragment)', category: 'fragmentation' },
    { id: 'mtu', flag: '--mtu 16', desc: 'Custom MTU fragmentation (16-byte fragments)', category: 'fragmentation' },
    { id: 'sourceport', flag: '--source-port 53', desc: 'Spoof source port to 53 (DNS)', category: 'source' },
    { id: 'sourceport80', flag: '--source-port 80', desc: 'Spoof source port to 80 (HTTP)', category: 'source' },
    { id: 'decoy', flag: '-D RND:10', desc: 'Use 10 random decoy IPs', category: 'decoy' },
    { id: 'decoyManual', flag: '-D 10.0.0.1,10.0.0.2,ME', desc: 'Manual decoy IPs', category: 'decoy' },
    { id: 'slow', flag: '-T0', desc: 'Paranoid timing (extremely slow)', category: 'timing' },
    { id: 'slow2', flag: '-T1', desc: 'Sneaky timing (very slow)', category: 'timing' },
    { id: 'badsum', flag: '--badsum', desc: 'Invalid TCP/UDP checksums (test firewall/IDS)', category: 'other' },
    { id: 'data', flag: '--data-length 50', desc: 'Append 50 random bytes to packets', category: 'other' },
    { id: 'ipv6', flag: '-6', desc: 'Use IPv6 (if firewall has weak IPv6 rules)', category: 'protocol' },
    { id: 'proxies', flag: '--proxies http://proxy:8080', desc: 'Chain through proxy', category: 'routing' }
  ];

  const categoryColors = {
    fragmentation: '#2dd68f',
    source: '#02a89a',
    decoy: '#ffd93d',
    timing: '#5CF2FF',
    other: '#ff6b6b',
    protocol: '#a78bfa',
    routing: '#fb923c'
  };

  const toggleTechnique = (id) => {
    setSelectedTechniques(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const buildCommand = () => {
    if (selectedTechniques.length === 0) return 'nmap -p 22,80,443 192.168.1.1';
    const flags = techniques
      .filter(t => selectedTechniques.includes(t.id))
      .map(t => t.flag)
      .join(' ');
    return `nmap ${flags} -p 22,80,443 192.168.1.1`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(buildCommand());
  };

  return (
    <div style={{
      width: '100%',
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '2rem',
      background: 'rgba(10, 15, 15, 0.6)',
      borderRadius: '16px',
      border: '1px solid rgba(2, 168, 154, 0.2)'
    }}>
      <h3 style={{
        fontFamily: "'Sora', sans-serif",
        fontSize: '1.5rem',
        fontWeight: 700,
        color: '#e6e9f0',
        marginBottom: '0.5rem',
        textAlign: 'center'
      }}>
        🛠️ Nmap Evasion Command Builder
      </h3>
      <p style={{
        fontFamily: "'Oxanium', sans-serif",
        fontSize: '1rem',
        color: 'rgba(171, 207, 201, 0.8)',
        textAlign: 'center',
        marginBottom: '2rem'
      }}>
        Select evasion techniques to build your command
      </p>

      {/* Technique selector grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '0.75rem',
        marginBottom: '2rem'
      }}>
        {techniques.map(tech => (
          <motion.button
            key={tech.id}
            onClick={() => toggleTechnique(tech.id)}
            style={{
              padding: '1rem',
              background: selectedTechniques.includes(tech.id)
                ? `linear-gradient(135deg, ${categoryColors[tech.category]}22, ${categoryColors[tech.category]}11)`
                : 'rgba(10, 15, 15, 0.8)',
              border: `2px solid ${selectedTechniques.includes(tech.id) ? categoryColors[tech.category] : 'rgba(2, 168, 154, 0.2)'}`,
              borderRadius: '10px',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.3s ease',
              position: 'relative'
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Category badge */}
            <div style={{
              position: 'absolute',
              top: '0.5rem',
              right: '0.5rem',
              padding: '0.2rem 0.5rem',
              background: categoryColors[tech.category],
              borderRadius: '4px',
              fontSize: '0.65rem',
              fontFamily: "'Sora', sans-serif",
              fontWeight: 600,
              color: '#0a0f0f',
              textTransform: 'uppercase'
            }}>
              {tech.category}
            </div>

            {/* Checkbox */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem'
            }}>
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '4px',
                border: `2px solid ${categoryColors[tech.category]}`,
                background: selectedTechniques.includes(tech.id) ? categoryColors[tech.category] : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: '0.2rem'
              }}>
                {selectedTechniques.includes(tech.id) && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6L5 9L10 3" stroke="#0a0f0f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  color: categoryColors[tech.category],
                  marginBottom: '0.3rem'
                }}>
                  {tech.flag}
                </div>
                <div style={{
                  fontFamily: "'Oxanium', sans-serif",
                  fontSize: '0.85rem',
                  color: 'rgba(224, 224, 224, 0.75)',
                  lineHeight: 1.4
                }}>
                  {tech.desc}
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Generated command */}
      <div style={{
        background: 'rgba(10, 15, 15, 0.95)',
        border: '2px solid rgba(45, 214, 143, 0.3)',
        borderRadius: '12px',
        padding: '1.5rem',
        position: 'relative'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1rem'
        }}>
          <h4 style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: '1rem',
            fontWeight: 700,
            color: '#2dd68f',
            margin: 0
          }}>
            Generated Command:
          </h4>
          <motion.button
            onClick={copyToClipboard}
            style={{
              padding: '0.5rem 1rem',
              background: 'rgba(45, 214, 143, 0.15)',
              border: '1px solid #2dd68f',
              borderRadius: '6px',
              color: '#2dd68f',
              fontFamily: "'Sora', sans-serif",
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
            Copy
          </motion.button>
        </div>
        
        <div style={{
          fontFamily: "'JetBrains Mono', 'Courier New', monospace",
          fontSize: '0.95rem',
          color: '#3de9a0',
          padding: '1rem',
          background: 'rgba(0, 0, 0, 0.5)',
          borderRadius: '6px',
          overflowX: 'auto',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all'
        }}>
          {buildCommand()}
        </div>

        {selectedTechniques.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              marginTop: '1rem',
              padding: '1rem',
              background: 'rgba(255, 217, 61, 0.08)',
              borderRadius: '8px',
              border: '1px solid rgba(255, 217, 61, 0.3)'
            }}
          >
            <div style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: '0.85rem',
              fontWeight: 700,
              color: '#ffd93d',
              marginBottom: '0.5rem'
            }}>
              ⚠️ Detection Note:
            </div>
            <div style={{
              fontFamily: "'Oxanium', sans-serif",
              fontSize: '0.85rem',
              color: 'rgba(224, 224, 224, 0.75)',
              lineHeight: 1.5
            }}>
              {selectedTechniques.some(t => ['slow', 'slow2'].includes(t)) && (
                <div>• Slow timing reduces IDS rate-based detection but takes significantly longer</div>
              )}
              {selectedTechniques.some(t => ['frag', 'mtu'].includes(t)) && (
                <div>• Fragmentation bypasses stateless firewalls but stateful devices reassemble and inspect</div>
              )}
              {selectedTechniques.some(t => ['decoy', 'decoyManual'].includes(t)) && (
                <div>• Decoys flood logs but don't prevent detection of the real source IP</div>
              )}
              {selectedTechniques.some(t => t === 'badsum') && (
                <div>• Bad checksums help identify if firewall/IDS inspects checksums (packets should be dropped)</div>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Educational note */}
      <div style={{
        marginTop: '1.5rem',
        padding: '1rem',
        background: 'rgba(2, 168, 154, 0.08)',
        border: '1px solid rgba(2, 168, 154, 0.3)',
        borderRadius: '8px'
      }}>
        <p style={{
          fontFamily: "'Oxanium', sans-serif",
          fontSize: '0.85rem',
          color: 'rgba(171, 207, 201, 0.9)',
          margin: 0,
          lineHeight: 1.6
        }}>
          <strong style={{ color: '#02a89a' }}>Educational Purpose:</strong> These techniques demonstrate firewall/IDS evasion concepts. 
          Use only on networks you own or have explicit permission to test. Modern security systems detect many of these techniques.
        </p>
      </div>
    </div>
  );
}
