import { Suspense, useState, memo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { CryptographyIcon } from '../components/CryptographyIcon';
import QuestionCard from '../components/QuestionCard';

const SECTIONS = [
  {
    id: 'fundamentals',
    title: '1. Public Key Cryptography Fundamentals',
    img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=700&q=60',
    imgAlt: 'Public key cryptography',
    bullets: [
      'Asymmetric encryption uses a pair of mathematically related keys: a public key (freely shared) and a private key (kept secret).',
      'Data encrypted with the public key can only be decrypted with the corresponding private key, and vice versa.',
      'This solves the key distribution problem of symmetric encryption — no need to securely share a secret key beforehand.',
      'Asymmetric algorithms are much slower than symmetric ones, so they are typically used for key exchange and digital signatures rather than bulk data encryption.',
      'The security relies on mathematical problems that are easy to compute in one direction but extremely difficult to reverse (trapdoor functions).',
      'Common asymmetric algorithms include RSA (factoring large numbers), ECC (elliptic curve discrete logarithm), and Diffie-Hellman (discrete logarithm).',
    ],
    questions: [
      { q: 'What is the main advantage of asymmetric encryption over symmetric encryption?', options: ['A. It is faster', 'B. It uses smaller keys', 'C. It solves the key distribution problem', 'D. It provides better security'], answer: 'C' },
      { q: 'What can decrypt data that was encrypted with a public key?', options: ['A. Any public key', 'B. The same public key', 'C. Any private key', 'D. The corresponding private key'], answer: 'D' },
      { q: 'Why are asymmetric algorithms typically not used for bulk data encryption?', options: ['A. They are less secure', 'B. They are much slower than symmetric algorithms', 'C. They cannot handle large files', 'D. They require internet connectivity'], answer: 'B' },
    ],
  },
  {
    id: 'rsa',
    title: '2. RSA Algorithm',
    img: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=700&q=60',
    imgAlt: 'RSA encryption',
    bullets: [
      'RSA (Rivest-Shamir-Adleman) is based on the difficulty of factoring large composite numbers into their prime factors.',
      'Key generation involves selecting two large prime numbers (p and q), computing n = p × q, and deriving the public and private key components.',
      'The public key consists of (n, e) where e is typically 65537, and the private key consists of (n, d) where d is the modular inverse of e.',
      'RSA key sizes of 2048 bits are currently considered secure, while 1024-bit keys are deprecated due to advances in factoring algorithms.',
      'RSA can be used for both encryption and digital signatures — encryption uses the recipient\'s public key, signatures use the sender\'s private key.',
      'Padding schemes like OAEP (Optimal Asymmetric Encryption Padding) are essential to prevent various attacks against textbook RSA.',
    ],
    questions: [
      { q: 'What mathematical problem does RSA security rely on?', options: ['A. Discrete logarithm problem', 'B. Factoring large composite numbers into prime factors', 'C. Elliptic curve discrete logarithm', 'D. Integer square root problem'], answer: 'B' },
      { q: 'What is the current recommended minimum key size for RSA?', options: ['A. 1024 bits', 'B. 1536 bits', 'C. 2048 bits', 'D. 4096 bits'], answer: 'C' },
      { q: 'Why is padding essential in RSA implementations?', options: ['A. To make keys longer', 'B. To prevent various attacks against textbook RSA', 'C. To improve performance', 'D. To reduce key size'], answer: 'B' },
    ],
  },
  {
    id: 'ecc',
    title: '3. Elliptic Curve Cryptography (ECC)',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=60',
    imgAlt: 'Elliptic curves',
    bullets: [
      'ECC is based on the elliptic curve discrete logarithm problem, which is considered harder than the integer factorization problem used by RSA.',
      'ECC provides equivalent security to RSA with much smaller key sizes — a 256-bit ECC key provides similar security to a 3072-bit RSA key.',
      'Smaller key sizes mean faster computations, lower power consumption, and reduced storage requirements — ideal for mobile devices and IoT.',
      'Popular elliptic curves include P-256 (secp256r1), P-384, and P-521 standardized by NIST, as well as Curve25519 designed by Daniel Bernstein.',
      'ECDSA (Elliptic Curve Digital Signature Algorithm) is used for digital signatures, while ECDH (Elliptic Curve Diffie-Hellman) is used for key exchange.',
      'Some curves have been subject to controversy due to potential NSA influence in their design, leading to preference for independently designed curves like Curve25519.',
    ],
    questions: [
      { q: 'What is the main advantage of ECC over RSA?', options: ['A. Better security', 'B. Equivalent security with much smaller key sizes', 'C. Faster key generation', 'D. Simpler implementation'], answer: 'B' },
      { q: 'A 256-bit ECC key provides security equivalent to which RSA key size?', options: ['A. 1024-bit RSA', 'B. 2048-bit RSA', 'C. 3072-bit RSA', 'D. 4096-bit RSA'], answer: 'C' },
      { q: 'Which elliptic curve was independently designed by Daniel Bernstein?', options: ['A. P-256', 'B. P-384', 'C. secp256k1', 'D. Curve25519'], answer: 'D' },
    ],
  },
  {
    id: 'key-exchange',
    title: '4. Key Exchange Protocols',
    img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=700&q=60',
    imgAlt: 'Key exchange',
    bullets: [
      'Diffie-Hellman key exchange allows two parties to establish a shared secret over an insecure channel without prior communication.',
      'The protocol relies on the discrete logarithm problem — it is easy to compute g^x mod p but hard to find x given g^x mod p.',
      'Each party generates a private key (a random number) and computes a public key by raising a generator to the power of their private key.',
      'The shared secret is computed by raising the other party\'s public key to the power of your private key — both parties arrive at the same value.',
      'Ephemeral Diffie-Hellman (DHE/ECDHE) generates new key pairs for each session, providing perfect forward secrecy.',
      'The basic Diffie-Hellman protocol is vulnerable to man-in-the-middle attacks and requires authentication to ensure you are talking to the intended party.',
    ],
    questions: [
      { q: 'What does Diffie-Hellman key exchange accomplish?', options: ['A. Encrypts data directly', 'B. Establishes a shared secret over an insecure channel', 'C. Provides digital signatures', 'D. Authenticates users'], answer: 'B' },
      { q: 'What property does ephemeral Diffie-Hellman (DHE/ECDHE) provide?', options: ['A. Faster computation', 'B. Smaller key sizes', 'C. Perfect forward secrecy', 'D. Built-in authentication'], answer: 'C' },
      { q: 'What is the main vulnerability of basic Diffie-Hellman?', options: ['A. Weak mathematical foundation', 'B. Susceptible to man-in-the-middle attacks', 'C. Too slow for practical use', 'D. Requires large key sizes'], answer: 'B' },
    ],
  },
  {
    id: 'hybrid-systems',
    title: '5. Hybrid Cryptographic Systems',
    img: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=700&q=60',
    imgAlt: 'Hybrid cryptography',
    bullets: [
      'Hybrid systems combine the security of asymmetric encryption with the performance of symmetric encryption for the best of both worlds.',
      'The typical approach is to use asymmetric encryption to securely exchange a symmetric key, then use that symmetric key for bulk data encryption.',
      'TLS/SSL uses this approach — RSA or ECDH for key exchange, then AES for encrypting the actual web traffic.',
      'PGP/GPG email encryption generates a random symmetric key for each message, encrypts the message with that key, then encrypts the key with the recipient\'s public key.',
      'This approach provides the security benefits of public key cryptography while maintaining the performance needed for large amounts of data.',
      'Key encapsulation mechanisms (KEMs) are a modern approach to hybrid encryption, providing a clean interface for combining asymmetric and symmetric cryptography.',
    ],
    questions: [
      { q: 'Why do hybrid cryptographic systems exist?', options: ['A. To reduce key sizes', 'B. To combine the security of asymmetric encryption with the performance of symmetric encryption', 'C. To eliminate the need for keys', 'D. To simplify implementation'], answer: 'B' },
      { q: 'How does TLS/SSL typically implement hybrid encryption?', options: ['A. Uses only symmetric encryption', 'B. Uses only asymmetric encryption', 'C. Uses asymmetric encryption for key exchange, then symmetric encryption for data', 'D. Alternates between symmetric and asymmetric encryption'], answer: 'C' },
      { q: 'In PGP/GPG email encryption, what is encrypted with the recipient\'s public key?', options: ['A. The entire email message', 'B. The sender\'s private key', 'C. A randomly generated symmetric key', 'D. The recipient\'s email address'], answer: 'C' },
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

function CryptoAsymmetric() {
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
          <h1 className="elegant-title crypto-header-title">Asymmetric Encryption</h1>
          <p className="elegant-subtitle crypto-header-subtitle">
            RSA, ECC, and public-key cryptography — solving key distribution
            <span className="difficulty medium" style={{ marginLeft: '1rem', verticalAlign: 'middle' }}>medium</span>
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

export default CryptoAsymmetric;