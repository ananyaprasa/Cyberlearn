import{r as i,j as e}from"./react-core-cLmpMfOL.js";import{N as R}from"./Navbar-fCh8wuHA.js";import{V as B,S as F}from"./shader-vendor-CagQ2hKc.js";import{N as O}from"./NetworkSecurityIcon-BV7rSq4u.js";import{Q as E}from"./QuestionCard-BGnHklbe.js";import{L as m,D as d,I as p,C as k,T as x}from"./ConceptGrid-v4J2hnLD.js";import{L as W}from"./LearningObjective-Durs_RUV.js";import{L as q}from"./react-router-CMM5GaaQ.js";import"./index-Ce_JdysL.js";import"./animation-vendor-DPzBf3Tj.js";import"./auth-vendor-BfTDptbL.js";import"./http-vendor-42ANG6Sg.js";const D=[{num:7,name:"Application",color:"#e05c8a",pdu:"Data",purpose:"User-facing protocols and services. Where applications interact with the network.",protocols:"HTTP, HTTPS, DNS, FTP, SMTP, IMAP, SSH, TLS (negotiation)",device:"Application gateways, load balancers",security:"WAF (Web Application Firewall), application proxies",attack:"SQL Injection, XSS, phishing, DNS tunnelling"},{num:6,name:"Presentation",color:"#c46baf",pdu:"Data",purpose:"Data translation, encryption, and compression. Ensures data is readable by the application layer.",protocols:"TLS/SSL (encryption), JPEG, MPEG, ASCII, Unicode",device:"None (handled by software/OS)",security:"TLS/SSL inspection, certificate validation",attack:"SSL stripping, downgrade attacks (forcing older TLS versions)"},{num:5,name:"Session",color:"#a07bc0",pdu:"Data",purpose:"Manages sessions (dialogues) between applications — opening, maintaining, and closing connections.",protocols:"NetBIOS, RPC, SMB (session management), NFS",device:"None (handled by OS)",security:"Session hijacking detection",attack:"Session hijacking, session fixation"},{num:4,name:"Transport",color:"#7a8fd0",pdu:"Segment (TCP) / Datagram (UDP)",purpose:"End-to-end communication, port numbers, reliability (TCP) or speed (UDP).",protocols:"TCP, UDP, SCTP",device:"Firewalls (Layer 4), load balancers",security:"Stateful firewalls, SYN cookies, rate limiting",attack:"SYN flood, UDP flood, port scanning"},{num:3,name:"Network",color:"#4aa0c8",pdu:"Packet",purpose:"Logical addressing (IP) and routing packets between different networks.",protocols:"IP (IPv4/IPv6), ICMP, IGMP, routing protocols (OSPF, BGP)",device:"Routers, Layer 3 switches",security:"ACLs, packet filtering firewalls",attack:"IP spoofing, route hijacking (BGP), ICMP floods"},{num:2,name:"Data Link",color:"#2aae8a",pdu:"Frame",purpose:"Node-to-node delivery on the same network segment using MAC addresses.",protocols:"Ethernet (802.3), Wi-Fi (802.11), ARP, PPP, VLANs (802.1Q)",device:"Switches, bridges, NICs",security:"Dynamic ARP Inspection (DAI), port security, 802.1X",attack:"ARP spoofing, MAC flooding, VLAN hopping"},{num:1,name:"Physical",color:"#1ab87a",pdu:"Bit",purpose:"Raw bit transmission over the physical medium — electrical signals, light, or radio waves.",protocols:"Ethernet (physical spec), USB, DSL, 802.11 (radio), fibre optic",device:"Cables, hubs, repeaters, modems, NICs",security:"Physical access controls, tamper detection",attack:"Cable tapping, jamming (Wi-Fi), hardware keyloggers"}],H=i.memo(function(){const[r,o]=i.useState(null),s=r!==null?D[r]:null;return e.jsxs("div",{className:"osi-wrapper",children:[e.jsx("p",{className:"osi-instruction",children:"Click any layer to explore its purpose, protocols, and security relevance."}),e.jsxs("div",{className:"osi-layout",children:[e.jsx("div",{className:"osi-stack",role:"list",children:D.map((t,a)=>e.jsxs("button",{role:"listitem",className:`osi-layer${r===a?" osi-layer--active":""}`,style:{"--layer-color":t.color},onClick:()=>o(r===a?null:a),"aria-pressed":r===a,"aria-label":`Layer ${t.num}: ${t.name}`,children:[e.jsx("span",{className:"osi-layer-num",children:t.num}),e.jsx("span",{className:"osi-layer-name",children:t.name}),e.jsx("span",{className:"osi-layer-pdu",children:t.pdu})]},t.num))}),e.jsx("div",{className:"osi-detail","aria-live":"polite",children:s?e.jsxs("div",{className:"osi-detail-inner",children:[e.jsxs("div",{className:"osi-detail-header",style:{borderColor:s.color},children:[e.jsxs("span",{className:"osi-detail-badge",style:{background:s.color},children:["Layer ",s.num]}),e.jsx("h3",{className:"osi-detail-title",children:s.name}),e.jsxs("span",{className:"osi-detail-pdu",children:["PDU: ",s.pdu]})]}),e.jsxs("div",{className:"osi-detail-row",children:[e.jsx("span",{className:"osi-detail-label",children:"Purpose"}),e.jsx("span",{className:"osi-detail-value",children:s.purpose})]}),e.jsxs("div",{className:"osi-detail-row",children:[e.jsx("span",{className:"osi-detail-label",children:"Protocols / Technologies"}),e.jsx("span",{className:"osi-detail-value",children:s.protocols})]}),e.jsxs("div",{className:"osi-detail-row",children:[e.jsx("span",{className:"osi-detail-label",children:"Typical Device"}),e.jsx("span",{className:"osi-detail-value",children:s.device})]}),e.jsxs("div",{className:"osi-detail-row osi-detail-row--security",children:[e.jsx("span",{className:"osi-detail-label",children:"Security Controls"}),e.jsx("span",{className:"osi-detail-value",children:s.security})]}),e.jsxs("div",{className:"osi-detail-row osi-detail-row--attack",children:[e.jsx("span",{className:"osi-detail-label",children:"Example Attacks"}),e.jsx("span",{className:"osi-detail-value",children:s.attack})]})]}):e.jsxs("div",{className:"osi-detail-placeholder",children:[e.jsx("div",{className:"osi-placeholder-icon",children:"≡"}),e.jsx("p",{children:"Select a layer to see its details"})]})})]}),e.jsx("style",{children:`
        .osi-wrapper {
          margin: 1rem 0 0.5rem;
        }
        .osi-instruction {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.8rem;
          color: rgba(171,207,201,0.6);
          margin-bottom: 0.75rem;
          text-align: center;
        }
        .osi-layout {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 1rem;
          align-items: start;
        }
        @media (max-width: 640px) {
          .osi-layout { grid-template-columns: 1fr; }
        }
        .osi-stack {
          display: flex;
          flex-direction: column;
          gap: 3px;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .osi-layer {
          display: grid;
          grid-template-columns: 28px 1fr auto;
          align-items: center;
          gap: 0.6rem;
          padding: 0.6rem 0.9rem;
          border-radius: 6px;
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(10,15,15,0.7);
          cursor: pointer;
          text-align: left;
          transition: border-color 0.18s ease, background 0.18s ease, transform 0.15s ease;
          border-left: 3px solid var(--layer-color);
        }
        .osi-layer:hover {
          background: rgba(255,255,255,0.05);
          transform: translateX(2px);
        }
        .osi-layer--active {
          background: rgba(255,255,255,0.08) !important;
          border-color: var(--layer-color) !important;
          border-left-color: var(--layer-color) !important;
          box-shadow: 0 0 0 1px var(--layer-color);
        }
        .osi-layer-num {
          font-family: 'Sora', sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--layer-color);
          text-align: center;
        }
        .osi-layer-name {
          font-family: 'Sora', sans-serif;
          font-size: 0.88rem;
          font-weight: 600;
          color: rgba(224,224,224,0.92);
        }
        .osi-layer-pdu {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.7rem;
          color: rgba(171,207,201,0.5);
          white-space: nowrap;
        }
        .osi-detail {
          min-height: 260px;
        }
        .osi-detail-inner {
          background: rgba(10,15,15,0.8);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px;
          overflow: hidden;
        }
        .osi-detail-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.85rem 1rem;
          border-bottom: 2px solid;
          background: rgba(255,255,255,0.03);
        }
        .osi-detail-badge {
          font-family: 'Sora', sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          color: #000;
          padding: 0.2rem 0.55rem;
          border-radius: 4px;
          white-space: nowrap;
        }
        .osi-detail-title {
          font-family: 'Sora', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          color: #e0e0e0;
          margin: 0;
          flex: 1;
        }
        .osi-detail-pdu {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.72rem;
          color: rgba(171,207,201,0.55);
        }
        .osi-detail-row {
          display: grid;
          grid-template-columns: 150px 1fr;
          gap: 0.5rem;
          padding: 0.6rem 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          align-items: start;
        }
        .osi-detail-row:last-child { border-bottom: none; }
        @media (max-width: 500px) {
          .osi-detail-row { grid-template-columns: 1fr; }
        }
        .osi-detail-label {
          font-family: 'Sora', sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: rgba(171,207,201,0.6);
          padding-top: 0.1rem;
        }
        .osi-detail-value {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.83rem;
          color: rgba(224,224,224,0.88);
          line-height: 1.55;
        }
        .osi-detail-row--security .osi-detail-label { color: #2dd68f; }
        .osi-detail-row--security .osi-detail-value { color: rgba(45,214,143,0.85); }
        .osi-detail-row--attack .osi-detail-label { color: #ff6b6b; }
        .osi-detail-row--attack .osi-detail-value { color: rgba(255,107,107,0.85); }
        .osi-detail-placeholder {
          height: 260px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: rgba(10,15,15,0.5);
          border: 1px dashed rgba(2,168,154,0.2);
          border-radius: 8px;
          color: rgba(171,207,201,0.35);
        }
        .osi-placeholder-icon {
          font-size: 2rem;
          line-height: 1;
        }
        .osi-detail-placeholder p {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.82rem;
          margin: 0;
        }
      `})]})}),A=[{tcpip:"Application",tcpipColor:"#e05c8a",osi:["Layer 7 — Application","Layer 6 — Presentation","Layer 5 — Session"],osiColors:["#e05c8a","#c46baf","#a07bc0"],protocols:"HTTP, HTTPS, DNS, FTP, SMTP, SSH, TLS"},{tcpip:"Transport",tcpipColor:"#7a8fd0",osi:["Layer 4 — Transport"],osiColors:["#7a8fd0"],protocols:"TCP, UDP, SCTP"},{tcpip:"Internet",tcpipColor:"#4aa0c8",osi:["Layer 3 — Network"],osiColors:["#4aa0c8"],protocols:"IP (v4/v6), ICMP, ARP*"},{tcpip:"Network Access",tcpipColor:"#1ab87a",osi:["Layer 2 — Data Link","Layer 1 — Physical"],osiColors:["#2aae8a","#1ab87a"],protocols:"Ethernet, Wi-Fi, PPP"}],U=i.memo(function(){return e.jsxs("div",{className:"tcpip-wrapper",children:[e.jsxs("div",{className:"tcpip-columns",children:[e.jsxs("div",{className:"tcpip-col",children:[e.jsx("div",{className:"tcpip-col-header",children:"OSI Model (7 layers)"}),e.jsx("div",{className:"tcpip-osi-stack",children:A.map(r=>r.osi.map((o,s)=>e.jsx("div",{className:"tcpip-osi-layer",style:{borderLeftColor:r.osiColors[s],color:r.osiColors[s]},children:o},o)))})]}),e.jsx("div",{className:"tcpip-connector","aria-hidden":"true",children:A.map(r=>e.jsx("div",{className:"tcpip-connector-row",style:{flex:r.osi.length,borderTopColor:r.tcpipColor},children:e.jsx("div",{className:"tcpip-connector-line",style:{background:r.tcpipColor}})},r.tcpip))}),e.jsxs("div",{className:"tcpip-col",children:[e.jsx("div",{className:"tcpip-col-header",children:"TCP/IP Model (4 layers)"}),e.jsx("div",{className:"tcpip-tcpip-stack",children:A.map(r=>e.jsxs("div",{className:"tcpip-tcpip-layer",style:{flex:r.osi.length,borderLeftColor:r.tcpipColor,"--tc":r.tcpipColor},children:[e.jsx("span",{className:"tcpip-layer-name",style:{color:r.tcpipColor},children:r.tcpip}),e.jsx("span",{className:"tcpip-layer-protocols",children:r.protocols})]},r.tcpip))})]})]}),e.jsx("p",{className:"tcpip-note",children:"* ARP technically operates between L2 and L3; it is often placed at the Internet layer in the TCP/IP model."}),e.jsx("style",{children:`
        .tcpip-wrapper {
          margin: 0.5rem 0;
          overflow-x: auto;
        }
        .tcpip-columns {
          display: grid;
          grid-template-columns: 1fr 36px 1fr;
          gap: 0;
          min-width: 420px;
        }
        .tcpip-col-header {
          font-family: 'Sora', sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          color: rgba(171,207,201,0.55);
          text-align: center;
          padding-bottom: 0.5rem;
        }
        .tcpip-osi-stack {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .tcpip-osi-layer {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.78rem;
          padding: 0.45rem 0.7rem;
          border-radius: 5px;
          border-left: 3px solid;
          background: rgba(10,15,15,0.7);
          line-height: 1.3;
        }
        .tcpip-connector {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 1.55rem;
        }
        .tcpip-connector-row {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .tcpip-connector-line {
          width: 2px;
          height: 100%;
          min-height: 28px;
          border-radius: 1px;
          opacity: 0.5;
        }
        .tcpip-tcpip-stack {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .tcpip-tcpip-layer {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          padding: 0.45rem 0.7rem;
          border-radius: 5px;
          border-left: 3px solid;
          background: rgba(10,15,15,0.7);
          justify-content: center;
        }
        .tcpip-layer-name {
          font-family: 'Sora', sans-serif;
          font-size: 0.82rem;
          font-weight: 700;
        }
        .tcpip-layer-protocols {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.72rem;
          color: rgba(171,207,201,0.55);
          line-height: 1.3;
        }
        .tcpip-note {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.72rem;
          color: rgba(171,207,201,0.4);
          margin-top: 0.6rem;
          text-align: center;
        }
      `})]})}),w=[{label:"Step 1 — SYN",arrow:"client-to-server",clientMsg:`SYN
Seq=0`,serverMsg:"...",clientState:"SYN_SENT",serverState:"LISTEN",explanation:"The client sends a SYN (synchronise) packet to the server. It includes the client's initial sequence number (ISN), randomly chosen to prevent prediction attacks. The client enters the SYN_SENT state."},{label:"Step 2 — SYN-ACK",arrow:"server-to-client",clientMsg:"...",serverMsg:`SYN-ACK
Seq=0, Ack=1`,clientState:"SYN_SENT",serverState:"SYN_RECEIVED",explanation:"The server acknowledges the client's SYN (Ack = client ISN + 1) and sends its own SYN with its own initial sequence number. The server allocates resources and enters SYN_RECEIVED. This is the half-open state that SYN flood attacks exploit — an attacker sends many SYNs but never replies, filling the server's connection queue."},{label:"Step 3 — ACK",arrow:"client-to-server",clientMsg:`ACK
Ack=1`,serverMsg:"...",clientState:"ESTABLISHED",serverState:"ESTABLISHED",explanation:"The client acknowledges the server's SYN (Ack = server ISN + 1). Both sides are now ESTABLISHED. Data can flow in both directions. The connection is fully formed."}],Y=i.memo(function(){const[r,o]=i.useState(0),s=w[r];return e.jsxs("div",{className:"hs-wrapper",children:[e.jsx("div",{className:"hs-step-btns",role:"tablist","aria-label":"Handshake steps",children:w.map((t,a)=>e.jsx("button",{role:"tab","aria-selected":r===a,className:`hs-step-btn${r===a?" hs-step-btn--active":""}`,onClick:()=>o(a),children:t.label},a))}),e.jsxs("div",{className:"hs-diagram",children:[e.jsxs("div",{className:"hs-endpoint",children:[e.jsx("div",{className:"hs-box hs-box--client",children:"CLIENT"}),e.jsxs("div",{className:"hs-state-label",children:["State: ",e.jsx("span",{className:"hs-state",children:s.clientState})]}),e.jsx("div",{className:"hs-timeline"})]}),e.jsx("div",{className:"hs-arrow-area",children:e.jsxs("div",{className:`hs-arrow-container hs-arrow-container--${s.arrow}`,children:[e.jsx("div",{className:"hs-arrow-label",children:s.arrow==="client-to-server"?s.clientMsg:s.serverMsg}),e.jsx("div",{className:`hs-arrow-line hs-arrow-line--${s.arrow}`,children:e.jsx("div",{className:"hs-arrow-head"})})]})}),e.jsxs("div",{className:"hs-endpoint",children:[e.jsx("div",{className:"hs-box hs-box--server",children:"SERVER"}),e.jsxs("div",{className:"hs-state-label",children:["State: ",e.jsx("span",{className:"hs-state",children:s.serverState})]}),e.jsx("div",{className:"hs-timeline"})]})]}),e.jsx("div",{className:"hs-explanation",children:s.explanation}),e.jsxs("div",{className:"hs-nav",children:[e.jsx("button",{className:"hs-nav-btn",onClick:()=>o(t=>Math.max(0,t-1)),disabled:r===0,"aria-label":"Previous step",children:"← Prev"}),e.jsxs("span",{className:"hs-progress",children:[r+1," / ",w.length]}),e.jsx("button",{className:"hs-nav-btn",onClick:()=>o(t=>Math.min(w.length-1,t+1)),disabled:r===w.length-1,"aria-label":"Next step",children:"Next →"})]}),r===w.length-1&&e.jsx("div",{className:"hs-complete",children:"✓ Connection Established — Data transfer can begin"}),e.jsx("style",{children:`
        .hs-wrapper { margin: 0.75rem 0; }
        .hs-step-btns {
          display: flex;
          gap: 0.4rem;
          flex-wrap: wrap;
          margin-bottom: 1rem;
        }
        .hs-step-btn {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.78rem;
          padding: 0.35rem 0.75rem;
          border-radius: 5px;
          border: 1px solid rgba(2,168,154,0.3);
          background: rgba(10,15,15,0.6);
          color: rgba(224,224,224,0.6);
          cursor: pointer;
          transition: all 0.18s ease;
        }
        .hs-step-btn:hover { border-color: #02a89a; color: #e0e0e0; }
        .hs-step-btn--active {
          background: rgba(2,168,154,0.15);
          border-color: #02a89a;
          color: #02a89a;
          font-weight: 700;
        }
        .hs-diagram {
          display: grid;
          grid-template-columns: 1fr 180px 1fr;
          gap: 0;
          align-items: start;
          padding: 1rem 0.5rem;
          background: rgba(10,15,15,0.5);
          border: 1px solid rgba(2,168,154,0.15);
          border-radius: 8px;
          min-height: 120px;
        }
        @media (max-width: 500px) {
          .hs-diagram { grid-template-columns: 1fr 120px 1fr; }
        }
        .hs-endpoint {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
        }
        .hs-box {
          font-family: 'Sora', sans-serif;
          font-size: 0.8rem;
          font-weight: 700;
          padding: 0.4rem 0.9rem;
          border-radius: 6px;
          text-align: center;
        }
        .hs-box--client {
          background: rgba(74,160,200,0.15);
          border: 1px solid rgba(74,160,200,0.4);
          color: #4aa0c8;
        }
        .hs-box--server {
          background: rgba(45,214,143,0.1);
          border: 1px solid rgba(45,214,143,0.35);
          color: #2dd68f;
        }
        .hs-state-label {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.7rem;
          color: rgba(171,207,201,0.4);
        }
        .hs-state {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.7rem;
          color: #ffc800;
        }
        .hs-timeline {
          width: 2px;
          height: 60px;
          background: rgba(255,255,255,0.1);
          margin-top: 0.2rem;
        }
        .hs-arrow-area {
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: 1.6rem;
        }
        .hs-arrow-container {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.2rem;
        }
        .hs-arrow-label {
          font-family: 'Sora', sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          color: #02a89a;
          text-align: center;
          white-space: pre-line;
          line-height: 1.25;
        }
        .hs-arrow-line {
          width: 100%;
          height: 2px;
          background: #02a89a;
          position: relative;
        }
        .hs-arrow-line--client-to-server .hs-arrow-head {
          position: absolute;
          right: -1px;
          top: -5px;
          width: 0;
          height: 0;
          border-left: 8px solid #02a89a;
          border-top: 6px solid transparent;
          border-bottom: 6px solid transparent;
        }
        .hs-arrow-line--server-to-client .hs-arrow-head {
          position: absolute;
          left: -1px;
          top: -5px;
          width: 0;
          height: 0;
          border-right: 8px solid #02a89a;
          border-top: 6px solid transparent;
          border-bottom: 6px solid transparent;
        }
        .hs-explanation {
          margin-top: 0.9rem;
          padding: 0.85rem 1rem;
          background: rgba(2,168,154,0.06);
          border-left: 3px solid #02a89a;
          border-radius: 0 6px 6px 0;
          font-family: 'Oxanium', sans-serif;
          font-size: 0.83rem;
          color: rgba(224,224,224,0.85);
          line-height: 1.65;
        }
        .hs-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 0.75rem;
        }
        .hs-nav-btn {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.8rem;
          padding: 0.35rem 0.8rem;
          border-radius: 5px;
          border: 1px solid rgba(2,168,154,0.35);
          background: transparent;
          color: #02a89a;
          cursor: pointer;
          transition: background 0.18s ease;
        }
        .hs-nav-btn:hover:not(:disabled) { background: rgba(2,168,154,0.1); }
        .hs-nav-btn:disabled { opacity: 0.3; cursor: not-allowed; }
        .hs-progress {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.78rem;
          color: rgba(171,207,201,0.5);
        }
        .hs-complete {
          margin-top: 0.6rem;
          text-align: center;
          font-family: 'Sora', sans-serif;
          font-size: 0.82rem;
          font-weight: 700;
          color: #2dd68f;
          padding: 0.4rem;
          background: rgba(45,214,143,0.07);
          border-radius: 5px;
          border: 1px solid rgba(45,214,143,0.2);
        }
      `})]})}),K=[{from:"client",msg:"SYN",state:"Client sends SYN, server allocates a half-open connection entry."},{from:"server",msg:"SYN-ACK",state:"Server replies SYN-ACK, waiting for ACK to complete."},{from:"client",msg:"ACK",state:"Client sends ACK. Connection is established. Entry removed from queue."}],V=i.memo(function(){const[r,o]=i.useState("normal"),s=8,t=7;return e.jsxs("div",{className:"sfd-wrapper",children:[e.jsxs("div",{className:"sfd-tabs",role:"tablist",children:[e.jsx("button",{role:"tab","aria-selected":r==="normal",className:`sfd-tab${r==="normal"?" sfd-tab--active":""}`,onClick:()=>o("normal"),children:"Normal TCP"}),e.jsx("button",{role:"tab","aria-selected":r==="attack",className:`sfd-tab${r==="attack"?" sfd-tab--active sfd-tab--attack":""}`,onClick:()=>o("attack"),children:"SYN Flood Attack"})]}),r==="normal"?e.jsx("div",{className:"sfd-normal",children:e.jsxs("div",{className:"sfd-cols",children:[e.jsxs("div",{className:"sfd-party",children:[e.jsx("div",{className:"sfd-box sfd-box--client",children:"Client"}),e.jsx("div",{className:"sfd-vline"})]}),e.jsxs("div",{className:"sfd-msgs",children:[K.map((a,n)=>e.jsxs("div",{className:`sfd-msg-row sfd-msg-row--${a.from}`,children:[e.jsxs("div",{className:`sfd-msg-arrow sfd-msg-arrow--${a.from}`,children:[e.jsx("span",{className:"sfd-msg-label",children:a.msg}),e.jsx("div",{className:`sfd-msg-line sfd-msg-line--${a.from}`,children:e.jsx("div",{className:"sfd-msg-head"})})]}),e.jsx("div",{className:"sfd-msg-state",children:a.state})]},n)),e.jsx("div",{className:"sfd-established",children:"Connection Established ✓"})]}),e.jsxs("div",{className:"sfd-party",children:[e.jsx("div",{className:"sfd-box sfd-box--server",children:"Server"}),e.jsx("div",{className:"sfd-vline"})]})]})}):e.jsxs("div",{className:"sfd-attack",children:[e.jsxs("div",{className:"sfd-attack-top",children:[e.jsx("div",{className:"sfd-attack-side",children:e.jsxs("div",{className:"sfd-box sfd-box--attacker",children:["Attacker",e.jsx("br",{}),e.jsx("span",{className:"sfd-spoofed",children:"(spoofed IPs)"})]})}),e.jsxs("div",{className:"sfd-attack-arrows",children:[[1,2,3].map(a=>e.jsxs("div",{className:"sfd-attack-syn-row",children:[e.jsx("span",{className:"sfd-attack-syn-label",children:"SYN (forged src)"}),e.jsx("div",{className:"sfd-attack-syn-line",children:e.jsx("div",{className:"sfd-attack-syn-head"})}),e.jsx("span",{className:"sfd-attack-synack-label",children:"SYN-ACK (no reply → timeout)"})]},a)),e.jsx("div",{className:"sfd-attack-ellipsis",children:"⋮ (thousands per second)"})]}),e.jsx("div",{className:"sfd-attack-side",children:e.jsx("div",{className:"sfd-box sfd-box--server",children:"Server"})})]}),e.jsxs("div",{className:"sfd-queue-section",children:[e.jsx("div",{className:"sfd-queue-label",children:"Server half-open connection queue"}),e.jsx("div",{className:"sfd-queue",children:Array.from({length:s}).map((a,n)=>e.jsx("div",{className:`sfd-queue-slot${n<t?" sfd-queue-slot--full":" sfd-queue-slot--last"}`,children:n<t?"SYN_RCVD":"?"},n))}),e.jsx("div",{className:"sfd-queue-caption",children:"Queue is nearly full. Legitimate connections are refused or delayed."})]}),e.jsxs("div",{className:"sfd-attack-explain",children:[e.jsxs("div",{className:"sfd-explain-row",children:[e.jsx("span",{className:"sfd-explain-icon",children:"▶"}),e.jsx("span",{children:"Each SYN causes the server to allocate memory and send a SYN-ACK, expecting an ACK that never arrives."})]}),e.jsxs("div",{className:"sfd-explain-row",children:[e.jsx("span",{className:"sfd-explain-icon",children:"▶"}),e.jsx("span",{children:"The spoofed source IPs ensure the real hosts never send the completing ACK."})]}),e.jsxs("div",{className:"sfd-explain-row",children:[e.jsx("span",{className:"sfd-explain-icon",children:"▶"}),e.jsxs("span",{children:[e.jsx("strong",{children:"Mitigation:"})," SYN cookies, rate limiting, firewall SYN thresholds — the server avoids committing full resources until the handshake completes."]})]})]})]}),e.jsx("style",{children:`
        .sfd-wrapper { margin: 0.75rem 0; }
        .sfd-tabs {
          display: flex;
          gap: 0.4rem;
          margin-bottom: 0.85rem;
          flex-wrap: wrap;
        }
        .sfd-tab {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.78rem;
          padding: 0.35rem 0.9rem;
          border-radius: 5px;
          border: 1px solid rgba(2,168,154,0.3);
          background: rgba(10,15,15,0.5);
          color: rgba(224,224,224,0.6);
          cursor: pointer;
          transition: all 0.18s ease;
        }
        .sfd-tab:hover { border-color: #02a89a; color: #e0e0e0; }
        .sfd-tab--active {
          background: rgba(2,168,154,0.12);
          border-color: #02a89a;
          color: #02a89a;
          font-weight: 700;
        }
        .sfd-tab--attack.sfd-tab--active {
          background: rgba(255,80,80,0.1);
          border-color: #ff5050;
          color: #ff6b6b;
        }

        /* Normal view */
        .sfd-normal {
          background: rgba(10,15,15,0.5);
          border: 1px solid rgba(2,168,154,0.15);
          border-radius: 8px;
          padding: 1rem;
        }
        .sfd-cols {
          display: grid;
          grid-template-columns: 80px 1fr 80px;
          gap: 0;
          align-items: start;
        }
        .sfd-party {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
        }
        .sfd-box {
          font-family: 'Sora', sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.3rem 0.5rem;
          border-radius: 5px;
          text-align: center;
          white-space: nowrap;
        }
        .sfd-box--client {
          background: rgba(74,160,200,0.12);
          border: 1px solid rgba(74,160,200,0.35);
          color: #4aa0c8;
        }
        .sfd-box--server {
          background: rgba(45,214,143,0.08);
          border: 1px solid rgba(45,214,143,0.3);
          color: #2dd68f;
        }
        .sfd-box--attacker {
          background: rgba(255,80,80,0.1);
          border: 1px solid rgba(255,80,80,0.35);
          color: #ff6b6b;
          font-size: 0.75rem;
          text-align: center;
        }
        .sfd-spoofed {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.65rem;
          font-weight: 400;
          color: rgba(255,107,107,0.65);
        }
        .sfd-vline {
          width: 2px;
          height: 100px;
          background: rgba(255,255,255,0.08);
        }
        .sfd-msgs {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          padding-top: 0.4rem;
        }
        .sfd-msg-row { display: flex; flex-direction: column; gap: 0.2rem; }
        .sfd-msg-arrow {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.1rem;
        }
        .sfd-msg-row--server .sfd-msg-arrow { align-items: flex-end; }
        .sfd-msg-label {
          font-family: 'Sora', sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          color: #02a89a;
        }
        .sfd-msg-line {
          width: 100%;
          height: 2px;
          background: #02a89a;
          position: relative;
        }
        .sfd-msg-line--client .sfd-msg-head {
          position: absolute;
          right: 0;
          top: -5px;
          width: 0;
          height: 0;
          border-left: 7px solid #02a89a;
          border-top: 5px solid transparent;
          border-bottom: 5px solid transparent;
        }
        .sfd-msg-line--server .sfd-msg-head {
          position: absolute;
          left: 0;
          top: -5px;
          width: 0;
          height: 0;
          border-right: 7px solid #02a89a;
          border-top: 5px solid transparent;
          border-bottom: 5px solid transparent;
        }
        .sfd-msg-state {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.72rem;
          color: rgba(171,207,201,0.5);
          line-height: 1.3;
        }
        .sfd-established {
          margin-top: 0.4rem;
          font-family: 'Sora', sans-serif;
          font-size: 0.78rem;
          font-weight: 700;
          color: #2dd68f;
          text-align: center;
        }

        /* Attack view */
        .sfd-attack {
          background: rgba(10,15,15,0.5);
          border: 1px solid rgba(255,80,80,0.2);
          border-radius: 8px;
          padding: 1rem;
        }
        .sfd-attack-top {
          display: grid;
          grid-template-columns: 90px 1fr 90px;
          gap: 0.5rem;
          align-items: start;
          margin-bottom: 1rem;
        }
        .sfd-attack-side { display: flex; align-items: flex-start; justify-content: center; }
        .sfd-attack-arrows { display: flex; flex-direction: column; gap: 0.5rem; }
        .sfd-attack-syn-row {
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
        }
        .sfd-attack-syn-label {
          font-family: 'Sora', sans-serif;
          font-size: 0.68rem;
          font-weight: 700;
          color: #ff6b6b;
        }
        .sfd-attack-synack-label {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.66rem;
          color: rgba(255,107,107,0.55);
        }
        .sfd-attack-syn-line {
          width: 100%;
          height: 2px;
          background: rgba(255,80,80,0.5);
          position: relative;
        }
        .sfd-attack-syn-head {
          position: absolute;
          right: 0;
          top: -4px;
          width: 0;
          height: 0;
          border-left: 7px solid rgba(255,80,80,0.5);
          border-top: 4px solid transparent;
          border-bottom: 4px solid transparent;
        }
        .sfd-attack-ellipsis {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.72rem;
          color: rgba(255,107,107,0.5);
          text-align: center;
        }
        .sfd-queue-section { margin-bottom: 0.85rem; }
        .sfd-queue-label {
          font-family: 'Sora', sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: rgba(171,207,201,0.5);
          margin-bottom: 0.4rem;
        }
        .sfd-queue {
          display: flex;
          gap: 4px;
          flex-wrap: wrap;
        }
        .sfd-queue-slot {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.62rem;
          padding: 0.3rem 0.5rem;
          border-radius: 4px;
          border: 1px solid;
        }
        .sfd-queue-slot--full {
          background: rgba(255,80,80,0.12);
          border-color: rgba(255,80,80,0.35);
          color: #ff6b6b;
        }
        .sfd-queue-slot--last {
          background: rgba(255,200,0,0.08);
          border-color: rgba(255,200,0,0.3);
          color: #ffc800;
        }
        .sfd-queue-caption {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.72rem;
          color: rgba(255,107,107,0.6);
          margin-top: 0.35rem;
        }
        .sfd-attack-explain {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }
        .sfd-explain-row {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          font-family: 'Oxanium', sans-serif;
          font-size: 0.81rem;
          color: rgba(224,224,224,0.8);
          line-height: 1.5;
        }
        .sfd-explain-icon {
          color: rgba(255,107,107,0.6);
          flex-shrink: 0;
          margin-top: 0.05rem;
        }
      `})]})}),b=[{label:"ARP Request",from:"host-a",msg:"Who has 192.168.1.1? Tell 192.168.1.10",type:"broadcast",explain:"Host A wants to reach 192.168.1.1 (the router) but only knows the IP. It broadcasts an ARP request to the entire local segment (FF:FF:FF:FF:FF:FF). Every host on the segment receives this frame."},{label:"ARP Reply",from:"router",msg:"192.168.1.1 is at AA:BB:CC:DD:EE:FF",type:"unicast",explain:"The router recognises its own IP and replies directly (unicast) to Host A, providing its MAC address. Host A stores this mapping in its ARP cache for future use — avoiding a broadcast for every packet."},{label:"ARP Cache",from:"cache",msg:"192.168.1.1 ↔ AA:BB:CC:DD:EE:FF (cached)",type:"cache",explain:"Host A now has the mapping and encapsulates subsequent packets to 192.168.1.1 directly in Ethernet frames addressed to AA:BB:CC:DD:EE:FF. The cache entry typically expires after 20 seconds to 1 minute."}],Z=i.memo(function(){const[r,o]=i.useState("normal"),[s,t]=i.useState(0);return e.jsxs("div",{className:"arp-wrapper",children:[e.jsxs("div",{className:"arp-tabs",role:"tablist",children:[e.jsx("button",{role:"tab","aria-selected":r==="normal",className:`arp-tab${r==="normal"?" arp-tab--active":""}`,onClick:()=>{o("normal"),t(0)},children:"Normal ARP"}),e.jsx("button",{role:"tab","aria-selected":r==="spoof",className:`arp-tab${r==="spoof"?" arp-tab--active arp-tab--attack":""}`,onClick:()=>o("spoof"),children:"ARP Spoofing"})]}),r==="normal"?e.jsxs("div",{className:"arp-normal",children:[e.jsxs("div",{className:"arp-hosts",children:[e.jsx("div",{className:"arp-host arp-host--a",children:e.jsxs("div",{className:"arp-host-box",children:["Host A",e.jsx("br",{}),e.jsx("span",{className:"arp-ip",children:"192.168.1.10"})]})}),e.jsx("div",{className:"arp-segment-label",children:"LAN Segment"}),e.jsx("div",{className:"arp-host arp-host--router",children:e.jsxs("div",{className:"arp-host-box arp-host-box--router",children:["Router",e.jsx("br",{}),e.jsx("span",{className:"arp-ip",children:"192.168.1.1"})]})})]}),e.jsx("div",{className:"arp-step-display",children:b[s]&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:`arp-msg-box arp-msg-box--${b[s].type}`,children:[e.jsx("span",{className:"arp-msg-type",children:b[s].type==="broadcast"?"Broadcast":b[s].type==="unicast"?"Unicast Reply":"Cache Updated"}),e.jsx("span",{className:"arp-msg-text",children:b[s].msg})]}),e.jsx("div",{className:"arp-explain",children:b[s].explain})]})}),e.jsx("div",{className:"arp-step-nav",children:b.map((a,n)=>e.jsx("button",{className:`arp-step-btn${s===n?" arp-step-btn--active":""}`,onClick:()=>t(n),children:a.label},n))})]}):e.jsxs("div",{className:"arp-spoof",children:[e.jsxs("div",{className:"arp-spoof-diagram",children:[e.jsx("div",{className:"arp-spoof-col",children:e.jsxs("div",{className:"arp-host-box",children:["Host A",e.jsx("br",{}),e.jsx("span",{className:"arp-ip",children:"192.168.1.10"})]})}),e.jsxs("div",{className:"arp-spoof-arrows",children:[e.jsxs("div",{className:"arp-spoof-arrow arp-spoof-arrow--attacker",children:[e.jsx("span",{className:"arp-spoof-msg",children:"Gratuitous ARP: 192.168.1.1 is at ATTACKER:MAC"}),e.jsx("div",{className:"arp-spoof-line",children:e.jsx("div",{className:"arp-spoof-head arp-spoof-head--left"})}),e.jsx("span",{className:"arp-spoof-sub",children:"(poisons Host A's ARP cache)"})]}),e.jsxs("div",{className:"arp-spoof-arrow arp-spoof-arrow--attacker",style:{marginTop:"0.5rem"},children:[e.jsx("span",{className:"arp-spoof-msg",children:"Gratuitous ARP: 192.168.1.10 is at ATTACKER:MAC"}),e.jsx("div",{className:"arp-spoof-line",children:e.jsx("div",{className:"arp-spoof-head arp-spoof-head--right"})}),e.jsx("span",{className:"arp-spoof-sub",children:"(poisons Router's ARP cache)"})]})]}),e.jsx("div",{className:"arp-spoof-col",children:e.jsxs("div",{className:"arp-host-box arp-host-box--attacker",children:["Attacker",e.jsx("br",{}),e.jsx("span",{className:"arp-ip",children:"192.168.1.99"})]})}),e.jsx("div",{className:"arp-spoof-arrows",children:e.jsxs("div",{className:"arp-spoof-arrow arp-spoof-arrow--normal",style:{marginTop:"2rem"},children:[e.jsx("span",{className:"arp-spoof-msg",children:"Traffic intended for router flows here instead"}),e.jsx("div",{className:"arp-spoof-line-green",children:e.jsx("div",{className:"arp-spoof-head-green"})})]})}),e.jsx("div",{className:"arp-spoof-col",children:e.jsxs("div",{className:"arp-host-box arp-host-box--router",children:["Router",e.jsx("br",{}),e.jsx("span",{className:"arp-ip",children:"192.168.1.1"})]})})]}),e.jsxs("div",{className:"arp-spoof-points",children:[e.jsxs("div",{className:"arp-spoof-point",children:[e.jsx("span",{className:"arp-spoof-icon",children:"!"}),"ARP has no authentication — any host can claim any IP-to-MAC mapping."]}),e.jsxs("div",{className:"arp-spoof-point",children:[e.jsx("span",{className:"arp-spoof-icon",children:"!"}),"Gratuitous ARP replies are accepted without a prior request."]}),e.jsxs("div",{className:"arp-spoof-point",children:[e.jsx("span",{className:"arp-spoof-icon",children:"✓"}),"Defence: Dynamic ARP Inspection (DAI) on managed switches validates ARP packets against the DHCP snooping table."]}),e.jsxs("div",{className:"arp-spoof-point",children:[e.jsx("span",{className:"arp-spoof-icon",children:"✓"}),"Detection: run ",e.jsx("code",{children:"arp -a"})," — if two IPs share the same MAC, ARP poisoning may be active."]})]})]}),e.jsx("style",{children:`
        .arp-wrapper { margin: 0.75rem 0; }
        .arp-tabs {
          display: flex;
          gap: 0.4rem;
          margin-bottom: 0.85rem;
          flex-wrap: wrap;
        }
        .arp-tab {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.78rem;
          padding: 0.35rem 0.9rem;
          border-radius: 5px;
          border: 1px solid rgba(2,168,154,0.3);
          background: rgba(10,15,15,0.5);
          color: rgba(224,224,224,0.6);
          cursor: pointer;
          transition: all 0.18s ease;
        }
        .arp-tab:hover { border-color: #02a89a; color: #e0e0e0; }
        .arp-tab--active {
          background: rgba(2,168,154,0.12);
          border-color: #02a89a;
          color: #02a89a;
          font-weight: 700;
        }
        .arp-tab--attack.arp-tab--active {
          background: rgba(255,80,80,0.1);
          border-color: #ff5050;
          color: #ff6b6b;
        }
        .arp-normal {
          background: rgba(10,15,15,0.5);
          border: 1px solid rgba(2,168,154,0.15);
          border-radius: 8px;
          padding: 1rem;
        }
        .arp-hosts {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.85rem;
          gap: 0.5rem;
        }
        .arp-host { display: flex; flex-direction: column; align-items: center; }
        .arp-host-box {
          font-family: 'Sora', sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.4rem 0.8rem;
          border-radius: 6px;
          text-align: center;
          background: rgba(74,160,200,0.1);
          border: 1px solid rgba(74,160,200,0.3);
          color: #4aa0c8;
        }
        .arp-host-box--router {
          background: rgba(45,214,143,0.08);
          border-color: rgba(45,214,143,0.25);
          color: #2dd68f;
        }
        .arp-host-box--attacker {
          background: rgba(255,80,80,0.1);
          border-color: rgba(255,80,80,0.3);
          color: #ff6b6b;
        }
        .arp-ip {
          display: block;
          font-family: 'Oxanium', monospace;
          font-size: 0.65rem;
          font-weight: 400;
          opacity: 0.7;
          margin-top: 0.15rem;
        }
        .arp-segment-label {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.68rem;
          color: rgba(171,207,201,0.35);
          text-align: center;
        }
        .arp-step-display { margin-bottom: 0.75rem; }
        .arp-msg-box {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.6rem 0.85rem;
          border-radius: 6px;
          margin-bottom: 0.5rem;
        }
        .arp-msg-box--broadcast {
          background: rgba(255,200,0,0.08);
          border: 1px solid rgba(255,200,0,0.25);
        }
        .arp-msg-box--unicast {
          background: rgba(2,168,154,0.08);
          border: 1px solid rgba(2,168,154,0.25);
        }
        .arp-msg-box--cache {
          background: rgba(160,123,192,0.08);
          border: 1px solid rgba(160,123,192,0.25);
        }
        .arp-msg-type {
          font-family: 'Sora', sans-serif;
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #ffc800;
          white-space: nowrap;
        }
        .arp-msg-box--unicast .arp-msg-type { color: #02a89a; }
        .arp-msg-box--cache .arp-msg-type { color: #a07bc0; }
        .arp-msg-text {
          font-family: 'Oxanium', monospace;
          font-size: 0.78rem;
          color: rgba(224,224,224,0.85);
        }
        .arp-explain {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.81rem;
          color: rgba(224,224,224,0.8);
          line-height: 1.6;
          padding: 0.6rem 0.85rem;
          background: rgba(2,168,154,0.04);
          border-left: 2px solid rgba(2,168,154,0.3);
          border-radius: 0 5px 5px 0;
        }
        .arp-step-nav {
          display: flex;
          gap: 0.4rem;
          flex-wrap: wrap;
          margin-top: 0.75rem;
        }
        .arp-step-btn {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.75rem;
          padding: 0.3rem 0.7rem;
          border-radius: 5px;
          border: 1px solid rgba(2,168,154,0.25);
          background: rgba(10,15,15,0.5);
          color: rgba(224,224,224,0.55);
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .arp-step-btn:hover { border-color: #02a89a; color: #e0e0e0; }
        .arp-step-btn--active {
          background: rgba(2,168,154,0.12);
          border-color: #02a89a;
          color: #02a89a;
          font-weight: 700;
        }
        /* Spoof view */
        .arp-spoof {
          background: rgba(10,15,15,0.5);
          border: 1px solid rgba(255,80,80,0.18);
          border-radius: 8px;
          padding: 1rem;
        }
        .arp-spoof-diagram {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: 1rem;
          overflow-x: auto;
        }
        .arp-spoof-col { flex-shrink: 0; }
        .arp-spoof-arrows { flex: 1; min-width: 120px; }
        .arp-spoof-arrow { display: flex; flex-direction: column; gap: 0.15rem; }
        .arp-spoof-arrow--attacker {}
        .arp-spoof-msg {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.68rem;
          color: #ff6b6b;
          line-height: 1.3;
        }
        .arp-spoof-sub {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.62rem;
          color: rgba(255,107,107,0.45);
        }
        .arp-spoof-line {
          width: 100%;
          height: 2px;
          background: rgba(255,80,80,0.4);
          position: relative;
        }
        .arp-spoof-head--left {
          position: absolute;
          left: 0;
          top: -4px;
          width: 0;
          height: 0;
          border-right: 6px solid rgba(255,80,80,0.4);
          border-top: 4px solid transparent;
          border-bottom: 4px solid transparent;
        }
        .arp-spoof-head--right {
          position: absolute;
          right: 0;
          top: -4px;
          width: 0;
          height: 0;
          border-left: 6px solid rgba(255,80,80,0.4);
          border-top: 4px solid transparent;
          border-bottom: 4px solid transparent;
        }
        .arp-spoof-line-green {
          width: 100%;
          height: 2px;
          background: rgba(45,214,143,0.4);
          position: relative;
        }
        .arp-spoof-head-green {
          position: absolute;
          right: 0;
          top: -4px;
          width: 0;
          height: 0;
          border-left: 6px solid rgba(45,214,143,0.4);
          border-top: 4px solid transparent;
          border-bottom: 4px solid transparent;
        }
        .arp-spoof-arrow--normal .arp-spoof-msg { color: #2dd68f; font-size: 0.68rem; }
        .arp-spoof-points {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }
        .arp-spoof-point {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          font-family: 'Oxanium', sans-serif;
          font-size: 0.8rem;
          color: rgba(224,224,224,0.82);
          line-height: 1.5;
        }
        .arp-spoof-icon {
          font-size: 0.78rem;
          color: #ff6b6b;
          flex-shrink: 0;
          margin-top: 0.05rem;
          font-weight: 700;
        }
        .arp-spoof-point:nth-child(3) .arp-spoof-icon,
        .arp-spoof-point:nth-child(4) .arp-spoof-icon { color: #2dd68f; }
        .arp-spoof-point code {
          background: rgba(2,168,154,0.1);
          border: 1px solid rgba(2,168,154,0.2);
          border-radius: 3px;
          padding: 0 0.3rem;
          font-family: 'Oxanium', monospace;
          font-size: 0.78rem;
          color: #02a89a;
        }
      `})]})}),$=i.memo(function(){return e.jsxs("div",{className:"nat-wrapper",children:[e.jsxs("div",{className:"nat-topology",children:[e.jsxs("div",{className:"nat-zone nat-zone--internal",children:[e.jsx("div",{className:"nat-zone-label",children:"Internal Network"}),e.jsx("div",{className:"nat-host nat-host--small",children:"PC 192.168.1.10"}),e.jsx("div",{className:"nat-host nat-host--small",children:"Phone 192.168.1.11"}),e.jsx("div",{className:"nat-host nat-host--small",children:"Laptop 192.168.1.12"}),e.jsxs("div",{className:"nat-zone-note",children:["Private IPs (RFC 1918)",e.jsx("br",{}),"Not routable on internet"]})]}),e.jsxs("div",{className:"nat-router-col",children:[e.jsx("div",{className:"nat-arrow-label",children:"Private"}),e.jsx("div",{className:"nat-arrow",children:"→"}),e.jsxs("div",{className:"nat-router",children:[e.jsx("div",{className:"nat-router-box",children:"Router / NAT"}),e.jsxs("div",{className:"nat-router-ips",children:[e.jsx("div",{className:"nat-router-ip",children:"LAN: 192.168.1.1"}),e.jsx("div",{className:"nat-router-ip nat-router-ip--public",children:"WAN: 203.0.113.50"})]})]}),e.jsx("div",{className:"nat-arrow",children:"→"}),e.jsx("div",{className:"nat-arrow-label",children:"Public"})]}),e.jsxs("div",{className:"nat-zone nat-zone--internet",children:[e.jsx("div",{className:"nat-zone-label",children:"Internet"}),e.jsxs("div",{className:"nat-host nat-host--server",children:["Web Server",e.jsx("br",{}),"93.184.216.34"]}),e.jsxs("div",{className:"nat-zone-note",children:["Public IPs only",e.jsx("br",{}),"Routable globally"]})]})]}),e.jsxs("div",{className:"nat-table-section",children:[e.jsx("div",{className:"nat-table-label",children:"NAT Translation Table (example)"}),e.jsx("div",{className:"nat-table-scroll",children:e.jsxs("table",{className:"nat-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Internal IP:Port"}),e.jsx("th",{children:"External IP:Port"}),e.jsx("th",{children:"Destination"}),e.jsx("th",{children:"Protocol"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"192.168.1.10:52001"}),e.jsx("td",{children:"203.0.113.50:52001"}),e.jsx("td",{children:"93.184.216.34:443"}),e.jsx("td",{children:"TCP"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"192.168.1.11:52002"}),e.jsx("td",{children:"203.0.113.50:52002"}),e.jsx("td",{children:"93.184.216.34:443"}),e.jsx("td",{children:"TCP"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"192.168.1.12:52003"}),e.jsx("td",{children:"203.0.113.50:52003"}),e.jsx("td",{children:"8.8.8.8:53"}),e.jsx("td",{children:"UDP"})]})]})]})})]}),e.jsxs("div",{className:"nat-points",children:[e.jsxs("div",{className:"nat-point",children:[e.jsx("span",{className:"nat-point-icon",children:"▶"}),e.jsxs("span",{children:["Multiple private hosts share a ",e.jsx("strong",{children:"single public IP"}),". Port numbers distinguish connections (PAT / NAPT)."]})]}),e.jsxs("div",{className:"nat-point",children:[e.jsx("span",{className:"nat-point-icon",children:"▶"}),e.jsxs("span",{children:["Private address ranges: ",e.jsx("code",{children:"10.0.0.0/8"}),", ",e.jsx("code",{children:"172.16.0.0/12"}),", ",e.jsx("code",{children:"192.168.0.0/16"})," (RFC 1918)."]})]}),e.jsxs("div",{className:"nat-point nat-point--warn",children:[e.jsx("span",{className:"nat-point-icon nat-point-icon--warn",children:"!"}),e.jsxs("span",{children:["NAT hides internal hosts but is ",e.jsx("strong",{children:"not a firewall"}),". It provides no access control, authentication, or inspection. A firewall is still required."]})]})]}),e.jsx("style",{children:`
        .nat-wrapper { margin: 0.75rem 0; }
        .nat-topology {
          display: flex;
          align-items: stretch;
          gap: 0;
          background: rgba(10,15,15,0.5);
          border: 1px solid rgba(2,168,154,0.15);
          border-radius: 8px;
          padding: 1rem;
          flex-wrap: wrap;
          margin-bottom: 0.85rem;
          gap: 0.5rem;
        }
        .nat-zone {
          flex: 1;
          min-width: 120px;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          align-items: center;
        }
        .nat-zone-label {
          font-family: 'Sora', sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 0.2rem;
        }
        .nat-zone--internal .nat-zone-label { color: #4aa0c8; }
        .nat-zone--internet .nat-zone-label { color: #2dd68f; }
        .nat-host {
          font-family: 'Oxanium', monospace;
          font-size: 0.72rem;
          padding: 0.3rem 0.6rem;
          border-radius: 5px;
          text-align: center;
          width: 100%;
          max-width: 150px;
        }
        .nat-host--small {
          background: rgba(74,160,200,0.08);
          border: 1px solid rgba(74,160,200,0.2);
          color: rgba(74,160,200,0.85);
        }
        .nat-host--server {
          background: rgba(45,214,143,0.08);
          border: 1px solid rgba(45,214,143,0.2);
          color: rgba(45,214,143,0.85);
        }
        .nat-zone-note {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.65rem;
          color: rgba(171,207,201,0.4);
          text-align: center;
          line-height: 1.4;
        }
        .nat-router-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.3rem;
          flex-shrink: 0;
          min-width: 110px;
        }
        .nat-arrow {
          font-size: 1.2rem;
          color: rgba(2,168,154,0.5);
          line-height: 1;
        }
        .nat-arrow-label {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.62rem;
          color: rgba(171,207,201,0.4);
        }
        .nat-router { display: flex; flex-direction: column; align-items: center; gap: 0.3rem; }
        .nat-router-box {
          font-family: 'Sora', sans-serif;
          font-size: 0.78rem;
          font-weight: 700;
          padding: 0.4rem 0.7rem;
          border-radius: 6px;
          background: rgba(171,207,201,0.1);
          border: 1px solid rgba(171,207,201,0.3);
          color: #abcfc9;
          text-align: center;
        }
        .nat-router-ips { display: flex; flex-direction: column; gap: 0.2rem; }
        .nat-router-ip {
          font-family: 'Oxanium', monospace;
          font-size: 0.66rem;
          color: rgba(74,160,200,0.75);
          text-align: center;
        }
        .nat-router-ip--public { color: rgba(45,214,143,0.75); }
        /* Table */
        .nat-table-section { margin-bottom: 0.85rem; }
        .nat-table-label {
          font-family: 'Sora', sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: rgba(171,207,201,0.5);
          margin-bottom: 0.4rem;
        }
        .nat-table-scroll { overflow-x: auto; }
        .nat-table {
          width: 100%;
          min-width: 460px;
          border-collapse: collapse;
          font-family: 'Oxanium', monospace;
          font-size: 0.75rem;
        }
        .nat-table th {
          text-align: left;
          padding: 0.4rem 0.7rem;
          background: rgba(2,168,154,0.08);
          color: rgba(171,207,201,0.7);
          font-family: 'Sora', sans-serif;
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-bottom: 1px solid rgba(2,168,154,0.2);
        }
        .nat-table td {
          padding: 0.38rem 0.7rem;
          color: rgba(224,224,224,0.8);
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .nat-table tr:last-child td { border-bottom: none; }
        /* Key points */
        .nat-points {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }
        .nat-point {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          font-family: 'Oxanium', sans-serif;
          font-size: 0.8rem;
          color: rgba(224,224,224,0.82);
          line-height: 1.5;
        }
        .nat-point--warn { color: rgba(255,200,0,0.85); }
        .nat-point-icon { color: #02a89a; flex-shrink: 0; font-size: 0.75rem; margin-top: 0.1rem; }
        .nat-point-icon--warn { color: #ffc800; }
        .nat-point code {
          background: rgba(2,168,154,0.1);
          border: 1px solid rgba(2,168,154,0.2);
          border-radius: 3px;
          padding: 0 0.3rem;
          font-family: 'Oxanium', monospace;
          font-size: 0.78rem;
          color: #02a89a;
        }
      `})]})}),L={internet:{label:"Internet",color:"#ff6b6b",title:"The Internet",desc:"The untrusted external network. All traffic from the internet must pass through the perimeter firewall before reaching any internal resource. Assume hostile."},perimeter:{label:`Perimeter
Firewall`,color:"#ffc800",title:"Perimeter Firewall",desc:"The first line of defence. Filters traffic between the internet and internal zones based on rules (ACLs). A stateful firewall tracks connection state. An NGFW adds deep packet inspection and application awareness."},dmz:{label:"DMZ",color:"#e05c8a",title:"DMZ (Demilitarised Zone)",desc:"An isolated network segment for internet-facing services (web servers, mail gateways, DNS). If a DMZ host is compromised, the attacker cannot reach the internal network — a second firewall or VLAN boundary blocks lateral movement."},webserver:{label:`Web
Server`,color:"#c46baf",title:"Web Server (in DMZ)",desc:"Sits in the DMZ to serve external users. Protected from the internal network by segmentation. A WAF may sit in front of it to filter HTTP/HTTPS at Layer 7."},internal:{label:`Internal
Firewall`,color:"#7a8fd0",title:"Internal Firewall / Segmentation",desc:"Separates the DMZ from the internal network. Even if the perimeter firewall is bypassed or a DMZ host is compromised, this boundary controls what the attacker can reach next. Implements micro-segmentation principles."},users:{label:`User
Segment`,color:"#4aa0c8",title:"User Segment",desc:"The network segment for employee workstations. Separated from servers by VLAN or firewall rules. Least privilege: users can reach only the services they need. 802.1X enforces device authentication before granting network access."},servers:{label:`Server
Segment`,color:"#2aae8a",title:"Server Segment",desc:"Internal servers (Active Directory, databases, file servers). Isolated from user workstations to limit lateral movement after a workstation compromise. Zero Trust: servers authenticate and authorise every connection regardless of source."},ids:{label:`IDS/IPS
SIEM`,color:"#a07bc0",title:"IDS / IPS / SIEM",desc:"Intrusion Detection System (IDS) monitors traffic and alerts on suspicious patterns. IPS is inline and can block. SIEM aggregates logs from all devices for correlation and anomaly detection. Together they provide visibility across all zones."}},G=i.memo(function(){const[r,o]=i.useState(null),s=r?L[r]:null,t=({id:a,style:n={}})=>{const g=L[a];return e.jsx("button",{className:`nst-box${r===a?" nst-box--active":""}`,style:{"--bc":g.color,...n},onClick:()=>o(r===a?null:a),"aria-label":g.label.replace(`
`," "),"aria-pressed":r===a,children:g.label.split(`
`).map((P,v)=>e.jsx("span",{className:"nst-box-line",children:P},v))})};return e.jsxs("div",{className:"nst-wrapper",children:[e.jsx("p",{className:"nst-hint",children:"Click any component to learn what it does."}),e.jsxs("div",{className:"nst-topology",children:[e.jsx("div",{className:"nst-row nst-row--center",children:e.jsx(t,{id:"internet"})}),e.jsx("div",{className:"nst-connector","aria-hidden":"true",children:e.jsx("div",{className:"nst-vline"})}),e.jsx("div",{className:"nst-row nst-row--center",children:e.jsx(t,{id:"perimeter"})}),e.jsx("div",{className:"nst-connector","aria-hidden":"true",children:e.jsx("div",{className:"nst-hline"})}),e.jsxs("div",{className:"nst-row nst-row--split",children:[e.jsxs("div",{className:"nst-branch",children:[e.jsx(t,{id:"dmz"}),e.jsx("div",{className:"nst-connector",children:e.jsx("div",{className:"nst-vline nst-vline--short"})}),e.jsx(t,{id:"webserver"})]}),e.jsx(t,{id:"ids"})]}),e.jsx("div",{className:"nst-connector","aria-hidden":"true",children:e.jsx("div",{className:"nst-vline"})}),e.jsx("div",{className:"nst-row nst-row--center",children:e.jsx(t,{id:"internal"})}),e.jsx("div",{className:"nst-connector","aria-hidden":"true",children:e.jsx("div",{className:"nst-hline"})}),e.jsxs("div",{className:"nst-row nst-row--split",children:[e.jsx(t,{id:"users"}),e.jsx(t,{id:"servers"})]})]}),e.jsx("div",{className:"nst-detail","aria-live":"polite",children:s?e.jsxs("div",{className:"nst-detail-inner",style:{borderLeftColor:s.color},children:[e.jsx("div",{className:"nst-detail-title",style:{color:s.color},children:s.title}),e.jsx("div",{className:"nst-detail-desc",children:s.desc})]}):e.jsx("div",{className:"nst-detail-placeholder",children:"Select a component above to see its role."})}),e.jsx("style",{children:`
        .nst-wrapper { margin: 0.75rem 0; }
        .nst-hint {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.78rem;
          color: rgba(171,207,201,0.5);
          text-align: center;
          margin-bottom: 0.75rem;
        }
        .nst-topology {
          background: rgba(10,15,15,0.5);
          border: 1px solid rgba(2,168,154,0.15);
          border-radius: 8px;
          padding: 1rem 0.75rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
          margin-bottom: 0.85rem;
        }
        .nst-row {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .nst-row--split {
          justify-content: space-around;
          gap: 0.5rem;
        }
        .nst-box {
          font-family: 'Sora', sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 0.4rem 0.75rem;
          border-radius: 6px;
          border: 1px solid var(--bc);
          background: color-mix(in srgb, var(--bc) 12%, transparent);
          color: var(--bc);
          cursor: pointer;
          transition: all 0.18s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.1rem;
          min-width: 80px;
          text-align: center;
        }
        .nst-box:hover {
          background: color-mix(in srgb, var(--bc) 22%, transparent);
          box-shadow: 0 0 0 1px var(--bc);
        }
        .nst-box--active {
          background: color-mix(in srgb, var(--bc) 25%, transparent) !important;
          box-shadow: 0 0 0 2px var(--bc);
        }
        .nst-box-line { line-height: 1.3; }
        .nst-connector {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 20px;
          width: 100%;
        }
        .nst-vline {
          width: 2px;
          height: 100%;
          background: rgba(255,255,255,0.1);
        }
        .nst-vline--short { height: 14px; }
        .nst-hline {
          width: 60%;
          height: 2px;
          background: rgba(255,255,255,0.08);
        }
        .nst-branch {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
        }
        .nst-detail-inner {
          background: rgba(10,15,15,0.7);
          border: 1px solid rgba(255,255,255,0.07);
          border-left-width: 3px;
          border-radius: 0 7px 7px 0;
          padding: 0.75rem 1rem;
        }
        .nst-detail-title {
          font-family: 'Sora', sans-serif;
          font-size: 0.88rem;
          font-weight: 700;
          margin-bottom: 0.4rem;
        }
        .nst-detail-desc {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.82rem;
          color: rgba(224,224,224,0.85);
          line-height: 1.6;
        }
        .nst-detail-placeholder {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.8rem;
          color: rgba(171,207,201,0.35);
          text-align: center;
          padding: 0.75rem;
          border: 1px dashed rgba(2,168,154,0.18);
          border-radius: 6px;
        }
      `})]})}),u=[{clue:"I automatically assign IP addresses, subnet masks, and default gateways to hosts joining a network.",answer:"DHCP",port:"67/68"},{clue:"I resolve domain names like google.com into IP addresses. I am a frequent target for poisoning and tunnelling attacks.",answer:"DNS",port:"53"},{clue:"I provide an encrypted remote command-line session. I replaced the insecure protocol that sent credentials in plaintext.",answer:"SSH",port:"22"},{clue:"I handle the transmission of email between mail servers. Open relays misconfigured with me can be used for spam.",answer:"SMTP",port:"25/587"},{clue:"I enable Windows file and printer sharing. An exploit targeting me was used in the WannaCry ransomware attack.",answer:"SMB",port:"445"},{clue:"I carry encrypted web traffic. My security depends entirely on TLS configuration and certificate validity.",answer:"HTTPS",port:"443"},{clue:"I allow remote desktop access to Windows systems. I am one of the most exploited internet-facing services.",answer:"RDP",port:"3389"},{clue:"I collect device health statistics and configuration from routers and switches. Default community strings make me a risk.",answer:"SNMP",port:"161/162"},{clue:"I synchronise clocks across network devices. Kerberos authentication fails if clocks drift more than 5 minutes.",answer:"NTP",port:"123"}],_=i.memo(function(){const[r,o]=i.useState(0),[s,t]=i.useState(""),[a,n]=i.useState("idle"),[g,P]=i.useState(0),[v,z]=i.useState([]),j=u[r],T=i.useCallback(()=>{const c=s.trim().toUpperCase();c&&(c===j.answer?(n("correct"),v.includes(r)||(P(f=>f+1),z(f=>[...f,r]))):n("wrong"))},[s,j,v,r]),C=i.useCallback(()=>{t(""),n("idle"),o(c=>(c+1)%u.length)},[]),M=i.useCallback(c=>{c.key==="Enter"&&a==="idle"&&T(),c.key==="Enter"&&a!=="idle"&&C()},[a,T,C]);return e.jsxs("div",{className:"pm-wrapper",children:[e.jsxs("div",{className:"pm-header",children:[e.jsx("span",{className:"pm-title",children:"Protocol Identification"}),e.jsxs("span",{className:"pm-score",children:[g," / ",u.length," identified"]})]}),e.jsx("div",{className:"pm-progress",children:u.map((c,f)=>e.jsx("div",{className:`pm-dot${v.includes(f)?" pm-dot--done":f===r?" pm-dot--current":""}`},f))}),e.jsxs("div",{className:"pm-card",children:[e.jsxs("div",{className:"pm-challenge-num",children:["Challenge ",r+1," of ",u.length]}),e.jsxs("div",{className:"pm-clue",children:["“",j.clue,"”"]}),e.jsxs("div",{className:"pm-input-row",children:[e.jsx("input",{className:`pm-input pm-input--${a}`,type:"text",value:s,onChange:c=>{t(c.target.value),a!=="idle"&&n("idle")},onKeyDown:M,placeholder:"Protocol name (e.g. DNS)",disabled:a==="correct","aria-label":"Enter protocol name"}),a==="idle"?e.jsx("button",{className:"pm-btn pm-btn--submit",onClick:T,children:"Check"}):e.jsx("button",{className:"pm-btn pm-btn--next",onClick:C,children:"Next →"})]}),a==="correct"&&e.jsxs("div",{className:"pm-feedback pm-feedback--correct",children:["✓ Correct! ",e.jsx("strong",{children:j.answer})," — Port ",j.port]}),a==="wrong"&&e.jsx("div",{className:"pm-feedback pm-feedback--wrong",children:"✗ Not quite. Try again or click Next to reveal."}),a==="wrong"&&e.jsx("button",{className:"pm-reveal",onClick:()=>n("correct"),children:"Reveal answer"})]}),v.length===u.length&&e.jsxs("div",{className:"pm-complete",children:["🎉 All ",u.length," protocols identified!"]}),e.jsx("style",{children:`
        .pm-wrapper { margin: 0.75rem 0; }
        .pm-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }
        .pm-title {
          font-family: 'Sora', sans-serif;
          font-size: 0.82rem;
          font-weight: 700;
          color: #02a89a;
          text-transform: uppercase;
          letter-spacing: 0.07em;
        }
        .pm-score {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.78rem;
          color: rgba(171,207,201,0.55);
        }
        .pm-progress {
          display: flex;
          gap: 4px;
          margin-bottom: 0.75rem;
          flex-wrap: wrap;
        }
        .pm-dot {
          width: 20px;
          height: 5px;
          border-radius: 3px;
          background: rgba(2,168,154,0.15);
          border: 1px solid rgba(2,168,154,0.2);
          transition: background 0.2s;
        }
        .pm-dot--done {
          background: #2dd68f;
          border-color: #2dd68f;
        }
        .pm-dot--current {
          background: rgba(2,168,154,0.4);
          border-color: #02a89a;
        }
        .pm-card {
          background: rgba(10,15,15,0.6);
          border: 1px solid rgba(2,168,154,0.18);
          border-radius: 8px;
          padding: 1rem 1.1rem;
        }
        .pm-challenge-num {
          font-family: 'Sora', sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          color: rgba(171,207,201,0.4);
          margin-bottom: 0.5rem;
        }
        .pm-clue {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.88rem;
          color: rgba(224,224,224,0.9);
          line-height: 1.65;
          font-style: italic;
          margin-bottom: 0.85rem;
        }
        .pm-input-row {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .pm-input {
          flex: 1;
          min-width: 140px;
          font-family: 'Oxanium', sans-serif;
          font-size: 0.85rem;
          padding: 0.5rem 0.85rem;
          border-radius: 6px;
          border: 1px solid rgba(2,168,154,0.3);
          background: rgba(10,15,15,0.7);
          color: #e0e0e0;
          outline: none;
          transition: border-color 0.18s;
        }
        .pm-input:focus { border-color: #02a89a; }
        .pm-input--correct { border-color: #2dd68f !important; }
        .pm-input--wrong { border-color: #ff5050 !important; }
        .pm-btn {
          font-family: 'Sora', sans-serif;
          font-size: 0.78rem;
          font-weight: 700;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          border: 1px solid;
          cursor: pointer;
          transition: background 0.18s;
          white-space: nowrap;
        }
        .pm-btn--submit {
          background: rgba(2,168,154,0.12);
          border-color: #02a89a;
          color: #02a89a;
        }
        .pm-btn--submit:hover { background: rgba(2,168,154,0.22); }
        .pm-btn--next {
          background: rgba(45,214,143,0.1);
          border-color: #2dd68f;
          color: #2dd68f;
        }
        .pm-btn--next:hover { background: rgba(45,214,143,0.18); }
        .pm-feedback {
          margin-top: 0.65rem;
          padding: 0.45rem 0.75rem;
          border-radius: 5px;
          font-family: 'Oxanium', sans-serif;
          font-size: 0.82rem;
          font-weight: 600;
        }
        .pm-feedback--correct {
          background: rgba(45,214,143,0.1);
          border: 1px solid rgba(45,214,143,0.25);
          color: #2dd68f;
        }
        .pm-feedback--wrong {
          background: rgba(255,80,80,0.08);
          border: 1px solid rgba(255,80,80,0.2);
          color: #ff6b6b;
        }
        .pm-reveal {
          margin-top: 0.4rem;
          font-family: 'Oxanium', sans-serif;
          font-size: 0.75rem;
          color: rgba(171,207,201,0.45);
          background: none;
          border: none;
          cursor: pointer;
          text-decoration: underline;
          padding: 0;
        }
        .pm-reveal:hover { color: rgba(171,207,201,0.75); }
        .pm-complete {
          margin-top: 0.75rem;
          text-align: center;
          font-family: 'Sora', sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
          color: #2dd68f;
          padding: 0.5rem;
          background: rgba(45,214,143,0.07);
          border-radius: 6px;
          border: 1px solid rgba(45,214,143,0.2);
        }
      `})]})}),I=i.memo(function({headers:r,rows:o,title:s}){return e.jsxs("div",{className:"protocol-table-container",children:[s&&e.jsx("h4",{className:"protocol-table-title",children:s}),e.jsx("div",{className:"protocol-table-scroll",children:e.jsxs("table",{className:"protocol-table",children:[e.jsx("thead",{children:e.jsx("tr",{children:r.map((t,a)=>e.jsx("th",{children:t},a))})}),e.jsx("tbody",{children:o.map((t,a)=>e.jsx("tr",{children:t.map((n,g)=>e.jsx("td",{children:n},g))},a))})]})}),e.jsx("style",{children:`
        .protocol-table-container {
          margin: 2rem 0;
        }

        .protocol-table-title {
          font-family: 'Sora', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: #e6e9f0;
          margin: 0 0 1rem 0;
        }

        .protocol-table-scroll {
          overflow-x: auto;
          border-radius: 12px;
          background: rgba(10, 15, 25, 0.5);
          border: 1px solid rgba(45, 214, 143, 0.15);
        }

        .protocol-table {
          width: 100%;
          border-collapse: collapse;
          font-family: 'Oxanium', sans-serif;
        }

        .protocol-table thead {
          background: linear-gradient(135deg, rgba(45, 214, 143, 0.12), rgba(2, 168, 154, 0.12));
        }

        .protocol-table th {
          padding: 1rem 1.25rem;
          text-align: left;
          font-family: 'Sora', sans-serif;
          font-size: 0.9rem;
          font-weight: 700;
          color: #2dd68f;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-bottom: 1px solid rgba(45, 214, 143, 0.2);
        }

        .protocol-table tbody tr {
          transition: all 0.2s ease;
          border-bottom: 1px solid rgba(45, 214, 143, 0.08);
        }

        .protocol-table tbody tr:nth-child(even) {
          background: rgba(255, 255, 255, 0.02);
        }

        .protocol-table tbody tr:hover {
          background: rgba(45, 214, 143, 0.08);
          transform: scale(1.01);
        }

        .protocol-table td {
          padding: 1rem 1.25rem;
          font-size: 0.95rem;
          color: rgba(224, 224, 224, 0.9);
          line-height: 1.5;
        }

        .protocol-table td:first-child {
          color: #2dd68f;
          font-weight: 600;
        }

        .protocol-table code {
          background: rgba(45, 214, 143, 0.15);
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          font-size: 0.9em;
          color: #3de9a0;
        }

        @media (max-width: 768px) {
          .protocol-table th,
          .protocol-table td {
            padding: 0.75rem 1rem;
            font-size: 0.875rem;
          }

          .protocol-table th {
            font-size: 0.8rem;
          }
        }
      `})]})}),h=({children:l})=>e.jsx("div",{style:{fontFamily:"'Oxanium', sans-serif",fontSize:"1.05rem",lineHeight:"1.7",color:"rgba(224, 224, 224, 0.9)",marginBottom:"2rem"},children:l}),y=({questions:l})=>e.jsxs("div",{style:{margin:"2rem 0"},children:[e.jsxs("h4",{style:{fontFamily:"'Sora', sans-serif",fontSize:"1.25rem",fontWeight:700,color:"#2dd68f",margin:"0 0 1.5rem 0",display:"flex",alignItems:"center",gap:"0.75rem"},children:[e.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",children:[e.jsx("circle",{cx:"12",cy:"12",r:"9",stroke:"currentColor",strokeWidth:"2"}),e.jsx("path",{d:"M12 8V12L14.5 14.5",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})]}),"Knowledge Check"]}),e.jsx("div",{style:{display:"grid",gap:"1rem"},children:l.map((r,o)=>e.jsx(E,{question:r.q,options:r.options,correctAnswer:r.answer},o))})]}),S=({to:l,label:r})=>e.jsxs(q,{to:l,style:{display:"inline-flex",alignItems:"center",gap:"0.75rem",padding:"1rem 1.75rem",background:"linear-gradient(135deg, rgba(45, 214, 143, 0.12), rgba(2, 168, 154, 0.12))",border:"1px solid rgba(45, 214, 143, 0.3)",borderRadius:"12px",color:"#2dd68f",fontFamily:"'Sora', sans-serif",fontSize:"0.95rem",fontWeight:600,textDecoration:"none",marginTop:"2rem",transition:"all 0.3s ease"},children:[e.jsx("span",{style:{color:"rgba(171, 207, 201, 0.7)"},children:"Continue to:"}),e.jsx("strong",{children:r}),e.jsx("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",children:e.jsx("path",{d:"M5 12H19M19 12L12 5M19 12L12 19",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})]}),N={wireshark:{to:"/network-security/wireshark",label:"Packet Analysis with Wireshark"},mitm:{to:"/network-security/mitm",label:"Man-in-the-Middle Attacks"},firewall:{to:"/network-security/firewall",label:"Firewall & IDS Evasion"},recon:{to:"/reconnaissance",label:"Reconnaissance & Port Scanning"},osint:{to:"/osint/passive",label:"Passive OSINT & DNS Enumeration"}};function X(){return e.jsxs(m,{number:"01",title:"The OSI Model",subtitle:"The 7-layer framework behind network communication",children:[e.jsx(h,{children:"The OSI model divides network communication into seven layers. Security controls and attacks map to specific layers — knowing which layer you're at tells you which tools and defences apply."}),e.jsx(d,{title:"Interactive OSI Layer Stack",subtitle:"Click any layer to explore its details",children:e.jsx(H,{})}),e.jsx(I,{title:"OSI Layers Reference",headers:["Layer","Name","PDU","Example Protocols","Example Attack"],rows:[["7","Application","Data","HTTP, DNS, SMTP, SSH","SQL Injection, DNS tunnelling"],["6","Presentation","Data","TLS/SSL, JPEG, ASCII","SSL stripping, downgrade attacks"],["5","Session","Data","NetBIOS, RPC, SMB session","Session hijacking"],["4","Transport","Segment / Datagram","TCP, UDP","SYN flood, UDP flood"],["3","Network","Packet","IP, ICMP, OSPF, BGP","IP spoofing, route hijacking"],["2","Data Link","Frame","Ethernet, 802.11, ARP","ARP spoofing, MAC flooding"],["1","Physical","Bit","Ethernet cable, Wi-Fi, DSL","Cable tapping, jamming"]]}),e.jsxs(p,{type:"tip",title:"💡 Memory Aid",children:[e.jsx("strong",{children:'"All People Seem To Need Data Processing"'})," — Application, Presentation, Session, Transport, Network, Data Link, Physical (layers 7 to 1)."]}),e.jsx(y,{questions:[{q:"At which OSI layer does IP addressing and routing between networks occur?",options:["A. Layer 2 (Data Link)","B. Layer 3 (Network)","C. Layer 4 (Transport)","D. Layer 5 (Session)"],answer:"B"},{q:"ARP spoofing attacks target which OSI layer?",options:["A. Layer 1 (Physical)","B. Layer 3 (Network)","C. Layer 2 (Data Link)","D. Layer 7 (Application)"],answer:"C"},{q:"A Web Application Firewall (WAF) operates at which OSI layer?",options:["A. Layer 3","B. Layer 4","C. Layer 5","D. Layer 7"],answer:"D"},{q:"TLS/SSL encryption operates primarily at which OSI layer?",options:["A. Layer 3 (Network)","B. Layer 4 (Transport)","C. Layer 6 (Presentation)","D. Layer 7 (Application)"],answer:"C"},{q:"Switches operate at which OSI layer and use which addressing type?",options:["A. Layer 1, IP addresses","B. Layer 2, MAC addresses","C. Layer 3, IP addresses","D. Layer 4, port numbers"],answer:"B"}]})]})}function Q(){const l=[{label:"IPv4",children:"32-bit dotted decimal (e.g. 192.168.1.25). ~4.3 billion addresses — exhausted, driving IPv6 adoption."},{label:"IPv6",children:"128-bit hexadecimal (e.g. 2001:db8::1). ~340 undecillion addresses. Built-in IPsec support."},{label:"Subnet Mask",children:e.jsxs(e.Fragment,{children:["Defines network vs host portion. Written as prefix length (",e.jsx("code",{children:"/24"}),") or dotted decimal (",e.jsx("code",{children:"255.255.255.0"}),")."]})},{label:"CIDR",children:e.jsxs(e.Fragment,{children:[e.jsx("code",{children:"192.168.1.0/24"})," — first 24 bits are network, last 8 identify the host. Gives 254 usable addresses (.1 to .254)."]})}];return e.jsxs(m,{number:"02",title:"TCP/IP Model & IP Addressing",subtitle:"The practical protocol stack powering the internet",children:[e.jsx(h,{children:"The TCP/IP model condenses the OSI model into four layers. IP addressing and subnetting are foundational skills for network security work — understanding CIDR notation is essential for reading scan results and configuring firewalls."}),e.jsx(d,{title:"OSI vs TCP/IP Layer Mapping",children:e.jsx(U,{})}),e.jsx("h3",{style:{fontFamily:"'Sora', sans-serif",fontSize:"1.35rem",fontWeight:700,color:"#e6e9f0",marginTop:"2.5rem",marginBottom:"1.25rem"},children:"IP Addressing & Subnetting"}),e.jsx(k,{concepts:l}),e.jsxs("div",{style:{background:"rgba(10, 15, 25, 0.6)",border:"1px solid rgba(45, 214, 143, 0.2)",borderRadius:"16px",padding:"2rem",margin:"2rem 0"},children:[e.jsxs("h4",{style:{fontFamily:"'Sora', sans-serif",fontSize:"1.15rem",fontWeight:700,color:"#2dd68f",marginBottom:"1.5rem",textAlign:"center"},children:["CIDR Example: ",e.jsx("code",{style:{color:"#3de9a0"},children:"192.168.1.25/24"})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",gap:"0.5rem",marginBottom:"1rem",flexWrap:"wrap"},children:[e.jsxs("div",{style:{background:"rgba(45, 214, 143, 0.12)",border:"1px solid rgba(45, 214, 143, 0.3)",borderRadius:"8px",padding:"1rem 1.5rem",textAlign:"center"},children:[e.jsx("div",{style:{fontSize:"0.8rem",color:"rgba(171, 207, 201, 0.7)",marginBottom:"0.5rem"},children:"Network"}),e.jsx("code",{style:{fontSize:"1.25rem",color:"#2dd68f",fontWeight:700},children:"192.168.1"}),e.jsx("div",{style:{fontSize:"0.75rem",color:"rgba(171, 207, 201, 0.6)",marginTop:"0.5rem"},children:"24 bits"})]}),e.jsx("div",{style:{fontSize:"2rem",color:"#2dd68f",fontWeight:700},children:"."}),e.jsxs("div",{style:{background:"rgba(2, 168, 154, 0.12)",border:"1px solid rgba(2, 168, 154, 0.3)",borderRadius:"8px",padding:"1rem 1.5rem",textAlign:"center"},children:[e.jsx("div",{style:{fontSize:"0.8rem",color:"rgba(171, 207, 201, 0.7)",marginBottom:"0.5rem"},children:"Host"}),e.jsx("code",{style:{fontSize:"1.25rem",color:"#02a89a",fontWeight:700},children:"25"}),e.jsx("div",{style:{fontSize:"0.75rem",color:"rgba(171, 207, 201, 0.6)",marginTop:"0.5rem"},children:"8 bits (256 addresses)"})]})]}),e.jsx("div",{style:{fontSize:"0.9rem",color:"rgba(171, 207, 201, 0.8)",textAlign:"center"},children:"Network: 192.168.1.0 | Broadcast: 192.168.1.255 | Usable hosts: .1–.254"})]}),e.jsx(I,{title:"Private Address Ranges (RFC 1918)",headers:["Range","CIDR","Addresses","Common Use"],rows:[["10.0.0.0 – 10.255.255.255","10.0.0.0/8","16.7 million","Large enterprise networks"],["172.16.0.0 – 172.31.255.255","172.16.0.0/12","1.04 million","Mid-size networks"],["192.168.0.0 – 192.168.255.255","192.168.0.0/16","65,536","Home / small office"]]}),e.jsx(p,{type:"info",children:"Private addresses are not routable on the public internet. NAT translates them to a public IP for outbound traffic."}),e.jsx(k,{concepts:[{label:"TTL (Time To Live)",children:"Decremented by 1 at each router hop. When it hits 0, the packet is dropped and an ICMP Time Exceeded message returns. Windows default TTL is 128; Linux is 64 — useful for passive OS fingerprinting."},{label:"ICMP",children:e.jsxs(e.Fragment,{children:[e.jsx("code",{children:"ping"})," sends Echo Requests; ",e.jsx("code",{children:"traceroute"})," exploits TTL expiry to map hops. ICMP tunnelling can exfiltrate data through firewalls that allow ping."]})}]}),e.jsx(p,{type:"warn",title:"⚠️ Security Implications",children:"IP headers can be spoofed (source IP is not authenticated). Fragmented packets can bypass stateless firewalls. TCP sequence numbers were historically predictable, enabling session hijacking."}),e.jsx(y,{questions:[{q:"What is the correct sequence of the TCP three-way handshake?",options:["A. SYN, ACK, SYN-ACK","B. SYN, SYN-ACK, ACK","C. ACK, SYN, SYN-ACK","D. SYN-ACK, SYN, ACK"],answer:"B"},{q:'What does IP provide that makes it a "best-effort" protocol?',options:["A. Guaranteed delivery and ordering","B. Logical addressing and routing without guaranteeing delivery, order, or error correction","C. Encryption of all transmitted data","D. Authentication of the sender"],answer:"B"},{q:"Why does IPv6 exist as a successor to IPv4?",options:["A. IPv6 is faster than IPv4","B. IPv4's 32-bit address space (~4.3 billion addresses) is exhausted; IPv6's 128-bit space solves this","C. IPv6 is more secure by default","D. IPv4 does not support wireless networks"],answer:"B"},{q:"A host responds to ping with TTL=64. What OS does this suggest?",options:["A. Windows (default TTL 128)","B. Linux/Unix (default TTL 64)","C. macOS (default TTL 255)","D. Cisco IOS (default TTL 255)"],answer:"B"},{q:"Which CIDR prefix gives 254 usable host addresses?",options:["A. /8","B. /16","C. /24","D. /32"],answer:"C"}]}),e.jsx(S,{...N.osint})]})}function J(){return e.jsxs(m,{number:"03",title:"How TCP Works",subtitle:"Reliable, ordered delivery with sequence tracking",children:[e.jsx(h,{children:"TCP provides reliable, ordered, error-checked delivery. It tracks every byte with sequence numbers and retransmits anything lost. Understanding TCP internals is essential for Wireshark analysis, SYN flood defences, and session security."}),e.jsx(d,{title:"Three-Way Handshake",subtitle:"How TCP establishes a connection",children:e.jsx(Y,{})}),e.jsx(k,{concepts:[{label:"Sequence Numbers",children:"Every byte is numbered. The receiver ACKs the next expected byte — enabling retransmission of anything lost and correct reassembly order."},{label:"Sliding Window",children:"Controls how much unacknowledged data can be in flight. Receiver advertises its window size to prevent buffer overflow. Larger window = higher throughput."},{label:"Congestion Control",children:"TCP backs off when it detects congestion (packet loss). Algorithms: slow start, AIMD, CUBIC. Prevents one connection from overwhelming the network."},{label:"Connection Teardown",children:e.jsx(e.Fragment,{children:"Four-way FIN exchange (FIN → ACK → FIN → ACK) closes gracefully. A RST packet abruptly terminates — used by firewalls and IDS to kill suspicious sessions."})}]}),e.jsx(d,{title:"SYN Flood Attack",subtitle:"DoS attack exploiting TCP's connection state",children:e.jsx(V,{})}),e.jsx(y,{questions:[{q:"A SYN flood exploits which characteristic of TCP?",options:["A. TCP's use of port numbers","B. TCP's connection state — the server allocates resources for each half-open SYN without a completing ACK","C. TCP's sliding window mechanism","D. TCP's use of sequence numbers"],answer:"B"},{q:"What is the purpose of TCP sequence numbers?",options:["A. To identify source and destination ports","B. To track and acknowledge every byte, enabling retransmission and correct ordering","C. To encrypt the TCP payload","D. To determine maximum segment size"],answer:"B"},{q:"How does a TCP RST differ from a FIN packet?",options:["A. RST is encrypted; FIN is not","B. RST abruptly terminates a connection; FIN initiates a graceful four-way close","C. FIN is for attacks; RST for legitimate close","D. They do the same thing"],answer:"B"},{q:"What does the sliding window control?",options:["A. The encryption algorithm","B. How much unacknowledged data can be in flight, preventing buffer overflow and improving throughput","C. The TTL of packets","D. The three-way handshake"],answer:"B"}]}),e.jsx(S,{...N.wireshark})]})}function ee(){return e.jsxs(m,{number:"04",title:"TCP vs UDP",subtitle:"Choosing between reliability and performance",children:[e.jsx(h,{children:"TCP and UDP are the two primary transport protocols. The choice between them is about reliability semantics vs overhead — not simply speed."}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:"1.5rem",margin:"2rem 0"},children:[e.jsxs("div",{style:{background:"rgba(45, 214, 143, 0.08)",border:"1px solid rgba(45, 214, 143, 0.25)",borderRadius:"16px",padding:"2rem"},children:[e.jsx("h4",{style:{fontFamily:"'Sora', sans-serif",fontSize:"1.5rem",fontWeight:700,color:"#2dd68f",marginBottom:"1.5rem"},children:"TCP"}),e.jsxs("ul",{style:{listStyle:"none",padding:0,margin:0,display:"grid",gap:"0.75rem"},children:[e.jsxs("li",{style:{display:"flex",alignItems:"flex-start",gap:"0.5rem",color:"rgba(224, 224, 224, 0.9)"},children:[e.jsx("span",{style:{color:"#2dd68f",fontSize:"1.25rem",lineHeight:1},children:"•"}),"Connection-oriented (three-way handshake)"]}),e.jsxs("li",{style:{display:"flex",alignItems:"flex-start",gap:"0.5rem",color:"rgba(224, 224, 224, 0.9)"},children:[e.jsx("span",{style:{color:"#2dd68f",fontSize:"1.25rem",lineHeight:1},children:"•"}),"Reliable — guarantees delivery via ACKs"]}),e.jsxs("li",{style:{display:"flex",alignItems:"flex-start",gap:"0.5rem",color:"rgba(224, 224, 224, 0.9)"},children:[e.jsx("span",{style:{color:"#2dd68f",fontSize:"1.25rem",lineHeight:1},children:"•"}),"Ordered — segments reassembled in sequence"]}),e.jsxs("li",{style:{display:"flex",alignItems:"flex-start",gap:"0.5rem",color:"rgba(224, 224, 224, 0.9)"},children:[e.jsx("span",{style:{color:"#2dd68f",fontSize:"1.25rem",lineHeight:1},children:"•"}),"Retransmits lost segments automatically"]}),e.jsxs("li",{style:{display:"flex",alignItems:"flex-start",gap:"0.5rem",color:"rgba(224, 224, 224, 0.9)"},children:[e.jsx("span",{style:{color:"#2dd68f",fontSize:"1.25rem",lineHeight:1},children:"•"}),"Flow control via sliding window"]}),e.jsxs("li",{style:{display:"flex",alignItems:"flex-start",gap:"0.5rem",color:"rgba(224, 224, 224, 0.9)"},children:[e.jsx("span",{style:{color:"#2dd68f",fontSize:"1.25rem",lineHeight:1},children:"•"}),"Higher per-packet overhead"]})]}),e.jsxs("div",{style:{marginTop:"1.5rem",padding:"1rem",background:"rgba(45, 214, 143, 0.1)",borderRadius:"8px",fontSize:"0.9rem"},children:[e.jsx("strong",{style:{color:"#2dd68f"},children:"Used by:"})," HTTPS, SSH, SMTP, FTP, SMB, RDP"]})]}),e.jsxs("div",{style:{background:"rgba(2, 168, 154, 0.08)",border:"1px solid rgba(2, 168, 154, 0.25)",borderRadius:"16px",padding:"2rem"},children:[e.jsx("h4",{style:{fontFamily:"'Sora', sans-serif",fontSize:"1.5rem",fontWeight:700,color:"#02a89a",marginBottom:"1.5rem"},children:"UDP"}),e.jsxs("ul",{style:{listStyle:"none",padding:0,margin:0,display:"grid",gap:"0.75rem"},children:[e.jsxs("li",{style:{display:"flex",alignItems:"flex-start",gap:"0.5rem",color:"rgba(224, 224, 224, 0.9)"},children:[e.jsx("span",{style:{color:"#02a89a",fontSize:"1.25rem",lineHeight:1},children:"•"}),"Connectionless — no handshake"]}),e.jsxs("li",{style:{display:"flex",alignItems:"flex-start",gap:"0.5rem",color:"rgba(224, 224, 224, 0.9)"},children:[e.jsx("span",{style:{color:"#02a89a",fontSize:"1.25rem",lineHeight:1},children:"•"}),"No delivery guarantee"]}),e.jsxs("li",{style:{display:"flex",alignItems:"flex-start",gap:"0.5rem",color:"rgba(224, 224, 224, 0.9)"},children:[e.jsx("span",{style:{color:"#02a89a",fontSize:"1.25rem",lineHeight:1},children:"•"}),"No ordering guarantee"]}),e.jsxs("li",{style:{display:"flex",alignItems:"flex-start",gap:"0.5rem",color:"rgba(224, 224, 224, 0.9)"},children:[e.jsx("span",{style:{color:"#02a89a",fontSize:"1.25rem",lineHeight:1},children:"•"}),"No retransmission at transport layer"]}),e.jsxs("li",{style:{display:"flex",alignItems:"flex-start",gap:"0.5rem",color:"rgba(224, 224, 224, 0.9)"},children:[e.jsx("span",{style:{color:"#02a89a",fontSize:"1.25rem",lineHeight:1},children:"•"}),"No flow or congestion control"]}),e.jsxs("li",{style:{display:"flex",alignItems:"flex-start",gap:"0.5rem",color:"rgba(224, 224, 224, 0.9)"},children:[e.jsx("span",{style:{color:"#02a89a",fontSize:"1.25rem",lineHeight:1},children:"•"}),"Lower per-packet overhead"]})]}),e.jsxs("div",{style:{marginTop:"1.5rem",padding:"1rem",background:"rgba(2, 168, 154, 0.1)",borderRadius:"8px",fontSize:"0.9rem"},children:[e.jsx("strong",{style:{color:"#02a89a"},children:"Used by:"})," DNS, DHCP, VoIP, video streaming, gaming, NTP, SNMP"]})]})]}),e.jsx(p,{type:"info",title:"🔄 The Real Trade-off",children:"UDP offloads reliability to the application or accepts packet loss entirely. A video call drops a frame rather than waiting for a retransmit. DNS uses UDP for small queries (single packet round-trip is trivial) but falls back to TCP when responses exceed the traditional 512-byte limit."}),e.jsx(p,{type:"warn",title:"⚠️ UDP Amplification DDoS",children:"An attacker sends a small UDP request to an open service (DNS, NTP, SSDP) with the source IP spoofed to the victim. The service sends a much larger response to the victim. DNS amplification can exceed 50× the request size; NTP monlist can exceed 556×. UDP makes this possible — there is no handshake to verify the source IP."}),e.jsx(y,{questions:[{q:"Which protocol is most appropriate for a real-time video call where some packet loss is acceptable?",options:["A. TCP — it guarantees delivery","B. UDP — lower overhead with no retransmission delays","C. ICMP — designed for real-time traffic","D. SCTP — combines TCP and UDP features"],answer:"B"},{q:"Which port number is assigned to HTTPS?",options:["A. 80","B. 22","C. 443","D. 8080"],answer:"C"},{q:"Why does UDP enable amplification DDoS attacks while TCP does not?",options:["A. UDP packets are larger","B. UDP has no three-way handshake — source IPs cannot be verified so attackers spoof the victim IP","C. UDP is faster so attacks execute sooner","D. TCP is blocked by most firewalls"],answer:"B"},{q:"DNS uses UDP but falls back to TCP under what condition?",options:["A. When the DNS server is overloaded","B. When the response exceeds 512 bytes or the client requests TCP via EDNS","C. When the query contains special characters","D. TCP is never used for DNS"],answer:"B"}]})]})}function re(){return e.jsxs(m,{number:"05",title:"ARP, ICMP & NAT",subtitle:"Essential protocols below TCP/UDP",children:[e.jsx(h,{children:"Three protocols below TCP/UDP that are essential for how networks function — and how attackers abuse them."}),e.jsx("h3",{style:{fontFamily:"'Sora', sans-serif",fontSize:"1.35rem",fontWeight:700,color:"#e6e9f0",marginTop:"2rem",marginBottom:"1rem"},children:"ARP — Address Resolution Protocol"}),e.jsx("p",{style:{fontFamily:"'Oxanium', sans-serif",fontSize:"1rem",lineHeight:1.7,color:"rgba(224, 224, 224, 0.9)",marginBottom:"1.5rem"},children:"IP identifies hosts logically. To deliver a frame on a local network, the sender needs the destination MAC address. ARP resolves IP addresses to MAC addresses on the same segment."}),e.jsx(d,{children:e.jsx(Z,{})}),e.jsx("h3",{style:{fontFamily:"'Sora', sans-serif",fontSize:"1.35rem",fontWeight:700,color:"#e6e9f0",marginTop:"2.5rem",marginBottom:"1rem"},children:"ICMP — Internet Control Message Protocol"}),e.jsx(k,{concepts:[{label:"Echo Request / Reply",children:e.jsxs(e.Fragment,{children:["The basis of ",e.jsx("code",{children:"ping"}),". Sends Echo Request; a live host replies. Measures latency and confirms reachability."]})},{label:"TTL Exceeded",children:e.jsxs(e.Fragment,{children:["When TTL reaches 0, the router discards the packet and sends ICMP Time Exceeded back. ",e.jsx("code",{children:"traceroute"})," exploits this with incrementing TTLs to map each hop."]})},{label:"Destination Unreachable",children:"Sent when a packet cannot be delivered. Type 3 Code 3 (Port Unreachable) is the UDP scanning response for closed ports."},{label:"Security Relevance",children:e.jsxs(e.Fragment,{children:["ICMP flood = DoS. ICMP tunnelling encapsulates data in ping packets to exfiltrate through firewalls. Blocking all ICMP breaks ",e.jsx("code",{children:"ping"})," and ",e.jsx("code",{children:"traceroute"})," diagnostics."]})}]}),e.jsx("h3",{style:{fontFamily:"'Sora', sans-serif",fontSize:"1.35rem",fontWeight:700,color:"#e6e9f0",marginTop:"2.5rem",marginBottom:"1rem"},children:"NAT — Network Address Translation"}),e.jsx(d,{children:e.jsx($,{})}),e.jsx(y,{questions:[{q:"Why is ARP vulnerable to spoofing?",options:["A. ARP is an outdated protocol with known bugs","B. ARP has no authentication — any host can claim any IP-to-MAC mapping","C. ARP replies are weakly encrypted","D. ARP only works on wireless networks"],answer:"B"},{q:"A traceroute uses ICMP Time Exceeded messages. What does this reveal?",options:["A. Open ports on the destination","B. Each router hop along the path, showing topology and latency per hop","C. MAC address of each router","D. Whether TLS is enabled on the destination"],answer:"B"},{q:"Why is NAT not a replacement for a firewall?",options:["A. NAT cannot handle IPv6","B. NAT provides no access control, authentication, or inspection — it only translates addresses","C. NAT is too slow for real-time applications","D. NAT requires a separate licence"],answer:"B"},{q:"Which command detects active ARP poisoning on a local machine?",options:["A. netstat -an","B. arp -a (look for two IPs sharing the same MAC address)","C. ipconfig /all","D. ping -t <gateway>"],answer:"B"}]}),e.jsx(S,{...N.mitm})]})}function se(){return e.jsxs(m,{number:"06",title:"Common Network Services",subtitle:"Protocols, ports, and security risks",children:[e.jsx(h,{children:"Knowing which protocol uses which port, transport, and what its security risks are is fundamental to pen testing, threat modelling, and firewall rule design. Test yourself with the identification exercise first."}),e.jsx(d,{title:"Protocol Matching Exercise",subtitle:"Drag protocols to their correct ports",children:e.jsx(_,{})}),e.jsx(I,{title:"Protocol Reference Table",headers:["Protocol","Port(s)","Transport","Purpose","Security Relevance"],rows:[["DNS","53","UDP / TCP","Name resolution","Poisoning, tunnelling, exfiltration"],["DHCP","67 / 68","UDP","Auto IP assignment","Rogue DHCP, starvation attacks"],["HTTP","80","TCP","Web — unencrypted","Eavesdropping, MITM, injection"],["HTTPS","443","TCP","Web — TLS encrypted","TLS configuration, certificate trust"],["FTP","21 / 20","TCP","File transfer — cleartext","Credential sniffing; use SFTP instead"],["SFTP / SCP","22","TCP","Encrypted file transfer over SSH","Same surface as SSH"],["SSH","22","TCP","Encrypted remote shell","Brute force, key theft"],["Telnet","23","TCP","Remote shell — cleartext","All data incl. passwords in plaintext"],["SMTP","25 / 587","TCP","Email transmission (MTA to MTA)","Open relays, spoofing, phishing"],["POP3","110 / 995","TCP","Email retrieval (client)","Cleartext on 110; use 995 (TLS)"],["IMAP","143 / 993","TCP","Email retrieval with sync","Cleartext on 143; use 993 (TLS)"],["SMB","445","TCP","Windows file / printer sharing","EternalBlue, WannaCry, pass-the-hash"],["RDP","3389","TCP","Remote Desktop (Windows)","Brute force, BlueKeep, ransomware pivot"],["SNMP","161 / 162","UDP","Device management & monitoring","Default community strings expose config"],["NTP","123","UDP","Time synchronisation","Amplification DDoS; Kerberos needs sync"],["LDAP","389 / 636","TCP","Directory queries (Active Directory)","Cleartext on 389; enumeration attacks"],["Kerberos","88","TCP / UDP","AD authentication tickets","Kerberoasting, AS-REP roasting, Golden Ticket"]]}),e.jsx(y,{questions:[{q:"Why is Telnet insecure compared to SSH?",options:["A. Telnet uses a different port","B. Telnet transmits all data including credentials in plaintext, making it trivially interceptable","C. Telnet does not support remote access","D. Telnet requires more bandwidth"],answer:"B"},{q:"The EternalBlue exploit and WannaCry ransomware targeted which service?",options:["A. HTTP on 80","B. SSH on 22","C. SMB on 445","D. DNS on 53"],answer:"C"},{q:"Which protocol automatically assigns IP addresses to hosts?",options:["A. DNS on 53","B. DHCP on 67/68","C. ARP","D. ICMP"],answer:"B"},{q:"Why is NTP important for Active Directory security?",options:["A. NTP encrypts Kerberos tickets","B. Kerberos fails if clocks drift more than 5 minutes between client and server","C. AD uses NTP to assign IP addresses","D. NTP provides the DC with DNS records"],answer:"B"},{q:'An SNMP device responds to the community string "public". What is the risk?',options:["A. The device is correctly secured",'B. "public" is the default — it exposes full device configuration to unauthenticated queries',"C. SNMP is encrypted so community strings are safe","D. Read-only community strings pose no risk"],answer:"B"}]})]})}function ae(){return e.jsxs(m,{number:"07",title:"Network Security Fundamentals",subtitle:"Defence in depth and Zero Trust architecture",children:[e.jsx(h,{children:"Protecting a network requires layered controls. Click each component in the topology diagram to understand its role, then read the core principles below."}),e.jsx(d,{title:"Network Security Topology",subtitle:"Click components to learn their security role",fullWidth:!0,children:e.jsx(G,{})}),e.jsx("h3",{style:{fontFamily:"'Sora', sans-serif",fontSize:"1.35rem",fontWeight:700,color:"#e6e9f0",marginTop:"2.5rem",marginBottom:"1rem"},children:"Core Principles"}),e.jsx(k,{concepts:[{label:"Defence in Depth",children:"Multiple independent security controls at different layers. Firewall + IDS + endpoint protection + SIEM together are far more resilient than any single tool."},{label:"Network Segmentation",children:"VLANs and DMZs divide the network into isolated zones. A compromised host in the user VLAN cannot directly reach database servers in a separate segment — limits lateral movement."},{label:"Least Privilege",children:"Hosts communicate only with what they strictly need. All other traffic denied by default. Dramatically reduces blast radius of a compromise."},{label:"Zero Trust",children:"No implicit trust based on network location. Every connection must be authenticated and authorised regardless of source. Implemented via MFA, device trust, micro-segmentation, SASE/ZTNA."},{label:"Encryption in Transit",children:"TLS (HTTPS), SSH (remote access), IPSec (VPN tunnels). Data crossing any untrusted segment must be encrypted."},{label:"Network Monitoring",children:"IDS/IPS detect and block attack patterns. NetFlow records who talked to whom. SIEM correlates all logs. Visibility is the prerequisite for detection."}]}),e.jsx(p,{type:"info",title:"🔒 Micro-segmentation",children:"Micro-segmentation isolates individual workloads from each other even within the same VLAN — important in cloud and containerised environments."}),e.jsx(p,{type:"info",title:"🔐 NAC with 802.1X",children:"NAC requires devices to authenticate before receiving an IP address. Rogue devices plugged into a switch port are blocked before they can communicate."}),e.jsx(y,{questions:[{q:"What is the primary benefit of network segmentation?",options:["A. It speeds up network traffic","B. It limits lateral movement after a compromise — an attacker cannot reach other zones","C. It eliminates the need for a firewall","D. It reduces infrastructure costs"],answer:"B"},{q:"What does Zero Trust assume about internal network connections?",options:["A. Always trusted because internal","B. No authentication needed on VPN","C. Must still be authenticated and authorised — no implicit trust based on location","D. Encrypted by default"],answer:"C"},{q:"Which principle states hosts should communicate only with what they strictly need?",options:["A. Defence in depth","B. Zero Trust","C. Principle of least privilege applied to network access","D. Network segmentation"],answer:"C"},{q:"A DMZ hosts a public web server. What is its primary security purpose?",options:["A. To make the server faster","B. If the server is compromised, the attacker cannot directly reach the internal network","C. To eliminate the need for TLS","D. To allow direct inbound connections to internal servers"],answer:"B"}]}),e.jsx(S,{...N.firewall})]})}function te(){return e.jsxs(m,{number:"08",title:"Practical Network Exercises",subtitle:"Hands-on command-line exploration",children:[e.jsx(h,{children:"Run these exercises on your own machine or an authorised lab. None require scanning external systems without permission."}),e.jsxs(p,{type:"warn",title:"⚠️ Safety Warning",children:["Only run these on systems you own or have explicit written authorisation to test. Commands below target ",e.jsx("code",{children:"localhost"}),", ",e.jsx("code",{children:"example.com"})," (a designated test domain), or your own local network."]}),e.jsx(x,{title:"01. DNS Resolution",description:"Query the A record and MX records for example.com.",command:`dig example.com A
dig example.com MX`}),e.jsxs("p",{style:{fontFamily:"'Oxanium', sans-serif",fontSize:"0.95rem",color:"rgba(171, 207, 201, 0.8)",marginTop:"0.5rem"},children:[e.jsx("strong",{children:"Observe:"})," The IP in the ANSWER section, the TTL (cache duration), and the authoritative name servers in AUTHORITY."]}),e.jsx(x,{title:"02. Connectivity & TTL",description:"Ping example.com and observe the TTL in replies.",command:`# Linux / macOS
ping -c 4 example.com

# Windows
ping example.com`}),e.jsxs("p",{style:{fontFamily:"'Oxanium', sans-serif",fontSize:"0.95rem",color:"rgba(171, 207, 201, 0.8)",marginTop:"0.5rem"},children:[e.jsx("strong",{children:"Observe:"})," TTL ~56 suggests Linux destination (started at 64). TTL ~118 suggests Windows (started at 128). Each hop decrements by 1."]}),e.jsx(x,{title:"03. Route Tracing",description:"Trace the network path to example.com.",command:`# Linux / macOS
traceroute example.com

# Windows
tracert example.com`}),e.jsxs("p",{style:{fontFamily:"'Oxanium', sans-serif",fontSize:"0.95rem",color:"rgba(171, 207, 201, 0.8)",marginTop:"0.5rem"},children:[e.jsx("strong",{children:"Observe:"})," Each line is one router hop. Asterisks (*) mean the router dropped the ICMP probe. IP addresses reveal your ISP, peering points, and CDN ingress nodes."]}),e.jsx(x,{title:"04. Listening Services",description:"List all ports currently listening on your local machine.",command:`# Linux / macOS
ss -tuln

# Windows
netstat -ano`}),e.jsxs("p",{style:{fontFamily:"'Oxanium', sans-serif",fontSize:"0.95rem",color:"rgba(171, 207, 201, 0.8)",marginTop:"0.5rem"},children:[e.jsx("strong",{children:"Observe:"})," LISTEN entries show what is exposed. Port 22 = SSH, 80 = HTTP, 443 = HTTPS, 3389 = RDP. Any unexpected listening port is worth investigating."]}),e.jsx(x,{title:"05. Local Service Enumeration",description:"Scan your own machine for open ports and service versions. Localhost only.",command:"nmap -sV localhost"}),e.jsxs("p",{style:{fontFamily:"'Oxanium', sans-serif",fontSize:"0.95rem",color:"rgba(171, 207, 201, 0.8)",marginTop:"0.5rem"},children:[e.jsx("strong",{children:"Observe:"})," Service names and versions on open ports. This is the same process used in pen test engagements — understanding your own exposure is the first step in hardening."]}),e.jsx(x,{title:"06. ARP Cache Inspection",description:"Inspect your local ARP cache for IP-to-MAC mappings.",command:"arp -a"}),e.jsxs("p",{style:{fontFamily:"'Oxanium', sans-serif",fontSize:"0.95rem",color:"rgba(171, 207, 201, 0.8)",marginTop:"0.5rem"},children:[e.jsx("strong",{children:"Observe:"})," Your gateway entry. If two different IPs share the same MAC address, ARP spoofing may be active."]}),e.jsx(x,{title:"07. TCP Handshake in Wireshark",description:"Capture local traffic and identify the TCP three-way handshake.",command:`# In Wireshark:
# 1. Start capture on active interface
# 2. Visit http://example.com in browser
# 3. Stop capture
# 4. Apply display filter:
tcp.flags.syn == 1`}),e.jsxs("p",{style:{fontFamily:"'Oxanium', sans-serif",fontSize:"0.95rem",color:"rgba(171, 207, 201, 0.8)",marginTop:"0.5rem"},children:[e.jsx("strong",{children:"Observe:"})," SYN (no ACK) = client initiating. SYN+ACK = server responding. ACK = handshake complete. Right-click any packet and choose Follow → TCP Stream."]}),e.jsx(S,{...N.recon})]})}function be(){return e.jsxs("div",{style:{minHeight:"100vh",background:"#0a0e27",position:"relative"},children:[e.jsx(R,{}),e.jsx(i.Suspense,{fallback:e.jsx("div",{style:{position:"fixed",top:"50%",left:"50%",transform:"translate(-50%, -50%)",color:"#2dd68f",fontFamily:"'Sora', sans-serif"},children:"Loading..."}),children:e.jsx("div",{style:{position:"fixed",top:0,left:0,width:"100%",height:"100%",zIndex:0},children:e.jsx(B,{style:{width:"100%",height:"100%"},children:e.jsx(F,{control:"query",urlString:"https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=0.8&cAzimuthAngle=180&cDistance=3.6&cPolarAngle=90&cameraZoom=1&color1=%2302a89a&color2=%23324a5e&color3=%23000000&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=45&frameRate=10&gizmoHelper=hide&grain=on&lightType=3d&pixelDensity=2&positionX=-1.4&positionY=0&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=0&rotationY=10&rotationZ=50&shader=defaults&type=plane&uAmplitude=0&uDensity=1.3&uFrequency=5.5&uSpeed=0.1&uStrength=2.4&uTime=0&wireframe=false"})})})}),e.jsxs("div",{style:{position:"relative",zIndex:1,maxWidth:"1400px",margin:"0 auto",padding:"6rem 2rem 4rem"},children:[e.jsxs("div",{style:{marginBottom:"4rem"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"flex-start",gap:"2rem",marginBottom:"3rem",flexWrap:"wrap"},children:[e.jsxs("div",{style:{flex:"1 1 600px"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"1.5rem",marginBottom:"1.5rem"},children:[e.jsx("div",{style:{width:"80px",height:"80px",display:"flex",alignItems:"center",justifyContent:"center",background:"linear-gradient(135deg, rgba(45, 214, 143, 0.15), rgba(2, 168, 154, 0.15))",border:"2px solid rgba(45, 214, 143, 0.3)",borderRadius:"20px"},children:e.jsx(O,{})}),e.jsx("div",{children:e.jsxs("h1",{style:{fontFamily:"'Sora', sans-serif",fontSize:"3rem",fontWeight:800,color:"#e6e9f0",margin:0,lineHeight:1.1},children:["Network Protocols",e.jsx("br",{}),"Fundamentals"]})})]}),e.jsx("p",{style:{fontFamily:"'Oxanium', sans-serif",fontSize:"1.15rem",lineHeight:1.7,color:"rgba(171, 207, 201, 0.9)",margin:"0 0 2rem 0",maxWidth:"700px"},children:"Understand how data moves across networks, how protocols communicate, and where security weaknesses appear. Master the foundation for reconnaissance, traffic analysis, and network defence."}),e.jsxs("div",{style:{display:"flex",gap:"1rem",flexWrap:"wrap"},children:[e.jsxs("div",{style:{background:"rgba(45, 214, 143, 0.08)",backdropFilter:"blur(8px)",border:"1px solid rgba(45, 214, 143, 0.25)",borderRadius:"12px",padding:"1rem 1.5rem",display:"flex",alignItems:"center",gap:"0.75rem"},children:[e.jsxs("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",children:[e.jsx("path",{d:"M12 2L2 7L12 12L22 7L12 2Z",stroke:"#2dd68f",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"}),e.jsx("path",{d:"M2 17L12 22L22 17",stroke:"#2dd68f",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"}),e.jsx("path",{d:"M2 12L12 17L22 12",stroke:"#2dd68f",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})]}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:"0.75rem",color:"rgba(171, 207, 201, 0.6)",textTransform:"uppercase",letterSpacing:"0.5px"},children:"Level"}),e.jsx("div",{style:{fontSize:"1rem",color:"#2dd68f",fontFamily:"'Sora', sans-serif",fontWeight:700},children:"Intermediate"})]})]}),e.jsxs("div",{style:{background:"rgba(2, 168, 154, 0.08)",backdropFilter:"blur(8px)",border:"1px solid rgba(2, 168, 154, 0.25)",borderRadius:"12px",padding:"1rem 1.5rem",display:"flex",alignItems:"center",gap:"0.75rem"},children:[e.jsxs("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",children:[e.jsx("path",{d:"M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999",stroke:"#02a89a",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"}),e.jsx("path",{d:"M22 4L12 14.01L9 11.01",stroke:"#02a89a",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})]}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:"0.75rem",color:"rgba(171, 207, 201, 0.6)",textTransform:"uppercase",letterSpacing:"0.5px"},children:"Lessons"}),e.jsx("div",{style:{fontSize:"1rem",color:"#02a89a",fontFamily:"'Sora', sans-serif",fontWeight:700},children:"8 Topics"})]})]}),e.jsxs("div",{style:{background:"rgba(45, 214, 143, 0.08)",backdropFilter:"blur(8px)",border:"1px solid rgba(45, 214, 143, 0.25)",borderRadius:"12px",padding:"1rem 1.5rem",display:"flex",alignItems:"center",gap:"0.75rem"},children:[e.jsxs("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",children:[e.jsx("circle",{cx:"12",cy:"12",r:"10",stroke:"#2dd68f",strokeWidth:"2"}),e.jsx("path",{d:"M12 6V12L16 14",stroke:"#2dd68f",strokeWidth:"2",strokeLinecap:"round"})]}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:"0.75rem",color:"rgba(171, 207, 201, 0.6)",textTransform:"uppercase",letterSpacing:"0.5px"},children:"Duration"}),e.jsx("div",{style:{fontSize:"1rem",color:"#2dd68f",fontFamily:"'Sora', sans-serif",fontWeight:700},children:"60 min"})]})]})]})]}),e.jsx("div",{style:{flex:"0 1 400px",minWidth:"300px"},children:e.jsxs("div",{style:{background:"rgba(10, 15, 25, 0.6)",backdropFilter:"blur(12px)",border:"1px solid rgba(45, 214, 143, 0.2)",borderRadius:"20px",padding:"2rem",display:"flex",flexDirection:"column",alignItems:"center",gap:"1rem"},children:[e.jsx("div",{style:{width:"80px",height:"80px",background:"linear-gradient(135deg, rgba(45, 214, 143, 0.15), rgba(2, 168, 154, 0.15))",border:"2px solid rgba(45, 214, 143, 0.3)",borderRadius:"16px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"2rem"},children:"🌐"}),e.jsx("div",{style:{width:"2px",height:"30px",background:"linear-gradient(180deg, rgba(45, 214, 143, 0.5), rgba(45, 214, 143, 0.2))"}}),e.jsx("div",{style:{width:"80px",height:"80px",background:"linear-gradient(135deg, rgba(2, 168, 154, 0.15), rgba(45, 214, 143, 0.15))",border:"2px solid rgba(2, 168, 154, 0.3)",borderRadius:"16px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"2rem"},children:"🛡️"}),e.jsx("div",{style:{width:"2px",height:"30px",background:"linear-gradient(180deg, rgba(2, 168, 154, 0.5), rgba(2, 168, 154, 0.2))"}}),e.jsxs("div",{style:{display:"flex",gap:"1.5rem"},children:[e.jsx("div",{style:{width:"70px",height:"70px",background:"rgba(45, 214, 143, 0.1)",border:"2px solid rgba(45, 214, 143, 0.25)",borderRadius:"12px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.75rem"},children:"💻"}),e.jsx("div",{style:{width:"70px",height:"70px",background:"rgba(2, 168, 154, 0.1)",border:"2px solid rgba(2, 168, 154, 0.25)",borderRadius:"12px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.75rem"},children:"🖥️"})]}),e.jsx("p",{style:{fontFamily:"'Oxanium', sans-serif",fontSize:"0.9rem",color:"rgba(171, 207, 201, 0.7)",textAlign:"center",margin:"1rem 0 0 0"},children:"Internet → Firewall → Client & Server"})]})})]}),e.jsx(W,{objectives:["Explain the OSI model layers and map attacks to specific layers","Understand TCP/IP addressing, subnetting, and CIDR notation","Describe how TCP provides reliability via handshakes and sequence numbers","Identify when UDP is preferred over TCP and explain UDP amplification attacks","Explain ARP, ICMP, and NAT functionality and how they are exploited","Recognise common network services, ports, and their security implications","Apply defence in depth and Zero Trust principles to network architecture","Use command-line tools to inspect local network state and traffic"]})]}),e.jsxs("div",{style:{display:"grid",gap:"0rem"},children:[e.jsx(X,{}),e.jsx(Q,{}),e.jsx(J,{}),e.jsx(ee,{}),e.jsx(re,{}),e.jsx(se,{}),e.jsx(ae,{}),e.jsx(te,{})]})]})]})}export{be as default};
