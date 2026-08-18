import{r as i,j as o}from"./react-core-cLmpMfOL.js";const q=i.memo(function({question:d,options:a,correctAnswer:l}){const[e,b]=i.useState(null),n=l?.trim().toUpperCase(),s=r=>r?.trim()[0]?.toUpperCase(),m=r=>{e===null&&b(r)},g=r=>e===null?"idle":s(a[r])===n?"correct":r===e?"wrong":"idle",c=e!==null?s(a[e])===n?"correct":"wrong":null;return o.jsxs("div",{className:"qc-root",children:[o.jsx("p",{className:"qc-question",children:d}),o.jsx("div",{className:"qc-options",children:a.map((r,t)=>{const p=g(t);return o.jsx("button",{className:`qc-option qc-option--${p}`,onClick:()=>m(t),disabled:e!==null,"aria-pressed":e===t,children:r},t)})}),c&&o.jsx("div",{className:`qc-feedback qc-feedback--${c}`,children:c==="correct"?"✓ Correct!":`✗ Wrong — correct answer: ${n}`}),o.jsx("style",{children:`
        .qc-root {
          background: rgba(10, 15, 15, 0.72);
          border: 1px solid rgba(1, 107, 97, 0.22);
          border-radius: 8px;
          padding: 1.1rem 1.3rem 1rem;
          margin-bottom: 0.9rem;
          transition: border-color 0.2s ease;
        }
        .qc-root:has(.qc-feedback--correct) { border-color: rgba(45, 214, 143, 0.4); }
        .qc-root:has(.qc-feedback--wrong)   { border-color: rgba(255, 80, 80, 0.35); }

        .qc-question {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          color: rgba(224, 224, 224, 0.92);
          line-height: 1.55;
          margin: 0 0 0.85rem;
        }

        .qc-options {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .qc-option {
          width: 100%;
          text-align: left;
          padding: 0.75rem 1.25rem;
          margin-bottom: 0.65rem;
          border-radius: 8px;
          border: 1px solid rgba(2, 168, 154, 0.28);
          background: rgba(2, 168, 154, 0.05);
          color: rgba(224, 224, 224, 0.78);
          font-family: 'Oxanium', sans-serif;
          font-size: 0.84rem;
          line-height: 1.5;
          cursor: pointer;
          transition: background 0.18s ease, border-color 0.18s ease, color 0.18s ease, transform 0.15s ease;
        }
        .qc-option:last-child { margin-bottom: 0; }
        .qc-option:not(:disabled):hover {
          background: rgba(2, 168, 154, 0.14);
          border-color: #02a89a;
          color: #e0e0e0;
          transform: translateX(3px);
        }
        .qc-option:disabled { cursor: default; }

        /* correct option — always green once answered */
        .qc-option--correct {
          background: rgba(45, 214, 143, 0.12) !important;
          border-color: #2dd68f !important;
          color: #2dd68f !important;
          font-weight: 600;
        }
        /* the option the user picked when it was wrong */
        .qc-option--wrong {
          background: rgba(255, 80, 80, 0.1) !important;
          border-color: rgba(255, 80, 80, 0.6) !important;
          color: #ff6b6b !important;
        }

        .qc-feedback {
          margin-top: 0.75rem;
          padding: 0.45rem 0.8rem;
          border-radius: 5px;
          font-family: 'Oxanium', sans-serif;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.02em;
        }
        .qc-feedback--correct {
          background: rgba(45, 214, 143, 0.1);
          color: #2dd68f;
          border: 1px solid rgba(45, 214, 143, 0.3);
        }
        .qc-feedback--wrong {
          background: rgba(255, 80, 80, 0.08);
          color: #ff6b6b;
          border: 1px solid rgba(255, 80, 80, 0.28);
        }
      `})]})});export{q as Q};
