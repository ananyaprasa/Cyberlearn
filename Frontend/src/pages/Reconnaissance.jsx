import { Suspense } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { ReconIcon } from '../components/ReconIcon';

const TOPICS = [
  {
    id: 'network-scanning',
    title: 'Network Scanning Fundamentals',
    description: 'Learn the core concepts of network scanning — how hosts are discovered, what protocols are used, and how to interpret scan results safely and effectively.',
    difficulty: 'easy',
    route: '/reconnaissance/network-scanning',
  },
  {
    id: 'passive',
    title: 'Passive Reconnaissance',
    description: 'Gather intelligence on a target without direct interaction. Covers WHOIS, DNS enumeration, certificate transparency, and open-source data sources.',
    difficulty: 'medium',
    route: '/reconnaissance/passive',
  },
  {
    id: 'nmap',
    title: 'Port Scanning with Nmap',
    description: 'Master Nmap — the industry-standard scanner. Explore scan types, timing flags, output formats, and the Nmap Scripting Engine for advanced enumeration.',
    difficulty: 'medium',
    route: '/reconnaissance/nmap',
  },
  {
    id: 'active',
    title: 'Active Reconnaissance',
    description: 'Directly probe target systems to map live hosts, open ports, and network topology. Understand detection risks, scope management, and rules of engagement.',
    difficulty: 'hard',
    route: '/reconnaissance/active',
  },
  {
    id: 'service-detection',
    title: 'Service & Version Detection',
    description: 'Identify running services and their exact versions using banner grabbing and fingerprinting. Map findings to CVEs and assess real exploitability.',
    difficulty: 'hard',
    route: '/reconnaissance/service-detection',
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

function Reconnaissance() {
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
        .recon-back-btn:hover { background: rgba(92,242,255,0.25) !important; border-color: #5CF2FF !important; color: #FFFFFF !important; }
        .recon-header-title { color: #abcfc9 !important; -webkit-text-fill-color: #abcfc9 !important; background: none !important; font-family: 'Sora', sans-serif !important; }
        .recon-header-subtitle { font-family: 'Sora', sans-serif !important; }
      `}</style>

      <Navbar />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="page-header elegant-header">
          <div className="header-icon"><ReconIcon size={80} /></div>
          <h1 className="elegant-title recon-header-title">Reconnaissance</h1>
          <p className="elegant-subtitle recon-header-subtitle">Target Discovery & Mapping</p>
          <div className="header-divider"></div>
        </div>

        <Link
          to="/"
          className="back-btn recon-back-btn"
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

export default Reconnaissance;
