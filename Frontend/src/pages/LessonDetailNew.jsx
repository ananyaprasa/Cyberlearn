/*  */import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useMemo, Suspense } from 'react';
import CollapsibleSection from '../components/CollapsibleSection';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { osintLessons, reconnaissanceLessons, networkSecurityLessons } from '../lessons';

function LessonDetailNew() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [openSections, setOpenSections] = useState([0]); // Start with first section open
  
  const domain = useMemo(() => window.location.pathname.split('/')[1], []);

  const handleToggleSection = (index) => {
    setOpenSections(prev => {
      if (prev.includes(index)) {
        // Close the section
        return prev.filter(i => i !== index);
      } else {
        // Open the section
        if (prev.length >= 3) {
          // If 3 sections are already open, close the oldest one
          return [...prev.slice(1), index];
        } else {
          return [...prev, index];
        }
      }
    });
  };

  const lessonsData = {
    osint: osintLessons,
    reconnaissance: reconnaissanceLessons,
    'network-security': networkSecurityLessons
  };

  const domainLessons = lessonsData[domain];
  const lesson = domainLessons?.find(l => l.id === parseInt(lessonId));

  useEffect(() => {
    if (!lesson) {
      navigate(`/${domain}`);
    }
  }, [lesson, navigate, domain]);

  if (!lesson) {
    return <div>Loading...</div>;
  }

  return (
    <div className="lesson-detail-page" style={{ backgroundColor: '#1d3136', minHeight: '100vh', fontFamily: 'Oxanium, sans-serif', position: 'relative' }}>
      <Suspense fallback={<div>Loading background...</div>}>
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
          `}
      </style>

      <style jsx>{`
        .lesson-detail-page {
          min-height: 100vh;
          color: white;
          position: relative;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          position: relative;
          z-index: 1;
        }
        
        .page-header {
          text-align: center;
          margin-bottom: 40px;
          padding: 40px 0;
        }
        
        .lesson-header-title {
          font-size: 3rem;
          font-weight: bold;
          margin-bottom: 20px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
          font-family: 'Sora', sans-serif;
        }
        
        .lesson-header-subtitle {
          font-size: 1.2rem;
          opacity: 0.9;
          margin-bottom: 20px;
          font-family: 'Sora', sans-serif;
        }
        
        .difficulty {
          display: inline-block;
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: bold;
          text-transform: uppercase;
          font-size: 0.9rem;
        }
        
        .difficulty.easy {
          background: linear-gradient(135deg, #4CAF50, #45a049);
        }
        
        .difficulty.medium {
          background: linear-gradient(135deg, #FF9800, #f57c00);
        }
        
        .difficulty.hard {
          background: linear-gradient(135deg, #f44336, #d32f2f);
        }
        
        .back-btn {
          display: inline-block;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 8px;
          margin-bottom: 30px;
          transition: all 0.3s ease;
          font-weight: 500;
        }
        
        .back-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 255, 200, 0.3);
        }
        
        .lesson-content {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 12px;
          padding: 30px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .intro-section {
          margin-bottom: 40px;
          padding: 30px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 12px;
          border: 1px solid rgba(0, 255, 200, 0.2);
        }
        
        .intro-section h2 {
          color: #00FFC8;
          margin-bottom: 20px;
          font-size: 2rem;
        }
        
        .intro-section img {
          width: 100%;
          border-radius: 8px;
          margin-top: 20px;
        }
        
        .navbar {
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          padding: 15px 0;
          border-bottom: 1px solid rgba(0, 255, 200, 0.2);
        }
        
        .nav-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 20px;
        }
        
        .logo {
          font-size: 1.5rem;
          font-weight: bold;
          color: #00FFC8;
          text-decoration: none;
        }
        
        .nav-links {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
          gap: 30px;
        }
        
        .nav-links a {
          color: white;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        
        .nav-links a:hover {
          color: #00FFC8;
        }
        
        .osint-font {
          font-family: 'Courier New', monospace;
        }
        
        .reconnaissance-font {
          font-family: 'Sora', sans-serif;
        }
      `}</style>

      <nav className="navbar" style={{ position: 'relative', zIndex: 2 }}>
        <div className="nav-content">
          <Link to="/" className="logo">CyberLearn</Link>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/#about">About</Link></li>
            <li><Link to="#profile">Profile</Link></li>
          </ul>
        </div>
      </nav>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="page-header">
          <h1 className={`lesson-header-title ${domain === 'osint' ? 'osint-font' : ''} ${domain === 'reconnaissance' ? 'reconnaissance-font' : ''}`}>
            {lesson.title}
          </h1>
          <p className={`lesson-header-subtitle ${domain === 'osint' ? 'osint-font' : ''} ${domain === 'reconnaissance' ? 'reconnaissance-font' : ''}`}>
            {lesson.description}
          </p>
          <span className={`difficulty ${lesson.difficulty}`}>{lesson.difficulty}</span>
        </div>

        <Link 
          to={`/${domain}`} 
          className="back-btn"
          style={{
            background: 'rgba(0,0,0,0.35)',
            border: '1px solid #00FFC8',
            color: '#FFFFFF'
          }}
        >
          ← Back to {domain.toUpperCase()}
        </Link>

        <div className="lesson-content">
          {lesson.intro}
          
          {lesson.sections.map((section, index) => (
            <CollapsibleSection 
              key={index} 
              title={section.title}
              isOpen={openSections.includes(index)}
              onToggle={() => handleToggleSection(index)}
            >
              {section.content}
            </CollapsibleSection>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LessonDetailNew;