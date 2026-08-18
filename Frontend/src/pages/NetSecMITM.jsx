import { Suspense } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { NetworkSecurityIcon } from '../components/NetworkSecurityIcon';
import QuestionCard from '../components/QuestionCard';
import LessonCard from '../components/learning/ui/LessonCard';
import InfoCard from '../components/learning/ui/InfoCard';
import DiagramContainer from '../components/learning/ui/DiagramContainer';
import TerminalBlock from '../components/learning/ui/TerminalBlock';
import LearningObjective from '../components/learning/ui/LearningObjective';
import ConceptGrid from '../components/learning/ui/ConceptGrid';
import CommunicationTrustModel from '../components/learning/network/CommunicationTrustModel';
import ARPTrustDiagram from '../components/learning/network/ARPTrustDiagram';
import MITMDetectionFlow from '../components/learning/network/MITMDetectionFlow';
import DefenseLayersDiagram from '../components/learning/network/DefenseLayersDiagram';

// Helper Components
const SectionIntro = ({ children }) => (
  <div style={{
    fontFamily: "'Oxanium', sans-serif",
    fontSize: '1.05rem',
    lineHeight: '1.7',
    color: 'rgba(224, 224, 224, 0.9)',
    marginBottom: '2rem'
  }}>
    {children}
  </div>
);

