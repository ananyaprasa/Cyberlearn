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
import PacketCaptureWorkflow from '../components/learning/network/PacketCaptureWorkflow';
import PacketEncapsulation from '../components/learning/network/PacketEncapsulation';
import WiresharkInterfaceMockup from '../components/learning/network/WiresharkInterfaceMockup';
import TrafficAnalysisWorkflow from '../components/learning/network/TrafficAnalysisWorkflow';
import WiresharkFilterCard from '../components/learning/network/WiresharkFilterCard';

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

const TransitionMarker = () => (
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
      From Packets to Intelligence
    </h2>
    <p style={{
      fontFamily: "'Oxanium', sans-serif",
      fontSize: '1.1rem',
      color: 'rgba(171, 207, 201, 0.9)',
      maxWidth: '700px',
      margin: '0 auto',
      lineHeight: 1.6
    }}>
      You now understand how Wireshark captures and dissects packets. Next, we shift from
      <strong style={{ color: '#e6e9f0' }}> understanding traffic</strong> to
      <strong style={{ color: '#e6e9f0' }}> investigating traffic</strong> — thinking like a security analyst.
    </p>
  </div>
);

// PART 1: TECHNICAL FOUNDATION SECTIONS

function IntroductionSection() {
  const questions = [
    { q: 'What does promiscuous mode allow a network interface to do?', options: ['A. Send packets faster than normal', 'B. Capture all packets on the network segment, not just those addressed to the local host', 'C. Encrypt all captured traffic automatically', 'D. Block malicious packets before they reach the host'], answer: 'B' },
    { q: 'Which Wireshark pane shows the raw hexadecimal and ASCII representation of a packet?', options: ['A. Packet list pane', 'B. Packet details pane', 'C. Packet bytes pane', 'D. Filter toolbar'], answer: 'C' },
    { q: 'In which security scenario is Wireshark most commonly used?', options: ['A. Encrypting network traffic', 'B. Blocking firewall rules', 'C. Capturing and analysing packets for troubleshooting and incident response', 'D. Scanning for open ports'], answer: 'C' },
  ];

  return (
    <LessonCard number="01" title="Introduction to Wireshark" subtitle="The world's most powerful network protocol analyzer">
      <SectionIntro>
        Wireshark is the industry-standard open-source tool for capturing and analyzing network traffic in real time.
        It translates raw packet data into human-readable format, revealing what's happening on your network at the
        packet level — essential for troubleshooting, security analysis, and protocol development.
      </SectionIntro>

      <DiagramContainer title="Packet Capture Workflow" subtitle="How traffic reaches the analyst">
        <PacketCaptureWorkflow />
      </DiagramContainer>

      <ConceptGrid concepts={[
        {
          label: 'Promiscuous Mode',
          children: 'Network interface captures ALL packets on the segment, not just those addressed to the local host. Required for analyzing traffic between other machines.'
        },
        {
          label: 'Protocol Dissection',
          children: 'Wireshark automatically decodes hundreds of protocols — Ethernet, IP, TCP, HTTP, DNS, TLS — from raw bytes into structured, readable format.'
        },
        {
          label: 'Three-Pane Interface',
          children: 'Packet List (summary), Packet Details (protocol tree), Packet Bytes (raw hex/ASCII). Each pane provides different analysis depth.'
        },
        {
          label: 'Use Cases',
          children: 'Network troubleshooting, security incident response, malware traffic analysis, protocol development, penetration testing.'
        }
      ]} />

      <DiagramContainer title="Wireshark Interface Layout" subtitle="Understanding the three-pane view">
        <WiresharkInterfaceMockup />
      </DiagramContainer>

      <InfoCard type="info">
        Wireshark displays packets as they are captured. The <strong>Packet List</strong> shows summaries,
        <strong> Packet Details</strong> expands protocols into fields, and <strong>Packet Bytes</strong> shows
        the raw data. Click any packet to inspect it across all three panes simultaneously.
      </InfoCard>

      <MCQBlock questions={questions} />
    </LessonCard>
  );
}

