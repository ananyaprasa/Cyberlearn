export function GradedIcon({ size = 120 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
        {`
          @keyframes gr-glow  { 0%,100%{filter:drop-shadow(0 0 5px #a78bfa)} 50%{filter:drop-shadow(0 0 18px #a78bfa)} }
          @keyframes gr-check { 0%,65%,100%{stroke-dashoffset:80} 32%{stroke-dashoffset:0} }
          @keyframes gr-star  { 0%,100%{opacity:.2;transform:scale(.8)} 50%{opacity:.9;transform:scale(1.3)} }
          .gr-wrap  { animation: gr-glow 3s ease-in-out infinite; }
          .gr-check { stroke-dasharray:80; animation: gr-check 3s ease-in-out infinite; }
          .gr-s1    { animation: gr-star 2.5s ease-in-out infinite; transform-origin:155px 50px; }
          .gr-s2    { animation: gr-star 2.5s ease-in-out infinite .6s; transform-origin:48px 62px; }
          .gr-s3    { animation: gr-star 2.5s ease-in-out infinite 1.2s; transform-origin:158px 140px; }
        `}
      </style>
      <g className="gr-wrap">
        <path d="M100 10 L178 46 L178 110 C178 152 142 178 100 192 C58 178 22 152 22 110 L22 46 Z"
          fill="#2d1a55" stroke="#a78bfa" strokeWidth="2.5" strokeLinejoin="round"/>
        <path d="M100 22 L166 54 L166 110 C166 146 134 168 100 180 C66 168 34 146 34 110 L34 54 Z"
          fill="#3d2060" opacity="0.7"/>
        <polyline className="gr-check"
          points="62 104 88 130 138 80"
          fill="none" stroke="#a78bfa" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
        <circle className="gr-s1" cx="155" cy="50" r="5" fill="#c4b5fd"/>
        <circle className="gr-s2" cx="48" cy="62" r="4" fill="#a78bfa"/>
        <circle className="gr-s3" cx="158" cy="140" r="4" fill="#c4b5fd"/>
      </g>
    </svg>
  );
}
