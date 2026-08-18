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
import ConceptGrid from '../components/learning/ui/ConceptGrid';
import FirewallArchitectureDiagram from '../components/learning/network/FirewallArchitectureDiagram';
import IDSDeploymentTopology from '../components/learning/network/IDSDeploymentTopology';
import EvasionTechniqueVisualizer from '../components/learning/network/EvasionTechniqueVisualizer';
import NmapEvasionBuilder from '../components/learning/network/NmapEvasionBuilder';
import DetectionMethodComparison from '../components/learning/network/DetectionMethodComparison';
import IDSEvasionFlow from '../components/learning/network/IDSEvasionFlow';
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

const TransitionMarker = ({ title, subtitle, emoji }) => (
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
      {emoji}
    </div>
    <h2 style={{
      fontFamily: "'Sora', sans-serif",
      fontSize: '1.75rem',
      fontWeight: 700,
      color: '#2dd68f',
      margin: '0 0 1rem 0'
    }}>
      {title}
    </h2>
    <p style={{
      fontFamily: "'Oxanium', sans-serif",
      fontSize: '1.1rem',
      color: 'rgba(171, 207, 201, 0.9)',
      maxWidth: '700px',
      margin: '0 auto',
      lineHeight: 1.6
    }}>
      {subtitle}
    </p>
  </div>
);

// PART 1: UNDERSTANDING THE DEFENSES

function FirewallFundamentalsSection() {
  const questions = [
    { q: 'What is the key difference between a stateless and a stateful firewall?', options: ['A. Stateless firewalls are faster but inspect more deeply', 'B. Stateful firewalls track connection state; stateless firewalls inspect each packet independently with no session memory', 'C. Stateless firewalls are only used for web traffic', 'D. Stateful firewalls only work on internal networks'], answer: 'B' },
    { q: 'Which firewall type specifically protects web applications from SQL injection and XSS?', options: ['A. Packet filtering firewall', 'B. Stateful inspection firewall', 'C. Next-Generation Firewall (NGFW)', 'D. Web Application Firewall (WAF)'], answer: 'D' },
    { q: 'What additional capability does an NGFW add over a traditional stateful firewall?', options: ['A. The ability to block all traffic by default', 'B. Deep packet inspection, application awareness, IPS, and SSL/TLS inspection', 'C. Support for IPv6 only', 'D. The ability to route traffic between VLANs'], answer: 'B' },
  ];

  return (
    <LessonCard number="01" title="Firewall Fundamentals" subtitle="From simple filtering to intelligent protection">
      <SectionIntro>
        A firewall is a network security device (hardware or software) that monitors and controls traffic based on defined security rules.
        Firewalls have evolved from simple packet filters to sophisticated systems that understand applications, inspect encrypted traffic,
        and actively prevent intrusions. Understanding this evolution is essential for both attackers and defenders.
      </SectionIntro>

      <DiagramContainer title="Firewall Architecture Evolution" subtitle="Stateless → Stateful → Next-Generation">
        <FirewallArchitectureDiagram />
      </DiagramContainer>

      <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.35rem', fontWeight: 700, color: '#e6e9f0', marginTop: '2.5rem', marginBottom: '1rem' }}>
        Firewall Types & Capabilities
      </h3>

      <ConceptGrid concepts={[
        {
          label: 'Stateless (Packet Filtering)',
          children: 'Inspects individual packets against ACL rules based on source/destination IP, port, and protocol. No memory of previous packets. Fast but vulnerable to attacks spanning multiple packets.'
        },
        {
          label: 'Stateful Inspection',
          children: 'Tracks the state of active connections and only allows packets that are part of an established, legitimate session. Far more secure than stateless filtering.'
        },
        {
          label: 'Next-Generation Firewall (NGFW)',
          children: 'Adds deep packet inspection (DPI), application awareness, intrusion prevention (IPS), and SSL/TLS inspection to traditional stateful filtering. Understands what applications are doing, not just ports.'
        },
        {
          label: 'Web Application Firewall (WAF)',
          children: 'Operates at Layer 7 and specifically protects web applications from SQL injection, XSS, and CSRF by inspecting HTTP/HTTPS traffic and understanding web attack patterns.'
        }
      ]} />

      <InfoCard type="info" title="💡 Deployment Locations">
        Firewalls are deployed at multiple points: <strong>network perimeters</strong> (protecting entire networks),
        <strong> between internal segments</strong> (microsegmentation), and on <strong>individual hosts</strong>
        (iptables/nftables on Linux, Windows Defender Firewall). Defense in depth requires all three.
      </InfoCard>

      <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.35rem', fontWeight: 700, color: '#e6e9f0', marginTop: '2.5rem', marginBottom: '1rem' }}>
        Practical Firewall Rules
      </h3>

      <TerminalBlock
        title="iptables: Allow SSH from specific IP"
        description="Stateless rule example (Linux)"
        command="sudo iptables -A INPUT -p tcp --dport 22 -s 192.168.1.100 -j ACCEPT"
      />

      <TerminalBlock
        title="iptables: Stateful connection tracking"
        description="Allow established connections (stateful)"
        command="sudo iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT"
      />

      <MCQBlock questions={questions} />
    </LessonCard>
  );
}

