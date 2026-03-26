/* Animated feature icons for the "What Makes Us Different" section */

export function CurriculumIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 200 200" fill="none">
      <g style={{ animation: 'cc-glow 3s ease-in-out infinite', filter: 'drop-shadow(0 0 5px #a78bfa)' }}>
        <rect x="60" y="54" width="96" height="118" rx="10" fill="#1e1240" stroke="#a78bfa" strokeWidth="1.5" opacity="0.45"/>
        <rect x="46" y="68" width="96" height="112" rx="10" fill="#2a1a55" stroke="#a78bfa" strokeWidth="1.8" opacity="0.7"/>
        <g style={{ animation: 'cc-float 2.8s ease-in-out infinite' }}>
          <rect x="32" y="30" width="96" height="122" rx="12" fill="#1e1240" stroke="#a78bfa" strokeWidth="2.5"/>
          <line x1="54" y1="30" x2="54" y2="152" stroke="#a78bfa" strokeWidth="1.5" opacity="0.4"/>
          <line x1="66" y1="66" x2="116" y2="66" stroke="#a78bfa" strokeWidth="2.2" strokeLinecap="round"
            style={{ strokeDasharray:'44 8', animation:'cc-scan 2s linear infinite' }}/>
          <line x1="66" y1="84" x2="116" y2="84" stroke="#c4b5fd" strokeWidth="2.2" strokeLinecap="round" opacity="0.7"
            style={{ strokeDasharray:'44 8', animation:'cc-scan 2s linear infinite 0.45s' }}/>
          <line x1="66" y1="102" x2="94" y2="102" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
          <path d="M108 30 L108 60 L100 52 L92 60 L92 30 Z" fill="#a78bfa" opacity="0.8"/>
        </g>
        <g style={{ animation: 'cc-page 3s ease-in-out infinite', transformOrigin: '62px 90px' }}>
          <path d="M62 90 Q80 80 90 110 Q78 108 62 118 Z" fill="#a78bfa" opacity="0.35"/>
        </g>
      </g>
    </svg>
  );
}

export function PracticeIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 200 200" fill="none">
      <g style={{ animation: 'hp-glow 3s ease-in-out infinite', filter: 'drop-shadow(0 0 5px #38bdf8)' }}>
        <rect x="16" y="30" width="136" height="106" rx="12" fill="#061828" stroke="#38bdf8" strokeWidth="2.2"/>
        <rect x="16" y="30" width="136" height="22" rx="12" fill="#0d2535"/>
        <rect x="16" y="42" width="136" height="10" fill="#0d2535"/>
        <circle cx="33" cy="41" r="4" fill="#f87171" opacity="0.8"/>
        <circle cx="47" cy="41" r="4" fill="#fbbf24" opacity="0.8"/>
        <circle cx="61" cy="41" r="4" fill="#4ade80" opacity="0.8"/>
        <text x="28" y="76" fill="#4ade80" fontSize="11" fontFamily="Share Tech Mono,monospace" opacity="0.9">$</text>
        <line x1="42" y1="72" x2="110" y2="72" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round"
          style={{ strokeDasharray:'80', animation:'hp-type 3s linear infinite' }}/>
        <text x="28" y="97" fill="#38bdf8" fontSize="11" fontFamily="Share Tech Mono,monospace" opacity="0.7">{'>'}</text>
        <line x1="42" y1="93" x2="90" y2="93" stroke="#7dd3fc" strokeWidth="2" strokeLinecap="round" opacity="0.6"
          style={{ strokeDasharray:'80', animation:'hp-type 3s linear infinite 0.6s' }}/>
        <rect x="92" y="84" width="9" height="13" rx="2" fill="#38bdf8" opacity="0.9"
          style={{ animation:'hp-blink 1s step-start infinite' }}/>
        <g style={{ animation: 'hp-spin 2s ease-in-out infinite', transformOrigin: '148px 62px' }}>
          <circle cx="148" cy="62" r="32" fill="#061828" stroke="#38bdf8" strokeWidth="2"/>
          <path d="M138 46 C133 52 132 60 137 66 L158 87 L164 81 L143 60 C148 55 149 47 144 42 C143 41 140 39 138 46 Z" fill="#38bdf8" opacity="0.9"/>
          <rect x="152" y="76" width="18" height="10" rx="4" fill="#38bdf8" transform="rotate(45 161 81)" opacity="0.6"/>
        </g>
      </g>
    </svg>
  );
}