const MCQBlock = ({ questions }) => (
  <div style={{ margin: '2rem 0' }}>
    <h4 style={{
      fontFamily: "'Sora', sans-serif",
      fontSize: '1.25rem',
      fontWeight: 700,
      color: '#2dd68f',
      margin: '0 0 1.5rem 0',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem'
    }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 8V12L14.5 14.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
      Knowledge Check
    </h4>
    <div style={{ display: 'grid', gap: '1rem' }}>
      {questions.map((q, i) => (
        <QuestionCard key={i} question={q.q} options={q.options} correctAnswer={q.answer} />
      ))}
    </div>
  </div>
);

const TransitionMarker = ({ from, to }) => (
  <div style={{
    margin: '4rem 0',
    padding: '2.5rem',
    background: 'linear-gradient(135deg, rgba(45, 214, 143, 0.08), rgba(2, 168, 154, 0.08))',
    border: '2px dashed rgba(45, 214, 143, 0.3)',
    borderRadius: '16px',
    textAlign: 'center'
  }}>
    <div style={{
      fontSize: '2.5rem',
      marginBottom: '1rem'
    }}>
      🔄
    </div>
    <h2 style={{
      fontFamily: "'Sora', sans-serif",
      fontSize: '1.75rem',
      fontWeight: 700,
      color: '#2dd68f',
      margin: '0 0 1rem 0'
    }}>
      {from} → {to}
    </h2>
    <p style={{
      fontFamily: "'Oxanium', sans-serif",
      fontSize: '1.1rem',
      color: 'rgba(171, 207, 201, 0.9)',
      maxWidth: '700px',
      margin: '0 auto',
      lineHeight: 1.6
    }}>
      You now understand how communication trust works and where it can break. Next, we shift to
      <strong style={{ color: '#e6e9f0' }}> detection and defense</strong> — thinking like a security analyst
      protecting networks.
    </p>
  </div>
);

// PART 1: TECHNICAL FOUNDATION SECTIONS

function CommunicationTrustSection() {
  const questions = [
    { q: 'What fundamental assumption does network communication rely on?', options: ['A. All traffic is encrypted by default', 'B. Network devices correctly map identifiers (IP to MAC, domain to IP) without authentication', 'C. Routers authenticate every packet', 'D. DNS servers are centrally controlled'], answer: 'B' },
    { q: 'Why is the lack of authentication in ARP a security problem?', options: ['A. ARP packets are too large', 'B. Any device can send ARP replies claiming to be any IP address, and the network trusts it', 'C. ARP only works on wireless networks', 'D. ARP requires root access'], answer: 'B' },
    { q: 'What enables a MITM attacker to position themselves between two endpoints?', options: ['A. Physical access to the network cable', 'B. Breaking the trust assumptions that underpin network protocols (ARP, DNS, routing)', 'C. Stealing encryption keys', 'D. Exploiting buffer overflows'], answer: 'B' },
  ];

  return (
    <LessonCard number="01" title="Communication Trust Model" subtitle="Why networks trust — and why that trust can be broken">
      <SectionIntro>
        Network communication relies on fundamental trust assumptions: ARP maps IP addresses to correct MAC addresses,
        DNS returns legitimate server IPs, and routing tables point to the intended destinations. These protocols were
        designed for functionality, not security. <strong>MITM attacks exploit this inherent trust</strong>.
      </SectionIntro>

      <DiagramContainer title="Trust Model" subtitle="How communication assumes direct connection">
        <CommunicationTrustModel />
      </DiagramContainer>

      <ConceptGrid concepts={[
        {
          label: 'Trust Assumptions',
          children: 'Networks assume: ARP replies are honest, DNS responses are legitimate, routing is correct. These assumptions enable fast communication but create vulnerability.'
        },
        {
          label: 'No Built-in Authentication',
          children: 'Protocols like ARP and DNS have no authentication mechanism. Any device can send responses claiming any identity. The network accepts them.'
        },
        {
          label: 'Positioning is Power',
          children: 'A MITM attacker does not break encryption or exploit vulnerabilities — they position themselves in the network path so traffic flows through them.'
        },
        {
          label: 'Interception vs Eavesdropping',
          children: 'MITM is active interception (attacker in the middle), not passive eavesdropping (attacker listening). The attacker can read AND modify traffic.'
        }
      ]} />

      <InfoCard type="info">
        Understanding MITM is essential for <strong>defensive security</strong>. You cannot protect against what you
        do not understand. This lesson teaches threat models, detection techniques, and defense strategies — not attack tutorials.
      </InfoCard>

      <MCQBlock questions={questions} />
    </LessonCard>
  );
}

function ARPConceptSection() {
  const questions = [
    { q: 'What does ARP (Address Resolution Protocol) do?', options: ['A. Routes packets between networks', 'B. Maps IP addresses to MAC addresses on a local network segment', 'C. Encrypts traffic between hosts', 'D. Resolves domain names to IP addresses'], answer: 'B' },
    { q: 'What makes ARP poisoning possible?', options: ['A. ARP uses weak encryption', 'B. ARP has no authentication — any device can send gratuitous ARP replies claiming any IP-to-MAC mapping', 'C. ARP only works on old networks', 'D. ARP requires administrator privileges'], answer: 'B' },
    { q: 'How can you detect ARP poisoning on a local machine?', options: ['A. Run a port scan', 'B. Check `arp -a` for two different IPs sharing the same MAC address', 'C. Inspect DNS queries', 'D. Monitor CPU usage'], answer: 'B' },
  ];

  return (
    <LessonCard number="02" title="ARP Trust and Poisoning" subtitle="The most common LAN-based MITM technique">
      <SectionIntro>
        ARP (Address Resolution Protocol) maps Layer 3 (IP) addresses to Layer 2 (MAC) addresses on local network
        segments. It operates by broadcast: "Who has 192.168.1.1?" The device with that IP responds: "I do, my MAC
        is aa:bb:cc:dd:ee:ff." <strong>ARP has zero authentication</strong>. Any device can send these responses.
      </SectionIntro>

      <DiagramContainer title="ARP Trust Mechanism" subtitle="How ARP poisoning exploits lack of authentication">
        <ARPTrustDiagram />
      </DiagramContainer>

      <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.35rem', fontWeight: 700, color: '#e6e9f0', marginTop: '2.5rem', marginBottom: '1rem' }}>
        ARP Poisoning Attack Mechanics
      </h3>

      <ConceptGrid concepts={[
        {
          label: 'Gratuitous ARP Replies',
          children: 'Attacker sends unsolicited ARP replies to both victim and gateway: "192.168.1.1 is at [attacker MAC]". Both update their ARP caches, redirecting traffic.'
        },
        {
          label: 'IP Forwarding Required',
          children: <>Attacker must enable IP forwarding (<code>echo 1 {'\u003E'} /proc/sys/net/ipv4/ip_forward</code>) to relay traffic transparently. Without it, the attack causes denial of service, not interception.</>
        },
        {
          label: 'Bidirectional Poisoning',
          children: 'To intercept both directions, attacker poisons BOTH the victim (claiming to be gateway) and gateway (claiming to be victim). Traffic flows through attacker in both directions.'
        },
        {
          label: 'Detection Indicator',
          children: <>Run <code>arp -a</code>. If two different IP addresses share the same MAC address, ARP poisoning is in progress. Normal networks have unique MAC-to-IP mappings.</>
        }
      ]} />

      <TerminalBlock
        title="Check ARP Cache (Detection)"
        description="Inspect current ARP mappings for suspicious duplicates"
        command="arp -a"
        output="Interface: 192.168.1.10 --- 0x2
  Internet Address      Physical Address      Type
  192.168.1.1           aa-bb-cc-dd-ee-ff     dynamic
  192.168.1.50          aa-bb-cc-dd-ee-ff     dynamic  ← SUSPICIOUS!"
      />

      <InfoCard type="warn" title="⚠️ Why This Matters for Defense">
        ARP poisoning is not theoretical. It is used in: corporate espionage, credential theft, SSL stripping attacks,
        and lateral movement in compromised networks. <strong>Detection requires monitoring ARP cache changes</strong>.
      </InfoCard>

      <MCQBlock questions={questions} />
    </LessonCard>
  );
}

function DNSandTLSSection() {
  const questions = [
    { q: 'What trust assumption does DNS exploit in a MITM attack?', options: ['A. DNS responses are encrypted', 'B. DNS queries are authenticated by default', 'C. The client trusts that DNS responses map domains to legitimate server IPs without verification', 'D. DNS servers require certificates'], answer: 'C' },
    { q: 'What does TLS certificate validation provide?', options: ['A. Faster connection speeds', 'B. Proof that the server you are connecting to is who it claims to be, signed by a trusted Certificate Authority', 'C. Automatic encryption key rotation', 'D. Protection against port scans'], answer: 'B' },
    { q: 'Why do browsers show certificate warnings during MITM attacks?', options: ['A. The attacker cannot obtain a valid certificate for the real domain from a trusted CA', 'B. TLS is outdated', 'C. The server is offline', 'D. The network is too slow'], answer: 'A' },
  ];

  return (
    <LessonCard number="03" title="DNS Trust and TLS Protection" subtitle="Domain resolution and certificate validation">
      <SectionIntro>
        DNS (Domain Name System) translates human-readable domains into IP addresses. Like ARP, standard DNS has no
        authentication — responses are trusted. TLS (Transport Layer Security) provides cryptographic proof of server
        identity via certificates signed by trusted Certificate Authorities. <strong>Understanding both is critical for
        MITM defense</strong>.
      </SectionIntro>

      <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.35rem', fontWeight: 700, color: '#e6e9f0', marginTop: '2rem', marginBottom: '1rem' }}>
        DNS Spoofing
      </h3>

      <ConceptGrid concepts={[
        {
          label: 'DNS Cache Poisoning',
          children: 'Attacker sends forged DNS responses to the victim before the legitimate response arrives. The victim caches the fake IP and connects to attacker-controlled infrastructure.'
        },
        {
          label: 'Rogue DNS Server',
          children: 'Attacker runs their own DNS server on the network (via DHCP poisoning or ARP poisoning redirect). All DNS queries go to the attacker, who can return arbitrary IPs.'
        },
        {
          label: 'Local hosts File Poisoning',
          children: <>Attacker with local access modifies <code>/etc/hosts</code> (Linux/Mac) or <code>C:\\Windows\\System32\\drivers\\etc\\hosts</code> (Windows) to map domains to malicious IPs.</>
        },
        {
          label: 'DNSSEC Defense',
          children: 'DNSSEC (DNS Security Extensions) cryptographically signs DNS responses. Clients can verify authenticity. However, adoption is incomplete across the internet.'
        }
      ]} />

      <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.35rem', fontWeight: 700, color: '#e6e9f0', marginTop: '2.5rem', marginBottom: '1rem' }}>
        TLS Certificate Validation
      </h3>

      <SectionIntro>
        TLS solves the MITM problem by providing server authentication. When a client connects to https://example.com,
        the server presents a certificate signed by a trusted Certificate Authority (CA). The browser verifies:
      </SectionIntro>

      <ConceptGrid concepts={[
        {
          label: '1. Certificate Signature',
          children: 'Is this certificate signed by a CA the browser trusts? Browsers maintain lists of trusted root CAs.'
        },
        {
          label: '2. Domain Match',
          children: 'Does the certificate Subject Alternative Name (SAN) match the domain being accessed? example.com certificate is not valid for attacker.com.'
        },
        {
          label: '3. Expiration',
          children: 'Is the certificate within its validity period? Expired certificates are rejected.'
        },
        {
          label: '4. Revocation Status',
          children: 'Has the certificate been revoked (CRL or OCSP)? Compromised certificates can be revoked by the CA.'
        }
      ]} />

      <InfoCard type="tip" title="💡 Why Certificate Warnings Appear During MITM">
        When an attacker intercepts HTTPS traffic, they cannot present a valid certificate for the real domain (they
        do not control it). They must either: (1) use a self-signed certificate (browser warning), (2) present a
        certificate for a different domain (browser warning), or (3) compromise a CA to issue fraudulent certificates
        (rare, detectable). <strong>Certificate warnings are your primary defense indicator</strong>.
      </InfoCard>

      <TerminalBlock
        title="Check TLS Certificate (Linux/Mac)"
        description="Inspect server certificate details"
        command="openssl s_client -connect example.com:443 -servername example.com < /dev/null | openssl x509 -noout -text"
      />

      <MCQBlock questions={questions} />
    </LessonCard>
  );
}

// PART 2: INVESTIGATION METHODOLOGY SECTIONS

function DetectionSection() {
  const questions = [
    { q: 'Which observation indicates possible ARP poisoning?', options: ['A. High CPU usage', 'B. Two different IPs in the ARP cache sharing the same MAC address', 'C. Slow network speeds', 'D. High DNS query rate'], answer: 'B' },
    { q: 'What does an unexpected HTTPS to HTTP downgrade indicate?', options: ['A. The server is misconfigured', 'B. Possible SSL stripping attack — the connection was intercepted before TLS negotiation', 'C. The browser is outdated', 'D. The network is using IPv6'], answer: 'B' },
    { q: 'Which tool can monitor ARP traffic for anomalies?', options: ['A. ping', 'B. arpwatch (logs ARP changes) or network IDS/IPS with ARP inspection rules', 'C. traceroute', 'D. netstat'], answer: 'B' },
  ];

  return (
    <LessonCard number="04" title="MITM Detection Techniques" subtitle="Identifying suspicious network behavior">
      <SectionIntro>
        Detection is the first line of defense. MITM attacks leave observable traces: ARP cache anomalies, certificate
        warnings, unexpected protocol downgrades, and traffic pattern changes. <strong>Security analysts must know what
        to look for</strong>.
      </SectionIntro>

      <DiagramContainer title="Detection Workflow" subtitle="From monitoring to response">
        <MITMDetectionFlow />
      </DiagramContainer>

      <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.35rem', fontWeight: 700, color: '#e6e9f0', marginTop: '2.5rem', marginBottom: '1rem' }}>
        Network-Level Indicators
      </h3>

      <ConceptGrid concepts={[
        {
          label: 'ARP Cache Monitoring',
          children: <>Run <code>arp -a</code> regularly. Tools like <code>arpwatch</code> log all ARP changes and alert on suspicious mappings (duplicate MACs, unexpected changes).</>
        },
        {
          label: 'Gratuitous ARP Detection',
          children: 'IDS/IPS rules can flag unsolicited ARP replies. Normal ARP communication is request-response. Unsolicited replies (gratuitous ARP) are often attack indicators.'
        },
        {
          label: 'MAC Address Anomalies',
          children: 'If the gateway MAC suddenly changes, investigate immediately. Legitimate MAC changes are rare (hardware replacement). Sudden changes indicate ARP poisoning.'
        },
        {
          label: 'Traffic Routing Changes',
          children: <>Use <code>traceroute</code> to verify network path to critical servers. If traffic suddenly routes through an unexpected hop, investigate.</>
        }
      ]} />

      <TerminalBlock
        title="Continuous ARP Monitoring (Linux)"
        description="Log ARP changes for forensic analysis"
        command="sudo arpwatch -i eth0"
        output="arpwatch: listening on eth0
192.168.1.50 changed from aa:bb:cc:dd:ee:ff to 11:22:33:44:55:66"
      />

      <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.35rem', fontWeight: 700, color: '#e6e9f0', marginTop: '2.5rem', marginBottom: '1rem' }}>
        Application-Level Indicators
      </h3>

      <ConceptGrid concepts={[
        {
          label: 'Certificate Warnings',
          children: 'Browsers show clear warnings for invalid certificates. Users must be trained to NEVER ignore these warnings. They indicate possible MITM or compromised server.'
        },
        {
          label: 'HTTP Downgrade',
          children: 'If a site normally uses HTTPS but suddenly loads as HTTP (no padlock), investigate. This may indicate SSL stripping. Check for HSTS enforcement.'
        },
        {
          label: 'Unexpected Certificate Issuers',
          children: 'If a certificate for example.com is issued by an unknown/suspicious CA (not the expected one like Let\'s Encrypt or DigiCert), it may be MITM.'
        },
        {
          label: 'Session Anomalies',
          children: 'Unexpected logouts, session token changes, or "concurrent session" warnings can indicate session hijacking via MITM.'
        }
      ]} />

      <InfoCard type="danger" title="🔴 Never Ignore Certificate Warnings">
        Certificate warnings are <strong>security alerts, not annoyances</strong>. Clicking "proceed anyway" defeats
        the entire purpose of TLS. If a legitimate site shows certificate warnings, report it to IT/security immediately.
      </InfoCard>

      <MCQBlock questions={questions} />
    </LessonCard>
  );
}

function TrafficAnalysisSection() {
  const questions = [
    { q: 'In Wireshark, which filter shows ARP traffic?', options: ['A. tcp.port == 80', 'B. arp', 'C. dns', 'D. http'], answer: 'B' },
    { q: 'What does seeing two different source MACs for the same IP address in a packet capture indicate?', options: ['A. Normal DHCP renewal', 'B. Possible ARP poisoning — the attacker and legitimate device both claim the same IP', 'C. IPv6 transition', 'D. Network load balancing'], answer: 'B' },
    { q: 'Which Wireshark feature helps identify SSL/TLS issues?', options: ['A. Follow TCP Stream', 'B. Expert Information can flag certificate errors and TLS handshake failures', 'C. Protocol Hierarchy', 'D. I/O Graph'], answer: 'B' },
  ];

  return (
    <LessonCard number="05" title="Traffic Analysis for MITM Detection" subtitle="Using Wireshark to investigate suspicious activity">
      <SectionIntro>
        Wireshark is the primary tool for analyzing suspected MITM attacks. By capturing and inspecting traffic,
        analysts can identify ARP poisoning, certificate anomalies, and protocol downgrades. <strong>This section
        applies Wireshark investigation methodology to MITM scenarios</strong>.
      </SectionIntro>

      <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.35rem', fontWeight: 700, color: '#e6e9f0', marginTop: '2rem', marginBottom: '1rem' }}>
        ARP Analysis in Wireshark
      </h3>

      <TerminalBlock
        title="Filter: ARP Traffic Only"
        description="Isolate ARP packets for inspection"
        command="arp"
      />

      <SectionIntro>
        Look for: <strong>Gratuitous ARP replies</strong> (unsolicited), <strong>duplicate IP-to-MAC mappings</strong>
        (two different MACs claiming the same IP), and <strong>rapid ARP changes</strong> (multiple ARP updates in
        short time).
      </SectionIntro>

      <ConceptGrid concepts={[
        {
          label: 'ARP Request/Reply Pairs',
          children: 'Normal: Request → Reply. Attack: Multiple unsolicited replies (gratuitous ARP) claiming to be the gateway or victim.'
        },
        {
          label: 'Source MAC Inconsistency',
          children: 'If you see packets from 192.168.1.1 with different source MACs at different times, ARP poisoning is occurring. Legitimate devices have stable MACs.'
        },
        {
          label: 'Broadcast ARP Replies',
          children: 'Normal ARP replies are unicast (sent to requester). Broadcast replies sent to all hosts can indicate poisoning attacks targeting multiple victims.'
        }
      ]} />

      <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.35rem', fontWeight: 700, color: '#e6e9f0', marginTop: '2.5rem', marginBottom: '1rem' }}>
        TLS Handshake Analysis
      </h3>

      <TerminalBlock
        title="Filter: TLS Handshakes Only"
        description="Show TLS connection establishment"
        command="ssl.handshake || tls.handshake"
      />

      <SectionIntro>
        Inspect the <strong>Server Hello</strong> packet. The certificate presented by the server must match the domain.
        Look for: mismatched domains, self-signed certificates, unknown CAs, or handshake failures.
      </SectionIntro>

      <ConceptGrid concepts={[
        {
          label: 'Certificate Chain Inspection',
          children: 'Wireshark shows the full certificate chain in TLS packets. Verify: domain matches, CA is trusted, no self-signed certificates for production sites.'
        },
        {
          label: 'Cipher Suite Downgrades',
          children: 'If a client offers strong ciphers but the server selects weak/obsolete ones (e.g., RC4, DES), investigate. MITM attackers may force weak ciphers.'
        },
        {
          label: 'TLS Alert Messages',
          children: 'TLS Alerts (type 21) indicate problems: certificate_unknown, bad_certificate, handshake_failure. These may indicate MITM attempts.'
        }
      ]} />

      <InfoCard type="tip" title="💡 Wireshark Expert Information">
        Open <strong>Analyze → Expert Information</strong>. Wireshark automatically flags: malformed packets,
        retransmissions, certificate errors, and TLS issues. Use this as a first-pass filter for anomalies.
      </InfoCard>

      <TerminalBlock
        title="Filter: HTTP Traffic (Potential Downgrade)"
        description="Identify unencrypted HTTP on networks that should use HTTPS"
        command="http"
      />

      <SectionIntro>
        If you see HTTP traffic to domains that should use HTTPS (banks, email providers, social media), this may
        indicate SSL stripping. Cross-reference with user reports of missing padlock icons.
      </SectionIntro>

      <MCQBlock questions={questions} />
    </LessonCard>
  );
}

// PART 3: SECURITY DEFENSE SECTIONS

function DefenseStrategiesSection() {
  const questions = [
    { q: 'What does Dynamic ARP Inspection (DAI) do on a managed switch?', options: ['A. Speeds up ARP responses', 'B. Validates ARP packets against a DHCP snooping binding table and drops forged ARP replies', 'C. Encrypts ARP traffic', 'D. Disables ARP entirely'], answer: 'B' },
    { q: 'What does HSTS (HTTP Strict Transport Security) prevent?', options: ['A. DNS spoofing', 'B. SSL stripping by instructing browsers to always use HTTPS and refuse HTTP connections', 'C. ARP poisoning', 'D. Certificate revocation'], answer: 'B' },
    { q: 'What is certificate pinning?', options: ['A. Storing certificates on a secure server', 'B. The application only accepts a specific known certificate or public key, rejecting substitutes even if CA-signed', 'C. Automatic certificate renewal', 'D. Using multiple certificates simultaneously'], answer: 'B' },
  ];

  return (
    <LessonCard number="06" title="Defense Strategies" subtitle="Protecting against MITM attacks">
      <SectionIntro>
        Defense requires multiple layers: network controls (DAI, 802.1X), protocol protections (TLS, DNSSEC, HSTS),
        and monitoring (IDS/IPS). <strong>No single control provides complete protection</strong> — defense in depth
        is essential.
      </SectionIntro>

      <DiagramContainer title="Defense in Depth" subtitle="Multiple protection layers">
        <DefenseLayersDiagram />
      </DiagramContainer>

      <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.35rem', fontWeight: 700, color: '#e6e9f0', marginTop: '2.5rem', marginBottom: '1rem' }}>
        Network-Layer Defenses
      </h3>

      <ConceptGrid concepts={[
        {
          label: 'Dynamic ARP Inspection (DAI)',
          children: 'Managed switches validate ARP packets against DHCP snooping binding table. If an ARP reply claims an IP-to-MAC mapping not in the table, the switch drops it.'
        },
        {
          label: '802.1X Port Authentication',
          children: 'Devices must authenticate before network access is granted. Prevents rogue devices from joining the network segment to launch MITM attacks.'
        },
        {
          label: 'VLAN Segmentation',
          children: 'Isolate sensitive systems on separate VLANs. Even if attacker compromises one segment, they cannot poison ARP on other VLANs without routing through gateway.'
        },
        {
          label: 'Private VLANs (PVLAN)',
          children: 'Hosts on same VLAN cannot communicate directly — all traffic goes through gateway. Prevents lateral ARP poisoning between client systems.'
        }
      ]} />

      <InfoCard type="info">
        <strong>DAI Configuration</strong> requires DHCP snooping to be enabled first. DHCP snooping builds the
        trusted IP-to-MAC binding table. DAI then validates ARP packets against this table.
      </InfoCard>

      <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.35rem', fontWeight: 700, color: '#e6e9f0', marginTop: '2.5rem', marginBottom: '1rem' }}>
        Protocol-Layer Defenses
      </h3>

      <ConceptGrid concepts={[
        {
          label: 'HSTS (HTTP Strict Transport Security)',
          children: <>Servers send <code>Strict-Transport-Security</code> header instructing browsers to ALWAYS use HTTPS. Prevents SSL stripping. HSTS Preload extends this to first visit.</>
        },
        {
          label: 'DNSSEC',
          children: 'Cryptographically signs DNS responses. Clients can verify authenticity and detect forged DNS replies. Requires both server and client support.'
        },
        {
          label: 'TLS 1.3',
          children: 'Latest TLS version removes weak ciphers, encrypts more of the handshake, and provides forward secrecy. Reduces attack surface against MITM downgrade attacks.'
        },
        {
          label: 'Certificate Pinning',
          children: 'Applications hardcode expected certificate or public key. Even if attacker obtains CA-signed certificate, pinned apps reject it. Used in mobile apps, critical systems.'
        }
      ]} />

      <TerminalBlock
        title="HSTS Header Example"
        description="Server instructs browser to enforce HTTPS"
        command="curl -I https://example.com | grep Strict"
        output="Strict-Transport-Security: max-age=31536000; includeSubDomains; preload"
      />

      <MCQBlock questions={questions} />
    </LessonCard>
  );
}

function MonitoringResponseSection() {
  const questions = [
    { q: 'Which IDS/IPS signature would detect ARP poisoning?', options: ['A. HTTP GET flood', 'B. Multiple gratuitous ARP replies claiming the same IP from different MAC addresses', 'C. TCP SYN scan', 'D. DNS query rate exceeding threshold'], answer: 'B' },
    { q: 'What should an incident response team do immediately upon detecting MITM?', options: ['A. Reboot all servers', 'B. Isolate affected network segment, collect forensic evidence, identify attacker MAC/IP, revoke credentials if compromised', 'C. Disable all network switches', 'D. Ignore it if TLS is enabled'], answer: 'B' },
    { q: 'Why is user education important for MITM defense?', options: ['A. Users can configure firewalls', 'B. Users are the last line of defense — they must recognize certificate warnings, avoid unknown Wi-Fi, and report suspicious behavior', 'C. Users can install IDS systems', 'D. Users can write firewall rules'], answer: 'B' },
  ];

  return (
    <LessonCard number="07" title="Monitoring and Incident Response" subtitle="Detecting and responding to active MITM attacks">
      <SectionIntro>
        Even with strong defenses, attacks may occur. Continuous monitoring, rapid detection, and systematic incident
        response minimize damage. <strong>This section covers operational security practices for MITM threats</strong>.
      </SectionIntro>

      <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.35rem', fontWeight: 700, color: '#e6e9f0', marginTop: '2rem', marginBottom: '1rem' }}>
        Continuous Monitoring
      </h3>

      <ConceptGrid concepts={[
        {
          label: 'IDS/IPS Rules',
          children: 'Deploy signatures for: gratuitous ARP, ARP cache churn, certificate anomalies, SSL/TLS downgrades, unusual DNS responses. Alert on matches.'
        },
        {
          label: 'SIEM Correlation',
          children: 'Aggregate logs from switches (ARP), firewalls (connection resets), IDS (alerts), and endpoints (certificate warnings). Correlate events to identify MITM campaigns.'
        },
        {
          label: 'Baseline Traffic Patterns',
          children: 'Establish normal: ARP request/reply ratios, certificate issuers for critical domains, protocol usage (HTTPS vs HTTP). Deviations indicate problems.'
        },
        {
          label: 'Endpoint Monitoring',
          children: <>Deploy agents that monitor: ARP cache changes (<code>arp -a</code>), active connections, certificate trust store modifications, unexpected proxy configurations.</>
        }
      ]} />

      <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.35rem', fontWeight: 700, color: '#e6e9f0', marginTop: '2.5rem', marginBottom: '1rem' }}>
        Incident Response Workflow
      </h3>

      <div style={{
        background: 'rgba(10, 15, 25, 0.6)',
        border: '1px solid rgba(45, 214, 143, 0.3)',
        borderRadius: '12px',
        padding: '2rem',
        marginTop: '1.5rem'
      }}>
        <ol style={{ margin: 0, paddingLeft: '1.5rem', color: 'rgba(224, 224, 224, 0.9)', lineHeight: 2, fontFamily: "'Oxanium', sans-serif", fontSize: '1rem' }}>
          <li><strong style={{ color: '#2dd68f' }}>Detection:</strong> IDS alert, user report, or monitoring anomaly indicates possible MITM</li>
          <li><strong style={{ color: '#2dd68f' }}>Isolation:</strong> Immediately isolate affected network segment to prevent spread. Use ACLs or VLAN shutdown.</li>
          <li><strong style={{ color: '#2dd68f' }}>Evidence Collection:</strong> Capture: ARP caches, Wireshark packet captures, switch logs, attacker MAC/IP, affected user list</li>
          <li><strong style={{ color: '#2dd68f' }}>Identification:</strong> Use MAC address to identify attacker device (switch port, DHCP logs). Locate physical device if on-premises.</li>
          <li><strong style={{ color: '#2dd68f' }}>Containment:</strong> Disable attacker switchport. Blacklist MAC address. Reset ARP caches on affected hosts (<code>arp -d</code>).</li>
          <li><strong style={{ color: '#2dd68f' }}>Credential Revocation:</strong> If credentials were transmitted during attack, force password reset for affected users</li>
          <li><strong style={{ color: '#2dd68f' }}>Root Cause:</strong> How did attacker gain network access? Was 802.1X bypassed? Rogue device? Compromised endpoint?</li>
          <li><strong style={{ color: '#2dd68f' }}>Remediation:</strong> Implement missing controls (DAI, 802.1X), harden configuration, deploy monitoring</li>
        </ol>
      </div>

      <InfoCard type="tip" title="💡 Clear ARP Cache After Incident">
        After removing the attacker, victim machines may still have poisoned ARP entries cached. Flush ARP caches:
        <code style={{ display: 'block', marginTop: '0.5rem', padding: '0.5rem', background: 'rgba(0,0,0,0.4)', borderRadius: '4px' }}>
          Windows: arp -d<br/>
          Linux/Mac: sudo ip -s -s neigh flush all
        </code>
        Or reboot affected systems to clear caches automatically.
      </InfoCard>

      <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.35rem', fontWeight: 700, color: '#e6e9f0', marginTop: '2.5rem', marginBottom: '1rem' }}>
        User Education
      </h3>

      <ConceptGrid concepts={[
        {
          label: 'Certificate Warnings',
          children: 'Train users to NEVER click "proceed anyway" on certificate warnings. Report to IT/security immediately. Make reporting easy.'
        },
        {
          label: 'Public Wi-Fi Risks',
          children: 'Public Wi-Fi is untrusted. Evil twin attacks and rogue access points are common. Users must use VPN on public networks or avoid sensitive transactions.'
        },
        {
          label: 'HTTPS Verification',
          children: 'Users should verify HTTPS padlock before entering credentials. Check address bar for correct domain. Phishing + MITM combination is deadly.'
        },
        {
          label: 'Suspicious Behavior Reporting',
          children: 'Unexpected logouts, certificate errors, HTTP on HTTPS sites — users should report. Security teams cannot see everything; user reports are valuable signals.'
        }
      ]} />

      <MCQBlock questions={questions} />

      <div style={{
        marginTop: '3rem',
        padding: '2rem',
        background: 'linear-gradient(135deg, rgba(45, 214, 143, 0.08), rgba(2, 168, 154, 0.08))',
        border: '2px solid rgba(45, 214, 143, 0.3)',
        borderRadius: '16px'
      }}>
        <h3 style={{
          fontFamily: "'Sora', sans-serif",
          fontSize: '1.5rem',
          fontWeight: 700,
          color: '#2dd68f',
          marginBottom: '1rem'
        }}>
          🎓 Lesson Complete
        </h3>
        <p style={{
          fontFamily: "'Oxanium', sans-serif",
          fontSize: '1.05rem',
          lineHeight: 1.7,
          color: 'rgba(224, 224, 224, 0.9)',
          margin: 0
        }}>
          You now understand <strong>how MITM attacks exploit network trust</strong>, <strong>how to detect suspicious
          activity</strong>, and <strong>how to defend networks using multiple protection layers</strong>. Apply this
          knowledge to monitor networks, investigate incidents, and implement robust defenses. MITM attacks remain a
          significant threat — vigilance and defense in depth are essential.
        </p>
      </div>
    </LessonCard>
  );
}

function NetSecMITM() {
  const learningObjectives = [
    'Understand why network protocols rely on trust and where trust breaks down',
    'Explain how ARP poisoning exploits lack of authentication',
    'Describe DNS spoofing and TLS certificate validation',
    'Detect MITM attacks using ARP cache inspection and traffic analysis',
    'Apply Wireshark to investigate suspicious network behavior',
    'Identify certificate warnings and protocol downgrades as attack indicators',
    'Implement defense in depth: DAI, 802.1X, HSTS, DNSSEC, certificate pinning',
    'Respond to MITM incidents with isolation, evidence collection, and remediation'
  ];

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Suspense fallback={<div />}>
        <ShaderGradientCanvas style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, opacity: 0.8 }}>
          <ShaderGradient animate="off" brightness={1.4} cAzimuthAngle={0} cDistance={7.1} cPolarAngle={140} cameraZoom={17.29} color1="#aeacb7" color2="#152921" color3="#002f00" destination="onCanvas" embedMode="off" envPreset="city" format="gif" fov={45} frameRate={10} gizmoHelper="hide" grain="off" lightType="3d" pixelDensity={1} positionX={0} positionY={0} positionZ={0} range="disabled" rangeEnd={40} rangeStart={0} reflection={0.1} rotationX={0} rotationY={0} rotationZ={0} shader="defaults" type="sphere" uAmplitude={1.6} uDensity={1.1} uFrequency={5.5} uSpeed={0.1} uStrength={1} uTime={0} wireframe={false} />
        </ShaderGradientCanvas>
      </Suspense>

      <Navbar />

      <div className="container" style={{ position: 'relative', zIndex: 1, paddingBottom: '4rem', maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Hero Section */}
        <div style={{ textAlign: 'center', padding: '3rem 0 2rem', position: 'relative' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <NetworkSecurityIcon size={80} />
          </div>
          <h1 style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: '3rem',
            fontWeight: 800,
            color: '#abcfc9',
            margin: '0 0 1rem 0',
            lineHeight: 1.2
          }}>
            Man-in-the-Middle Attacks
          </h1>
          <p style={{
            fontFamily: "'Oxanium', sans-serif",
            fontSize: '1.25rem',
            color: 'rgba(171, 207, 201, 0.8)',
            margin: '0 auto 2rem',
            maxWidth: '700px',
            lineHeight: 1.6
          }}>
            Understanding trust exploitation, detection strategies, and defensive security
          </p>

          {/* Metadata */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
            <div style={{
              background: 'rgba(45, 214, 143, 0.1)',
              border: '1px solid rgba(45, 214, 143, 0.3)',
              borderRadius: '12px',
              padding: '0.75rem 1.5rem',
              backdropFilter: 'blur(8px)'
            }}>
              <div style={{ fontSize: '0.75rem', color: 'rgba(171, 207, 201, 0.7)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Level</div>
              <div style={{ fontSize: '1rem', color: '#2dd68f', fontWeight: 700, fontFamily: "'Sora', sans-serif" }}>Advanced</div>
            </div>
            <div style={{
              background: 'rgba(45, 214, 143, 0.1)',
              border: '1px solid rgba(45, 214, 143, 0.3)',
              borderRadius: '12px',
              padding: '0.75rem 1.5rem',
              backdropFilter: 'blur(8px)'
            }}>
              <div style={{ fontSize: '0.75rem', color: 'rgba(171, 207, 201, 0.7)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Sections</div>
              <div style={{ fontSize: '1rem', color: '#2dd68f', fontWeight: 700, fontFamily: "'Sora', sans-serif" }}>7</div>
            </div>
            <div style={{
              background: 'rgba(45, 214, 143, 0.1)',
              border: '1px solid rgba(45, 214, 143, 0.3)',
              borderRadius: '12px',
              padding: '0.75rem 1.5rem',
              backdropFilter: 'blur(8px)'
            }}>
              <div style={{ fontSize: '0.75rem', color: 'rgba(171, 207, 201, 0.7)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Duration</div>
              <div style={{ fontSize: '1rem', color: '#2dd68f', fontWeight: 700, fontFamily: "'Sora', sans-serif" }}>80 min</div>
            </div>
            <div style={{
              background: 'rgba(255, 165, 0, 0.1)',
              border: '1px solid rgba(255, 165, 0, 0.3)',
              borderRadius: '12px',
              padding: '0.75rem 1.5rem',
              backdropFilter: 'blur(8px)'
            }}>
              <div style={{ fontSize: '0.75rem', color: 'rgba(171, 207, 201, 0.7)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Type</div>
              <div style={{ fontSize: '1rem', color: '#ffa500', fontWeight: 700, fontFamily: "'Sora', sans-serif" }}>Hybrid</div>
            </div>
          </div>
        </div>

        <Link to="/network-security" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem 1.5rem',
          background: 'rgba(0,0,0,0.35)',
          border: '1px solid #00FFC8',
          borderRadius: '12px',
          color: '#FFFFFF',
          fontFamily: "'Sora', sans-serif",
          fontSize: '0.95rem',
          fontWeight: 600,
          textDecoration: 'none',
          marginBottom: '2rem',
          transition: 'all 0.2s ease'
        }}>
          ← Back to Network Security
        </Link>

        <LearningObjective objectives={learningObjectives} />

        {/* PART 1: TECHNICAL FOUNDATION */}
        <InfoCard type="info" title="📚 Part 1: Technical Foundation">
          The first three sections teach <strong>how communication trust works</strong> and where it breaks —
          ARP, DNS, and TLS concepts. This is the <strong>technical foundation</strong>.
        </InfoCard>

        <CommunicationTrustSection />
        <ARPConceptSection />
        <DNSandTLSSection />

        {/* TRANSITION MARKER */}
        <TransitionMarker from="Understanding Trust" to="Detection & Defense" />

        {/* PART 2: INVESTIGATION METHODOLOGY */}
        <InfoCard type="tip" title="🔍 Part 2: Investigation & Defense">
          The remaining sections teach <strong>how to detect MITM attacks</strong> and <strong>how to defend
          networks</strong> — analyst workflows, monitoring strategies, and incident response.
        </InfoCard>

        <DetectionSection />
        <TrafficAnalysisSection />

        {/* PART 3: SECURITY DEFENSE */}
        <InfoCard type="success" title="🛡️ Part 3: Security Defense">
          Final sections cover <strong>defense strategies</strong> and <strong>incident response</strong> —
          implementing controls, continuous monitoring, and operational security practices.
        </InfoCard>

        <DefenseStrategiesSection />
        <MonitoringResponseSection />
      </div>
    </div>
  );
}

export default NetSecMITM;