function IDSIPSFundamentalsSection() {
  const questions = [
    { q: 'What is the fundamental difference between an IDS and an IPS?', options: ['A. IDS is hardware; IPS is software', 'B. IDS only detects and alerts; IPS is inline and can actively block malicious traffic', 'C. IPS only works on web traffic; IDS works on all protocols', 'D. IDS uses signatures; IPS uses anomaly detection exclusively'], answer: 'B' },
    { q: 'Which detection method can identify zero-day attacks with no known signature?', options: ['A. Signature-based detection', 'B. Anomaly-based detection — it flags deviations from established normal behaviour', 'C. Port-based filtering', 'D. Protocol whitelisting'], answer: 'B' },
    { q: 'Which open-source tool is multi-threaded and supports both signature and anomaly-based detection?', options: ['A. Snort', 'B. Zeek', 'C. Suricata', 'D. Wireshark'], answer: 'C' },
  ];

  return (
    <LessonCard number="02" title="IDS and IPS Fundamentals" subtitle="Detection vs prevention architectures">
      <SectionIntro>
        An Intrusion Detection System (IDS) monitors network traffic or host activity and generates alerts when suspicious patterns
        are detected — it does not block traffic. An Intrusion Prevention System (IPS) is an inline IDS that can actively block or
        drop malicious traffic in real time. Understanding the difference is critical for network architecture.
      </SectionIntro>

      <DiagramContainer title="IDS vs IPS Deployment" subtitle="Passive monitoring vs active blocking">
        <IDSDeploymentTopology />
      </DiagramContainer>

      <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.35rem', fontWeight: 700, color: '#e6e9f0', marginTop: '2.5rem', marginBottom: '1rem' }}>
        Detection Methods: Signature vs Anomaly
      </h3>

      <DiagramContainer title="Detection Method Comparison" subtitle="How IDS/IPS identifies threats">
        <DetectionMethodComparison />
      </DiagramContainer>

      <ConceptGrid concepts={[
        {
          label: 'Signature-Based Detection',
          children: 'Matches traffic against a database of known attack patterns. Highly accurate for known threats but blind to novel zero-day attacks. Requires constant signature updates.'
        },
        {
          label: 'Anomaly-Based Detection',
          children: 'Establishes a baseline of normal behaviour and alerts on deviations. Can detect zero-days but generates more false positives. Requires training period.'
        },
        {
          label: 'Network-Based (NIDS/NIPS)',
          children: 'Monitors traffic at strategic network points (typically via SPAN/mirror port for NIDS, inline for NIPS). Sees all traffic on the segment.'
        },
        {
          label: 'Host-Based (HIDS/HIPS)',
          children: 'Monitors activity on individual endpoints (file access, process execution, registry changes). Provides deeper visibility into host behavior.'
        }
      ]} />

      <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.35rem', fontWeight: 700, color: '#e6e9f0', marginTop: '2.5rem', marginBottom: '1rem' }}>
        Popular IDS/IPS Tools
      </h3>

      <ConceptGrid concepts={[
        {
          label: 'Snort',
          children: 'Open-source, signature-based IDS/IPS. Industry standard with large community-maintained rule database. Lightweight and widely deployed.'
        },
        {
          label: 'Suricata',
          children: 'Multi-threaded IDS/IPS supporting both signature and anomaly-based detection. More modern architecture than Snort, better performance on multi-core systems.'
        },
        {
          label: 'Zeek (formerly Bro)',
          children: 'Network security monitoring framework focused on providing comprehensive logs and analysis. More of a network analysis tool than traditional IDS.'
        }
      ]} />

      <TerminalBlock
        title="Snort: Basic Signature Rule"
        description="Alert on suspicious HTTP traffic"
        command='alert tcp any any -> $HOME_NET 80 (msg:"Suspicious User-Agent"; content:"User-Agent: sqlmap"; sid:1000001;)'
      />

      <InfoCard type="tip" title="💡 Modern Approach: Combine Both Methods">
        Modern IDS/IPS systems use both signature-based and anomaly-based detection. Signatures catch known threats with
        high accuracy. Anomaly detection catches novel attacks. Together, they provide comprehensive coverage.
      </InfoCard>

      <MCQBlock questions={questions} />
    </LessonCard>
  );
}