function PacketCaptureSection() {
  const questions = [
    { q: 'What is the difference between a capture filter and a display filter in Wireshark?', options: ['A. They are the same thing with different names', 'B. Capture filters limit what is recorded before capture; display filters show subsets of an existing capture', 'C. Display filters are applied before capture; capture filters after', 'D. Capture filters only work on wireless interfaces'], answer: 'B' },
    { q: 'Why can\'t Wireshark capture traffic between two other hosts on a switched network by default?', options: ['A. Wireshark does not support switched networks', 'B. Switches forward frames only to the destination port, so other hosts do not receive the traffic', 'C. Switches encrypt traffic between ports', 'D. Wireshark requires root access on switched networks'], answer: 'B' },
    { q: 'Which file format does Wireshark use to save captured packets for offline analysis?', options: ['A. .csv', 'B. .pcap or .pcapng', 'C. .xml', 'D. .json'], answer: 'B' },
  ];

  return (
    <LessonCard number="02" title="Packet Capture Fundamentals" subtitle="How Wireshark sees your network">
      <SectionIntro>
        Before analyzing packets, you must capture them. Understanding packet encapsulation, capture vs display
        filters, and switched network limitations is foundational. Wireshark doesn't generate traffic — it observes
        what already exists.
      </SectionIntro>

      <DiagramContainer title="Packet Encapsulation" subtitle="What Wireshark sees at each layer">
        <PacketEncapsulation />
      </DiagramContainer>

      <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.35rem', fontWeight: 700, color: '#e6e9f0', marginTop: '2.5rem', marginBottom: '1rem' }}>
        Capture Filters vs Display Filters
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', margin: '2rem 0' }}>
        <div style={{ background: 'rgba(45, 214, 143, 0.08)', border: '1px solid rgba(45, 214, 143, 0.25)', borderRadius: '16px', padding: '2rem' }}>
          <h4 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.35rem', fontWeight: 700, color: '#2dd68f', marginBottom: '1.5rem' }}>Capture Filters</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.75rem' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'rgba(224, 224, 224, 0.9)' }}>
              <span style={{ color: '#2dd68f', fontSize: '1.25rem', lineHeight: 1 }}>•</span>
              Applied BEFORE capture
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'rgba(224, 224, 224, 0.9)' }}>
              <span style={{ color: '#2dd68f', fontSize: '1.25rem', lineHeight: 1 }}>•</span>
              Uses BPF (Berkeley Packet Filter) syntax
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'rgba(224, 224, 224, 0.9)' }}>
              <span style={{ color: '#2dd68f', fontSize: '1.25rem', lineHeight: 1 }}>•</span>
              Limits what is written to memory
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'rgba(224, 224, 224, 0.9)' }}>
              <span style={{ color: '#2dd68f', fontSize: '1.25rem', lineHeight: 1 }}>•</span>
              Reduces resource usage on busy networks
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'rgba(224, 224, 224, 0.9)' }}>
              <span style={{ color: '#2dd68f', fontSize: '1.25rem', lineHeight: 1 }}>•</span>
              Example: <code style={{ background: 'rgba(45, 214, 143, 0.15)', padding: '0.2rem 0.5rem', borderRadius: '4px', color: '#3de9a0' }}>host 192.168.1.1</code>
            </li>
          </ul>
        </div>

        <div style={{ background: 'rgba(2, 168, 154, 0.08)', border: '1px solid rgba(2, 168, 154, 0.25)', borderRadius: '16px', padding: '2rem' }}>
          <h4 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.35rem', fontWeight: 700, color: '#02a89a', marginBottom: '1.5rem' }}>Display Filters</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.75rem' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'rgba(224, 224, 224, 0.9)' }}>
              <span style={{ color: '#02a89a', fontSize: '1.25rem', lineHeight: 1 }}>•</span>
              Applied AFTER capture
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'rgba(224, 224, 224, 0.9)' }}>
              <span style={{ color: '#02a89a', fontSize: '1.25rem', lineHeight: 1 }}>•</span>
              Uses Wireshark's own syntax
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'rgba(224, 224, 224, 0.9)' }}>
              <span style={{ color: '#02a89a', fontSize: '1.25rem', lineHeight: 1 }}>•</span>
              Shows subsets of existing capture
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'rgba(224, 224, 224, 0.9)' }}>
              <span style={{ color: '#02a89a', fontSize: '1.25rem', lineHeight: 1 }}>•</span>
              Can be changed without recapturing
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'rgba(224, 224, 224, 0.9)' }}>
              <span style={{ color: '#02a89a', fontSize: '1.25rem', lineHeight: 1 }}>•</span>
              Example: <code style={{ background: 'rgba(2, 168, 154, 0.15)', padding: '0.2rem 0.5rem', borderRadius: '4px', color: '#3de9a0' }}>tcp.port == 443</code>
            </li>
          </ul>
        </div>
      </div>

      <InfoCard type="warn" title="⚠️ Switched Network Limitation">
        On switched networks, Ethernet frames are sent only to the destination port. Your interface won't see
        traffic between other hosts unless you configure a <strong>SPAN/mirror port</strong>, use a
        <strong> network tap</strong>, or are positioned inline. This is by design — switches segment traffic.
      </InfoCard>

      <ConceptGrid concepts={[
        {
          label: '.pcap / .pcapng Files',
          children: 'Standard capture file formats. .pcapng supports metadata and multiple interfaces. Use for offline analysis, sharing, or importing into other tools.'
        },
        {
          label: 'Remote Capture',
          children: <>Wireshark can capture on remote systems via <code>rpcapd</code> or SSH tunneling. Useful for analyzing traffic on servers without GUI access.</>
        }
      ]} />

      <MCQBlock questions={questions} />
    </LessonCard>
  );
}

