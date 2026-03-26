import { Link } from 'react-router-dom';
import { OsintIcon } from './OsintIcon';
import { ReconIcon } from './ReconIcon';
import { CryptographyIcon } from './CryptographyIcon';
import { NetworkSecurityIcon } from './NetworkSecurityIcon';
import { CTFIcon } from './CTFIcon';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About CyberLearn</h3>
          <p>Master cybersecurity through gamified learning and hands-on challenges. Build your skills with interactive lessons and CTF challenges.</p>

        </div>

        <div className="footer-section">
          <h3>Learning Paths</h3>
          <ul className="footer-links">
            <li>
              <Link to="/osint" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <OsintIcon size={24} /> OSINT
              </Link>
            </li>
            <li>
              <Link to="/reconnaissance" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ReconIcon size={24} /> Reconnaissance
              </Link>
            </li>
            <li>
              <Link to="/cryptography" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CryptographyIcon size={24} /> Cryptography
              </Link>
            </li>
            <li>
              <Link to="/network-security" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <NetworkSecurityIcon size={24} /> Network Security
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Practice</h3>
          <ul className="footer-links">
            <li>
              <Link to="/ctf" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CTFIcon size={24} /> CTF Challenges
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} CyberLearn. All rights reserved.</p>
        <p>Built with ❤️ for cybersecurity enthusiasts</p>
      </div>
    </footer>
  );
}

export default Footer;
