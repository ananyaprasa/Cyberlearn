import { Suspense } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { ReconIcon } from '../components/ReconIcon';
import QuestionCard from '../components/QuestionCard';
import LessonCard from '../components/learning/ui/LessonCard';
import InfoCard from '../components/learning/ui/InfoCard';
import DiagramContainer from '../components/learning/ui/DiagramContainer';
import TerminalBlock from '../components/learning/ui/TerminalBlock';
import LearningObjective from '../components/learning/ui/LearningObjective';
import ConceptGrid from '../components/learning/ui/ConceptGrid';
import ReconnaissanceWorkflow from '../components/learning/reconnaissance/ReconnaissanceWorkflow';
import ScanProcessDiagram from '../components/learning/reconnaissance/ScanProcessDiagram';
import PortStateDiagram from '../components/learning/reconnaissance/PortStateDiagram';
import HostDiscoveryFlow from '../components/learning/reconnaissance/HostDiscoveryFlow';
import NmapOutputAnnotation from '../components/learning/reconnaissance/NmapOutputAnnotation';
import ScanDetectionIndicators from '../components/learning/reconnaissance/ScanDetectionIndicators';

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

// Section 01: Introduction to Reconnaissance
function IntroductionSection() {
  const questions = [
    { q: "What is the primary purpose of reconnaissance in a security assessment?", options: ["A. To exploit vulnerabilities immediately", "B. To gather intelligence about the target's attack surface before deeper testing", "C. To delete logs and cover tracks", "D. To install backdoors on target systems"], answer: "B" },
    { q: "Why is Nmap considered the industry standard for network scanning?", options: ["A. It only works on Windows systems", "B. It is the only free scanning tool available", "C. It combines host discovery, port scanning, service detection, and vulnerability assessment in a single powerful tool", "D. It automatically exploits discovered vulnerabilities"], answer: "C" },
    { q: "What mindset should an analyst adopt when conducting reconnaissance?", options: ["A. Scan as fast as possible to save time", "B. Think like an attacker: map the attack surface, identify entry points, understand security posture", "C. Skip documentation to focus on exploitation", "D. Only scan ports 80 and 443"], answer: "B" },
  ];

  return (
    <LessonCard number="01" title="Introduction to Reconnaissance" subtitle="Understanding the investigation mindset">
      <SectionIntro>
        Reconnaissance is the systematic process of gathering intelligence about a target environment to understand
        its attack surface and security posture. Before any exploitation, skilled analysts map what exists, what's
        exposed, and what's vulnerable. This intelligence-driven approach separates professional penetration testing
        from random vulnerability scanning.
      </SectionIntro>

      <ConceptGrid concepts={[
        {
          label: 'Attack Surface',
          children: 'Every exposed service, open port, running application, and network path represents potential entry. Reconnaissance maps this terrain.'
        },
        {
          label: 'Investigation Workflow',
          children: 'Define objectives → Identify targets → Select scan method → Execute → Analyze results → Document findings. Methodology matters.'
        },
        {
          label: 'Analyst Thinking',
          children: 'Ask: What services are exposed? What versions are running? What could be exploited? What would a defender see?'
        },
        {
          label: 'Why Nmap?',
          children: 'Industry-standard tool combining host discovery, port scanning, service detection, OS fingerprinting, and vulnerability assessment in one framework.'
        }
      ]} />

      <InfoCard type="tip" title="💡 Reconnaissance Before Exploitation">
        Professional engagements follow a clear progression: <strong>passive OSINT → active reconnaissance → 
        vulnerability analysis → exploitation</strong>. Rushing to exploitation without thorough reconnaissance 
        means missed entry points and incomplete security assessments.
      </InfoCard>

      <DiagramContainer title="Reconnaissance Investigation Workflow">
        <ReconnaissanceWorkflow />
      </DiagramContainer>

      <MCQBlock questions={questions} />
    </LessonCard>
  );
}

