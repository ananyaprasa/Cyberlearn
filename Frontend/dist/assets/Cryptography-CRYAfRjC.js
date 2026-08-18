import{j as e,r as i}from"./react-core-cLmpMfOL.js";import{N as a}from"./Navbar-fCh8wuHA.js";import{V as o,S as s}from"./shader-vendor-CagQ2hKc.js";import{C as n}from"./CryptographyIcon-rorkiCZx.js";import{L as r}from"./react-router-CMM5GaaQ.js";import"./index-Ce_JdysL.js";import"./animation-vendor-DPzBf3Tj.js";import"./auth-vendor-BfTDptbL.js";import"./http-vendor-42ANG6Sg.js";const c=[{id:"6999e774551877fbe2fed8fb",title:"Symmetric Encryption",description:"Master AES, DES, and stream ciphers. Learn how shared keys encrypt and decrypt data, and discover common attack vectors.",difficulty:"easy",route:"/cryptography/6999e774551877fbe2fed8fb"},{id:"6999e758551877fbe2fed8f9",title:"Asymmetric Encryption",description:"Explore RSA, ECC, and public-key cryptography. Understand key exchange, digital certificates, and PKI infrastructure.",difficulty:"medium",route:"/cryptography/6999e758551877fbe2fed8f9"},{id:"6999e747551877fbe2fed8f7",title:"Hash Functions & Integrity",description:"Deep dive into SHA, MD5, and cryptographic hashing. Learn about collision attacks, rainbow tables, and password security.",difficulty:"medium",route:"/cryptography/6999e747551877fbe2fed8f7"},{id:"6999e787551877fbe2fed8fd",title:"Digital Signatures & PKI",description:"Understand digital signatures, certificate authorities, and trust chains. Explore signature verification and non-repudiation.",difficulty:"hard",route:"/cryptography/6999e787551877fbe2fed8fd"}];function b(){return e.jsxs("div",{style:{position:"relative",minHeight:"100vh",fontFamily:"Oxanium, sans-serif"},children:[e.jsx(i.Suspense,{fallback:e.jsx("div",{}),children:e.jsx(o,{style:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",zIndex:-1,opacity:.8},children:e.jsx(s,{animate:"off",axesHelper:"on",brightness:1.4,cAzimuthAngle:0,cDistance:7.1,cPolarAngle:140,cameraZoom:17.29,color1:"#aeacb7",color2:"#152921",color3:"#002f00",destination:"onCanvas",embedMode:"off",envPreset:"city",format:"gif",fov:45,frameRate:10,gizmoHelper:"hide",grain:"off",lightType:"3d",pixelDensity:1,positionX:0,positionY:0,positionZ:0,range:"disabled",rangeEnd:40,rangeStart:0,reflection:.1,rotationX:0,rotationY:0,rotationZ:0,shader:"defaults",type:"sphere",uAmplitude:1.6,uDensity:1.1,uFrequency:5.5,uSpeed:.1,uStrength:1,uTime:0,wireframe:!1})})}),e.jsx("style",{children:`
          .back-btn {
            transition: transform 0.2s ease;
          }
          .back-btn:hover {
            transform: scale(1.05) translateY(-2px);
          }
          .cryptography-back-btn:hover {
            background: rgba(92, 242, 255, 0.25) !important;
            border-color: #5CF2FF !important;
            color: #FFFFFF !important;
          }
          .cryptography-header-title {
            color: #abcfc9 !important;
            -webkit-text-fill-color: #abcfc9 !important;
            background: none !important;
            font-family: 'Sora', sans-serif !important;
          }
          .cryptography-header-subtitle {
            font-family: 'Sora', sans-serif !important;
          }
        `}),e.jsx(a,{}),e.jsxs("div",{className:"container",style:{position:"relative",zIndex:1},children:[e.jsxs("div",{className:"page-header elegant-header",children:[e.jsx("div",{className:"header-icon",children:e.jsx(n,{size:80})}),e.jsx("h1",{className:"elegant-title cryptography-header-title",children:"Cryptography"}),e.jsx("p",{className:"elegant-subtitle cryptography-header-subtitle",children:"Encryption and Decryption Techniques"}),e.jsx("div",{className:"header-divider"})]}),e.jsx(r,{to:"/",className:"back-btn cryptography-back-btn",style:{background:"rgba(0,0,0,0.35)",border:"1px solid #00FFC8",color:"#FFFFFF"},children:"← Back to Home"}),e.jsx("div",{className:"lessons-grid",children:c.map(t=>e.jsxs(r,{to:t.route,className:"lesson-card",style:{textDecoration:"none",color:"inherit"},children:[e.jsxs("div",{className:"lesson-header",children:[e.jsx("h3",{children:t.title}),e.jsx("span",{className:`difficulty ${t.difficulty}`,children:t.difficulty})]}),e.jsx("p",{children:t.description})]},t.id))})]})]})}export{b as default};
