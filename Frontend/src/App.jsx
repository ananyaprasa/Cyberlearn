import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import Lenis from 'lenis';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ChallengeProvider } from './contexts/ChallengeContext';
import { AuthProvider } from './contexts/AuthContext';
import { AssignmentProvider } from './contexts/AssignmentContext';
import { ClassroomProvider } from './contexts/ClassroomContext';
import ProtectedRoute from './components/ProtectedRoute';
import ShaderPreloader from './components/ShaderPreloader';
import ErrorBoundary from './components/ErrorBoundary';
import Chatbot from './components/Chatbot';
import './App.css';

// ── Lazy page imports ──────────────────────────────────────────
const Home                 = lazy(() => import('./pages/Home'));
const About                = lazy(() => import('./pages/About'));
const Auth                 = lazy(() => import('./pages/Auth'));
const Dashboard            = lazy(() => import('./pages/Dashboard'));
const Profile              = lazy(() => import('./pages/Profile'));
const CTF                  = lazy(() => import('./pages/CTF'));

const OSINT                = lazy(() => import('./pages/OSINT'));
const OSINTDetail          = lazy(() => import('./pages/OSINTDetail'));
const OSINTPassive         = lazy(() => import('./pages/OSINTPassive'));
const OSINTActive          = lazy(() => import('./pages/OSINTActive'));
const OSINTAnalysis        = lazy(() => import('./pages/OSINTAnalysis'));

const Reconnaissance       = lazy(() => import('./pages/Reconnaissance'));
const ReconnaissanceDetail = lazy(() => import('./pages/ReconnaissanceDetail'));
const ReconNetworkScanning = lazy(() => import('./pages/ReconNetworkScanning'));
const ReconPassive         = lazy(() => import('./pages/ReconPassive'));
const ReconNmap            = lazy(() => import('./pages/ReconNmap'));
const ReconActive          = lazy(() => import('./pages/ReconActive'));
const ReconServiceDetection= lazy(() => import('./pages/ReconServiceDetection'));

const Cryptography         = lazy(() => import('./pages/Cryptography'));
const CryptographyDetail   = lazy(() => import('./pages/CryptographyDetail'));
const CryptoSymmetric      = lazy(() => import('./pages/CryptoSymmetric'));
const CryptoAsymmetric     = lazy(() => import('./pages/CryptoAsymmetric'));
const CryptoHashing        = lazy(() => import('./pages/CryptoHashing'));
const CryptoSignatures     = lazy(() => import('./pages/CryptoSignatures'));

const NetworkSecurity      = lazy(() => import('./pages/NetworkSecurity'));
const NetworkSecurityDetail= lazy(() => import('./pages/NetworkSecurityDetail'));
const NetSecProtocols      = lazy(() => import('./pages/NetSecProtocols'));
const NetSecWireshark      = lazy(() => import('./pages/NetSecWireshark'));
const NetSecMITM           = lazy(() => import('./pages/NetSecMITM'));
const NetSecFirewall       = lazy(() => import('./pages/NetSecFirewall'));

const Assignments          = lazy(() => import('./pages/Assignments'));
const AssignmentDetail     = lazy(() => import('./pages/AssignmentDetail'));
const CreateAssignment     = lazy(() => import('./pages/CreateAssignment'));
const AssignmentDebug      = lazy(() => import('./pages/AssignmentDebug'));
const GradeSubmission      = lazy(() => import('./pages/GradeSubmission'));

const Classrooms           = lazy(() => import('./pages/Classrooms'));
const ClassroomDetail      = lazy(() => import('./pages/ClassroomDetail'));

const LessonDetailNew      = lazy(() => import('./pages/LessonDetailNew'));
const DebugCache           = lazy(() => import('./pages/DebugCache'));