// Section 02: How Network Scanning Works
function ScanningFundamentalsSection() {
  const questions = [
    { q: "In a SYN scan, what does receiving a SYN-ACK packet from the target indicate?", options: ["A. The port is closed", "B. The port is filtered by a firewall", "C. The port is open and a service is listening", "D. The scan has been detected"], answer: "C" },
    { q: "What is the fundamental difference between host discovery and port scanning?", options: ["A. They use different protocols", "B. Host discovery determines if a target is reachable; port scanning identifies which services are accessible", "C. Port scanning is always faster", "D. Host discovery requires administrator privileges"], answer: "B" },
    { q: "Why does Nmap send a RST packet after receiving a SYN-ACK during a SYN scan?", options: ["A. To crash the target service", "B. To complete the three-way handshake", "C. To prevent completing the connection, making the scan stealthier and less likely to be logged", "D. To test firewall rules"], answer: "C" },
  ];

  return (
    <LessonCard number="02" title="How Network Scanning Works" subtitle="Understanding the technical foundation">
      <SectionIntro>
        Before using Nmap effectively, you must understand how network scanning works at the packet level. 
        Port scanning exploits TCP/IP behavior: send specific packets, analyze responses, infer port states. 
        This knowledge shapes scan selection and result interpretation.
      </SectionIntro>

      <DiagramContainer title="Nmap Scan Process" subtitle="From probe to port state determination">
        <ScanProcessDiagram />
      </DiagramContainer>

      <ConceptGrid concepts={[
        {
          label: 'Host Discovery',
          children: 'Before scanning 65,535 ports on 254 hosts (16.6M probes), first find which hosts are UP. Uses ICMP, TCP SYN/ACK, ARP.'
        },
        {
          label: 'Port States',
          children: <>
            <strong>OPEN</strong>: Service listening (exploit target)<br/>
            <strong>CLOSED</strong>: Host reachable, no service (informational)<br/>
            <strong>FILTERED</strong>: Firewall blocking (unknown state)
          </>
        },
        {
          label: 'TCP Three-Way Handshake',
          children: <>Scanner sends SYN → Target responds SYN-ACK → Scanner completes ACK. Nmap often skips the final ACK for stealth.</>
        },
        {
          label: 'Service Detection',
          children: 'After finding open ports, Nmap probes services to identify application name and version. Critical for CVE lookup.'
        }
      ]} />

      <DiagramContainer title="Port State Determination" subtitle="How Nmap interprets responses">
        <PortStateDiagram />
      </DiagramContainer>

      <InfoCard type="warn" title="⚠️ Why Port State Matters">
        <strong>OPEN ports</strong> are potential entry points — enumerate versions, check CVEs.<br/>
        <strong>FILTERED ports</strong> indicate firewall presence — may need evasion techniques.<br/>
        <strong>CLOSED ports</strong> confirm host is reachable but no immediate target.
      </InfoCard>

      <MCQBlock questions={questions} />
    </LessonCard>
  );
}

// Section 03: Reconnaissance Methodology
function ReconMethodologySection() {
  const questions = [
    { q: "Why should you perform host discovery (-sn) before comprehensive port scanning?", options: ["A. It's required by Nmap", "B. Scanning all ports on all IPs wastes time; discover live hosts first, then scan only those", "C. Host discovery is more stealthy", "D. Port scanning doesn't work without host discovery"], answer: "B" },
    { q: "An analyst scans a /24 subnet and finds 12 hosts UP. What should be the next step?", options: ["A. Exploit the first host immediately", "B. Run a comprehensive port scan (-p- -sV) on the 12 live hosts", "C. Rescan the entire subnet faster", "D. Document nothing and continue scanning"], answer: "B" },
    { q: "What does the -oA flag do, and why is it critical?", options: ["A. Speeds up scanning", "B. Saves output in all formats (normal, XML, grepable) simultaneously — prevents data loss if terminal closes", "C. Enables aggressive scanning", "D. Runs NSE scripts automatically"], answer: "B" },
  ];

  return (
    <LessonCard number="03" title="Reconnaissance Workflow" subtitle="Structured investigation methodology">
      <SectionIntro>
        Effective reconnaissance follows a deliberate methodology: discover targets → identify live hosts → scan ports → 
        detect services → analyze results → document findings. This workflow maximizes efficiency while ensuring 
        complete coverage of the attack surface.
      </SectionIntro>

      <DiagramContainer title="Host Discovery Process" subtitle="Finding live hosts efficiently">
        <HostDiscoveryFlow />
      </DiagramContainer>

      <TerminalBlock
        title="Phase 1: Host Discovery"
        description="Find live hosts in a subnet without port scanning"
        command="nmap -sn 192.168.1.0/24"
        output="Starting Nmap 7.94
Nmap scan report for 192.168.1.1
Host is up (0.0012s latency).
Nmap scan report for 192.168.1.10
Host is up (0.0034s latency).
Nmap scan report for 192.168.1.25
Host is up (0.0021s latency).
Nmap done: 256 IP addresses (3 hosts up) scanned in 3.45 seconds"
      />

      <TerminalBlock
        title="Phase 2: Port Scanning (Top 1000 Ports)"
        description="Quick scan of most common ports on discovered hosts"
        command="nmap -sV 192.168.1.1,10,25 -oA initial_scan"
        output="Starting Nmap 7.94
Nmap scan report for 192.168.1.1
PORT    STATE SERVICE  VERSION
22/tcp  open  ssh      OpenSSH 8.2p1
80/tcp  open  http     Apache 2.4.41
443/tcp open  https    Apache 2.4.41

Nmap done: 3 IP addresses (3 hosts up) scanned in 18.23 seconds"
      />

      <TerminalBlock
        title="Phase 3: Comprehensive Scan (All Ports + NSE)"
        description="Deep scan with all ports and vulnerability scripts"
        command="nmap -p- -sV -sC --script vuln 192.168.1.1 -oA full_scan"
        output="Starting Nmap 7.94
Nmap scan report for 192.168.1.1
PORT     STATE SERVICE  VERSION
22/tcp   open  ssh      OpenSSH 8.2p1
80/tcp   open  http     Apache 2.4.41
443/tcp  open  https    Apache 2.4.41
3306/tcp open  mysql    MySQL 5.7.30

Host script results:
| http-csrf: Potential CSRF vulnerability detected
| http-sql-injection: Possible SQL injection point found

Nmap done: 1 IP address (1 host up) scanned in 245.67 seconds"
      />

      <InfoCard type="tip" title="💡 Always Save Output">
        Use <code>-oA basename</code> at the start of every scan. Losing hours of scan data because a terminal 
        closed is a common and completely avoidable mistake. XML output integrates with Metasploit, Faraday, Dradis.
      </InfoCard>

      <MCQBlock questions={questions} />
    </LessonCard>
  );
}