// PART 2: OFFENSIVE EVASION TECHNIQUES

function FirewallEvasionSection() {
  const questions = [
    { q: 'How does source port manipulation help bypass some firewall rules?', options: ['A. It encrypts the packet so the firewall cannot inspect it', 'B. Some firewalls allow traffic from trusted source ports (e.g. 53) without deep inspection, letting probes pass through', 'C. It changes the destination port to one the firewall allows', 'D. It fragments the packet to avoid signature matching'], answer: 'B' },
    { q: 'What is DNS tunnelling and why is it an effective evasion technique?', options: ['A. It exploits a vulnerability in DNS servers to gain access', 'B. It encapsulates arbitrary data inside DNS queries/responses, which most firewalls allow as legitimate DNS traffic', 'C. It poisons the DNS cache to redirect traffic', 'D. It uses DNS to discover firewall rules'], answer: 'B' },
    { q: 'Why might an attacker target IPv6 on a dual-stack host to evade firewall controls?', options: ['A. IPv6 traffic is always encrypted', 'B. Many organisations have strong IPv4 rules but neglected equivalent IPv6 rules, leaving dual-stack hosts exposed', 'C. IPv6 bypasses all IDS systems by design', 'D. IPv6 uses different ports than IPv4'], answer: 'B' },
  ];

  return (
    <LessonCard number="03" title="Firewall Evasion Techniques" subtitle="Bypassing network security controls">
      <SectionIntro>
        Firewall evasion exploits gaps in filtering logic, configuration weaknesses, and protocol assumptions. These techniques are used
        by both penetration testers and attackers. Understanding them is essential for defenders to build robust firewall policies and
        for red teams to test security effectiveness.
      </SectionIntro>

      <DiagramContainer title="Interactive Evasion Techniques" subtitle="Visual explanation of bypass methods">
        <EvasionTechniqueVisualizer />
      </DiagramContainer>

      <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.35rem', fontWeight: 700, color: '#e6e9f0', marginTop: '2.5rem', marginBottom: '1rem' }}>
        Common Evasion Techniques
      </h3>

      <ConceptGrid concepts={[
        {
          label: 'Source Port Manipulation',
          children: <>Some firewalls allow traffic from trusted source ports (e.g. 53/DNS, 80/HTTP). Nmap's <code>--source-port 53</code> exploits this to bypass naive ACL rules. Requires root privileges.</>
        },
        {
          label: 'Packet Fragmentation',
          children: 'Splits probe packets into small IP fragments that individually do not match firewall signatures. Older stateless firewalls may pass fragments without reassembly. Modern stateful firewalls defeat this.'
        },
        {
          label: 'Protocol Tunneling',
          children: 'Encapsulates blocked protocols inside allowed ones. DNS tunneling carries arbitrary data in DNS queries, ICMP tunneling uses ping packets, HTTP tunneling wraps traffic in web requests.'
        },
        {
          label: 'Decoy Scanning',
          children: <>nmap <code>-D RND:10</code> floods firewall logs with fake source IPs, making it harder to identify and block the real attacker's address. Does not prevent detection, only obscures attribution.</>
        },
        {
          label: 'Slow Scanning',
          children: <>nmap <code>-T0</code>/<code>-T1</code> spaces probes far apart to stay below threshold-based IDS/firewall detection rules that trigger on high packet rates. Takes significantly longer but evades rate-based detection.</>
        },
        {
          label: 'IPv6 Evasion',
          children: 'Many organizations have robust IPv4 rules but neglected IPv6. Dual-stack hosts reachable via IPv6 may bypass IPv4-only firewall controls entirely. Always test both protocols.'
        }
      ]} />

      <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.35rem', fontWeight: 700, color: '#e6e9f0', marginTop: '2.5rem', marginBottom: '1rem' }}>
        Practical Evasion Commands
      </h3>

      <DiagramContainer title="Build Your Nmap Evasion Command" subtitle="Interactive command generator">
        <NmapEvasionBuilder />
      </DiagramContainer>

      <TerminalBlock
        title="Fragmentation Evasion"
        description="Split packets into 8-byte fragments"
        command="nmap -f -p 22,80,443 192.168.1.1"
      />

      <TerminalBlock
        title="Source Port + Decoy Combo"
        description="Combine multiple evasion techniques"
        command="nmap --source-port 53 -D RND:5 -p 22,80,443 192.168.1.1"
      />

      <InfoCard type="warn" title="⚠️ Defender's Perspective: How to Detect These">
        <strong>Source port manipulation:</strong> Inspect unusual traffic from privileged ports (53, 80) going to non-standard destinations.
        <br/><strong>Fragmentation:</strong> Enable fragment reassembly before inspection on stateful firewalls.
        <br/><strong>Decoy scanning:</strong> Correlate logs across multiple sensors to identify real source.
        <br/><strong>Slow scanning:</strong> Track connection attempts over longer time windows (hours/days).
      </InfoCard>

      <MCQBlock questions={questions} />
    </LessonCard>
  );
}

