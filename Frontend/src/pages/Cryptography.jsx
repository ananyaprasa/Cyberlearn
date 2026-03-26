import { Link } from 'react-router-dom';
import { Suspense } from 'react';
import Navbar from '../components/Navbar';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { CryptographyIcon } from '../components/CryptographyIcon';

const TOPICS = [
  {
    id: '6999e774551877fbe2fed8fb',
    title: 'Symmetric Encryption',
    description: 'Master AES, DES, and stream ciphers. Learn how shared keys encrypt and decrypt data, and discover common attack vectors.',
    difficulty: 'easy',
    route: '/cryptography/6999e774551877fbe2fed8fb',
  },
  {
    id: '6999e758551877fbe2fed8f9',
    title: 'Asymmetric Encryption',
    description: 'Explore RSA, ECC, and public-key cryptography. Understand key exchange, digital certificates, and PKI infrastructure.',
    difficulty: 'medium',
    route: '/cryptography/6999e758551877fbe2fed8f9',
  },
  {
    id: '6999e747551877fbe2fed8f7',
    title: 'Hash Functions & Integrity',
    description: 'Deep dive into SHA, MD5, and cryptographic hashing. Learn about collision attacks, rainbow tables, and password security.',
    difficulty: 'medium',
    route: '/cryptography/6999e747551877fbe2fed8f7',
  },
  {
    id: '6999e787551877fbe2fed8fd',
    title: 'Digital Signatures & PKI',
    description: 'Understand digital signatures, certificate authorities, and trust chains. Explore signature verification and non-repudiation.',
    difficulty: 'hard',
    route: '/cryptography/6999e787551877fbe2fed8fd',
  },
];

function Cryptography() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', fontFamily: 'Oxanium, sans-serif' }}>
      {/* Shader Background for entire page */}
      <Suspense fallback={<div />}>
        <ShaderGradientCanvas
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: -1,
            opacity: 0.8,
          }}
        >
          <ShaderGradient
            animate="off"
            axesHelper="on"
            brightness={1.4}
            cAzimuthAngle={0}
            cDistance={7.1}
            cPolarAngle={140}
            cameraZoom={17.29}
            color1="#aeacb7"
            color2="#152921"
            color3="#002f00"
            destination="onCanvas"
            embedMode="off"
            envPreset="city"
            format="gif"
            fov={45}
            frameRate={10}
            gizmoHelper="hide"
            grain="off"
            lightType="3d"
            pixelDensity={1}
            positionX={0}
            positionY={0}
            positionZ={0}
            range="disabled"
            rangeEnd={40}
            rangeStart={0}
            reflection={0.1}
            rotationX={0}
            rotationY={0}
            rotationZ={0}
            shader="defaults"
            type="sphere"
            uAmplitude={1.6}
            uDensity={1.1}
            uFrequency={5.5}
            uSpeed={0.1}
            uStrength={1}
            uTime={0}
            wireframe={false}
          />
        </ShaderGradientCanvas>
      </Suspense>

      <style>
        {`
          .back-btn {
            transition: transform 0.2s ease;
          }
          .back-btn:hover {
            transform: scale(1.05) translateY(-2px);
          }
          .cryptography-back-btn:hover {
            background: rgba(92, 242, 255, 0.25) !important;
            border-color: #5CF2FF !important;
            color: #FFFFFF !important;
          }
          .cryptography-header-title {
            color: #abcfc9 !important;
            -webkit-text-fill-color: #abcfc9 !important;
            background: none !important;
            font-family: 'Sora', sans-serif !important;
          }
          .cryptography-header-subtitle {
            font-family: 'Sora', sans-serif !important;
          }
        `}
      </style>
      <Navbar />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="page-header elegant-header">
          <div className="header-icon"><CryptographyIcon size={80} /></div>
          <h1 className="elegant-title cryptography-header-title">Cryptography</h1>
          <p className="elegant-subtitle cryptography-header-subtitle">Encryption and Decryption Techniques</p>
          <div className="header-divider"></div>
        </div>

        <Link 
          to="/" 
          className="back-btn cryptography-back-btn"
          style={{
            background: 'rgba(0,0,0,0.35)',
            border: '1px solid #00FFC8',
            color: '#FFFFFF'
          }}
        >
          ← Back to Home
        </Link>

        <div className="lessons-grid">
          {TOPICS.map((topic) => (
            <Link
              key={topic.id}
              to={topic.route}
              className="lesson-card"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="lesson-header">
                <h3>{topic.title}</h3>
                <span className={`difficulty ${topic.difficulty}`}>{topic.difficulty}</span>
              </div>
              <p>{topic.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Cryptography;
