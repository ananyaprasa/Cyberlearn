import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { OsintIcon } from '../components/OsintIcon';
import { ReconIcon } from '../components/ReconIcon';
import { CryptographyIcon } from '../components/CryptographyIcon';
import { NetworkSecurityIcon } from '../components/NetworkSecurityIcon';
import { AssignmentIcon } from '../components/AssignmentIcon';
import { CTFIcon } from '../components/CTFIcon';
import { BusinessProtectionIcon, DataPrivacyIcon, NationalSecurityIcon, FinancialSecurityIcon } from '../components/WhyItMattersIcons';

function Home() {
  const domains = [
    {
      path: '/osint',
      icon: <OsintIcon size={80} />,
      title: 'OSINT',
      description: 'Open Source Intelligence gathering techniques and tools'
    },
    {
      path: '/reconnaissance',
      icon: <ReconIcon size={80} />,
      title: 'Reconnaissance',
      description: 'Learn information gathering and target enumeration'
    },
    {
      path: '/cryptography',
      icon: <CryptographyIcon size={80} />,
      title: 'Cryptography',
      description: 'Master encryption, decryption, and cryptographic attacks'
    },
    {
      path: '/network-security',
      icon: <NetworkSecurityIcon size={80} />,
      title: 'Network Security',
      description: 'Understand network protocols and security mechanisms'
    },
    {
      path: '/assignments',
      icon: <AssignmentIcon size={80} />,
      title: 'Assignments',
      description: 'Complete assignments and get graded by instructors'
    },
    {
      path: '/ctf',
      icon: <CTFIcon size={80} />,
      title: 'CTF Challenges',
      description: 'Test your skills with Capture The Flag challenges'
    }
  ];

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Shader Gradient Background */}
      <div style={{ position: 'fixed', inset: 0, zIndex: -1 }}>
        <ShaderGradientCanvas style={{ position: 'absolute', inset: 0 }}>
          <ShaderGradient
            animate="on"
            axesHelper="off"
            brightness={1.2}
            cAzimuthAngle={170}
            cDistance={4.4}
            cPolarAngle={70}
            cameraZoom={1}
            color1="#1B5E3A"
            color2="#204f30"
            color3="#6F7A3C"
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
            positionY={0.9}
            positionZ={-0.3}
            range="disabled"
            rangeEnd={40}
            rangeStart={0}
            reflection={0.1}
            rotationX={45}
            rotationY={0}
            rotationZ={0}
            shader="defaults"
            type="waterPlane"
            uAmplitude={0}
            uDensity={1.2}
            uFrequency={0}
            uSpeed={0.1}
            uStrength={3.1}
            uTime={0}
            wireframe={false}
          />
        </ShaderGradientCanvas>
      </div>

      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="hero-content">
            <div className="hero-badge">🔐 Learn. Practice. Master.</div>
            <h1 className="hero-title">Master Cybersecurity Through Hands-On Learning</h1>
            <p className="hero-subtitle">
              Build real-world skills with interactive challenges, gamified learning paths, 
              and practical exercises designed for aspiring security professionals.
            </p>
            <div className="hero-cta">
              <a href="#learning-domains" className="btn-start-learning">Start Learning</a>
              <Link to="/about" className="btn-secondary" onClick={() => window.scrollTo(0, 0)}>Learn More</Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Cybersecurity Section */}
      <section className="about-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Why It Matters</span>
            <h2>Understanding Cybersecurity</h2>
            <p className="section-description">
              In today's digital world, cybersecurity is more critical than ever. 
              Protecting systems, networks, and data from cyber threats is essential for individuals, 
              businesses, and nations alike.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card wim-card" style={{ '--accent':'#f87171', '--accent-rgb':'248,113,113' }}>
              <div className="wim-shimmer"/>
              <div className="wim-scan"/>
              <div className="wim-icon-tile" style={{ background:'rgba(248,113,113,.1)', border:'1.5px solid rgba(248,113,113,.3)', boxShadow:'0 0 14px rgba(248,113,113,.1)' }}>
                <div className="wim-tile-shimmer"/>
                <BusinessProtectionIcon />
              </div>
              <h3 style={{ color:'#fca5a5' }}>Business Protection</h3>
              <p>Organizations face constant threats from cybercriminals. A single breach can cost millions in damages, lost revenue, and reputation harm.</p>
            </div>
            <div className="feature-card wim-card" style={{ '--accent':'#fbbf24', '--accent-rgb':'251,191,36' }}>
              <div className="wim-shimmer"/>
              <div className="wim-scan"/>
              <div className="wim-icon-tile" style={{ background:'rgba(251,191,36,.1)', border:'1.5px solid rgba(251,191,36,.3)', boxShadow:'0 0 14px rgba(251,191,36,.1)' }}>
                <div className="wim-tile-shimmer"/>
                <DataPrivacyIcon />
              </div>
              <h3 style={{ color:'#fde68a' }}>Data Privacy</h3>
              <p>Personal and sensitive data must be protected from unauthorized access. Privacy breaches can lead to identity theft and financial fraud.</p>
            </div>
            <div className="feature-card wim-card" style={{ '--accent':'#38bdf8', '--accent-rgb':'56,189,248' }}>
              <div className="wim-shimmer"/>
              <div className="wim-scan"/>
              <div className="wim-icon-tile" style={{ background:'rgba(56,189,248,.1)', border:'1.5px solid rgba(56,189,248,.3)', boxShadow:'0 0 14px rgba(56,189,248,.1)' }}>
                <div className="wim-tile-shimmer"/>
                <NationalSecurityIcon />
              </div>
              <h3 style={{ color:'#7dd3fc' }}>National Security</h3>
              <p>Critical infrastructure like power grids, healthcare systems, and government networks require robust protection from cyber threats.</p>
            </div>
            <div className="feature-card wim-card" style={{ '--accent':'#4ade80', '--accent-rgb':'74,222,128' }}>
              <div className="wim-shimmer"/>
              <div className="wim-scan"/>
              <div className="wim-icon-tile" style={{ background:'rgba(74,222,128,.1)', border:'1.5px solid rgba(74,222,128,.3)', boxShadow:'0 0 14px rgba(74,222,128,.1)' }}>
                <div className="wim-tile-shimmer"/>
                <FinancialSecurityIcon />
              </div>
              <h3 style={{ color:'#86efac' }}>Financial Security</h3>
              <p>Banking systems and financial transactions are prime targets. Cybersecurity prevents fraud, data theft, and disruption of global financial networks.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Threat Landscape Section */}
      <section className="threats-section">
        <div className="container">
          <div className="threats-content">
            <div className="threats-text">
              <span className="section-tag toxic-tag">Current Challenges</span>
              <h2>The Growing Threat Landscape</h2>
              <p>Cyber threats are evolving rapidly, becoming more sophisticated and widespread. Understanding these threats is the first step in defending against them.</p>
              
              <div className="threat-items">
                <div className="threat-item">
                  <div className="threat-number">01</div>
                  <div className="threat-content">
                    <h4>Ransomware Attacks</h4>
                    <p>Malicious software that encrypts data and demands payment for its release</p>
                  </div>
                </div>
                <div className="threat-item">
                  <div className="threat-number">02</div>
                  <div className="threat-content">
                    <h4>Phishing</h4>
                    <p>Fraudulent attempts to obtain sensitive information by disguising as trustworthy entities</p>
                  </div>
                </div>
                <div className="threat-item">
                  <div className="threat-number">03</div>
                  <div className="threat-content">
                    <h4>Data Breaches</h4>
                    <p>Unauthorized access to confidential data affecting millions of users</p>
                  </div>
                </div>
                <div className="threat-item">
                  <div className="threat-number">04</div>
                  <div className="threat-content">
                    <h4>IoT Vulnerabilities</h4>
                    <p>Connected devices creating new entry points for attackers</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="threats-highlight">
              <div className="highlight-card">
                <h3>Career Opportunities</h3>
                <p>
                  With cyber threats evolving rapidly, there's a critical shortage of skilled cybersecurity professionals. 
                  Organizations worldwide are seeking experts who can defend against attacks, secure systems, and respond to incidents.
                </p>
                <div className="highlight-stats">
                  <div className="stat">
                    <div className="stat-number">3.5M</div>
                    <div className="stat-label">Job Openings</div>
                  </div>
                  <div className="stat">
                    <div className="stat-number">$100K+</div>
                    <div className="stat-label">Average Salary</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Domains Section */}
      <section id="learning-domains" className="domains-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Learning Paths</span>
            <h2>Explore Our Learning Domains</h2>
            <p className="section-description">
              Choose your path and start building expertise in specialized cybersecurity domains
            </p>
          </div>

          <div className="domains-grid">
            {domains.map((domain) => (
              <Link key={domain.path} to={domain.path} className="domain-card" style={{ position: 'relative', overflow: 'hidden' }}>
                {/* Subtle shimmer overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(110deg, transparent 45%, rgba(255,255,255,0.03) 50%, transparent 55%)",
                    backgroundSize: "220% 100%",
                    animation: "homepage-shimmer 5s linear infinite",
                    pointerEvents: "none",
                  }}
                />
                <div className="domain-icon">{domain.icon}</div>
                <h3>{domain.title}</h3>
                <p>{domain.description}</p>
                <span className="domain-arrow">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}

export default Home;