function IDSEvasionSection() {
  const questions = [
    { q: 'How do insertion attacks evade IDS detection?', options: ['A. They encrypt the attack payload', 'B. They send packets the IDS accepts but the target rejects, causing the IDS to see a different stream than the target', 'C. They fragment packets into very small pieces', 'D. They use non-standard ports to avoid signature matching'], answer: 'B' },
    { q: 'Why is encryption the most effective IDS evasion technique?', options: ['A. Encrypted traffic travels faster and avoids inspection', 'B. Signature-based IDS cannot inspect encrypted payloads without SSL/TLS interception infrastructure', 'C. Encryption changes the source IP of the traffic', 'D. IDS systems are not configured to handle encrypted protocols'], answer: 'B' },
    { q: 'What is polymorphic shellcode and why does it evade signature-based IDS?', options: ['A. Shellcode that runs on multiple operating systems', 'B. Shellcode that encodes its payload differently each time, avoiding static signature matches while producing the same execution result', 'C. Shellcode that fragments itself across multiple packets', 'D. Shellcode that uses only legitimate system calls'], answer: 'B' },
  ];

  return (
    <LessonCard number="04" title="IDS Evasion Techniques" subtitle="Confusing signature and anomaly detection">
      <SectionIntro>
        IDS evasion exploits gaps between what the IDS sees and what the target host processes. The goal is to make the IDS and target
        reconstruct different data streams, causing the IDS to miss the attack. Modern IDS/IPS systems have defenses against these techniques,
        but understanding them is critical for both attackers and defenders.
      </SectionIntro>

      <DiagramContainer title="Insertion & Evasion Attacks" subtitle="How IDS and target see different streams">
        <IDSEvasionFlow />
      </DiagramContainer>

      <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.35rem', fontWeight: 700, color: '#e6e9f0', marginTop: '2.5rem', marginBottom: '1rem' }}>
        Advanced Evasion Techniques
      </h3>

      <ConceptGrid concepts={[
        {
          label: 'Fragmentation Attacks',
          children: 'Split malicious payloads across multiple IP fragments. If the IDS does not reassemble fragments before inspection, it misses the attack signature. Modern IDS systems reassemble before analysis.'
        },
        {
          label: 'Insertion Attacks',
          children: 'Send packets the IDS accepts but the target host rejects (e.g. invalid TTLs). The IDS sees a different stream than the target, causing signature mismatch. Target ignores bad packets, IDS processes them.'
        },
        {
          label: 'Evasion Attacks',
          children: 'Send packets the target accepts but the IDS rejects. The target processes the attack while the IDS sees only benign traffic. Exploits differences in protocol parsing between IDS and target.'
        },
        {
          label: 'Polymorphic Shellcode',
          children: 'Encodes malicious payloads differently each time, avoiding static signature matches while producing the same execution result on the target. Requires decoder stub.'
        },
        {
          label: 'Protocol Obfuscation',
          children: 'Uses non-standard implementations, unusual flag combinations, or out-of-order packets that confuse IDS parsers. Exploits differences between IDS protocol parser and target OS stack.'
        },
        {
          label: 'Encryption Evasion',
          children: 'TLS-encrypted C2 traffic cannot be inspected by signature-based IDS without SSL/TLS interception infrastructure. Most effective evasion technique. Requires MitM setup to inspect.'
        }
      ]} />

      <InfoCard type="danger" title="🔴 Why TLS Encryption is the Ultimate Evasion">
        Modern malware uses HTTPS for command-and-control traffic. Signature-based IDS cannot inspect encrypted payloads without
        deploying SSL/TLS interception proxies. Even with interception, certificate pinning can detect MitM. This is why
        <strong> anomaly-based detection and behavioral analysis</strong> are critical complements to signature-based IDS.
      </InfoCard>

      <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.35rem', fontWeight: 700, color: '#e6e9f0', marginTop: '2.5rem', marginBottom: '1rem' }}>
        Defender Countermeasures
      </h3>

      <ConceptGrid concepts={[
        {
          label: 'Stream Reassembly',
          children: 'Modern IDS/IPS reassemble TCP streams and IP fragments before inspection, applying the same logic as the target OS. This prevents insertion/evasion attacks.'
        },
        {
          label: 'Target-Based Policies',
          children: 'Configure IDS to match target OS behavior (Windows vs Linux handle overlaps differently). IDS mimics target fragment handling so both see the same stream.'
        },
        {
          label: 'Protocol Normalization',
          children: 'IDS normalizes ambiguous protocol fields before forwarding to target (IPS mode). Forces consistent interpretation between IDS and target.'
        },
        {
          label: 'SSL/TLS Inspection',
          children: 'Deploy SSL/TLS interception proxies to decrypt, inspect, and re-encrypt HTTPS traffic. Requires certificate management and performance overhead. Privacy/legal considerations.'
        }
      ]} />

      <MCQBlock questions={questions} />
    </LessonCard>
  );
}