export function QuizzesIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 200 200" fill="none">
      <g style={{ animation: 'iq-glow 3s ease-in-out infinite', filter: 'drop-shadow(0 0 5px #4ade80)' }}>
        <circle cx="100" cy="100" r="34" fill="none" stroke="#4ade80" strokeWidth="1.5"
          style={{ animation:'iq-ring 2.8s ease-in-out infinite' }}/>
        <path d="M62 110 C50 100 50 80 62 72 C60 60 72 52 82 56 C86 48 94 44 100 44 C106 44 114 48 118 56 C128 52 140 60 138 72 C150 80 150 100 138 110 C140 122 132 132 122 130 C118 138 110 142 100 142 C90 142 82 138 78 130 C68 132 60 122 62 110 Z"
          fill="#0f2e1e" stroke="#4ade80" strokeWidth="2.5"/>
        <path d="M82 72 C86 80 86 90 82 98" fill="none" stroke="#86efac" strokeWidth="1.8" strokeLinecap="round" opacity="0.6"/>
        <path d="M100 56 C104 68 104 82 100 94" fill="none" stroke="#86efac" strokeWidth="1.8" strokeLinecap="round" opacity="0.6"/>
        <path d="M118 72 C114 80 114 90 118 98" fill="none" stroke="#86efac" strokeWidth="1.8" strokeLinecap="round" opacity="0.6"/>
        <polyline points="78 100 94 116 124 84" fill="none" stroke="#4ade80" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"
          style={{ strokeDasharray:'60', animation:'iq-check 2.5s ease-in-out infinite' }}/>
        <circle cx="48" cy="68" r="5" fill="#4ade80" style={{ animation:'iq-pulse 1.8s ease-in-out infinite' }}/>
        <circle cx="152" cy="72" r="4" fill="#86efac" style={{ animation:'iq-pulse 1.8s ease-in-out infinite 0.5s' }}/>
        <circle cx="100" cy="166" r="4" fill="#4ade80" style={{ animation:'iq-pulse 1.8s ease-in-out infinite 1s' }}/>
      </g>
    </svg>
  );
}

export function ProgressiveIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 200 200" fill="none">
      <g style={{ animation: 'pl-glow 3s ease-in-out infinite', filter: 'drop-shadow(0 0 5px #fb923c)' }}>
        <circle cx="158" cy="54" r="5" fill="#fbbf24" style={{ animation:'pl-star 2s ease-in-out infinite', transformOrigin:'158px 54px' }}/>
        <circle cx="44" cy="72" r="4" fill="#fb923c" style={{ animation:'pl-star 2s ease-in-out infinite 0.7s', transformOrigin:'44px 72px' }}/>
        <circle cx="162" cy="138" r="4" fill="#fed7aa" style={{ animation:'pl-star 2s ease-in-out infinite 1.4s', transformOrigin:'162px 138px' }}/>
        <g style={{ animation: 'pl-rise 2.2s ease-in-out infinite' }}>
          <g style={{ animation: 'pl-flame 0.8s ease-in-out infinite', transformOrigin: '100px 154px' }}>
            <path d="M82 154 C82 166 94 172 100 172 C106 172 118 166 118 154 L112 142 L100 148 L88 142 Z" fill="#f97316" opacity="0.9"/>
            <path d="M90 154 C90 162 96 166 100 166 C104 166 110 162 110 154 L106 146 L100 150 L94 146 Z" fill="#fbbf24" opacity="0.8"/>
          </g>
          <path d="M76 110 C76 66 100 36 100 36 C100 36 124 66 124 110 L124 142 L100 150 L76 142 Z" fill="#1e1206" stroke="#fb923c" strokeWidth="2.5"/>
          <path d="M100 36 C100 36 124 66 124 90 L76 90 C76 66 100 36 100 36 Z" fill="#fb923c" opacity="0.3"/>
          <circle cx="100" cy="104" r="14" fill="#0a1610" stroke="#fb923c" strokeWidth="2.2"/>
          <circle cx="100" cy="104" r="8" fill="#fb923c" opacity="0.25"/>
          <circle cx="96" cy="100" r="3" fill="#fed7aa" opacity="0.7"/>
          <path d="M76 118 L52 142 L76 134 Z" fill="#fb923c" opacity="0.7"/>
          <path d="M124 118 L148 142 L124 134 Z" fill="#fb923c" opacity="0.7"/>
        </g>
        <line x1="86" y1="168" x2="70" y2="188" stroke="#fb923c" strokeWidth="2" strokeLinecap="round" opacity="0.5"
          style={{ strokeDasharray:'6 8', animation:'pl-trail 1.5s linear infinite' }}/>
        <line x1="100" y1="172" x2="100" y2="192" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" opacity="0.5"
          style={{ strokeDasharray:'6 8', animation:'pl-trail 1.5s linear infinite' }}/>
        <line x1="114" y1="168" x2="130" y2="188" stroke="#fb923c" strokeWidth="2" strokeLinecap="round" opacity="0.5"
          style={{ strokeDasharray:'6 8', animation:'pl-trail 1.5s linear infinite' }}/>
      </g>
    </svg>
  );
}

