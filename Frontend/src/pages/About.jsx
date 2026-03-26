import { Link } from 'react-router-dom';
import OptimizedBackground from '../components/OptimizedBackground';
import Navbar from '../components/Navbar';
import { CurriculumIcon, PracticeIcon, QuizzesIcon, ProgressiveIcon, ToolsIcon, CTFFeatureIcon } from '../components/FeatureIcons';
import './About.css';

function About() {
  const features = [
    {
      icon: <CurriculumIcon />,
      title: 'Comprehensive Curriculum',
      description: 'Structured learning paths covering OSINT, reconnaissance, cryptography, network security, and more.',
      accent: '#a78bfa',
      accentRgb: '167,139,250',
      tileStyle: { background: 'rgba(167,139,250,.1)', border: '1.5px solid rgba(167,139,250,.3)', boxShadow: '0 0 12px rgba(167,139,250,.1)' }
    },
    {
      icon: <PracticeIcon />,
      title: 'Hands-On Practice',
      description: 'Execute real commands and tools in practical exercises that simulate real-world scenarios.',
      accent: '#38bdf8',
      accentRgb: '56,189,248',
      tileStyle: { background: 'rgba(56,189,248,.1)', border: '1.5px solid rgba(56,189,248,.3)', boxShadow: '0 0 12px rgba(56,189,248,.1)' }
    },
    {
      icon: <QuizzesIcon />,
      title: 'Interactive Quizzes',
      description: 'Test your knowledge with interactive quizzes and get instant feedback on your progress.',
      accent: '#4ade80',
      accentRgb: '74,222,128',
      tileStyle: { background: 'rgba(74,222,128,.1)', border: '1.5px solid rgba(74,222,128,.3)', boxShadow: '0 0 12px rgba(74,222,128,.1)' }
    },
    {
      icon: <ProgressiveIcon />,
      title: 'Progressive Learning',
      description: 'Start from beginner-friendly basics and advance to expert-level techniques at your own pace.',
      accent: '#fb923c',
      accentRgb: '251,146,60',
      tileStyle: { background: 'rgba(251,146,60,.1)', border: '1.5px solid rgba(251,146,60,.3)', boxShadow: '0 0 12px rgba(251,146,60,.1)' }
    },
    {
      icon: <ToolsIcon />,
      title: 'Industry-Standard Tools',
      description: 'Learn to use professional tools like Nmap, Wireshark, Metasploit, and more.',
      accent: '#22d3ee',
      accentRgb: '34,211,238',
      tileStyle: { background: 'rgba(34,211,238,.1)', border: '1.5px solid rgba(34,211,238,.3)', boxShadow: '0 0 12px rgba(34,211,238,.1)' }
    },
    {
      icon: <CTFFeatureIcon />,
      title: 'CTF Challenges',
      description: 'Apply your skills in Capture The Flag challenges designed to test your abilities.',
      accent: '#fbbf24',
      accentRgb: '251,191,36',
      tileStyle: { background: 'rgba(251,191,36,.1)', border: '1.5px solid rgba(251,191,36,.3)', boxShadow: '0 0 12px rgba(251,191,36,.1)' }
    }
  ];

  const team = [
    {
      role: 'Platform Vision',
      description: 'Designed to bridge the gap between theoretical knowledge and practical cybersecurity skills.'
    },
    {
      role: 'Educational Approach',
      description: 'Learn by doing with hands-on exercises, real tools, and immediate feedback.'
    },
    {
      role: 'Community Focus',
      description: 'Built for aspiring security professionals, ethical hackers, and cybersecurity enthusiasts.'
    }
  ];

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Optimized Background */}
      <OptimizedBackground 
        colors={['#aeacb7', '#152921', '#002f00']}
        type="sphere"
        brightness={1.4}
        cAzimuthAngle={0}
        cDistance={7.1}
        cPolarAngle={140}
        cameraZoom={17.29}
        uAmplitude={1.6}
        uDensity={1.1}
        uFrequency={5.5}
        uSpeed={0.1}
        uStrength={1}
      />

      <Navbar />

      <div className="container about-page-container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Hero Section */}
        <div className="about-hero">
          <div className="about-hero-content">
            <h1 className="about-title">About CyberLearn</h1>
            <p className="about-subtitle">
              Empowering the next generation of cybersecurity professionals through 
              hands-on learning, practical exercises, and real-world scenarios.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <section className="about-section">
          <div className="section-header">
            <h2>Our Mission</h2>
            <div className="header-divider"></div>
          </div>
          <div className="mission-content">
            <p className="mission-text">
              CyberLearn is dedicated to making cybersecurity education accessible, practical, 
              and engaging. We believe that the best way to learn security is by doing - 
              executing real commands, analyzing actual outputs, and solving genuine challenges.
            </p>
            <p className="mission-text">
              Our platform combines theoretical knowledge with hands-on practice, allowing 
              learners to develop the skills they need to succeed in the cybersecurity field. 
              Whether you're a beginner taking your first steps or an experienced professional 
              looking to sharpen your skills, CyberLearn provides the tools and resources you need.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="about-section">
          <div className="section-header">
            <h2>What Makes Us Different</h2>
            <div className="header-divider"></div>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card"
                style={{ '--accent': feature.accent, '--accent-rgb': feature.accentRgb }}
              >
                <div className="feature-card-shimmer" />
                <div className="feature-card-scan" />
                <div className="feature-icon-tile" style={feature.tileStyle}>
                  <div className="feature-tile-shimmer" />
                  {feature.icon}
                </div>
                <h3 className="feature-card-title" style={{ color: feature.accent }}>{feature.title}</h3>
                <p className="feature-card-desc">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Approach Section */}
        <section className="about-section">
          <div className="section-header">
            <h2>Our Approach</h2>
            <div className="header-divider"></div>
          </div>
          <div className="approach-grid">
            {team.map((item, index) => (
              <div key={index} className="approach-card">
                <h3>{item.role}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="about-cta">
          <h2>Ready to Start Learning?</h2>
          <p>Join thousands of learners mastering cybersecurity through hands-on practice.</p>
          <Link to="/" className="btn-start-learning">Explore Courses</Link>
        </section>

        <Link to="/" className="back-btn">← Back to Home</Link>
      </div>
    </div>
  );
}

export default About;