// ── Minimal page loader — no layout shift ─────────────────────
function PageLoader() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '3px',
      zIndex: 9999,
      background: 'linear-gradient(90deg, #2dd68f, #02a89a)',
      animation: 'page-load-bar 0.8s ease-in-out infinite alternate',
    }} />
  );
}

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Exclude chatbot scroll container from Lenis so it scrolls independently
    const excludeChatbot = () => {
      const chatMessages = document.querySelector('.chat-messages');
      if (chatMessages) chatMessages.setAttribute('data-lenis-prevent', '');
    };
    // Run once and re-check when chatbot opens (it mounts/unmounts)
    excludeChatbot();
    const observer = new MutationObserver(excludeChatbot);
    observer.observe(document.body, { childList: true, subtree: true });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      observer.disconnect();
    };
  }, []);

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || "demo-client-id"}>
      <AuthProvider>
        <ChallengeProvider>
          <AssignmentProvider>
            <ClassroomProvider>
              <ShaderPreloader />
              <Chatbot />
              <Router>
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path="/"          element={<Home />} />
                    <Route path="/about"     element={<About />} />
                    <Route path="/auth"      element={<Auth />} />
                    <Route path="/ctf"       element={<CTF />} />

                    <Route path="/dashboard" element={
                      <ErrorBoundary><Dashboard /></ErrorBoundary>
                    } />
                    <Route path="/profile"   element={
                      <ProtectedRoute><Profile /></ProtectedRoute>
                    } />

                    {/* OSINT */}
                    <Route path="/osint"              element={<OSINT />} />
                    <Route path="/osint/passive"      element={<OSINTPassive />} />
                    <Route path="/osint/active"       element={<OSINTActive />} />
                    <Route path="/osint/analysis"     element={<OSINTAnalysis />} />
                    <Route path="/osint/:id"          element={<OSINTDetail />} />

                    {/* Reconnaissance */}
                    <Route path="/reconnaissance"                      element={<Reconnaissance />} />
                    <Route path="/reconnaissance/network-scanning"     element={<ReconNetworkScanning />} />
                    <Route path="/reconnaissance/passive"              element={<ReconPassive />} />
                    <Route path="/reconnaissance/nmap"                 element={<ReconNmap />} />
                    <Route path="/reconnaissance/active"               element={<ReconActive />} />
                    <Route path="/reconnaissance/service-detection"    element={<ReconServiceDetection />} />
                    <Route path="/reconnaissance/:id"                  element={<ReconnaissanceDetail />} />

                    {/* Cryptography */}
                    <Route path="/cryptography"            element={<Cryptography />} />
                    <Route path="/cryptography/symmetric"  element={<CryptoSymmetric />} />
                    <Route path="/cryptography/asymmetric" element={<CryptoAsymmetric />} />
                    <Route path="/cryptography/hashing"    element={<CryptoHashing />} />
                    <Route path="/cryptography/signatures" element={<CryptoSignatures />} />
                    <Route path="/cryptography/:lessonId"  element={<CryptographyDetail />} />

                    {/* Network Security */}
                    <Route path="/network-security"             element={<NetworkSecurity />} />
                    <Route path="/network-security/protocols"   element={<NetSecProtocols />} />
                    <Route path="/network-security/wireshark"   element={<NetSecWireshark />} />
                    <Route path="/network-security/mitm"        element={<NetSecMITM />} />
                    <Route path="/network-security/firewall"    element={<NetSecFirewall />} />
                    <Route path="/network-security/:id"         element={<NetworkSecurityDetail />} />

                    {/* Assignments */}
                    <Route path="/assignments"        element={<Assignments />} />
                    <Route path="/assignments/debug"  element={<AssignmentDebug />} />
                    <Route path="/assignments/create" element={<CreateAssignment />} />
                    <Route path="/assignments/:id"    element={<AssignmentDetail />} />
                    <Route path="/assignments/:assignmentId/grade/:submissionId" element={
                      <ProtectedRoute><GradeSubmission /></ProtectedRoute>
                    } />

                    {/* Classrooms */}
                    <Route path="/classrooms"     element={<Classrooms />} />
                    <Route path="/classrooms/:id" element={<ClassroomDetail />} />

                    {/* Misc */}
                    <Route path="/lessons/:id"   element={<LessonDetailNew />} />
                    <Route path="/debug-cache"   element={<DebugCache />} />
                  </Routes>
                </Suspense>
              </Router>
            </ClassroomProvider>
          </AssignmentProvider>
        </ChallengeProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
