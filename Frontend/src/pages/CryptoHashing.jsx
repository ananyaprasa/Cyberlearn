import { Suspense, useState, memo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { CryptographyIcon } from '../components/CryptographyIcon';
import QuestionCard from '../components/QuestionCard';

const SECTIONS = [
  {
    id: 'fundamentals',
    title: '1. Hash Function Fundamentals',
    img: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=700&q=60',
    imgAlt: 'Hash function concept',
    bullets: [
      'A cryptographic hash function takes an input of any size and produces a fixed-size output (hash or digest) that appears random.',
      'Hash functions are deterministic — the same input always produces the same output, but changing even one bit dramatically changes the result.',
      'Good hash functions exhibit the avalanche effect — a small change in input causes a large change in output, making patterns undetectable.',
      'Hash functions are one-way functions — it should be computationally infeasible to find an input that produces a specific hash value.',
      'Common uses include password storage, data integrity verification, digital signatures, and blockchain proof-of-work systems.',
      'Unlike encryption, hashing is not reversible — you cannot decrypt a hash to recover the original input.',
    ],
    questions: [
      { q: 'What is a key characteristic of cryptographic hash functions?', options: ['A. They can be reversed to get the original input', 'B. They produce variable-size outputs', 'C. They are deterministic and one-way', 'D. They require a secret key'], answer: 'C' },
      { q: 'What is the avalanche effect in hash functions?', options: ['A. Hash functions become slower over time', 'B. A small change in input causes a large change in output', 'C. Hash functions produce longer outputs', 'D. Multiple inputs produce the same output'], answer: 'B' },
      { q: 'Which of these is NOT a common use of hash functions?', options: ['A. Password storage', 'B. Data integrity verification', 'C. Bulk data encryption', 'D. Digital signatures'], answer: 'C' },
    ],
  },
  {
    id: 'algorithms',
    title: '2. Common Hash Algorithms',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=60',
    imgAlt: 'Hash algorithms',
    bullets: [
      'MD5 produces 128-bit hashes but is cryptographically broken due to collision vulnerabilities — it should not be used for security purposes.',
      'SHA-1 produces 160-bit hashes and was widely used but is now deprecated due to practical collision attacks demonstrated by researchers.',
      'SHA-2 family includes SHA-224, SHA-256, SHA-384, and SHA-512, with the number indicating the output size in bits — currently considered secure.',
      'SHA-3 (Keccak) uses a different construction than SHA-2 and provides an alternative in case SHA-2 is compromised in the future.',
      'BLAKE2 is a modern hash function that is faster than SHA-2 while providing equivalent security, making it popular in new applications.',
      'Each algorithm represents a trade-off between security, performance, and output size — longer hashes generally provide better security.',
    ],
    questions: [
      { q: 'Why should MD5 not be used for security purposes?', options: ['A. It is too slow', 'B. It produces outputs that are too short', 'C. It is cryptographically broken due to collision vulnerabilities', 'D. It requires too much memory'], answer: 'C' },
      { q: 'What does the number in SHA-256 represent?', options: ['A. The input size in bits', 'B. The output size in bits', 'C. The number of rounds', 'D. The key size in bits'], answer: 'B' },
      { q: 'Which hash function uses a different construction than SHA-2?', options: ['A. SHA-1', 'B. MD5', 'C. SHA-3 (Keccak)', 'D. BLAKE2'], answer: 'C' },
    ],
  },
  {
    id: 'properties',
    title: '3. Security Properties',
    img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=700&q=60',
    imgAlt: 'Security properties',
    bullets: [
      'Pre-image resistance means it should be computationally infeasible to find an input that produces a given hash output.',
      'Second pre-image resistance means given an input and its hash, it should be infeasible to find a different input that produces the same hash.',
      'Collision resistance means it should be infeasible to find any two different inputs that produce the same hash output.',
      'Collision resistance is the strongest property — if a function is collision-resistant, it is also second pre-image resistant.',
      'Birthday attacks exploit the birthday paradox to find collisions more efficiently than brute force, requiring roughly 2^(n/2) operations for n-bit hashes.',
      'The security level of a hash function is typically half the output size due to birthday attacks — SHA-256 provides 128 bits of security.',
    ],
    questions: [
      { q: 'What does pre-image resistance mean?', options: ['A. The hash function is fast', 'B. It should be infeasible to find an input that produces a given hash', 'C. The hash function produces unique outputs', 'D. The hash function requires a key'], answer: 'B' },
      { q: 'Which is the strongest security property of hash functions?', options: ['A. Pre-image resistance', 'B. Second pre-image resistance', 'C. Collision resistance', 'D. Avalanche effect'], answer: 'C' },
      { q: 'How many bits of security does SHA-256 provide against birthday attacks?', options: ['A. 256 bits', 'B. 128 bits', 'C. 64 bits', 'D. 512 bits'], answer: 'B' },
    ],
  },
  {
    id: 'applications',
    title: '4. Hash Function Applications',
    img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=700&q=60',
    imgAlt: 'Hash applications',
    bullets: [
      'Password storage uses hashing with salt to prevent rainbow table attacks — the password is never stored in plaintext.',
      'Digital signatures hash the message before signing to improve efficiency and security — signing a hash is faster than signing large documents.',
      'Data integrity verification uses checksums and hash values to detect corruption or tampering during storage or transmission.',
      'Blockchain and cryptocurrencies use hash functions for proof-of-work mining and to link blocks in an immutable chain.',
      'Hash tables and data structures use hash functions for fast data lookup, though cryptographic properties are not always required.',
      'Merkle trees use hash functions to efficiently verify the integrity of large data sets by creating a tree of hash values.',
    ],
    questions: [
      { q: 'Why are passwords hashed with salt?', options: ['A. To make them longer', 'B. To prevent rainbow table attacks', 'C. To make hashing faster', 'D. To encrypt the password'], answer: 'B' },
      { q: 'In digital signatures, why is the message hashed before signing?', options: ['A. To hide the message content', 'B. To make the signature shorter', 'C. To improve efficiency and security', 'D. To add encryption'], answer: 'C' },
      { q: 'What do Merkle trees use hash functions for?', options: ['A. Password storage', 'B. Efficiently verifying integrity of large data sets', 'C. Encrypting data', 'D. Generating random numbers'], answer: 'B' },
    ],
  },
  {
    id: 'attacks',
    title: '5. Attacks on Hash Functions',
    img: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=700&q=60',
    imgAlt: 'Hash attacks',
    bullets: [
      'Rainbow tables are precomputed tables of hash values for common passwords, making password cracking much faster.',
      'Salt values (random data added to passwords before hashing) make rainbow tables ineffective by ensuring unique hashes for identical passwords.',
      'Brute force attacks try all possible inputs until finding one that produces the target hash — longer hashes make this impractical.',
      'Dictionary attacks use lists of common passwords and phrases, which is why complex passwords are important.',
      'Length extension attacks exploit the internal structure of some hash functions to append data to a message without knowing the original content.',
      'Collision attacks find two different inputs that produce the same hash — successful attacks against MD5 and SHA-1 led to their deprecation.',
    ],
    questions: [
      { q: 'What makes rainbow tables ineffective?', options: ['A. Using longer passwords', 'B. Using salt values', 'C. Using stronger hash algorithms', 'D. Using encryption instead'], answer: 'B' },
      { q: 'What is a length extension attack?', options: ['A. Making hash outputs longer', 'B. Extending the time needed to compute hashes', 'C. Appending data to a message without knowing the original content', 'D. Using longer input messages'], answer: 'C' },
      { q: 'Why were MD5 and SHA-1 deprecated?', options: ['A. They were too slow', 'B. They produced outputs that were too short', 'C. Successful collision attacks were demonstrated', 'D. They required too much memory'], answer: 'C' },
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

function CryptoHashing() {
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
          <h1 className="elegant-title crypto-header-title">Hash Functions & Integrity</h1>
          <p className="elegant-subtitle crypto-header-subtitle">
            SHA, MD5, and cryptographic hashing — data integrity and verification
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

export default CryptoHashing;