// Section 04: Scan Types Explained
function ScanTypesSection() {
  const questions = [
    { q: 'Why is the SYN scan (-sS) considered stealthier than a TCP Connect scan (-sT)?', options: ['A. It uses UDP instead of TCP', 'B. It never completes the three-way handshake, so the connection is less likely to be logged', 'C. It runs faster and uses less bandwidth', 'D. It requires no network access'], answer: 'B' },
    { q: 'Which Nmap scan type is specifically used to map firewall rules rather than discover open ports?', options: ['A. SYN scan (-sS)', 'B. UDP scan (-sU)', 'C. ACK scan (-sA)', 'D. Version scan (-sV)'], answer: 'C' },
    { q: 'Why are NULL, FIN, and Xmas scans unreliable against Windows hosts?', options: ['A. Windows blocks all Nmap traffic', 'B. Windows does not respond to these unusual flag combinations as RFC 793 specifies', 'C. These scans require a Windows-specific licence', 'D. Windows only supports UDP scanning'], answer: 'B' },
  ];

  return (
    <LessonCard number="04" title="Scan Types Explained" subtitle="Choosing the right scan for your objective">
      <SectionIntro>
        Nmap offers multiple scan types, each with different stealth characteristics, speed, and detection profiles.
        Understanding when and why to use each scan type transforms Nmap from a simple port scanner into a flexible
        reconnaissance framework.
      </SectionIntro>

      <ConceptGrid concepts={[
        {
          label: 'SYN Scan (-sS)',
          children: <>
            <strong>Default and most popular.</strong> Sends SYN, waits for SYN-ACK, sends RST (never completes handshake). 
            Faster and less likely to be logged than full TCP connect. Requires root/admin privileges.
          </>
        },
        {
          label: 'TCP Connect (-sT)',
          children: <>
            Completes full three-way handshake. Used when SYN scan requires unavailable privileges or is blocked. 
            More detectable — applications log full connections.
          </>
        },
        {
          label: 'UDP Scan (-sU)',
          children: <>
            Probes UDP ports. Slower than TCP (no handshake, relies on ICMP unreachable responses). 
            Critical for discovering DNS, SNMP, DHCP services often missed by TCP-only scans.
          </>
        },
        {
          label: 'NULL/FIN/Xmas (-sN,-sF,-sX)',
          children: <>
            Send packets with unusual flag combinations to bypass stateless firewalls. 
            Unreliable against Windows (doesn't follow RFC 793). Useful for firewall rule testing.
          </>
        },
        {
          label: 'ACK Scan (-sA)',
          children: <>
            Maps firewall rules rather than finding open ports. Determines if ports are filtered/unfiltered by stateful firewalls. 
            Essential for understanding defensive architecture.
          </>
        },
        {
          label: 'Version Detection (-sV)',
          children: <>
            After finding open ports, probes services to identify application name and version. 
            Critical for CVE lookup and vulnerability assessment. Combines with any scan type.
          </>
        }
      ]} />

      <TerminalBlock
        title="SYN Scan Example"
        description="Stealthy scan without completing handshake"
        command="sudo nmap -sS 192.168.1.10"
        output="Starting Nmap 7.94
Nmap scan report for 192.168.1.10
PORT    STATE SERVICE
22/tcp  open  ssh
80/tcp  open  http
443/tcp open  https"
      />

      <TerminalBlock
        title="UDP Scan Example"
        description="Discover UDP services (slower but essential)"
        command="sudo nmap -sU --top-ports 20 192.168.1.10"
        output="Starting Nmap 7.94
Nmap scan report for 192.168.1.10
PORT    STATE         SERVICE
53/udp  open          domain
161/udp open          snmp"
      />

      <InfoCard type="warn" title="⚠️ Scan Selection Matters">
        <strong>Fast engagement?</strong> Use -sS -T4 for speed.<br/>
        <strong>Stealth required?</strong> Use -sS -T0 with randomized port order.<br/>
        <strong>Firewall testing?</strong> Use -sA to map rules.<br/>
        <strong>Complete coverage?</strong> Run both TCP and UDP (-sS -sU).
      </InfoCard>

      <MCQBlock questions={questions} />
    </LessonCard>
  );
}

// Section 05: Essential Commands & Techniques
function CommandsAndTechniquesSection() {
  const questions = [
    { q: 'What does the `-p-` flag tell Nmap to do?', options: ['A. Scan only privileged ports (1–1024)', 'B. Scan all 65,535 TCP ports', 'C. Skip port scanning entirely', 'D. Scan UDP ports only'], answer: 'B' },
    { q: 'Which Nmap flag saves output in all three formats simultaneously?', options: ['A. -oN', 'B. -oX', 'C. -oA', 'D. -oG'], answer: 'C' },
    { q: 'What does `nmap -sn 192.168.1.0/24` do?', options: ['A. Scans all ports on 192.168.1.0', 'B. Performs a ping sweep to discover live hosts in the subnet without port scanning', 'C. Runs NSE scripts against the subnet', 'D. Performs a UDP scan of the subnet'], answer: 'B' },
    { q: 'Which timing template is most appropriate for evading IDS detection during a stealth engagement?', options: ['A. -T4', 'B. -T5', 'C. -T0 or -T1', 'D. -T3'], answer: 'C' },
    { q: 'What is the risk of using -T5 (Insane) on a slow or congested network?', options: ['A. It will crash the target server', 'B. Open ports may be missed due to very short timeouts', 'C. It requires root privileges', 'D. It only works on Windows targets'], answer: 'B' },
    { q: 'What language are Nmap NSE scripts written in?', options: ['A. Python', 'B. JavaScript', 'C. Lua', 'D. Bash'], answer: 'C' },
  ];

  return (
    <LessonCard number="05" title="Essential Commands & Techniques" subtitle="Practical Nmap usage patterns">
      <SectionIntro>
        Mastering Nmap requires understanding not just individual flags, but how to combine them for specific objectives.
        This section covers essential command patterns, timing control, NSE scripting, and output management — the 
        building blocks of professional reconnaissance.
      </SectionIntro>

      <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.35rem', fontWeight: 700, color: '#e6e9f0', marginTop: '2rem', marginBottom: '1rem' }}>
        Essential Command Patterns
      </h3>

      <TerminalBlock
        title="Comprehensive Scan"
        description="All ports with version detection"
        command="nmap -sV -p- 192.168.1.10"
        output="Scans all 65,535 TCP ports with version detection
Thorough but slow (can take hours on large networks)"
      />

      <TerminalBlock
        title="Quick Initial Scan"
        description="Default scripts + version detection"
        command="nmap -sC -sV 192.168.1.10"
        output="Runs default NSE scripts alongside version detection
Good starting point for most engagements"
      />

      <TerminalBlock
        title="Aggressive Scan"
        description="OS detection, version, scripts, traceroute"
        command="nmap -A 192.168.1.10"
        output="Combines OS detection, version detection, script scanning, traceroute
Fast but noisy — easily detected"
      />

      <TerminalBlock
        title="Ping Sweep"
        description="Discover live hosts without port scanning"
        command="nmap -sn 192.168.1.0/24"
        output="Fast discovery of live hosts in subnet
No port scan — just checks if hosts respond"
      />

      <TerminalBlock
        title="Vulnerability Scan"
        description="Run vulnerability detection scripts"
        command="nmap --script vuln 192.168.1.10"
        output="Runs NSE vulnerability scripts against target
Detects common CVEs, misconfigurations
Requires explicit authorization — intrusive"
      />

      <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.35rem', fontWeight: 700, color: '#e6e9f0', marginTop: '2.5rem', marginBottom: '1rem' }}>
        Timing and Performance
      </h3>

      <ConceptGrid concepts={[
        {
          label: 'Timing Templates',
          children: <>
            <strong>-T0 (Paranoid) / -T1 (Sneaky)</strong>: Extremely slow, evade IDS (impractical for large scopes)<br/>
            <strong>-T3 (Normal)</strong>: Default balanced timing<br/>
            <strong>-T4 (Aggressive)</strong>: Fast, common in labs/CTFs<br/>
            <strong>-T5 (Insane)</strong>: Fastest, may miss ports on slow networks
          </>
        },
        {
          label: 'Rate Control',
          children: <>
            <code>--min-rate 100</code>: Send minimum 100 packets/second<br/>
            <code>--max-rate 1000</code>: Cap at 1000 packets/second<br/>
            Fine-grained control over scan speed
          </>
        },
        {
          label: 'Parallelism',
          children: <>
            <code>--min-parallelism 100</code>: Run at least 100 probes in parallel<br/>
            Significantly reduces scan time on stable networks<br/>
            Combine with -T4 for large engagements
          </>
        }
      ]} />

      <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.35rem', fontWeight: 700, color: '#e6e9f0', marginTop: '2.5rem', marginBottom: '1rem' }}>
        Nmap Scripting Engine (NSE)
      </h3>

      <SectionIntro>
        NSE extends Nmap with Lua scripts for service enumeration, vulnerability detection, brute-forcing, 
        and exploitation. Scripts organized into categories: auth, broadcast, brute, default, discovery, 
        dos, exploit, external, fuzzer, intrusive, malware, safe, version, vuln.
      </SectionIntro>

      <TerminalBlock
        title="Default Scripts"
        description="Safe, informative scripts"
        command="nmap --script default 192.168.1.10"
        output="# Or use -sC shorthand
nmap -sC 192.168.1.10"
      />

      <TerminalBlock
        title="Specific Script Category"
        description="Run vulnerability scripts"
        command="nmap --script vuln 192.168.1.10"
        output="Runs all scripts in 'vuln' category
Intrusive — requires authorization"
      />

      <TerminalBlock
        title="Multiple Specific Scripts"
        description="HTTP enumeration"
        command="nmap --script http-title,http-headers -p 80,443 192.168.1.10"
        output="Runs only specified scripts
Retrieves page titles and HTTP headers"
      />

      <InfoCard type="info">
        <strong>NSE Script Categories:</strong><br/>
        • <strong>safe</strong>: Non-intrusive, generally safe<br/>
        • <strong>default</strong>: Run with -sC, informative<br/>
        • <strong>vuln</strong>: Vulnerability detection (intrusive)<br/>
        • <strong>exploit</strong>: Active exploitation (dangerous)<br/>
        • <strong>auth</strong>: Authentication testing<br/>
        • <strong>brute</strong>: Brute-force attacks
      </InfoCard>

      <MCQBlock questions={questions} />
    </LessonCard>
  );
}

// Section 06: Interpreting Nmap Output
function OutputAnalysisSection() {
  const questions = [
    { q: 'Which Nmap output format is most useful for automated parsing and integration with other security tools?', options: ['A. Normal (-oN)', 'B. Grepable (-oG)', 'C. XML (-oX)', 'D. Script Kiddie (-oS)'], answer: 'C' },
    { q: 'What is the advantage of using `-oA <basename>` instead of a single output flag?', options: ['A. It compresses the output file', 'B. It saves results in all three main formats simultaneously', 'C. It automatically emails the report', 'D. It runs the scan faster'], answer: 'B' },
    { q: 'How would you quickly list all hosts with open ports from a grepable Nmap output file?', options: ['A. nmap --list-open output.gnmap', 'B. grep "open" output.gnmap', 'C. cat output.gnmap | sort', 'D. nmap -oN output.gnmap --filter open'], answer: 'B' },
  ];

  return (
    <LessonCard number="06" title="Interpreting Nmap Output" subtitle="From scan results to security findings">
      <SectionIntro>
        Running Nmap is easy. Understanding what the output means and translating it into security findings 
        separates script kiddies from analysts. This section teaches systematic output analysis and security 
        assessment based on scan results.
      </SectionIntro>

      <DiagramContainer title="Interactive Output Analysis" subtitle="Click any line to understand its meaning">
        <NmapOutputAnnotation />
      </DiagramContainer>

      <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.35rem', fontWeight: 700, color: '#e6e9f0', marginTop: '2.5rem', marginBottom: '1rem' }}>
        Output Formats
      </h3>

      <ConceptGrid concepts={[
        {
          label: 'Normal (-oN)',
          children: 'Human-readable format. Good for manual review, less useful for parsing.'
        },
        {
          label: 'XML (-oX)',
          children: 'Machine-parseable. Import into Metasploit, Faraday, Dradis. Essential for automation.'
        },
        {
          label: 'Grepable (-oG)',
          children: <>Quick command-line filtering: <code>grep "open" output.gnmap</code> lists all open ports instantly.</>
        },
        {
          label: 'All Formats (-oA)',
          children: <>Saves all three simultaneously: <code>-oA basename</code> creates basename.nmap, basename.xml, basename.gnmap</>
        }
      ]} />

      <TerminalBlock
        title="Save All Formats"
        description="Never lose scan data"
        command="nmap -sV 192.168.1.10 -oA scan_results"
        output="Creates three files:
  scan_results.nmap  (normal)
  scan_results.xml   (XML)
  scan_results.gnmap (grepable)"
      />

      <TerminalBlock
        title="Quick Filtering with Grepable Output"
        description="Extract specific information"
        command="grep 'open' scan_results.gnmap"
        output="Host: 192.168.1.1   Ports: 22/open/tcp//ssh///
Host: 192.168.1.10  Ports: 80/open/tcp//http///, 443/open/tcp//https///"
      />

      <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.35rem', fontWeight: 700, color: '#e6e9f0', marginTop: '2.5rem', marginBottom: '1rem' }}>
        Security Analysis Framework
      </h3>

      <InfoCard type="danger" title="🔴 Critical Findings">
        <strong>Database exposed externally</strong> (MySQL, PostgreSQL, MSSQL on ports 3306, 5432, 1433)<br/>
        → Immediate risk: unauthorized data access, credential attacks<br/><br/>
        <strong>Known vulnerable versions</strong> (outdated Apache, OpenSSH with CVEs)<br/>
        → Check exploit-db, Metasploit for public exploits<br/><br/>
        <strong>Administrative interfaces exposed</strong> (RDP 3389, VNC 5900, Telnet 23)<br/>
        → High-value targets, often weak authentication
      </InfoCard>

      <InfoCard type="warn" title="⚠️ Medium Findings">
        <strong>Web services without TLS</strong> (HTTP port 80 only, no HTTPS)<br/>
        → Traffic interceptable, credentials transmitted in clear<br/><br/>
        <strong>Multiple web services</strong> (ports 80, 443, 8080, 8443)<br/>
        → Increased attack surface, enumerate each for vulnerabilities<br/><br/>
        <strong>Outdated but not critically vulnerable</strong> software<br/>
        → Document, recommend updates, monitor for new CVEs
      </InfoCard>

      <InfoCard type="info">
        <strong>Report Structure:</strong><br/>
        1. Scan metadata (command, date, scope)<br/>
        2. Live hosts discovered<br/>
        3. Open ports per host<br/>
        4. Service versions identified<br/>
        5. Vulnerability findings (NSE results)<br/>
        6. Security recommendations<br/>
        7. Risk prioritization (Critical → High → Medium → Low)
      </InfoCard>

      <MCQBlock questions={questions} />
    </LessonCard>
  );
}

// Section 07: Detection & Defense
function DetectionDefenseSection() {
  const questions = [
    { q: "What makes sequential port scanning (ports 1-65535 in order) highly detectable?", options: ["A. It uses too much bandwidth", "B. The predictable pattern creates an obvious signature that IDS systems easily recognize", "C. It requires administrator privileges", "D. It only works on Windows"], answer: "B" },
    { q: "Which defensive system correlates logs from firewalls, IDS, and servers to identify distributed reconnaissance?", options: ["A. Firewall", "B. IDS/IPS", "C. SIEM (Security Information & Event Management)", "D. Antivirus"], answer: "C" },
    { q: "From a defender's perspective, what is the best way to reduce attack surface from reconnaissance?", options: ["A. Block all ICMP traffic", "B. Close unnecessary ports, disable unused services, implement least-privilege network segmentation", "C. Use only Windows servers", "D. Disable all logging to avoid detection"], answer: "B" },
  ];

  return (
    <LessonCard number="07" title="Detection & Defense" subtitle="Understanding the defender's perspective">
      <SectionIntro>
        No scan is truly invisible. Every reconnaissance activity leaves traces in logs, triggers alerts, 
        and creates network anomalies. Understanding how defenders detect scans makes you a better attacker 
        and a better defender. This section presents both perspectives.
      </SectionIntro>

      <DiagramContainer title="Defensive Detection Layers" subtitle="How security teams see reconnaissance">
        <ScanDetectionIndicators />
      </DiagramContainer>

      <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.35rem', fontWeight: 700, color: '#e6e9f0', marginTop: '2.5rem', marginBottom: '1rem' }}>
        Detection Mechanisms
      </h3>

      <ConceptGrid concepts={[
        {
          label: 'Firewall Logs',
          children: <>
            Detect: Port scan patterns, unusual connection attempts, sequential port access<br/>
            Log: Source IP, destination ports, connection states, timestamps<br/>
            Alert: Multiple connection attempts to different ports in short time
          </>
        },
        {
          label: 'IDS/IPS Systems',
          children: <>
            Detect: Nmap signatures, scan timing patterns, OS fingerprinting attempts<br/>
            Action: Alert security team (IDS) or block attacker IP (IPS mode)<br/>
            Examples: Snort, Suricata, Zeek (Bro)
          </>
        },
        {
          label: 'SIEM Platforms',
          children: <>
            Correlates: Firewall + IDS + server logs + failed auth attempts<br/>
            Identifies: Distributed scans, reconnaissance across multiple targets<br/>
            Examples: Splunk, ELK Stack, IBM QRadar
          </>
        },
        {
          label: 'Network Traffic Analysis',
          children: <>
            Detects: Traffic anomalies, unusual packet patterns, bandwidth spikes<br/>
            Baseline: Compares current behavior against normal network patterns<br/>
            Anomaly: Sudden spike in SYN packets = probable scan
          </>
        }
      ]} />

      <InfoCard type="warn" title="⚠️ What Makes Scans Detectable?">
        <strong>Sequential port scanning</strong> (1→65535 in order) creates obvious signature<br/>
        <strong>Rapid scans</strong> (-T4, -T5) generate high packet volumes in short time<br/>
        <strong>OS fingerprinting</strong> sends unusual packet combinations that trigger IDS<br/>
        <strong>NSE vulnerability scripts</strong> perform intrusive probes logged by applications<br/>
        <strong>Same source IP</strong> across multiple targets reveals reconnaissance pattern
      </InfoCard>

      <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.35rem', fontWeight: 700, color: '#e6e9f0', marginTop: '2.5rem', marginBottom: '1rem' }}>
        Evasion Techniques (Attacker Perspective)
      </h3>

      <TerminalBlock
        title="Slow Timing for Stealth"
        description="Evade rate-based detection"
        command="nmap -sS -T0 --randomize-hosts 192.168.1.0/24"
        output="Extremely slow scan (hours)
Randomizes target order
Spaces probes far apart
Still leaves logs, just delays detection"
      />

      <TerminalBlock
        title="Fragmentation"
        description="Split packets to evade simple packet inspection"
        command="nmap -f 192.168.1.10"
        output="Fragments TCP header into tiny packets
May bypass simple IDS rules
Modern IDS systems reassemble packets"
      />

      <TerminalBlock
        title="Decoy Scans"
        description="Hide among fake source IPs"
        command="nmap -D RND:10 192.168.1.10"
        output="Generates 10 random decoy IPs
Target sees scans from 11 sources
Difficult to determine real attacker
Ineffective if network has egress filtering"
      />

      <InfoCard type="danger" title="🔴 Reality Check">
        <strong>No scan is truly invisible.</strong> All techniques leave logs. Stealth only delays detection 
        and makes attribution harder. Professional engagements require authorization regardless of stealth level.
      </InfoCard>

      <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.35rem', fontWeight: 700, color: '#e6e9f0', marginTop: '2.5rem', marginBottom: '1rem' }}>
        Defensive Recommendations
      </h3>

      <ConceptGrid concepts={[
        {
          label: 'Attack Surface Reduction',
          children: <>
            • Close unnecessary ports<br/>
            • Disable unused services<br/>
            • Remove default installations<br/>
            • Principle: What's not there can't be exploited
          </>
        },
        {
          label: 'Network Segmentation',
          children: <>
            • Segment critical systems behind internal firewalls<br/>
            • Limit lateral movement<br/>
            • Database servers should never face internet<br/>
            • DMZ for public services only
          </>
        },
        {
          label: 'Monitoring & Alerting',
          children: <>
            • Deploy IDS/IPS on network perimeter<br/>
            • Centralize logs in SIEM<br/>
            • Alert on scan signatures and anomalies<br/>
            • Regular log review and incident response drills
          </>
        },
        {
          label: 'Regular Self-Assessment',
          children: <>
            • Scan your own infrastructure regularly<br/>
            • See what attackers see before they do<br/>
            • Fix exposed services and vulnerabilities<br/>
            • Validate firewall rules and segmentation
          </>
        }
      ]} />

      <InfoCard type="tip" title="💡 Defender's Advantage">
        Reconnaissance is noisy. Attackers must scan to find entry points. Defenders only need to detect 
        the scan and respond. <strong>Early detection during reconnaissance prevents exploitation.</strong>
      </InfoCard>

      <MCQBlock questions={questions} />
    </LessonCard>
  );
}

// Main Component
function ReconNmap() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Suspense fallback={<div />}>
        <ShaderGradientCanvas style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, opacity: 0.8 }}>
          <ShaderGradient
            animate="off"
            axesHelper="on"
            brightness={1.4}
            cAzimuthAngle={0}
            cDistance={7.1}
            cPolarAngle={140}
            cameraZoom={17.29}
            color1="#aeacb7"
            color2="#152921"
            color3="#002f00"
            destination="onCanvas"
            embedMode="off"
            envPreset="city"
            format="gif"
            fov={45}
            frameRate={10}
            gizmoHelper="hide"
            grain="off"
            lightType="3d"
            pixelDensity={1}
            positionX={0}
            positionY={0}
            positionZ={0}
            range="disabled"
            rangeEnd={40}
            rangeStart={0}
            reflection={0.1}
            rotationX={0}
            rotationY={0}
            rotationZ={0}
            shader="defaults"
            type="sphere"
            uAmplitude={1.6}
            uDensity={1.1}
            uFrequency={5.5}
            uSpeed={0.1}
            uStrength={1}
            uTime={0}
            wireframe={false}
          />
        </ShaderGradientCanvas>
      </Suspense>

      <Navbar />

      <div className="container" style={{ position: 'relative', zIndex: 1, paddingBottom: '4rem' }}>
        <div className="page-header elegant-header">
          <div className="header-icon">
            <ReconIcon size={80} />
          </div>
          <h1 className="elegant-title" style={{ color: '#abcfc9', fontFamily: "'Sora', sans-serif" }}>
            Network Reconnaissance with Nmap
          </h1>
          <p className="elegant-subtitle" style={{ fontFamily: "'Sora', sans-serif" }}>
            Master systematic network scanning and intelligence gathering
            <span className="difficulty medium" style={{ marginLeft: '1rem', verticalAlign: 'middle' }}>
              medium
            </span>
          </p>
          <div className="header-divider"></div>
        </div>

        <Link
          to="/reconnaissance"
          className="back-btn"
          style={{
            background: 'rgba(0,0,0,0.35)',
            border: '1px solid #00FFC8',
            color: '#FFFFFF',
            transition: 'transform 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(92,242,255,0.25)';
            e.target.style.borderColor = '#5CF2FF';
            e.target.style.transform = 'scale(1.05) translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(0,0,0,0.35)';
            e.target.style.borderColor = '#00FFC8';
            e.target.style.transform = 'scale(1) translateY(0)';
          }}
        >
          ← Back to Reconnaissance
        </Link>

        <div style={{ marginTop: '2rem' }}>
          <IntroductionSection />
          <ScanningFundamentalsSection />
          <ReconMethodologySection />
          <ScanTypesSection />
          <CommandsAndTechniquesSection />
          <OutputAnalysisSection />
          <DetectionDefenseSection />
        </div>
      </div>
    </div>
  );
}

export default ReconNmap;