// PART 2: INVESTIGATION METHODOLOGY SECTIONS

function TrafficAnalysisSection() {
  const questions = [
    { q: 'What is the first step in the Wireshark investigation workflow?', options: ['A. Apply a filter immediately', 'B. Define the investigation question: What am I trying to understand?', 'C. Follow a TCP stream', 'D. Export all packets to CSV'], answer: 'B' },
    { q: 'Why is "Follow TCP Stream" valuable during an investigation?', options: ['A. It encrypts the conversation', 'B. It reconstructs the entire bidirectional conversation in readable format', 'C. It automatically identifies malware', 'D. It blocks malicious traffic'], answer: 'B' },
    { q: 'A security analyst captures traffic and immediately sees thousands of packets. What should they do first?', options: ['A. Read every packet sequentially', 'B. Apply a filter to isolate traffic relevant to their investigation question', 'C. Export the capture and quit Wireshark', 'D. Restart the capture with a smaller time window'], answer: 'B' },
  ];

  return (
    <LessonCard number="03" title="Traffic Analysis Workflow" subtitle="Thinking like a security analyst">
      <SectionIntro>
        Traffic analysis is not random packet inspection. Professional analysts follow a structured workflow:
        define the question, capture targeted traffic, filter signal from noise, inspect protocol behavior,
        reconstruct conversations, identify patterns, and make security decisions. This is the analyst mindset.
      </SectionIntro>

      <DiagramContainer title="Investigation Workflow" subtitle="From question to decision">
        <TrafficAnalysisWorkflow />
      </DiagramContainer>

      <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.35rem', fontWeight: 700, color: '#e6e9f0', marginTop: '2.5rem', marginBottom: '1rem' }}>
        The Seven-Stage Process
      </h3>

      <ConceptGrid concepts={[
        {
          label: '1. Question',
          children: 'Start with a clear objective: "Is this host beaconing?" "What caused the connection timeout?" "Did credentials transmit in cleartext?" Without a question, analysis is directionless.'
        },
        {
          label: '2. Capture Traffic',
          children: 'Collect packets relevant to the question. Use capture filters on busy networks to avoid capturing irrelevant traffic that obscures the signal.'
        },
        {
          label: '3. Apply Filter',
          children: 'Display filters isolate suspicious patterns. On a capture with 50,000 packets, a good filter reduces it to 20 relevant packets. This is where expertise shows.'
        },
        {
          label: '4. Inspect Packets',
          children: 'Examine protocol details in the packet details pane. Look at flags, sequence numbers, response codes, hostnames. The details reveal intent.'
        },
        {
          label: '5. Follow Conversation',
          children: <>Right-click a packet → Follow → TCP/HTTP Stream. Reconstructs the full bidirectional exchange. Essential for understanding application-layer behavior.</>
        },
        {
          label: '6. Identify Pattern',
          children: 'Repeated behavior over time indicates automated processes. Regular DNS queries, periodic HTTPS connections, consistent payload sizes — these patterns distinguish normal from suspicious.'
        },
        {
          label: '7. Security Decision',
          children: 'Based on evidence, determine: Is this benign software update traffic or C2 beaconing? Is this a failed login or a brute-force attempt? Evidence-driven conclusions.'
        }
      ]} />

      <InfoCard type="tip" title="💡 Analyst Mindset">
        Good analysts don't just look at individual packets — they look for <strong>patterns across time</strong>.
        A single DNS query is normal. 500 DNS queries to random subdomains in 10 seconds is DNS tunneling.
        Context and pattern recognition separate signal from noise.
      </InfoCard>

      <MCQBlock questions={questions} />
    </LessonCard>
  );
}