// PART 3: DEFENSE & DETECTION

function DefenseStrategiesSection() {
  const questions = [
    { q: 'What is the primary purpose of deploying firewalls at multiple network layers?', options: ['A. To increase network speed', 'B. Defense in depth: multiple security layers ensure if one fails, others still protect', 'C. To reduce hardware costs', 'D. To simplify network architecture'], answer: 'B' },
    { q: 'Why should IDS/IPS signatures be updated regularly?', options: ['A. To improve network performance', 'B. New attack patterns and vulnerabilities are discovered constantly; outdated signatures miss new threats', 'C. To comply with licensing requirements', 'D. To reduce false positives only'], answer: 'B' },
    { q: 'What is the role of SSL/TLS inspection in modern network security?', options: ['A. To speed up HTTPS connections', 'B. To decrypt, inspect, and re-encrypt traffic to detect threats in encrypted traffic that would otherwise be invisible to IDS', 'C. To block all HTTPS traffic', 'D. To replace firewalls entirely'], answer: 'B' },
  ];

  return (
    <LessonCard number="05" title="Defense Strategies & Best Practices" subtitle="Building robust network security">
      <SectionIntro>
        Effective defense requires multiple layers: network segmentation, properly configured firewalls, regularly updated IDS/IPS,
        SSL/TLS inspection, and continuous monitoring. No single control provides complete protection. This section focuses on
        the defender's perspective — how to build security that withstands evasion attempts.
      </SectionIntro>

      <DiagramContainer title="Defense in Depth" subtitle="Multiple protection layers">
        <DefenseLayersDiagram />
      </DiagramContainer>

      <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.35rem', fontWeight: 700, color: '#e6e9f0', marginTop: '2.5rem', marginBottom: '1rem' }}>
        Firewall Best Practices
      </h3>

      <ConceptGrid concepts={[
        {
          label: 'Default Deny Policy',
          children: 'Block all traffic by default, explicitly allow only necessary traffic. Opposite approach (default allow) is insecure. Every exception must be justified and documented.'
        },
        {
          label: 'Principle of Least Privilege',
          children: 'Only allow the minimum access required for legitimate business functions. Restrict source IPs, destination ports, and protocols to the absolute minimum needed.'
        },
        {
          label: 'Egress Filtering',
          children: 'Filter outbound traffic, not just inbound. Prevents compromised internal hosts from exfiltrating data or connecting to C2 servers. Many organizations neglect egress controls.'
        },
        {
          label: 'Regular Rule Audits',
          children: 'Review firewall rules quarterly to remove obsolete entries. Unused rules increase attack surface and complexity. Document the business justification for every rule.'
        }
      ]} />

      <TerminalBlock
        title="iptables: Default deny + explicit allow"
        description="Secure firewall configuration pattern"
        command={`# Default deny all
sudo iptables -P INPUT DROP
sudo iptables -P FORWARD DROP
sudo iptables -P OUTPUT DROP

# Allow established connections
sudo iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT

# Allow specific service (SSH from management IP)
sudo iptables -A INPUT -p tcp --dport 22 -s 10.0.0.0/24 -j ACCEPT`}
      />

      <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.35rem', fontWeight: 700, color: '#e6e9f0', marginTop: '2.5rem', marginBottom: '1rem' }}>
        IDS/IPS Best Practices
      </h3>

      <ConceptGrid concepts={[
        {
          label: 'Regular Signature Updates',
          children: 'Update IDS/IPS signatures daily. New attack patterns and CVE exploits are discovered constantly. Automated updates are essential for timely protection.'
        },
        {
          label: 'Tune for False Positives',
          children: 'Investigate alerts, tune rules to reduce false positives. Too many false positives cause alert fatigue — real attacks get ignored. Balance sensitivity vs noise.'
        },
        {
          label: 'Deploy Both NIDS and HIDS',
          children: 'Network IDS sees network traffic, host IDS sees endpoint activity. Both provide different visibility. Comprehensive defense requires both layers.'
        },
        {
          label: 'Combine Signature + Anomaly',
          children: 'Use signature-based detection for known threats (high accuracy) and anomaly-based detection for zero-days (catches novel attacks). Hybrid approach provides best coverage.'
        }
      ]} />

      <InfoCard type="tip" title="💡 SSL/TLS Inspection Trade-offs">
        SSL/TLS inspection allows IDS to see encrypted traffic but introduces: <strong>performance overhead</strong> (decrypt/re-encrypt),
        <strong>certificate management complexity</strong>, <strong>privacy concerns</strong> (inspecting employee traffic),
        and <strong>breaks certificate pinning</strong> (some apps will fail). Deploy strategically, not universally.
      </InfoCard>

      <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.35rem', fontWeight: 700, color: '#e6e9f0', marginTop: '2.5rem', marginBottom: '1rem' }}>
        Monitoring & Response
      </h3>

      <ConceptGrid concepts={[
        {
          label: 'Centralized Logging',
          children: 'Aggregate firewall, IDS/IPS, and system logs to SIEM. Centralized visibility enables correlation of events across systems to detect multi-stage attacks.'
        },
        {
          label: 'Alerting Thresholds',
          children: 'Configure alerts for suspicious patterns: port scanning, repeated connection failures, unusual protocols, geographic anomalies. Automated response for high-confidence threats.'
        },
        {
          label: 'Incident Response Playbooks',
          children: 'Document procedures for responding to IDS/IPS alerts. Define escalation paths, containment strategies, and forensic data collection. Practice with tabletop exercises.'
        }
      ]} />

      <MCQBlock questions={questions} />
    </LessonCard>
  );
}

