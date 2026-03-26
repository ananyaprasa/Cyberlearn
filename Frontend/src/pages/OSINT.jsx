import { Suspense } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { OsintIcon } from '../components/OsintIcon';

const SECTIONS = [
  {
    id: 'passive',
    title: 'Passive Information Gathering',
    description: 'Collect publicly available data without directly interacting with the target. Includes WHOIS lookups, DNS enumeration, and social media analysis.',
    difficulty: 'easy',
    route: '/osint/passive',
  },
  {
    id: 'active',
    title: 'Active Information Gathering',
    description: 'Directly interact with the target to extract information. Covers port scanning, service fingerprinting, and network mapping techniques.',
    difficulty: 'medium',
    route: '/osint/active',
  },
  {
    id: 'analysis',
    title: 'Analysis & Reporting',
    description: 'Correlate and interpret gathered intelligence to produce actionable reports. Focuses on data correlation, timeline analysis, and structured reporting.',
    difficulty: 'hard',
    route: '/osint/analysis',
  },
];

function SectionCard({ title, description, difficulty, route }) {
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

function OSINT() {
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
        .osint-back-btn:hover { background: rgba(92,242,255,0.25) !important; border-color: #5CF2FF !important; color: #FFFFFF !important; }
        .osint-header-title { color: #abcfc9 !important; -webkit-text-fill-color: #abcfc9 !important; background: none !important; font-family: 'Sora', sans-serif !important; }
        .osint-header-subtitle { font-family: 'Sora', sans-serif !important; }
      `}</style>

      <Navbar />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="page-header elegant-header">
          <div className="header-icon"><OsintIcon size={80} /></div>
          <h1 className="elegant-title osint-header-title">OSINT</h1>
          <p className="elegant-subtitle osint-header-subtitle">Open Source Intelligence Gathering</p>
          <div className="header-divider"></div>
        </div>

        <Link
          to="/"
          className="back-btn osint-back-btn"
          style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid #00FFC8', color: '#FFFFFF' }}
        >
          ← Back to Home
        </Link>

        <div className="lessons-grid">
          {SECTIONS.map((s) => (
            <SectionCard key={s.id} {...s} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default OSINT;