export function ToolsIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 200 200" fill="none">
      <g style={{ animation: 'it-glow 3s ease-in-out infinite', filter: 'drop-shadow(0 0 5px #22d3ee)' }}>
        <path d="M100 18 L170 50 L170 106 C170 144 138 168 100 182 C62 168 30 144 30 106 L30 50 Z"
          fill="#061e28" stroke="#22d3ee" strokeWidth="2.5" strokeLinejoin="round"/>
        <path d="M100 30 L158 58 L158 106 C158 138 130 158 100 170 C70 158 42 138 42 106 L42 58 Z"
          fill="#0a2535" opacity="0.6"/>
        <circle cx="100" cy="106" r="36" fill="none" stroke="#22d3ee" strokeWidth="1.5"
          style={{ animation:'it-pulse 2.5s ease-in-out infinite' }}/>
        <text x="56" y="92" fill="#22d3ee" fontSize="11" fontFamily="Share Tech Mono,monospace" opacity="0.9">nmap</text>
        <line x1="56" y1="98" x2="144" y2="98" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round"
          style={{ strokeDasharray:'80', animation:'it-scan 2.2s linear infinite' }}/>
        <text x="56" y="114" fill="#67e8f9" fontSize="11" fontFamily="Share Tech Mono,monospace" opacity="0.75">wire</text>
        <line x1="56" y1="120" x2="128" y2="120" stroke="#67e8f9" strokeWidth="2" strokeLinecap="round" opacity="0.7"
          style={{ strokeDasharray:'80', animation:'it-scan 2.2s linear infinite 0.55s' }}/>
        <rect x="88" y="130" width="24" height="18" rx="5" fill="#22d3ee" opacity="0.9"/>
        <path d="M92 130 V124 a8 8 0 0 1 16 0 V130" stroke="#22d3ee" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <circle cx="100" cy="139" r="3" fill="#061e28"/>
      </g>
    </svg>
  );
}

export function CTFFeatureIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 200 200" fill="none">
      <g style={{ animation: 'cf-glow 3s ease-in-out infinite', filter: 'drop-shadow(0 0 5px #fbbf24)' }}>
        <g style={{ animation: 'cf-pole 2.5s ease-in-out infinite' }}>
          <rect x="68" y="30" width="6" height="148" rx="3" fill="#fbbf24" opacity="0.7"/>
        </g>
        <path d="M72 40 C100 36 128 44 148 38 L148 100 C128 106 100 98 72 102 Z"
          fill="#fbbf24" opacity="0.85"
          style={{ animation: 'cf-wave 2s ease-in-out infinite' }}/>
        <line x1="86" y1="58" x2="134" y2="54" stroke="#1a0a00" strokeWidth="2" strokeLinecap="round" opacity="0.5"
          style={{ strokeDasharray:'40', animation:'cf-bits 1.8s linear infinite' }}/>
        <line x1="86" y1="72" x2="130" y2="70" stroke="#1a0a00" strokeWidth="2" strokeLinecap="round" opacity="0.5"
          style={{ strokeDasharray:'40', animation:'cf-bits 1.8s linear infinite 0.5s' }}/>
        <circle cx="74" cy="168" r="8" fill="#fbbf24" opacity="0.3"/>
      </g>
    </svg>
  );
}
