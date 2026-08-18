import{r as s,j as e}from"./react-core-cLmpMfOL.js";const g=s.memo(function({number:a,title:r,subtitle:n,icon:o,children:t,defaultOpen:i=!1}){const[d,c]=s.useState(i);return e.jsxs("div",{className:"lesson-card",children:[e.jsxs("button",{className:`lesson-card-header${d?" lesson-card-header--open":""}`,onClick:()=>c(!d),"aria-expanded":d,children:[e.jsxs("div",{className:"lesson-card-header-left",children:[o&&e.jsx("div",{className:"lesson-card-icon",children:o}),e.jsx("div",{className:"lesson-card-number",children:a}),e.jsxs("div",{className:"lesson-card-title-group",children:[e.jsx("h2",{className:"lesson-card-title",children:r}),n&&e.jsx("p",{className:"lesson-card-subtitle",children:n})]})]}),e.jsx("div",{className:"lesson-card-chevron",children:e.jsx("svg",{width:"20",height:"20",viewBox:"0 0 20 20",fill:"none",children:e.jsx("path",{d:"M5 7.5L10 12.5L15 7.5",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})})]}),e.jsx("div",{className:`lesson-card-body${d?" lesson-card-body--open":""}`,children:e.jsx("div",{className:"lesson-card-content",children:t})}),e.jsx("style",{children:`
        .lesson-card {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(45, 214, 143, 0.15);
          border-radius: 16px;
          margin-bottom: 1.5rem;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .lesson-card:hover {
          border-color: rgba(45, 214, 143, 0.3);
          background: rgba(255, 255, 255, 0.04);
          box-shadow: 0 8px 32px rgba(45, 214, 143, 0.08);
        }

        .lesson-card-header {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem 2rem;
          background: transparent;
          border: none;
          color: inherit;
          cursor: pointer;
          text-align: left;
          transition: all 0.3s ease;
        }

        .lesson-card-header:hover {
          background: rgba(45, 214, 143, 0.05);
        }

        .lesson-card-header--open {
          border-bottom: 1px solid rgba(45, 214, 143, 0.1);
        }

        .lesson-card-header-left {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          flex: 1;
        }

        .lesson-card-icon {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(45, 214, 143, 0.15), rgba(2, 168, 154, 0.15));
          border: 1px solid rgba(45, 214, 143, 0.3);
          border-radius: 12px;
          color: #2dd68f;
          font-size: 1.5rem;
        }

        .lesson-card-number {
          font-family: 'Sora', sans-serif;
          font-size: 2.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #2dd68f, #02a89a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
          min-width: 60px;
        }

        .lesson-card-title-group {
          flex: 1;
        }

        .lesson-card-title {
          font-family: 'Sora', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #e6e9f0;
          margin: 0 0 0.25rem 0;
          line-height: 1.3;
        }

        .lesson-card-subtitle {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.95rem;
          color: rgba(171, 207, 201, 0.7);
          margin: 0;
          line-height: 1.4;
        }

        .lesson-card-chevron {
          color: #2dd68f;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .lesson-card-header--open .lesson-card-chevron {
          transform: rotate(180deg);
        }

        .lesson-card-body {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .lesson-card-body--open {
          max-height: 10000px;
        }

        .lesson-card-content {
          padding: 2rem;
        }

        @media (max-width: 768px) {
          .lesson-card-header {
            padding: 1.25rem 1.5rem;
          }

          .lesson-card-header-left {
            gap: 1rem;
          }

          .lesson-card-icon {
            width: 40px;
            height: 40px;
            font-size: 1.25rem;
          }

          .lesson-card-number {
            font-size: 2rem;
            min-width: 50px;
          }

          .lesson-card-title {
            font-size: 1.25rem;
          }

          .lesson-card-subtitle {
            font-size: 0.875rem;
          }

          .lesson-card-content {
            padding: 1.5rem;
          }
        }
      `})]})}),b=s.memo(function({type:a="info",title:r,children:n,icon:o}){const t={info:{bg:"rgba(2, 168, 154, 0.08)",border:"rgba(2, 168, 154, 0.3)",icon:"#02a89a",title:"#2dd68f"},tip:{bg:"rgba(45, 214, 143, 0.08)",border:"rgba(45, 214, 143, 0.3)",icon:"#2dd68f",title:"#3de9a0"},warn:{bg:"rgba(255, 165, 0, 0.08)",border:"rgba(255, 165, 0, 0.3)",icon:"#ffa500",title:"#ffb733"},danger:{bg:"rgba(239, 68, 68, 0.08)",border:"rgba(239, 68, 68, 0.3)",icon:"#ef4444",title:"#fca5a5"}},i=t[a]||t.info;return e.jsxs("div",{className:"info-card",style:{"--bg":i.bg,"--border":i.border},children:[(r||o)&&e.jsxs("div",{className:"info-card-header",children:[o&&e.jsx("div",{className:"info-card-icon",style:{color:i.icon},children:o}),r&&e.jsx("h4",{className:"info-card-title",style:{color:i.title},children:r})]}),e.jsx("div",{className:"info-card-body",children:n}),e.jsx("style",{children:`
        .info-card {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.25rem 1.5rem;
          margin: 1.5rem 0;
          backdrop-filter: blur(8px);
          transition: all 0.3s ease;
        }

        .info-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        }

        .info-card-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }

        .info-card-icon {
          font-size: 1.25rem;
          line-height: 1;
        }

        .info-card-title {
          font-family: 'Sora', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          margin: 0;
          line-height: 1;
        }

        .info-card-body {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.95rem;
          line-height: 1.6;
          color: rgba(224, 224, 224, 0.9);
        }

        .info-card-body strong {
          color: #e6e9f0;
          font-weight: 600;
        }

        .info-card-body code {
          background: rgba(0, 0, 0, 0.3);
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          font-size: 0.9em;
          color: #2dd68f;
        }

        @media (max-width: 768px) {
          .info-card {
            padding: 1rem 1.25rem;
          }

          .info-card-body {
            font-size: 0.9rem;
          }
        }
      `})]})}),p=s.memo(function({title:a,subtitle:r,children:n,fullWidth:o=!1}){return e.jsxs("div",{className:`diagram-container${o?" diagram-container--full":""}`,children:[(a||r)&&e.jsxs("div",{className:"diagram-header",children:[a&&e.jsx("h3",{className:"diagram-title",children:a}),r&&e.jsx("p",{className:"diagram-subtitle",children:r})]}),e.jsx("div",{className:"diagram-content",children:n}),e.jsx("style",{children:`
        .diagram-container {
          background: rgba(10, 15, 25, 0.6);
          border: 1px solid rgba(45, 214, 143, 0.15);
          border-radius: 16px;
          padding: 2rem;
          margin: 2rem 0;
          backdrop-filter: blur(8px);
          transition: all 0.3s ease;
        }

        .diagram-container:hover {
          border-color: rgba(45, 214, 143, 0.25);
          background: rgba(10, 15, 25, 0.7);
          box-shadow: 0 8px 32px rgba(45, 214, 143, 0.1);
        }

        .diagram-container--full {
          padding: 2.5rem;
        }

        .diagram-header {
          text-align: center;
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid rgba(45, 214, 143, 0.1);
        }

        .diagram-title {
          font-family: 'Sora', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #e6e9f0;
          margin: 0 0 0.5rem 0;
        }

        .diagram-subtitle {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.95rem;
          color: rgba(171, 207, 201, 0.7);
          margin: 0;
        }

        .diagram-content {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        @media (max-width: 768px) {
          .diagram-container {
            padding: 1.5rem 1rem;
          }

          .diagram-container--full {
            padding: 1.75rem 1rem;
          }

          .diagram-header {
            margin-bottom: 1.5rem;
            padding-bottom: 1rem;
          }

          .diagram-title {
            font-size: 1.25rem;
          }

          .diagram-subtitle {
            font-size: 0.875rem;
          }
        }
      `})]})}),f=s.memo(function({command:a,output:r,title:n,description:o}){const[t,i]=s.useState(!1),d=()=>{navigator.clipboard.writeText(a),i(!0),setTimeout(()=>i(!1),2e3)};return e.jsxs("div",{className:"terminal-block",children:[n&&e.jsx("div",{className:"terminal-title",children:n}),o&&e.jsx("div",{className:"terminal-description",children:o}),e.jsxs("div",{className:"terminal-window",children:[e.jsxs("div",{className:"terminal-header",children:[e.jsxs("div",{className:"terminal-dots",children:[e.jsx("span",{className:"terminal-dot terminal-dot--red"}),e.jsx("span",{className:"terminal-dot terminal-dot--yellow"}),e.jsx("span",{className:"terminal-dot terminal-dot--green"})]}),e.jsx("div",{className:"terminal-label",children:"Terminal"}),e.jsx("button",{className:"terminal-copy-btn",onClick:d,title:"Copy command",children:t?e.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",children:e.jsx("path",{d:"M20 6L9 17L4 12",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}):e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",children:[e.jsx("rect",{x:"9",y:"9",width:"13",height:"13",rx:"2",stroke:"currentColor",strokeWidth:"2"}),e.jsx("path",{d:"M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 2.89543 15 4V5",stroke:"currentColor",strokeWidth:"2"})]})})]}),e.jsxs("div",{className:"terminal-body",children:[e.jsxs("div",{className:"terminal-prompt",children:[e.jsx("span",{className:"terminal-user",children:"user@cyberlearn"}),e.jsx("span",{className:"terminal-separator",children:":"}),e.jsx("span",{className:"terminal-path",children:"~"}),e.jsx("span",{className:"terminal-symbol",children:"$"})]}),e.jsx("div",{className:"terminal-command",children:a}),r&&e.jsx("div",{className:"terminal-output",children:r})]})]}),e.jsx("style",{children:`
        .terminal-block {
          margin: 1.5rem 0;
        }

        .terminal-title {
          font-family: 'Sora', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          color: #e6e9f0;
          margin-bottom: 0.5rem;
        }

        .terminal-description {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.9rem;
          color: rgba(171, 207, 201, 0.7);
          margin-bottom: 1rem;
        }

        .terminal-window {
          background: #0a0e1a;
          border: 1px solid rgba(45, 214, 143, 0.2);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
          transition: all 0.3s ease;
        }

        .terminal-window:hover {
          border-color: rgba(45, 214, 143, 0.4);
          box-shadow: 0 8px 32px rgba(45, 214, 143, 0.1);
        }

        .terminal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.03);
          border-bottom: 1px solid rgba(45, 214, 143, 0.1);
        }

        .terminal-dots {
          display: flex;
          gap: 0.5rem;
        }

        .terminal-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .terminal-dot--red {
          background: #ff5f56;
        }

        .terminal-dot--yellow {
          background: #ffbd2e;
        }

        .terminal-dot--green {
          background: #27c93f;
        }

        .terminal-label {
          font-family: 'Sora', sans-serif;
          font-size: 0.75rem;
          color: rgba(224, 224, 224, 0.5);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }

        .terminal-copy-btn {
          background: rgba(45, 214, 143, 0.1);
          border: 1px solid rgba(45, 214, 143, 0.3);
          border-radius: 6px;
          padding: 0.4rem 0.6rem;
          color: #2dd68f;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
        }

        .terminal-copy-btn:hover {
          background: rgba(45, 214, 143, 0.2);
          border-color: rgba(45, 214, 143, 0.5);
        }

        .terminal-body {
          padding: 1.25rem 1.5rem;
          font-family: 'Courier New', 'Monaco', 'Menlo', monospace;
          font-size: 0.9rem;
          line-height: 1.6;
        }

        .terminal-prompt {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          margin-bottom: 0.5rem;
        }

        .terminal-user {
          color: #2dd68f;
          font-weight: 600;
        }

        .terminal-separator {
          color: rgba(224, 224, 224, 0.5);
        }

        .terminal-path {
          color: #02a89a;
        }

        .terminal-symbol {
          color: #2dd68f;
          margin-left: 0.25rem;
        }

        .terminal-command {
          color: #e6e9f0;
          margin-left: 0;
          white-space: pre-wrap;
          word-break: break-all;
        }

        .terminal-output {
          margin-top: 1rem;
          color: rgba(171, 207, 201, 0.8);
          white-space: pre-wrap;
          border-top: 1px solid rgba(45, 214, 143, 0.1);
          padding-top: 1rem;
        }

        @media (max-width: 768px) {
          .terminal-body {
            padding: 1rem;
            font-size: 0.8rem;
          }

          .terminal-header {
            padding: 0.6rem 0.75rem;
          }

          .terminal-label {
            display: none;
          }
        }
      `})]})}),h=s.memo(function({concepts:a}){return e.jsxs("div",{className:"concept-grid",children:[a.map((r,n)=>e.jsxs("div",{className:"concept-card",children:[e.jsx("h4",{className:"concept-label",children:r.label}),e.jsx("div",{className:"concept-body",children:r.children})]},n)),e.jsx("style",{children:`
        .concept-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.25rem;
          margin: 2rem 0;
        }

        .concept-card {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(45, 214, 143, 0.15);
          border-radius: 12px;
          padding: 1.5rem;
          transition: all 0.3s ease;
        }

        .concept-card:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(45, 214, 143, 0.3);
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(45, 214, 143, 0.12);
        }

        .concept-label {
          font-family: 'Sora', sans-serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: #2dd68f;
          margin: 0 0 0.75rem 0;
          line-height: 1.3;
        }

        .concept-body {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.95rem;
          color: rgba(224, 224, 224, 0.9);
          line-height: 1.6;
        }

        .concept-body code {
          background: rgba(45, 214, 143, 0.15);
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          font-size: 0.9em;
          color: #3de9a0;
        }

        @media (max-width: 768px) {
          .concept-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .concept-card {
            padding: 1.25rem;
          }

          .concept-label {
            font-size: 1rem;
          }

          .concept-body {
            font-size: 0.9rem;
          }
        }
      `})]})});export{h as C,p as D,b as I,g as L,f as T};