function NetSecFirewall() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Suspense fallback={<div />}>
        <ShaderGradientCanvas style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, opacity: 0.8 }}>
          <ShaderGradient animate="off" brightness={1.4} cAzimuthAngle={0} cDistance={7.1} cPolarAngle={140} cameraZoom={17.29} color1="#aeacb7" color2="#152921" color3="#002f00" destination="onCanvas" embedMode="off" envPreset="city" format="gif" fov={45} frameRate={10} gizmoHelper="hide" grain="off" lightType="3d" pixelDensity={1} positionX={0} positionY={0} positionZ={0} range="disabled" rangeEnd={40} rangeStart={0} reflection={0.1} rotationX={0} rotationY={0} rotationZ={0} shader="defaults" type="sphere" uAmplitude={1.6} uDensity={1.1} uFrequency={5.5} uSpeed={0.1} uStrength={1} uTime={0} wireframe={false} />
        </ShaderGradientCanvas>
      </Suspense>
      <Navbar />
      <div className="container" style={{ position: 'relative', zIndex: 1, paddingBottom: '4rem' }}>
        <div className="page-header elegant-header">
          <div className="header-icon"><NetworkSecurityIcon size={80} /></div>
          <h1 className="elegant-title" style={{ color: '#abcfc9', fontFamily: "'Sora', sans-serif" }}>
            Firewall &amp; IDS Evasion
          </h1>
          <p className="elegant-subtitle" style={{ fontFamily: "'Sora', sans-serif" }}>
            🔀 Hybrid: Defense & Detection — Understanding firewalls, intrusion detection, and evasion techniques
            <span className="difficulty hard" style={{ marginLeft: '1rem', verticalAlign: 'middle' }}>hard</span>
          </p>
          <div className="header-divider"></div>
        </div>
        <Link to="/network-security" className="back-btn" style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid #00FFC8', color: '#FFFFFF' }}>
          ← Back to Network Security
        </Link>

        {/* PART 1: UNDERSTANDING THE DEFENSES */}
        <FirewallFundamentalsSection />
        <IDSIPSFundamentalsSection />

        {/* Transition */}
        <TransitionMarker 
          emoji="⚔️"
          title="From Defense to Offense"
          subtitle="You now understand the defensive mechanisms. Next, we explore how attackers bypass these controls — thinking like a penetration tester to identify weaknesses."
        />

        {/* PART 2: OFFENSIVE EVASION TECHNIQUES */}
        <FirewallEvasionSection />
        <IDSEvasionSection />

        {/* Transition */}
        <TransitionMarker 
          emoji="🛡️"
          title="From Offense to Defense"
          subtitle="You now understand evasion techniques. Next, we return to the defender's perspective — building robust security that withstands these attacks."
        />

        {/* PART 3: DEFENSE & DETECTION */}
        <DefenseStrategiesSection />
      </div>
    </div>
  );
}

export default NetSecFirewall;
