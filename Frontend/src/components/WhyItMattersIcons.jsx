/* Animated icons for the "Why It Matters" section on the Home page */

export function BusinessProtectionIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 200 200" fill="none">
      <g style={{ animation: 'bp-glow 3s ease-in-out infinite', filter: 'drop-shadow(0 0 5px #f87171)' }}>
        <g style={{ animation: 'bp-float 2.5s ease-in-out infinite' }}>
          <rect x="26" y="78" width="148" height="98" rx="14" fill="#2a0e0e" stroke="#f87171" strokeWidth="2.5"/>
          <path d="M74 78 V62 a26 26 0 0 1 52 0 V78" stroke="#f87171" strokeWidth="3" fill="none" strokeLinecap="round"/>
          <rect x="86" y="112" width="28" height="20" rx="6" fill="#f87171" opacity="0.9"/>
          <rect x="92" y="108" width="16" height="10" rx="4" fill="#2a0e0e" stroke="#f87171" strokeWidth="1.8"/>
          <line x1="44" y1="138" x2="86" y2="138" stroke="#f87171" strokeWidth="2" strokeLinecap="round"
            style={{ strokeDasharray:'40 8', animation:'bp-scan 2s linear infinite' }}/>
          <line x1="114" y1="138" x2="156" y2="138" stroke="#fca5a5" strokeWidth="2" strokeLinecap="round"
            style={{ strokeDasharray:'40 8', animation:'bp-scan 2s linear infinite 0.5s' }}/>
        </g>
        <circle cx="158" cy="52" r="28" fill="#2a0e0e" stroke="#f87171" strokeWidth="2"/>
        <circle cx="158" cy="42" r="6" fill="#f87171"
          style={{ animation:'bp-pulse 1.8s ease-in-out infinite' }}/>
        <rect x="154" y="50" width="8" height="18" rx="3" fill="#f87171" opacity="0.9"/>
      </g>
    </svg>
  );
}

export function DataPrivacyIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 200 200" fill="none">
      <g style={{ animation: 'fp-glow 3s ease-in-out infinite', filter: 'drop-shadow(0 0 5px #fbbf24)' }}>
        <path d="M30 130 C28 80 60 36 100 34 C140 36 172 80 170 130"
          fill="none" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round"
          style={{ strokeDasharray:'320', animation:'fp-scan 3s linear infinite' }}/>
        <path d="M46 134 C44 92 68 56 100 54 C132 56 156 92 154 134"
          fill="none" stroke="#fbbf24" strokeWidth="2.8" strokeLinecap="round"
          style={{ strokeDasharray:'240', animation:'fp-scan2 3s linear infinite 0.3s' }}/>
        <path d="M62 138 C60 104 76 76 100 74 C124 76 140 104 138 138"
          fill="none" stroke="#fde68a" strokeWidth="2.5" strokeLinecap="round"
          style={{ strokeDasharray:'160', animation:'fp-scan3 3s linear infinite 0.6s' }}/>
        <path d="M78 142 C76 116 85 96 100 94 C115 96 124 116 122 142"
          fill="none" stroke="#fbbf24" strokeWidth="2.2" strokeLinecap="round"
          style={{ strokeDasharray:'100', animation:'fp-scan4 3s linear infinite 0.9s' }}/>
        <path d="M92 148 C90 132 93 116 100 114 C107 116 110 132 108 148"
          fill="none" stroke="#fde68a" strokeWidth="2" strokeLinecap="round"
          style={{ strokeDasharray:'60', animation:'fp-scan5 3s linear infinite 1.2s' }}/>
        <circle cx="100" cy="114" r="4" fill="#fbbf24"
          style={{ animation:'fp-dot 2s ease-in-out infinite' }}/>
        <line x1="22" y1="100" x2="178" y2="100"
          stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" opacity="0.5"
          style={{ animation:'fp-beam 2.5s ease-in-out infinite' }}/>
      </g>
    </svg>
  );
}