function FiltersSection() {
  const questions = [
    { q: 'Which display filter shows all HTTP traffic?', options: ['A. tcp.port == 80', 'B. http', 'C. port:80', 'D. protocol == http'], answer: 'B' },
    { q: 'An analyst wants to see all traffic to or from 192.168.1.100. Which filter is correct?', options: ['A. ip.addr == 192.168.1.100', 'B. host == 192.168.1.100', 'C. ip == 192.168.1.100', 'D. address == 192.168.1.100'], answer: 'A' },
    { q: 'Which filter identifies TCP connection establishment attempts?', options: ['A. tcp', 'B. tcp.flags.syn == 1 && tcp.flags.ack == 0', 'C. tcp.port == 443', 'D. tcp.stream'], answer: 'B' },
  ];

  const filterExamples = [
    {
      filter: 'http',
      purpose: 'Show all HTTP traffic',
      when: 'Investigating web application behavior or cleartext HTTP communications',
      observation: 'Reveals GET/POST requests, response codes, user agents, hostnames'
    },
    {
      filter: 'dns',
      purpose: 'Show all DNS queries and responses',
      when: 'Investigating domain resolution, DNS tunneling, or suspicious lookups',
      observation: 'Shows which domains are being queried and their resolved IPs'
    },
    {
      filter: 'tcp.port == 443',
      purpose: 'Show HTTPS traffic',
      when: 'Identifying encrypted web traffic or analyzing TLS connection patterns',
      observation: 'Cannot see encrypted payload, but can see connection metadata and patterns'
    },
    {
      filter: 'ip.addr == 192.168.1.100',
      purpose: 'Show all traffic to/from specific IP',
      when: 'Focusing investigation on a single host',
      observation: 'Isolates all conversations involving this IP (source or destination)'
    },
    {
      filter: 'tcp.flags.syn == 1 && tcp.flags.ack == 0',
      purpose: 'Show TCP connection attempts (SYN packets)',
      when: 'Identifying port scanning or mapping connection behavior',
      observation: 'Each packet represents an attempt to establish a new TCP connection'
    },
    {
      filter: 'http.request.method == "POST"',
      purpose: 'Show HTTP POST requests',
      when: 'Investigating data submission or form uploads',
      observation: 'Reveals what data is being sent to servers via POST'
    },
    {
      filter: 'dns.qry.name contains "malicious"',
      purpose: 'Search DNS queries for specific keywords',
      when: 'Looking for known malicious domains or specific IOCs',
      observation: 'Highlights queries matching the keyword pattern'
    },
    {
      filter: 'tcp.analysis.retransmission',
      purpose: 'Show retransmitted packets',
      when: 'Diagnosing network performance issues or packet loss',
      observation: 'High retransmission count indicates network problems'
    }
  ];

  return (
    <LessonCard number="04" title="Wireshark Display Filters" subtitle="Isolating signal from noise">
      <SectionIntro>
        On busy networks, captures contain thousands of packets. Display filters are the analyst's primary tool
        for isolating relevant traffic. A well-constructed filter turns a 10,000-packet haystack into a 15-packet
        needle. Mastering filter syntax is not optional — it's the difference between hours and minutes.
      </SectionIntro>

      <InfoCard type="info">
        Display filters use Wireshark's own syntax (not BPF). They are applied <strong>after</strong> capture,
        so you can change filters without recapturing. Learn to chain conditions with <code>&&</code> (AND),
        <code>||</code> (OR), and <code>!</code> (NOT).
      </InfoCard>

      <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.35rem', fontWeight: 700, color: '#e6e9f0', marginTop: '2rem', marginBottom: '1rem' }}>
        Essential Filters for Security Analysis
      </h3>

      <WiresharkFilterCard filters={filterExamples} />

      <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.35rem', fontWeight: 700, color: '#e6e9f0', marginTop: '2.5rem', marginBottom: '1rem' }}>
        Combining Filters
      </h3>

      <TerminalBlock
        title="Filter: Multiple Conditions"
        description="Show HTTP traffic to a specific IP"
        command="http && ip.addr == 93.184.216.34"
      />

      <TerminalBlock
        title="Filter: Exclude Normal Traffic"
        description="Show all traffic except DNS and HTTPS"
        command="!(dns || tcp.port == 443)"
      />

      <TerminalBlock
        title="Filter: Suspicious Patterns"
        description="Find DNS queries with unusually long names (potential tunneling)"
        command="dns && dns.qry.name.len > 50"
      />

      <InfoCard type="tip" title="💡 Filter Strategy">
        Start broad, then narrow. Begin with <code>http</code> to see all HTTP. Too many results? Add
        <code>http && ip.addr == x.x.x.x</code>. Still too many? Add
        <code>http && ip.addr == x.x.x.x && http.request.method == "POST"</code>. Iterative refinement.
      </InfoCard>

      <MCQBlock questions={questions} />
    </LessonCard>
  );
}

