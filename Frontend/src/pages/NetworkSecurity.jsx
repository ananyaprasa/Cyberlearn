import { Suspense } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { NetworkSecurityIcon } from '../components/NetworkSecurityIcon';

const TOPICS = [
  {
    id: 'protocols',
    title: 'Network Protocols Fundamentals',
    description: 'Understand the core protocols that power modern networks — TCP/IP, UDP, DNS, HTTP, and ARP. Learn how data flows and where security gaps emerge.',
    difficulty: 'easy',
    route: '/network-security/protocols',
  },
  {
    id: 'wireshark',
    title: 'Packet Analysis with Wireshark',
    description: 'Capture and dissect live network traffic using Wireshark. Identify suspicious packets, reconstruct sessions, and detect anomalies in real time.',
    difficulty: 'medium',
    route: '/network-security/wireshark',
  },
  {
    id: 'mitm',
    title: 'Man-in-the-Middle Attacks',
    description: 'Explore how MITM attacks intercept and manipulate network traffic. Covers ARP poisoning, SSL stripping, and detection and prevention strategies.',
    difficulty: 'hard',
    route: '/network-security/mitm',
  },
  {
    id: 'firewall',
    title: 'Firewall & IDS Evasion',
    description: 'Learn how attackers bypass firewalls and intrusion detection systems using fragmentation, tunnelling, and obfuscation — and how defenders respond.',
    difficulty: 'hard',
    route: '/network-security/firewall',
  },
];

function TopicCard({ title, description, difficulty, route }) {
  return (
    <Link to={route} className="lesson-card" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="lesson-header">
        <h3>{title}</h3>
        <span className={`difficulty ${difficulty}`}>{difficulty}</span>
      </div>
      <p>{description}</p>
    </Link>
  );
}

function NetworkSecurity() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', fontFamily: 'Oxanium, sans-serif' }}>
      <Suspense fallback={<div />}>
        <ShaderGradientCanvas
          style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, opacity: 0.8 }}
        >
          <ShaderGradient
            animate="off" axesHelper="on" brightness={1.4} cAzimuthAngle={0} cDistance={7.1}
            cPolarAngle={140} cameraZoom={17.29} color1="#aeacb7" color2="#152921" color3="#002f00"
            destination="onCanvas" embedMode="off" envPreset="city" format="gif" fov={45}
            frameRate={10} gizmoHelper="hide" grain="off" lightType="3d" pixelDensity={1}
            positionX={0} positionY={0} positionZ={0} range="disabled" rangeEnd={40} rangeStart={0}
            reflection={0.1} rotationX={0} rotationY={0} rotationZ={0} shader="defaults"
            type="sphere" uAmplitude={1.6} uDensity={1.1} uFrequency={5.5} uSpeed={0.1}
            uStrength={1} uTime={0} wireframe={false}
          />
        </ShaderGradientCanvas>
      </Suspense>

      <style>{`
        .back-btn { transition: transform 0.2s ease; }
        .back-btn:hover { transform: scale(1.05) translateY(-2px); }
        .netsec-back-btn:hover { background: rgba(92,242,255,0.25) !important; border-color: #5CF2FF !important; color: #FFFFFF !important; }
        .netsec-header-title { color: #abcfc9 !important; -webkit-text-fill-color: #abcfc9 !important; background: none !important; font-family: 'Sora', sans-serif !important; }
        .netsec-header-subtitle { font-family: 'Sora', sans-serif !important; }
      `}</style>

      <Navbar />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="page-header elegant-header">
          <div className="header-icon"><NetworkSecurityIcon size={80} /></div>
          <h1 className="elegant-title netsec-header-title">Network Security</h1>
          <p className="elegant-subtitle netsec-header-subtitle">Infrastructure Protection</p>
          <div className="header-divider"></div>
        </div>

        <Link
          to="/"
          className="back-btn netsec-back-btn"
          style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid #00FFC8', color: '#FFFFFF' }}
        >
          ← Back to Home
        </Link>

        <div className="lessons-grid">
          {TOPICS.map((t) => (
            <TopicCard key={t.id} {...t} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default NetworkSecurity;