export function NationalSecurityIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 200 200" fill="none">
      <g style={{ animation: 'ns-glow 3s ease-in-out infinite', filter: 'drop-shadow(0 0 5px #38bdf8)' }}>
        <circle cx="100" cy="100" r="68" fill="#061828" stroke="#38bdf8" strokeWidth="2.5"/>
        <ellipse cx="100" cy="100" rx="68" ry="27" fill="none" stroke="#38bdf8" strokeWidth="1" opacity="0.3"/>
        <line x1="32" y1="100" x2="168" y2="100" stroke="#38bdf8" strokeWidth="1" opacity="0.3"/>
        <line x1="100" y1="32" x2="100" y2="168" stroke="#38bdf8" strokeWidth="1" opacity="0.25"/>
        <path d="M100 32 C128 52 128 148 100 168" fill="none" stroke="#38bdf8" strokeWidth="1" opacity="0.25"/>
        <path d="M100 32 C72 52 72 148 100 168" fill="none" stroke="#38bdf8" strokeWidth="1" opacity="0.25"/>
        <g style={{ animation: 'ns-spin 12s linear infinite', transformOrigin: '100px 100px' }}>
          <circle cx="100" cy="100" r="86" fill="none" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="6 10" opacity="0.5"/>
          <circle cx="100" cy="14" r="5" fill="#38bdf8" opacity="0.7"/>
          <circle cx="186" cy="100" r="4" fill="#7dd3fc" opacity="0.5"/>
        </g>
        <circle cx="72" cy="88" r="6" fill="#38bdf8"
          style={{ animation:'ns-ping 2s ease-in-out infinite' }}/>
        <circle cx="126" cy="112" r="6" fill="#7dd3fc"
          style={{ animation:'ns-ping 2s ease-in-out infinite 0.5s' }}/>
        <circle cx="100" cy="68" r="5" fill="#bae6fd"
          style={{ animation:'ns-ping 2s ease-in-out infinite 1s' }}/>
      </g>
    </svg>
  );
}

export function FinancialSecurityIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 200 200" fill="none">
      <g style={{ animation: 'vt-glow 3s ease-in-out infinite', filter: 'drop-shadow(0 0 5px #4ade80)' }}>
        <rect x="22" y="36" width="156" height="136" rx="16" fill="#0a2018" stroke="#4ade80" strokeWidth="2.8"/>
        <rect x="34" y="48" width="132" height="112" rx="10" fill="#061510" stroke="#4ade80" strokeWidth="1.2" opacity="0.5"/>
        <circle cx="100" cy="108" r="44" fill="#0a2018" stroke="#4ade80" strokeWidth="2.2"/>
        <circle cx="100" cy="108" r="28" fill="none" stroke="#4ade80" strokeWidth="1.5"
          style={{ animation:'vt-ring 2.5s ease-in-out infinite' }}/>
        <g style={{ animation: 'vt-spin 6s linear infinite', transformOrigin: '100px 108px' }}>
          <circle cx="100" cy="108" r="36" fill="none" stroke="#4ade80" strokeWidth="1" strokeDasharray="4 8" opacity="0.6"/>
          <line x1="100" y1="72" x2="100" y2="78" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="100" y1="138" x2="100" y2="144" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="64" y1="108" x2="70" y2="108" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="130" y1="108" x2="136" y2="108" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="100" y1="108" x2="100" y2="78" stroke="#86efac" strokeWidth="3" strokeLinecap="round"/>
        </g>
        <circle cx="100" cy="108" r="10" fill="#0a2018" stroke="#4ade80" strokeWidth="2"/>
        <circle cx="100" cy="108" r="4" fill="#4ade80"/>
        <line x1="22" y1="70" x2="44" y2="70" stroke="#4ade80" strokeWidth="4" strokeLinecap="round"
          style={{ strokeDasharray:'22 8', animation:'vt-bolt 2s ease-in-out infinite' }}/>
        <line x1="22" y1="108" x2="44" y2="108" stroke="#4ade80" strokeWidth="4" strokeLinecap="round"
          style={{ strokeDasharray:'22 8', animation:'vt-bolt 2s ease-in-out infinite 0.4s' }}/>
        <line x1="22" y1="146" x2="44" y2="146" stroke="#4ade80" strokeWidth="4" strokeLinecap="round"
          style={{ strokeDasharray:'22 8', animation:'vt-bolt 2s ease-in-out infinite 0.8s' }}/>
        <rect x="138" y="100" width="22" height="16" rx="8" fill="#4ade80" opacity="0.8"/>
      </g>
    </svg>
  );
}