function ProtocolAnalysisSection() {
  const questions = [
    { q: 'What does the TCP three-way handshake consist of?', options: ['A. SYN, SYN-ACK, ACK', 'B. SYN, ACK, FIN', 'C. HELLO, READY, DATA', 'D. REQUEST, RESPONSE, CLOSE'], answer: 'A' },
    { q: 'How does an analyst "Follow TCP Stream" in Wireshark?', options: ['A. File → Export', 'B. Right-click a packet → Follow → TCP Stream', 'C. Tools → Stream Analyzer', 'D. Apply the filter tcp.stream'], answer: 'B' },
    { q: 'An analyst sees many DNS queries to different random subdomains of the same parent domain. What might this indicate?', options: ['A. Normal CDN behavior', 'B. Potential DNS tunneling for data exfiltration', 'C. DNSSEC validation', 'D. IPv6 transition mechanism'], answer: 'B' },
  ];

  return (
    <LessonCard number="05" title="Protocol Analysis Techniques" subtitle="Understanding conversation behavior">
      <SectionIntro>
        Individual packets are snapshots. Conversations are stories. Analysts must understand protocol handshakes,
        connection states, and request-response patterns. This section teaches how to analyze TCP sessions,
        DNS queries, and HTTP exchanges — the foundation of network investigation.
      </SectionIntro>

      <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.35rem', fontWeight: 700, color: '#e6e9f0', marginTop: '2rem', marginBottom: '1rem' }}>
        TCP Analysis: Connection Lifecycle
      </h3>

      <SectionIntro>
        Every TCP connection follows a predictable pattern: establishment (SYN, SYN-ACK, ACK), data transfer,
        and termination (FIN, ACK, FIN, ACK). Deviations from this pattern indicate problems or attacks.
      </SectionIntro>

      <ConceptGrid concepts={[
        {
          label: 'Three-Way Handshake',
          children: <>Client sends <strong>SYN</strong> → Server responds <strong>SYN-ACK</strong> → Client confirms <strong>ACK</strong>. Connection established. If you don't see all three, the connection failed.</>
        },
        {
          label: 'Follow TCP Stream',
          children: 'Right-click any packet in a conversation → Follow → TCP Stream. Wireshark reconstructs the entire bidirectional exchange as readable text. Essential for HTTP, SMTP, FTP analysis.'
        },
        {
          label: 'RST Flag',
          children: 'TCP RST (reset) indicates abrupt connection termination. Can signal port closed, firewall block, or application crash. Unexpected RSTs warrant investigation.'
        },
        {
          label: 'Sequence Numbers',
          children: 'Track data flow and detect retransmissions. If sequence numbers jump backward, packets were retransmitted — indicates packet loss or network issues.'
        }
      ]} />

      <TerminalBlock
        title="Filter: TCP Handshakes Only"
        description="Show connection establishment attempts"
        command="tcp.flags.syn == 1 && tcp.flags.ack == 0"
        output="No.   Time      Source          Destination     Info
  1   0.000000  192.168.1.10    93.184.216.34   SYN Seq=0
 15   0.124532  192.168.1.10    8.8.8.8         SYN Seq=0"
      />

      <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.35rem', fontWeight: 700, color: '#e6e9f0', marginTop: '2.5rem', marginBottom: '1rem' }}>
        DNS Analysis: Query Patterns
      </h3>

      <SectionIntro>
        DNS queries reveal intent. A host querying api.example.com intends to connect there. Analysts use DNS
        traffic to map communication patterns, identify C2 infrastructure, and detect tunneling.
      </SectionIntro>

      <ConceptGrid concepts={[
        {
          label: 'Query/Response Pair',
          children: <>Query packet asks for a domain's IP. Response packet contains the answer (A record), TTL, and sometimes CNAME redirects. Both must be present for resolution.</>
        },
        {
          label: 'Suspicious Patterns',
          children: 'High-frequency queries to random subdomains (e.g., a8f3d9.malicious.com, 7b2c1e.malicious.com) indicate DNS tunneling — data exfiltration via DNS queries.'
        },
        {
          label: 'Abnormal Record Types',
          children: 'Repeated TXT or NULL record queries (not typical) may indicate covert channels. Legitimate apps rarely query TXT records in bulk.'
        }
      ]} />

      <TerminalBlock
        title="Filter: DNS Queries Only"
        description="Show outbound DNS questions"
        command="dns.flags.response == 0"
        output="No.   Time      Source          Destination     Info
  4   0.016789  192.168.1.10    8.8.8.8         Standard query A example.com
 22   1.234521  192.168.1.10    8.8.8.8         Standard query A api.example.com"
      />

      <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.35rem', fontWeight: 700, color: '#e6e9f0', marginTop: '2.5rem', marginBottom: '1rem' }}>
        HTTP Analysis: Application Behavior
      </h3>

      <SectionIntro>
        HTTP traffic reveals application logic: what resources are requested, what data is submitted, what
        responses are returned. Unencrypted HTTP exposes headers, cookies, form data — everything.
      </SectionIntro>

      <ConceptGrid concepts={[
        {
          label: 'Request Methods',
          children: 'GET retrieves resources. POST submits data. PUT uploads. DELETE removes. An analyst seeing unexpected methods (e.g., PUT to an upload endpoint) investigates.'
        },
        {
          label: 'Response Codes',
          children: '200 = success. 301/302 = redirect. 401 = unauthorized. 403 = forbidden. 404 = not found. 500 = server error. Repeated 401s may indicate brute-force attempts.'
        },
        {
          label: 'User-Agent Analysis',
          children: 'Legitimate browsers have detailed user-agent strings. Generic strings like "Mozilla/5.0" or custom strings may indicate automated tools or malware.'
        },
        {
          label: 'Cleartext Credentials',
          children: <>Follow HTTP Stream and search for keywords: <code>password=</code>, <code>username=</code>, <code>api_key=</code>. If present, credentials transmitted insecurely.</>
        }
      ]} />

      <TerminalBlock
        title="Filter: HTTP POST Requests"
        description="Show data submission attempts"
        command="http.request.method == POST"
      />

      <InfoCard type="warn" title="⚠️ TLS Encryption Limitation">
        HTTPS (HTTP over TLS) encrypts application data. Wireshark cannot decrypt TLS traffic without the
        server's private key or session keys. You'll see the <strong>TLS handshake</strong> and connection metadata,
        but not the HTTP payload. This is by design — encryption works.
      </InfoCard>

      <MCQBlock questions={questions} />
    </LessonCard>
  );
}

