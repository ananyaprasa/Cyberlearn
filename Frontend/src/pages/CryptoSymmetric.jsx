import { Suspense, useState, memo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { CryptographyIcon } from '../components/CryptographyIcon';
import QuestionCard from '../components/QuestionCard';

const SECTIONS = [
  {
    id: 'fundamentals',
    title: '1. Symmetric Encryption Fundamentals',
    img: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=700&q=60',
    imgAlt: 'Symmetric encryption concept',
    bullets: [
      'Symmetric encryption uses a single shared key for both encryption and decryption — the same key that encrypts the plaintext also decrypts the ciphertext.',
      'The key must be kept secret and securely shared between communicating parties before any encrypted communication can begin.',
      'Symmetric algorithms are generally much faster than asymmetric algorithms, making them ideal for encrypting large amounts of data.',
      'The main challenge is key distribution — how do you securely share the key without an attacker intercepting it?',
      'Common symmetric algorithms include AES (Advanced Encryption Standard), DES (Data Encryption Standard), and ChaCha20.',
      'Block ciphers encrypt fixed-size blocks of data (e.g., AES uses 128-bit blocks), while stream ciphers encrypt data bit by bit or byte by byte.',
    ],
    questions: [
      { q: 'What is the main characteristic of symmetric encryption?', options: ['A. Uses different keys for encryption and decryption', 'B. Uses the same key for both encryption and decryption', 'C. Does not require any keys', 'D. Only works with text data'], answer: 'B' },
      { q: 'What is the primary challenge with symmetric encryption?', options: ['A. It is too slow for practical use', 'B. It cannot encrypt large files', 'C. Secure key distribution between parties', 'D. It produces weak encryption'], answer: 'C' },
      { q: 'Which type of cipher encrypts data in fixed-size chunks?', options: ['A. Stream cipher', 'B. Block cipher', 'C. Hash cipher', 'D. Key cipher'], answer: 'B' },
    ],
  },
  {
    id: 'aes',
    title: '2. Advanced Encryption Standard (AES)',
    img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=700&q=60',
    imgAlt: 'AES encryption',
    bullets: [
      'AES is the current standard for symmetric encryption, adopted by the US government in 2001 and widely used worldwide.',
      'AES operates on 128-bit blocks and supports key sizes of 128, 192, or 256 bits — longer keys provide stronger security but require more processing power.',
      'The algorithm uses substitution-permutation networks with multiple rounds: 10 rounds for 128-bit keys, 12 for 192-bit, and 14 for 256-bit keys.',
      'Each round involves four operations: SubBytes (substitution), ShiftRows (permutation), MixColumns (diffusion), and AddRoundKey (key mixing).',
      'AES is considered quantum-resistant for 256-bit keys, meaning even quantum computers would struggle to break it in reasonable time.',
      'AES is implemented in hardware on most modern processors, making it extremely fast and efficient for real-world applications.',
    ],
    questions: [
      { q: 'What block size does AES use?', options: ['A. 64 bits', 'B. 128 bits', 'C. 256 bits', 'D. 512 bits'], answer: 'B' },
      { q: 'How many rounds does AES-256 use?', options: ['A. 10 rounds', 'B. 12 rounds', 'C. 14 rounds', 'D. 16 rounds'], answer: 'C' },
      { q: 'Which AES key size is considered quantum-resistant?', options: ['A. 128-bit', 'B. 192-bit', 'C. 256-bit', 'D. All key sizes'], answer: 'C' },
    ],
  },
  {
    id: 'modes',
    title: '3. Block Cipher Modes of Operation',
    img: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=700&q=60',
    imgAlt: 'Cipher modes',
    bullets: [
      'Block cipher modes determine how multiple blocks of data are encrypted — the mode affects security, performance, and error propagation.',
      'ECB (Electronic Codebook) encrypts each block independently — it is fast but insecure because identical plaintext blocks produce identical ciphertext blocks.',
      'CBC (Cipher Block Chaining) XORs each plaintext block with the previous ciphertext block before encryption — requires an initialization vector (IV).',
      'CTR (Counter) mode turns a block cipher into a stream cipher by encrypting a counter value and XORing with plaintext — allows parallel processing.',
      'GCM (Galois/Counter Mode) combines CTR mode with authentication, providing both confidentiality and integrity in a single operation.',
      'The choice of mode is critical — using ECB mode can reveal patterns in data, while improper IV handling in CBC can lead to vulnerabilities.',
    ],
    questions: [
      { q: 'Why is ECB mode considered insecure?', options: ['A. It is too slow', 'B. Identical plaintext blocks produce identical ciphertext blocks, revealing patterns', 'C. It requires too much memory', 'D. It cannot encrypt large files'], answer: 'B' },
      { q: 'What does CBC mode require that ECB mode does not?', options: ['A. A longer key', 'B. More processing power', 'C. An initialization vector (IV)', 'D. A different algorithm'], answer: 'C' },
      { q: 'Which mode provides both encryption and authentication?', options: ['A. ECB', 'B. CBC', 'C. CTR', 'D. GCM'], answer: 'D' },
    ],
  },
  {
    id: 'stream-ciphers',
    title: '4. Stream Ciphers',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=60',
    imgAlt: 'Stream cipher concept',
    bullets: [
      'Stream ciphers encrypt data one bit or byte at a time by generating a keystream that is XORed with the plaintext.',
      'The keystream is generated from the key and often a nonce (number used once) to ensure the same plaintext produces different ciphertext.',
      'RC4 was once widely used but is now considered broken due to biases in its keystream — it should not be used in new applications.',
      'ChaCha20 is a modern stream cipher designed by Daniel Bernstein, offering high security and performance, especially on mobile devices.',
      'Stream ciphers are ideal for real-time applications like voice calls or video streaming where data arrives continuously.',
      'The main vulnerability is keystream reuse — if the same keystream is used twice, an attacker can recover both plaintexts through XOR analysis.',
    ],
    questions: [
      { q: 'How do stream ciphers encrypt data?', options: ['A. In fixed-size blocks', 'B. One bit or byte at a time using a keystream', 'C. By rearranging the data', 'D. Using multiple keys simultaneously'], answer: 'B' },
      { q: 'What is the main vulnerability of stream ciphers?', options: ['A. They are too slow', 'B. Keystream reuse allows recovery of plaintexts', 'C. They require large amounts of memory', 'D. They cannot handle binary data'], answer: 'B' },
      { q: 'Which modern stream cipher is recommended for new applications?', options: ['A. RC4', 'B. DES', 'C. ChaCha20', 'D. MD5'], answer: 'C' },
    ],
  },
  {
    id: 'attacks',
    title: '5. Attacks on Symmetric Encryption',
    img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=700&q=60',
    imgAlt: 'Cryptographic attacks',
    bullets: [
      'Brute force attacks try every possible key until the correct one is found — key length directly determines resistance to this attack.',
      'Known plaintext attacks exploit situations where an attacker has both plaintext and corresponding ciphertext to deduce information about the key.',
      'Chosen plaintext attacks allow the attacker to encrypt arbitrary plaintexts and analyze the resulting ciphertexts to find weaknesses.',
      'Side-channel attacks exploit physical implementations — timing attacks, power analysis, and electromagnetic emanations can reveal key information.',
      'Padding oracle attacks exploit improper error handling in block cipher padding schemes to decrypt data without knowing the key.',
      'Key management failures are often the weakest link — weak key generation, improper storage, or reuse of keys can compromise even strong algorithms.',
    ],
    questions: [
      { q: 'What determines resistance to brute force attacks?', options: ['A. Algorithm complexity', 'B. Key length', 'C. Block size', 'D. Number of rounds'], answer: 'B' },
      { q: 'What do side-channel attacks exploit?', options: ['A. Mathematical weaknesses in algorithms', 'B. Physical characteristics of implementations like timing or power consumption', 'C. Network vulnerabilities', 'D. Software bugs'], answer: 'B' },
      { q: 'What is often the weakest link in cryptographic systems?', options: ['A. The algorithm itself', 'B. The hardware implementation', 'C. Key management practices', 'D. The network protocol'], answer: 'C' },
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

function CryptoSymmetric() {
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
          <h1 className="elegant-title crypto-header-title">Symmetric Encryption</h1>
          <p className="elegant-subtitle crypto-header-subtitle">
            AES, DES, and stream ciphers — shared key cryptography fundamentals
            <span className="difficulty easy" style={{ marginLeft: '1rem', verticalAlign: 'middle' }}>easy</span>
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

export default CryptoSymmetric;