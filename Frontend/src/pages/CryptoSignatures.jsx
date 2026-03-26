import { Suspense, useState, memo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { CryptographyIcon } from '../components/CryptographyIcon';
import QuestionCard from '../components/QuestionCard';

const SECTIONS = [
  {
    id: 'fundamentals',
    title: '1. Digital Signature Fundamentals',
    img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=700&q=60',
    imgAlt: 'Digital signatures',
    bullets: [
      'Digital signatures provide authentication, integrity, and non-repudiation — proving who sent a message, that it hasn\'t been altered, and that the sender cannot deny sending it.',
      'The process involves hashing the message and encrypting the hash with the sender\'s private key — anyone can verify using the sender\'s public key.',
      'Unlike handwritten signatures, digital signatures are mathematically bound to the specific document content — any change invalidates the signature.',
      'Digital signatures use asymmetric cryptography in reverse — the private key signs (encrypts the hash) and the public key verifies (decrypts the hash).',
      'The signature verification process compares the decrypted hash with a fresh hash of the received message — if they match, the signature is valid.',
      'Digital signatures are legally recognized in many jurisdictions and form the basis of electronic contracts and secure communications.',
    ],
    questions: [
      { q: 'What three security properties do digital signatures provide?', options: ['A. Confidentiality, integrity, availability', 'B. Authentication, integrity, non-repudiation', 'C. Encryption, decryption, hashing', 'D. Privacy, security, anonymity'], answer: 'B' },
      { q: 'In digital signatures, what is encrypted with the private key?', options: ['A. The entire message', 'B. The public key', 'C. The hash of the message', 'D. The recipient\'s address'], answer: 'C' },
      { q: 'How does signature verification work?', options: ['A. Decrypt the signature with public key and compare with fresh hash', 'B. Encrypt the message with public key', 'C. Hash the signature and compare with message', 'D. Decrypt the message with private key'], answer: 'A' },
    ],
  },
  {
    id: 'algorithms',
    title: '2. Digital Signature Algorithms',
    img: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=700&q=60',
    imgAlt: 'Signature algorithms',
    bullets: [
      'RSA signatures use the same mathematical principles as RSA encryption but in reverse — sign with private key, verify with public key.',
      'DSA (Digital Signature Algorithm) was designed specifically for signatures and uses the discrete logarithm problem for security.',
      'ECDSA (Elliptic Curve DSA) provides the same security as DSA with smaller key sizes, making it ideal for mobile and embedded devices.',
      'EdDSA (Edwards-curve DSA) using Curve25519 offers high performance and security with deterministic signatures that don\'t require random number generation.',
      'Each algorithm has different performance characteristics — RSA is slower but widely supported, while ECDSA and EdDSA are faster with smaller signatures.',
      'The choice of algorithm often depends on compatibility requirements, performance needs, and regulatory compliance in specific industries.',
    ],
    questions: [
      { q: 'What mathematical problem does DSA rely on for security?', options: ['A. Integer factorization', 'B. Discrete logarithm problem', 'C. Elliptic curve discrete logarithm', 'D. Hash function collision resistance'], answer: 'B' },
      { q: 'What is the main advantage of ECDSA over DSA?', options: ['A. Better security', 'B. Faster computation', 'C. Same security with smaller key sizes', 'D. Simpler implementation'], answer: 'C' },
      { q: 'What makes EdDSA signatures deterministic?', options: ['A. They always produce the same output', 'B. They don\'t require random number generation during signing', 'C. They use fixed key sizes', 'D. They only work with specific hash functions'], answer: 'B' },
    ],
  },
  {
    id: 'pki',
    title: '3. Public Key Infrastructure (PKI)',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=60',
    imgAlt: 'PKI infrastructure',
    bullets: [
      'PKI is the framework that manages digital certificates, certificate authorities (CAs), and the trust relationships between them.',
      'Certificate Authorities are trusted third parties that issue digital certificates binding public keys to identities after verifying the key owner.',
      'X.509 certificates contain the public key, identity information, validity period, and are signed by the CA to prevent tampering.',
      'Certificate chains establish trust through a hierarchy — root CAs are self-signed and trusted by default, intermediate CAs are signed by roots.',
      'Certificate Revocation Lists (CRLs) and Online Certificate Status Protocol (OCSP) handle certificates that are compromised or no longer valid.',
      'Trust stores in operating systems and browsers contain root CA certificates that form the foundation of web security (HTTPS).',
    ],
    questions: [
      { q: 'What is the role of a Certificate Authority (CA)?', options: ['A. To encrypt all internet traffic', 'B. To issue digital certificates binding public keys to identities', 'C. To generate private keys for users', 'D. To store all public keys centrally'], answer: 'B' },
      { q: 'What information does an X.509 certificate contain?', options: ['A. Only the public key', 'B. Only identity information', 'C. Public key, identity information, validity period, and CA signature', 'D. Private key and password'], answer: 'C' },
      { q: 'How do certificate chains establish trust?', options: ['A. All certificates are self-signed', 'B. Through a hierarchy from trusted root CAs to intermediate CAs', 'C. By storing all certificates locally', 'D. Through peer-to-peer verification'], answer: 'B' },
    ],
  },
  {
    id: 'applications',
    title: '4. Real-World Applications',
    img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=700&q=60',
    imgAlt: 'Digital signature applications',
    bullets: [
      'HTTPS/TLS uses digital signatures to authenticate web servers and ensure you\'re connecting to the legitimate site, not an imposter.',
      'Code signing certificates verify that software hasn\'t been tampered with and comes from a trusted publisher — critical for operating system security.',
      'Email signatures (S/MIME, PGP) provide authentication and integrity for email communications, preventing spoofing and tampering.',
      'Document signing platforms like DocuSign use digital signatures for legally binding electronic contracts and agreements.',
      'Blockchain and cryptocurrencies rely heavily on digital signatures to authorize transactions and prove ownership of digital assets.',
      'Government and enterprise applications use smart cards and hardware security modules (HSMs) to store private keys securely for high-value signatures.',
    ],
    questions: [
      { q: 'What does HTTPS/TLS use digital signatures for?', options: ['A. Encrypting all web traffic', 'B. Authenticating web servers to prevent impersonation', 'C. Storing user passwords', 'D. Compressing web content'], answer: 'B' },
      { q: 'Why are code signing certificates important?', options: ['A. They make software run faster', 'B. They verify software hasn\'t been tampered with and comes from a trusted publisher', 'C. They encrypt the software code', 'D. They reduce file sizes'], answer: 'B' },
      { q: 'In blockchain systems, what do digital signatures prove?', options: ['A. The speed of transactions', 'B. The amount of cryptocurrency', 'C. Authorization of transactions and ownership of digital assets', 'D. The network connectivity'], answer: 'C' },
    ],
  },
  {
    id: 'attacks-defenses',
    title: '5. Attacks and Defenses',
    img: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=700&q=60',
    imgAlt: 'Security attacks and defenses',
    bullets: [
      'Key compromise is the most serious threat — if a private key is stolen, an attacker can forge signatures until the key is revoked.',
      'Weak random number generation in signature algorithms can lead to private key recovery, as seen in some Bitcoin wallet implementations.',
      'Hash collision attacks can potentially allow signature forgery if the underlying hash function is broken (why MD5 and SHA-1 are deprecated).',
      'Man-in-the-middle attacks can intercept and replace certificates during key exchange, which is why certificate pinning is used in critical applications.',
      'Social engineering attacks target certificate authorities to issue fraudulent certificates for legitimate domains.',
      'Defense strategies include hardware security modules, certificate transparency logs, key rotation, and multi-signature schemes for high-value applications.',
    ],
    questions: [
      { q: 'What is the most serious threat to digital signature security?', options: ['A. Slow verification speed', 'B. Large signature sizes', 'C. Private key compromise', 'D. Network latency'], answer: 'C' },
      { q: 'Why can weak random number generation be dangerous in signatures?', options: ['A. It makes signatures slower', 'B. It can lead to private key recovery', 'C. It makes signatures larger', 'D. It reduces compatibility'], answer: 'B' },
      { q: 'What is certificate pinning used to prevent?', options: ['A. Slow certificate verification', 'B. Large certificate sizes', 'C. Man-in-the-middle attacks during key exchange', 'D. Certificate expiration'], answer: 'C' },
    ],
  },
];

const CollapsibleCard = memo(function CollapsibleCard({ title, img, imgAlt, bullets, questions }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`crypto-panel${open ? ' crypto-panel--open' : ''}`}>
      <button className="crypto-panel-header" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <span className="crypto-panel-title">{title}</span>
        <span className="crypto-panel-toggle" aria-hidden="true">{open ? '-' : '+'}</span>
      </button>
      <div className="crypto-panel-body">
        <div>
          <img className="crypto-panel-img" src={img} alt={imgAlt} />
          <div className="crypto-panel-content">
            <ul className="crypto-card-list">{bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>
            <div className="crypto-mcq-block">
              <p className="crypto-mcq-heading">Practice Questions</p>
              {questions.map((item, qi) => (
                <QuestionCard key={`${item.q}-${qi}`} question={item.q} options={item.options} correctAnswer={item.answer} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

function CryptoSignatures() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Suspense fallback={<div />}>
        <ShaderGradientCanvas style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, opacity: 0.8 }}>
          <ShaderGradient animate="off" axesHelper="on" brightness={1.4} cAzimuthAngle={0} cDistance={7.1} cPolarAngle={140} cameraZoom={17.29} color1="#aeacb7" color2="#152921" color3="#002f00" destination="onCanvas" embedMode="off" envPreset="city" format="gif" fov={45} frameRate={10} gizmoHelper="hide" grain="off" lightType="3d" pixelDensity={1} positionX={0} positionY={0} positionZ={0} range="disabled" rangeEnd={40} rangeStart={0} reflection={0.1} rotationX={0} rotationY={0} rotationZ={0} shader="defaults" type="sphere" uAmplitude={1.6} uDensity={1.1} uFrequency={5.5} uSpeed={0.1} uStrength={1} uTime={0} wireframe={false} />
        </ShaderGradientCanvas>
      </Suspense>
      <style>{`
        .back-btn { transition: transform 0.2s ease; }
        .back-btn:hover { transform: scale(1.05) translateY(-2px); }
        .crypto-back-btn:hover { background: rgba(92,242,255,0.25) !important; border-color: #5CF2FF !important; color: #FFFFFF !important; }
        .crypto-header-title { color: #abcfc9 !important; -webkit-text-fill-color: #abcfc9 !important; background: none !important; font-family: 'Sora', sans-serif !important; }
        .crypto-header-subtitle { font-family: 'Sora', sans-serif !important; }
        .crypto-accordion { display: flex; flex-direction: column; gap: 0.85rem; margin-top: 2rem; }
        .crypto-panel { background: linear-gradient(135deg,#0a0f0f 0%,#0d0d0d 100%); border: 1px solid rgba(171,207,201,0.2); border-radius: 8px; overflow: hidden; transition: border-color 0.25s ease, box-shadow 0.25s ease; }
        .crypto-panel:hover, .crypto-panel--open { border-color: #abcfc9; box-shadow: 0 4px 18px rgba(171,207,201,0.18); }
        .crypto-panel-header { width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.5rem; background: transparent; border: none; cursor: pointer; text-align: left; gap: 1rem; }
        .crypto-panel-header:focus-visible { outline: 2px solid #abcfc9; outline-offset: -2px; }
        .crypto-panel-title { font-family: 'Sora', sans-serif; font-size: 1rem; font-weight: 700; color: #abcfc9; letter-spacing: 0.01em; line-height: 1.3; }
        .crypto-panel-toggle { flex-shrink: 0; width: 26px; height: 26px; display: flex; align-items: center; justify-content: center; border-radius: 50%; border: 1px solid rgba(171,207,201,0.45); color: #abcfc9; font-size: 1.2rem; line-height: 1; font-family: 'Sora', sans-serif; font-weight: 300; transition: background 0.2s ease, border-color 0.2s ease; user-select: none; }
        .crypto-panel--open .crypto-panel-toggle { background: rgba(171,207,201,0.12); border-color: #abcfc9; }
        .crypto-panel-body { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.3s ease; }
        .crypto-panel--open .crypto-panel-body { grid-template-rows: 1fr; }
        .crypto-panel-body > div { overflow: hidden; }
        .crypto-panel--open .crypto-panel-body > div { overflow: visible; }
        .crypto-panel-img { width: 100%; height: auto; max-height: 260px; object-fit: cover; display: block; border-radius: 6px; margin-bottom: 1rem; opacity: 0.68; filter: saturate(0.5) brightness(0.8); transition: opacity 0.25s ease; }
        .crypto-panel--open .crypto-panel-img { opacity: 0.82; }
        .crypto-panel-content { padding: 1rem 1.5rem 1.4rem; }
        .crypto-card-list { margin: 0; padding-left: 1.15rem; list-style: disc; }
        .crypto-card-list li { font-family: 'Oxanium', sans-serif; font-size: 0.875rem; color: rgba(224,224,224,0.85); line-height: 1.7; margin-bottom: 0.35rem; }
        .crypto-card-list li::marker { color: #abcfc9; }
        .crypto-mcq-block { margin-top: 1.25rem; padding-top: 1rem; border-top: 1px solid rgba(171,207,201,0.25); }
        .crypto-mcq-heading { font-family: 'Sora', sans-serif; font-size: 0.82rem; font-weight: 700; color: #2dd68f; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.75rem; }
      `}</style>
      <Navbar />
      <div className="container" style={{ position: 'relative', zIndex: 1, paddingBottom: '4rem' }}>
        <div className="page-header elegant-header">
          <div className="header-icon"><CryptographyIcon size={80} /></div>
          <h1 className="elegant-title crypto-header-title">Digital Signatures & PKI</h1>
          <p className="elegant-subtitle crypto-header-subtitle">
            Authentication, integrity, and trust chains — proving identity and preventing forgery
            <span className="difficulty hard" style={{ marginLeft: '1rem', verticalAlign: 'middle' }}>hard</span>
          </p>
          <div className="header-divider"></div>
        </div>
        <Link to="/cryptography" className="back-btn crypto-back-btn" style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid #00FFC8', color: '#FFFFFF' }}>
          ← Back to Cryptography
        </Link>
        <div className="crypto-accordion">
          {SECTIONS.map((s) => <CollapsibleCard key={s.id} {...s} />)}
        </div>
      </div>
    </div>
  );
}

export default CryptoSignatures;