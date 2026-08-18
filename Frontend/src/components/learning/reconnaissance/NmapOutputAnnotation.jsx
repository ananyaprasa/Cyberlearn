import { motion } from 'framer-motion';
import { useState } from 'react';

export default function NmapOutputAnnotation() {
  const [selectedLine, setSelectedLine] = useState(null);

  const outputLines = [
    { id: 1, text: 'Starting Nmap 7.94 at 2024-08-16 12:00 UTC', annotation: 'Nmap version and scan start time', color: '#02a89a' },
    { id: 2, text: 'Nmap scan report for target.example.com (192.168.1.10)', annotation: 'Target hostname and IP address', color: '#2dd68f' },
    { id: 3, text: 'Host is up (0.0032s latency).', annotation: 'Host is reachable - latency indicates response time', color: '#2dd68f' },
    { id: 4, text: 'Not shown: 995 closed ports', annotation: '995 ports are closed (no service listening)', color: '#ff6b6b' },
    { id: 5, text: 'PORT     STATE SERVICE    VERSION', annotation: 'Column headers for results', color: '#5CF2FF' },
    { id: 6, text: '22/tcp   open  ssh        OpenSSH 8.2p1', annotation: 'SSH service - potential entry point, check version for CVEs', color: '#ffd93d' },
    { id: 7, text: '80/tcp   open  http       Apache 2.4.41', annotation: 'Web server - investigate further for vulnerabilities', color: '#ffd93d' },
    { id: 8, text: '443/tcp  open  https      Apache 2.4.41', annotation: 'HTTPS - check certificate, TLS version, web app vulns', color: '#ffd93d' },
    { id: 9, text: '3306/tcp open  mysql      MySQL 5.7.30', annotation: 'Database exposed - HIGH RISK if accessible externally', color: '#ff6b6b' },
    { id: 10, text: '8080/tcp open  http-proxy Squid 4.10', annotation: 'Proxy server - may allow access to internal resources', color: '#ffd93d' },
    { id: 11, text: '', annotation: '', color: '' },
    { id: 12, text: 'Service detection performed. 5 services detected.', annotation: 'Summary - version detection successful', color: '#2dd68f' },
    { id: 13, text: 'Nmap done: 1 IP address (1 host up) scanned in 12.45 seconds', annotation: 'Scan complete - timing information', color: '#02a89a' }
  ];

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
        📋 Interpreting Nmap Output
      </h3>
      <p style={{
        fontFamily: "'Oxanium', sans-serif",
        fontSize: '1rem',
        color: 'rgba(171, 207, 201, 0.8)',
        textAlign: 'center',
        marginBottom: '2rem'
      }}>
        Click on any line to see its meaning and security implications
      </p>

      {/* Terminal output */}
      <div style={{
        background: '#0a0f0f',
        borderRadius: '12px',
        padding: '1.5rem',
        border: '1px solid rgba(2, 168, 154, 0.3)',
        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        fontSize: '0.9rem',
        marginBottom: '1.5rem',
        maxHeight: '500px',
        overflowY: 'auto'
      }}>
        {outputLines.map((line) => (
          <motion.div
            key={line.id}
            onClick={() => line.annotation && setSelectedLine(line.id === selectedLine ? null : line.id)}
            style={{
              padding: '0.4rem 0.8rem',
              margin: '0.2rem 0',
              borderRadius: '6px',
              background: selectedLine === line.id ? 'rgba(2, 168, 154, 0.15)' : 'transparent',
              border: selectedLine === line.id ? `2px solid ${line.color}` : '2px solid transparent',
              color: selectedLine === line.id ? line.color : '#3de9a0',
              cursor: line.annotation ? 'pointer' : 'default',
              transition: 'all 0.2s ease',
              position: 'relative'
            }}
            whileHover={line.annotation ? { scale: 1.01, x: 5 } : {}}
          >
            {line.text || ' '}
            {selectedLine === line.id && line.annotation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{
                  marginTop: '0.5rem',
                  padding: '0.75rem',
                  background: `linear-gradient(135deg, ${line.color}22, ${line.color}11)`,
                  border: `1px solid ${line.color}55`,
                  borderRadius: '6px',
                  fontFamily: "'Oxanium', sans-serif",
                  fontSize: '0.85rem',
                  color: 'rgba(224, 224, 224, 0.9)',
                  lineHeight: 1.6
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <span style={{ color: line.color, fontSize: '1.2rem', lineHeight: 1 }}>→</span>
                  <div>
                    <strong style={{ color: line.color }}>Meaning:</strong> {line.annotation}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Security assessment */}
      <div style={{
        background: 'rgba(10, 15, 15, 0.95)',
        borderRadius: '12px',
        padding: '1.5rem',
        border: '2px solid rgba(255, 107, 107, 0.3)'
      }}>
        <h4 style={{
          fontFamily: "'Sora', sans-serif",
          fontSize: '1.1rem',
          fontWeight: 700,
          color: '#ff6b6b',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Security Assessment
        </h4>
        
        <div style={{
          display: 'grid',
          gap: '0.75rem'
        }}>
          <div style={{
            padding: '0.75rem',
            background: 'rgba(255, 107, 107, 0.12)',
            borderRadius: '8px',
            border: '1px solid rgba(255, 107, 107, 0.3)'
          }}>
            <div style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: '0.9rem',
              fontWeight: 700,
              color: '#ff6b6b',
              marginBottom: '0.3rem'
            }}>
              🔴 CRITICAL: MySQL Exposed (Port 3306)
            </div>
            <div style={{
              fontFamily: "'Oxanium', sans-serif",
              fontSize: '0.85rem',
              color: 'rgba(224, 224, 224, 0.8)',
              lineHeight: 1.5
            }}>
              Database directly accessible from network. Check: authentication strength, version vulnerabilities, should be behind firewall.
            </div>
          </div>

          <div style={{
            padding: '0.75rem',
            background: 'rgba(255, 217, 61, 0.12)',
            borderRadius: '8px',
            border: '1px solid rgba(255, 217, 61, 0.3)'
          }}>
            <div style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: '0.9rem',
              fontWeight: 700,
              color: '#ffd93d',
              marginBottom: '0.3rem'
            }}>
              ⚠️ MEDIUM: Web Services (Ports 80, 443, 8080)
            </div>
            <div style={{
              fontFamily: "'Oxanium', sans-serif",
              fontSize: '0.85rem',
              color: 'rgba(224, 224, 224, 0.8)',
              lineHeight: 1.5
            }}>
              Multiple web services detected. Next steps: run NSE scripts (--script http-enum), check for known CVEs in Apache 2.4.41.
            </div>
          </div>

          <div style={{
            padding: '0.75rem',
            background: 'rgba(45, 214, 143, 0.12)',
            borderRadius: '8px',
            border: '1px solid rgba(45, 214, 143, 0.3)'
          }}>
            <div style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: '0.9rem',
              fontWeight: 700,
              color: '#2dd68f',
              marginBottom: '0.3rem'
            }}>
              ℹ️ INFO: SSH Available (Port 22)
            </div>
            <div style={{
              fontFamily: "'Oxanium', sans-serif",
              fontSize: '0.85rem',
              color: 'rgba(224, 224, 224, 0.8)',
              lineHeight: 1.5
            }}>
              OpenSSH 8.2p1 is relatively recent. Check: password authentication enabled?, key-based only?, fail2ban active?
            </div>
          </div>
        </div>

        {/* Next steps */}
        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          background: 'rgba(2, 168, 154, 0.08)',
          borderRadius: '8px',
          border: '1px solid rgba(2, 168, 154, 0.3)'
        }}>
          <div style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: '0.9rem',
            fontWeight: 700,
            color: '#02a89a',
            marginBottom: '0.5rem'
          }}>
            🎯 Recommended Next Steps:
          </div>
          <div style={{
            fontFamily: "'Oxanium', sans-serif",
            fontSize: '0.85rem',
            color: 'rgba(224, 224, 224, 0.8)',
            lineHeight: 1.6
          }}>
            1. Run vulnerability scripts: <code style={{ background: 'rgba(2, 168, 154, 0.2)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>nmap --script vuln 192.168.1.10</code><br/>
            2. Enumerate web directories: <code style={{ background: 'rgba(2, 168, 154, 0.2)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>nmap --script http-enum -p 80,443,8080 192.168.1.10</code><br/>
            3. Test MySQL access: Attempt connection with default/weak credentials<br/>
            4. Document findings in penetration test report
          </div>
        </div>
      </div>
    </div>
  );
}