function SecurityAnalysisSection() {
  const questions = [
    { q: 'What traffic pattern indicates potential C2 beaconing?', options: ['A. Random traffic at unpredictable intervals', 'B. Regular, periodic connections to the same external IP at consistent intervals', 'C. High-bandwidth file transfers', 'D. DNS queries to major CDN providers'], answer: 'B' },
    { q: 'An analyst sees HTTP traffic containing "password=admin123" in cleartext. What is the security implication?', options: ['A. None, HTTP is always secure', 'B. Credentials are exposed and could be intercepted by an attacker on the network', 'C. The password is automatically hashed by the browser', 'D. Only the server can see the password'], answer: 'B' },
    { q: 'Which Wireshark indicator suggests a port scan is occurring?', options: ['A. Many SYN packets to different ports on the same destination IP, with no corresponding data transfer', 'B. High DNS query rate', 'C. Large file downloads over HTTP', 'D. Normal three-way handshakes followed by data'], answer: 'A' },
  ];

  return (
    <LessonCard number="06" title="Security Analysis" subtitle="Detecting threats in traffic">
      <SectionIntro>
        Network traffic reveals intent. Analysts trained in security patterns can identify malicious behavior:
        beaconing, credential theft, port scans, cleartext leaks, data exfiltration. This is defensive analysis —
        recognizing what should not be there.
      </SectionIntro>

      <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.35rem', fontWeight: 700, color: '#e6e9f0', marginTop: '2rem', marginBottom: '1rem' }}>
        Threat Detection Patterns
      </h3>

      <ConceptGrid concepts={[
        {
          label: 'C2 Beaconing',
          children: 'Malware calls home periodically. Look for: regular HTTPS connections to same IP at consistent intervals (e.g., every 60 seconds). Legitimate software has irregular timing. Beacons do not.'
        },
        {
          label: 'Cleartext Credentials',
          children: <>Filter: <code>http</code>. Follow TCP Stream. Search for: <code>password=</code>, <code>username=</code>, <code>login=</code>. If visible, credentials transmitted insecurely. Report immediately.</>
        },
        {
          label: 'Port Scanning',
          children: <>Many SYN packets to different ports on same host, no established connections. Filter: <code>tcp.flags.syn == 1 && tcp.flags.ack == 0 && ip.dst == target</code>. Indicator of reconnaissance.</>
        },
        {
          label: 'DNS Tunneling',
          children: <>High-frequency DNS queries to random subdomains of same parent domain. Filter: <code>dns && dns.qry.name contains "suspicious.com"</code>. Data exfiltration via DNS.</>
        },
        {
          label: 'Unusual Protocols',
          children: 'Telnet (port 23), FTP (port 21), SNMP (port 161) on modern networks? These unencrypted protocols should not exist. Investigate why they are active.'
        },
        {
          label: 'Large Outbound Transfers',
          children: 'Unexpected large uploads from internal hosts to external IPs. Could indicate data exfiltration. Statistics → Conversations → sort by bytes transferred.'
        }
      ]} />

      <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.35rem', fontWeight: 700, color: '#e6e9f0', marginTop: '2.5rem', marginBottom: '1rem' }}>
        Incident Investigation Workflow
      </h3>

      <SectionIntro>
        When an alert fires or suspicious activity is reported, analysts follow a methodical process:
      </SectionIntro>

      <div style={{
        background: 'rgba(10, 15, 25, 0.6)',
        border: '1px solid rgba(45, 214, 143, 0.3)',
        borderRadius: '12px',
        padding: '2rem',
        marginTop: '1.5rem'
      }}>
        <ol style={{ margin: 0, paddingLeft: '1.5rem', color: 'rgba(224, 224, 224, 0.9)', lineHeight: 2, fontFamily: "'Oxanium', sans-serif", fontSize: '1rem' }}>
          <li><strong style={{ color: '#2dd68f' }}>Define the question:</strong> "What did this host connect to?" "Was data exfiltrated?" "Did credentials leak?"</li>
          <li><strong style={{ color: '#2dd68f' }}>Capture traffic:</strong> From the suspected time window. If already captured (e.g., from IDS), load the .pcap file.</li>
          <li><strong style={{ color: '#2dd68f' }}>Isolate suspicious host:</strong> Filter: <code>ip.addr == [suspicious_ip]</code></li>
          <li><strong style={{ color: '#2dd68f' }}>Analyze conversations:</strong> Statistics → Conversations → IPv4. Sort by packets or bytes. Identify unusual destinations.</li>
          <li><strong style={{ color: '#2dd68f' }}>Inspect protocols:</strong> Look at DNS (where did it try to resolve?), HTTP (what was requested?), TLS (what domains in SNI?)</li>
          <li><strong style={{ color: '#2dd68f' }}>Timeline reconstruction:</strong> Sort by time. Build a sequence: DNS query → TCP handshake → HTTP request → data transfer. Understand the attack flow.</li>
          <li><strong style={{ color: '#2dd68f' }}>Evidence collection:</strong> Export relevant packets. Document filter strings used. Screenshot key findings.</li>
          <li><strong style={{ color: '#2dd68f' }}>Report conclusions:</strong> "Host 192.168.1.50 established HTTPS connection to known C2 IP 203.0.113.42 at 14:32:18 UTC. Beaconing detected."</li>
        </ol>
      </div>

      <InfoCard type="danger" title="🔴 Defensive Scope Only">
        This lesson teaches <strong>defensive security analysis</strong> — identifying threats on networks
        you are authorized to protect. Do not use these techniques to inspect networks you do not own or have
        written permission to analyze. Unauthorized interception is illegal.
      </InfoCard>

      <MCQBlock questions={questions} />
    </LessonCard>
  );
}

