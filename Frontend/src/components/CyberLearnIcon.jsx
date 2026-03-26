function CyberLearnIcon({ size = 32 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="34 10 210 262" width={size} height={size}>
      <defs>
        <filter id="gs_nav" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="gk_nav" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="6" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="sh_nav" x="-80%" y="-60%" width="260%" height="220%">
          <feGaussianBlur stdDeviation="14" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>

        <linearGradient id="keyG_nav" x1="0%" y1="0%" x2="15%" y2="100%">
          <stop offset="0%" stopColor="#c8fff0"/>
          <stop offset="30%" stopColor="#3dffb0"/>
          <stop offset="100%" stopColor="#00c97a"/>
        </linearGradient>
        <linearGradient id="shG_nav" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#5fffc0"/>
          <stop offset="100%" stopColor="#00a855"/>
        </linearGradient>
        <radialGradient id="bgG_nav" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#0d2818"/>
          <stop offset="100%" stopColor="#06120b"/>
        </radialGradient>
        <radialGradient id="ia_nav" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#00ff88" stopOpacity="0.13"/>
          <stop offset="100%" stopColor="#00ff88" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* Background */}
      <rect x="34" y="10" width="210" height="262" rx="16" fill="url(#bgG_nav)"/>

      {/* Shield halo */}
      <path d="M138,22 L228,52 L228,148 Q228,230 138,268 Q48,230 48,148 L48,52 Z"
            fill="#00ff88" opacity="0.07" filter="url(#sh_nav)"/>
      {/* Shield fill */}
      <path d="M138,22 L228,52 L228,148 Q228,230 138,268 Q48,230 48,148 L48,52 Z"
            fill="#071a0f"/>
      <path d="M138,22 L228,52 L228,148 Q228,230 138,268 Q48,230 48,148 L48,52 Z"
            fill="url(#ia_nav)"/>
      {/* Shield stroke glow */}
      <path d="M138,22 L228,52 L228,148 Q228,230 138,268 Q48,230 48,148 L48,52 Z"
            fill="none" stroke="url(#shG_nav)" strokeWidth="2.5"
            strokeLinejoin="round" filter="url(#gs_nav)"/>
      {/* Shield stroke crisp */}
      <path d="M138,22 L228,52 L228,148 Q228,230 138,268 Q48,230 48,148 L48,52 Z"
            fill="none" stroke="#3dffaa" strokeWidth="1.4" strokeLinejoin="round"/>

      {/* Network lines */}
      <g stroke="#3dffaa" strokeWidth="0.7" opacity="0.35">
        <line x1="138.0" y1="40.0" x2="186.5" y2="63.3"/>
        <line x1="186.5" y1="63.3" x2="198.4" y2="115.8"/>
        <line x1="198.4" y1="115.8" x2="164.9" y2="157.9"/>
        <line x1="164.9" y1="157.9" x2="111.1" y2="157.9"/>
        <line x1="111.1" y1="157.9" x2="77.6" y2="115.8"/>
        <line x1="77.6" y1="115.8" x2="89.5" y2="63.3"/>
        <line x1="89.5" y1="63.3" x2="138.0" y2="40.0"/>
        <line x1="138.0" y1="40.0" x2="198.4" y2="115.8"/>
        <line x1="138.0" y1="40.0" x2="77.6" y2="115.8"/>
        <line x1="186.5" y1="63.3" x2="111.1" y2="157.9"/>
        <line x1="198.4" y1="115.8" x2="77.6" y2="115.8"/>
        <line x1="164.9" y1="157.9" x2="89.5" y2="63.3"/>
      </g>

      {/* Network nodes + halos */}
      <g filter="url(#gs_nav)">
        <circle cx="138.0" cy="40.0" r="3.8" fill="#3dffaa"/>
        <circle cx="186.5" cy="63.3" r="3.2" fill="#3dffaa"/>
        <circle cx="198.4" cy="115.8" r="3.4" fill="#3dffaa"/>
        <circle cx="164.9" cy="157.9" r="2.8" fill="#3dffaa" opacity="0.85"/>
        <circle cx="111.1" cy="157.9" r="2.8" fill="#3dffaa" opacity="0.85"/>
        <circle cx="77.6" cy="115.8" r="3.4" fill="#3dffaa"/>
        <circle cx="89.5" cy="63.3" r="3.2" fill="#3dffaa"/>
        <circle cx="138.0" cy="40.0" r="5.1" fill="none" stroke="#3dffaa" strokeWidth="0.45" opacity="0.32"/>
        <circle cx="186.5" cy="63.3" r="4.3" fill="none" stroke="#3dffaa" strokeWidth="0.45" opacity="0.32"/>
        <circle cx="198.4" cy="115.8" r="4.6" fill="none" stroke="#3dffaa" strokeWidth="0.45" opacity="0.32"/>
        <circle cx="164.9" cy="157.9" r="3.8" fill="none" stroke="#3dffaa" strokeWidth="0.45" opacity="0.32"/>
        <circle cx="111.1" cy="157.9" r="3.8" fill="none" stroke="#3dffaa" strokeWidth="0.45" opacity="0.32"/>
        <circle cx="77.6" cy="115.8" r="4.6" fill="none" stroke="#3dffaa" strokeWidth="0.45" opacity="0.32"/>
        <circle cx="89.5" cy="63.3" r="4.3" fill="none" stroke="#3dffaa" strokeWidth="0.45" opacity="0.32"/>
      </g>

      {/* Key glow pass */}
      <g filter="url(#gk_nav)" opacity="0.88">
        <path fillRule="evenodd" fill="url(#keyG_nav)" d="
          M 138,58   L 180,88   L 164,138
          L 122.47,138
          L 131.62,166.56
          L 131.62,182  L 150.62,182  L 150.62,191  L 131.62,191
          L 131.62,203  L 144.62,203  L 144.62,211  L 131.62,211
          L 131.62,242
          L 121.15,242
          L 121.15,166.56
          L 112,138  L 96,88  Z
          M 138,73  L 165,98  L 155,126  L 121,126  L 111,98  Z
        "/>
      </g>

      {/* Key crisp pass */}
      <path fillRule="evenodd" fill="url(#keyG_nav)" d="
        M 138,58   L 180,88   L 164,138
        L 122.47,138
        L 131.62,166.56
        L 131.62,182  L 150.62,182  L 150.62,191  L 131.62,191
        L 131.62,203  L 144.62,203  L 144.62,211  L 131.62,211
        L 131.62,242
        L 121.15,242
        L 121.15,166.56
        L 112,138  L 96,88  Z
        M 138,73  L 165,98  L 155,126  L 121,126  L 111,98  Z
      "/>

      {/* Key highlight strokes */}
      <path fillRule="evenodd" fill="none" stroke="#d8fff4" strokeWidth="0.9"
            strokeLinejoin="round" d="
        M 138,58   L 180,88   L 164,138
        L 122.47,138
        L 131.62,166.56
        L 131.62,182  L 150.62,182  L 150.62,191  L 131.62,191
        L 131.62,203  L 144.62,203  L 144.62,211  L 131.62,211
        L 131.62,242
        L 121.15,242
        L 121.15,166.56
        L 112,138  L 96,88  Z
      "/>
      <polygon points="138,73  165,98  155,126  121,126  111,98"
               fill="none" stroke="#d8fff4" strokeWidth="0.6"
               strokeLinejoin="round" opacity="0.55"/>
    </svg>
  );
}

export default CyberLearnIcon;