function AdvancedFeaturesSection() {
  const questions = [
    { q: 'What does Statistics → Conversations show?', options: ['A. DNS queries only', 'B. All communication pairs (IP to IP or port to port) with packet and byte counts', 'C. User account names', 'D. Firewall rules'], answer: 'B' },
    { q: 'When would an analyst use tshark instead of Wireshark GUI?', options: ['A. Never, GUI is always better', 'B. For automated capture on servers without GUI, or scripting analysis tasks', 'C. Only on Windows systems', 'D. When capturing wireless traffic'], answer: 'B' },
    { q: 'What does an I/O graph visualize?', options: ['A. Network topology', 'B. Packet rate or throughput over time, useful for identifying traffic spikes or anomalies', 'C. User authentication logs', 'D. DNS zone transfers'], answer: 'B' },
  ];

  return (
    <LessonCard number="07" title="Advanced Features" subtitle="Beyond basic packet inspection">
      <SectionIntro>
        Wireshark's power extends beyond packet lists. Statistics, visualizations, command-line tools, and
        expert analysis features accelerate investigations. Professional analysts leverage these to identify
        patterns that manual inspection would miss.
      </SectionIntro>

      <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.35rem', fontWeight: 700, color: '#e6e9f0', marginTop: '2rem', marginBottom: '1rem' }}>
        Statistics and Visualizations
      </h3>

      <ConceptGrid concepts={[
        {
          label: 'Statistics → Conversations',
          children: <>Shows all communication pairs (IP to IP, or port to port) with packet/byte counts. Quickly surfaces: "Which host transferred the most data?" "Who talked to whom?"</>
        },
        {
          label: 'Statistics → Endpoints',
          children: 'Lists all unique IPs or MAC addresses in the capture with traffic volume. Identifies top talkers on the network.'
        },
        {
          label: 'Statistics → Protocol Hierarchy',
          children: 'Shows percentage of each protocol in the capture (e.g., 60% TLS, 30% DNS, 10% HTTP). Reveals unexpected protocol distribution.'
        },
        {
          label: 'Statistics → I/O Graph',
          children: 'Plots packet rate or bytes over time. Visualizes traffic spikes, beaconing intervals, DDoS patterns. Add display filters to graph specific traffic types.'
        }
      ]} />

      <InfoCard type="tip" title="💡 Use Case: Identifying Beaconing">
        Open Statistics → I/O Graph. Set X-axis to 1-second intervals. Apply filter to suspected host.
        If you see <strong>regular vertical spikes</strong> at consistent intervals (e.g., every 60 seconds),
        that's beaconing. Legitimate traffic is irregular. Beacons are metronomic.
      </InfoCard>

      <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.35rem', fontWeight: 700, color: '#e6e9f0', marginTop: '2.5rem', marginBottom: '1rem' }}>
        tshark: Command-Line Packet Analysis
      </h3>

      <SectionIntro>
        <code>tshark</code> is Wireshark's terminal-based interface. Runs on headless servers, integrates
        into scripts, processes captures in pipelines. Essential for automation.
      </SectionIntro>

      <TerminalBlock
        title="tshark: Capture Packets"
        description="Capture 100 packets on interface eth0"
        command="tshark -i eth0 -c 100"
      />

      <TerminalBlock
        title="tshark: Apply Display Filter"
        description="Read capture file and show only HTTP traffic"
        command='tshark -r capture.pcap -Y "http"'
      />

      <TerminalBlock
        title="tshark: Extract Specific Fields"
        description="Show source IP, destination IP, and DNS query names"
        command='tshark -r capture.pcap -Y "dns" -T fields -e ip.src -e ip.dst -e dns.qry.name'
        output="192.168.1.10    8.8.8.8         example.com
192.168.1.10    8.8.8.8         api.example.com
192.168.1.15    8.8.8.8         malicious.com"
      />

      <TerminalBlock
        title="tshark: Count Packets Per Protocol"
        description="Generate protocol statistics from capture"
        command="tshark -r capture.pcap -q -z io,phs"
      />

      <InfoCard type="info">
        <code>tshark</code> accepts the same display filters as Wireshark GUI. Learn filter syntax once,
        use it everywhere. Automate threat hunting with shell scripts that process .pcap files via tshark.
      </InfoCard>

      <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.35rem', fontWeight: 700, color: '#e6e9f0', marginTop: '2.5rem', marginBottom: '1rem' }}>
        Expert Information
      </h3>

      <SectionIntro>
        Wireshark's Expert Info (Analyze → Expert Information) highlights potential problems automatically:
        retransmissions, malformed packets, sequence errors, warnings, and notes. Use this as a first-pass
        diagnostic tool.
      </SectionIntro>

      <ConceptGrid concepts={[
        {
          label: 'Errors (Red)',
          children: 'Malformed packets, protocol violations. Indicates capture corruption or actual malformed traffic from misconfigured devices.'
        },
        {
          label: 'Warnings (Yellow)',
          children: 'Unusual events: TCP retransmissions, zero window conditions, duplicate ACKs. Signals network performance issues.'
        },
        {
          label: 'Notes (Cyan)',
          children: 'Informational observations: sequence number reuse, connection resets. Useful context but not always problems.'
        }
      ]} />

      <InfoCard type="tip" title="💡 Quick Diagnostic">
        Open Expert Information immediately after loading a capture. If you see hundreds of retransmission
        warnings, you have a network quality problem. If you see malformed packet errors, investigate those packets first.
      </InfoCard>

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
          You now understand <strong>how Wireshark captures traffic</strong> and <strong>how to investigate
          network behavior</strong>. You can apply filters, follow TCP streams, identify suspicious patterns,
          and think like a security analyst. Practice on sample .pcap files, analyze your own network, and
          refine your investigative workflow. Traffic analysis is a skill developed through repetition.
        </p>
      </div>
    </LessonCard>
  );
}

function NetSecWireshark() {
  const learningObjectives = [
    'Understand how Wireshark captures network traffic',
    'Explain packet encapsulation and the three-pane interface',
    'Distinguish between capture filters and display filters',
    'Follow TCP streams to reconstruct conversations',
    'Apply Wireshark filters to isolate suspicious traffic',
    'Identify security threats in packet captures',
    'Detect cleartext credentials, port scans, and malware beaconing',
    'Use Wireshark as part of a security investigation workflow'
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
            Packet Analysis with Wireshark
          </h1>
          <p style={{
            fontFamily: "'Oxanium', sans-serif",
            fontSize: '1.25rem',
            color: 'rgba(171, 207, 201, 0.8)',
            margin: '0 auto 2rem',
            maxWidth: '700px',
            lineHeight: 1.6
          }}>
            Master network traffic analysis — from packet capture to security investigation
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
              <div style={{ fontSize: '1rem', color: '#2dd68f', fontWeight: 700, fontFamily: "'Sora', sans-serif" }}>Intermediate</div>
            </div>
            <div style={{
              background: 'rgba(45, 214, 143, 0.1)',
              border: '1px solid rgba(45, 214, 143, 0.3)',
              borderRadius: '12px',
              padding: '0.75rem 1.5rem',
              backdropFilter: 'blur(8px)'
            }}>
              <div style={{ fontSize: '0.75rem', color: 'rgba(171, 207, 201, 0.7)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Lessons</div>
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
              <div style={{ fontSize: '1rem', color: '#2dd68f', fontWeight: 700, fontFamily: "'Sora', sans-serif" }}>75 min</div>
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
          The first two sections teach <strong>how Wireshark works</strong> — packet capture mechanics,
          encapsulation, and the three-pane interface. This is the <strong>technical foundation</strong>.
        </InfoCard>

        <IntroductionSection />
        <PacketCaptureSection />

        {/* TRANSITION MARKER */}
        <TransitionMarker />

        {/* PART 2: INVESTIGATION METHODOLOGY */}
        <InfoCard type="tip" title="🔍 Part 2: Investigation Methodology">
          The remaining sections teach <strong>how to investigate traffic</strong> — analysis workflow,
          filters, threat detection, and analyst thinking. This is the <strong>investigation methodology</strong>.
        </InfoCard>

        <TrafficAnalysisSection />
        <FiltersSection />
        <ProtocolAnalysisSection />
        <SecurityAnalysisSection />
        <AdvancedFeaturesSection />
      </div>
    </div>
  );
}

export default NetSecWireshark;
