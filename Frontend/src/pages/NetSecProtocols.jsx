import { Suspense } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { NetworkSecurityIcon } from '../components/NetworkSecurityIcon';
import QuestionCard from '../components/QuestionCard';
import OSIModelDiagram from '../components/learning/network/OSIModelDiagram';
import TcpIpMappingDiagram from '../components/learning/network/TcpIpMappingDiagram';
import TCPHandshakeDiagram from '../components/learning/network/TCPHandshakeDiagram';
import SynFloodDiagram from '../components/learning/network/SynFloodDiagram';
import ArpDiagram from '../components/learning/network/ArpDiagram';
import NatDiagram from '../components/learning/network/NatDiagram';
import NetworkSecurityTopology from '../components/learning/network/NetworkSecurityTopology';
import ProtocolMatcher from '../components/learning/network/ProtocolMatcher';
import LessonCard from '../components/learning/ui/LessonCard';
import InfoCard from '../components/learning/ui/InfoCard';
import DiagramContainer from '../components/learning/ui/DiagramContainer';
import ProtocolTable from '../components/learning/ui/ProtocolTable';
import TerminalBlock from '../components/learning/ui/TerminalBlock';
import LearningObjective from '../components/learning/ui/LearningObjective';
import ConceptGrid from '../components/learning/ui/ConceptGrid';

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

const ContinueLink = ({ to, label }) => (
  <Link to={to} style={{
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '1rem 1.75rem',
    background: 'linear-gradient(135deg, rgba(45, 214, 143, 0.12), rgba(2, 168, 154, 0.12))',
    border: '1px solid rgba(45, 214, 143, 0.3)',
    borderRadius: '12px',
    color: '#2dd68f',
    fontFamily: "'Sora', sans-serif",
    fontSize: '0.95rem',
    fontWeight: 600,
    textDecoration: 'none',
    marginTop: '2rem',
    transition: 'all 0.3s ease'
  }}>
    <span style={{ color: 'rgba(171, 207, 201, 0.7)' }}>Continue to:</span>
    <strong>{label}</strong>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </Link>
);

const LINKS = {
  wireshark: { to: '/network-security/wireshark', label: 'Packet Analysis with Wireshark' },
  mitm:      { to: '/network-security/mitm',      label: 'Man-in-the-Middle Attacks' },
  firewall:  { to: '/network-security/firewall',   label: 'Firewall & IDS Evasion' },
  recon:     { to: '/reconnaissance',              label: 'Reconnaissance & Port Scanning' },
  osint:     { to: '/osint/passive',               label: 'Passive OSINT & DNS Enumeration' },
};

// Section Components
function OsiSection() {
  return (
    <LessonCard number="01" title="The OSI Model" subtitle="The 7-layer framework behind network communication">
      <SectionIntro>
        The OSI model divides network communication into seven layers. Security controls and
        attacks map to specific layers — knowing which layer you're at tells you which tools
        and defences apply.
      </SectionIntro>
      
      <DiagramContainer title="Interactive OSI Layer Stack" subtitle="Click any layer to explore its details">
        <OSIModelDiagram />
      </DiagramContainer>

      <ProtocolTable
        title="OSI Layers Reference"
        headers={['Layer', 'Name', 'PDU', 'Example Protocols', 'Example Attack']}
        rows={[
          ['7','Application','Data','HTTP, DNS, SMTP, SSH','SQL Injection, DNS tunnelling'],
          ['6','Presentation','Data','TLS/SSL, JPEG, ASCII','SSL stripping, downgrade attacks'],
          ['5','Session','Data','NetBIOS, RPC, SMB session','Session hijacking'],
          ['4','Transport','Segment / Datagram','TCP, UDP','SYN flood, UDP flood'],
          ['3','Network','Packet','IP, ICMP, OSPF, BGP','IP spoofing, route hijacking'],
          ['2','Data Link','Frame','Ethernet, 802.11, ARP','ARP spoofing, MAC flooding'],
          ['1','Physical','Bit','Ethernet cable, Wi-Fi, DSL','Cable tapping, jamming'],
        ]}
      />

      <InfoCard type="tip" title="💡 Memory Aid">
        <strong>"All People Seem To Need Data Processing"</strong> — Application, Presentation, 
        Session, Transport, Network, Data Link, Physical (layers 7 to 1).
      </InfoCard>

      <MCQBlock questions={[
        { q: 'At which OSI layer does IP addressing and routing between networks occur?', options: ['A. Layer 2 (Data Link)','B. Layer 3 (Network)','C. Layer 4 (Transport)','D. Layer 5 (Session)'], answer: 'B' },
        { q: 'ARP spoofing attacks target which OSI layer?', options: ['A. Layer 1 (Physical)','B. Layer 3 (Network)','C. Layer 2 (Data Link)','D. Layer 7 (Application)'], answer: 'C' },
        { q: 'A Web Application Firewall (WAF) operates at which OSI layer?', options: ['A. Layer 3','B. Layer 4','C. Layer 5','D. Layer 7'], answer: 'D' },
        { q: 'TLS/SSL encryption operates primarily at which OSI layer?', options: ['A. Layer 3 (Network)','B. Layer 4 (Transport)','C. Layer 6 (Presentation)','D. Layer 7 (Application)'], answer: 'C' },
        { q: 'Switches operate at which OSI layer and use which addressing type?', options: ['A. Layer 1, IP addresses','B. Layer 2, MAC addresses','C. Layer 3, IP addresses','D. Layer 4, port numbers'], answer: 'B' },
      ]} />
    </LessonCard>
  );
}

function TcpIpSection() {
  const concepts = [
    {
      label: 'IPv4',
      children: '32-bit dotted decimal (e.g. 192.168.1.25). ~4.3 billion addresses — exhausted, driving IPv6 adoption.'
    },
    {
      label: 'IPv6',
      children: '128-bit hexadecimal (e.g. 2001:db8::1). ~340 undecillion addresses. Built-in IPsec support.'
    },
    {
      label: 'Subnet Mask',
      children: <>Defines network vs host portion. Written as prefix length (<code>/24</code>) or dotted decimal (<code>255.255.255.0</code>).</>
    },
    {
      label: 'CIDR',
      children: <>< code>192.168.1.0/24</code> — first 24 bits are network, last 8 identify the host. Gives 254 usable addresses (.1 to .254).</>
    },
  ];

  return (
    <LessonCard number="02" title="TCP/IP Model & IP Addressing" subtitle="The practical protocol stack powering the internet">
      <SectionIntro>
        The TCP/IP model condenses the OSI model into four layers. IP addressing and subnetting 
        are foundational skills for network security work — understanding CIDR notation is essential 
        for reading scan results and configuring firewalls.
      </SectionIntro>

      <DiagramContainer title="OSI vs TCP/IP Layer Mapping">
        <TcpIpMappingDiagram />
      </DiagramContainer>

      <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.35rem', fontWeight: 700, color: '#e6e9f0', marginTop: '2.5rem', marginBottom: '1.25rem' }}>
        IP Addressing & Subnetting
      </h3>
      <ConceptGrid concepts={concepts} />

      <div style={{
        background: 'rgba(10, 15, 25, 0.6)',
        border: '1px solid rgba(45, 214, 143, 0.2)',
        borderRadius: '16px',
        padding: '2rem',
        margin: '2rem 0'
      }}>
        <h4 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.15rem', fontWeight: 700, color: '#2dd68f', marginBottom: '1.5rem', textAlign: 'center' }}>
          CIDR Example: <code style={{ color: '#3de9a0' }}>192.168.1.25/24</code>
        </h4>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <div style={{ background: 'rgba(45, 214, 143, 0.12)', border: '1px solid rgba(45, 214, 143, 0.3)', borderRadius: '8px', padding: '1rem 1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.8rem', color: 'rgba(171, 207, 201, 0.7)', marginBottom: '0.5rem' }}>Network</div>
            <code style={{ fontSize: '1.25rem', color: '#2dd68f', fontWeight: 700 }}>192.168.1</code>
            <div style={{ fontSize: '0.75rem', color: 'rgba(171, 207, 201, 0.6)', marginTop: '0.5rem' }}>24 bits</div>
          </div>
          <div style={{ fontSize: '2rem', color: '#2dd68f', fontWeight: 700 }}>.</div>
          <div style={{ background: 'rgba(2, 168, 154, 0.12)', border: '1px solid rgba(2, 168, 154, 0.3)', borderRadius: '8px', padding: '1rem 1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.8rem', color: 'rgba(171, 207, 201, 0.7)', marginBottom: '0.5rem' }}>Host</div>
            <code style={{ fontSize: '1.25rem', color: '#02a89a', fontWeight: 700 }}>25</code>
            <div style={{ fontSize: '0.75rem', color: 'rgba(171, 207, 201, 0.6)', marginTop: '0.5rem' }}>8 bits (256 addresses)</div>
          </div>
        </div>
        <div style={{ fontSize: '0.9rem', color: 'rgba(171, 207, 201, 0.8)', textAlign: 'center' }}>
          Network: 192.168.1.0 | Broadcast: 192.168.1.255 | Usable hosts: .1–.254
        </div>
      </div>

      <ProtocolTable
        title="Private Address Ranges (RFC 1918)"
        headers={['Range','CIDR','Addresses','Common Use']}
        rows={[
          ['10.0.0.0 – 10.255.255.255','10.0.0.0/8','16.7 million','Large enterprise networks'],
          ['172.16.0.0 – 172.31.255.255','172.16.0.0/12','1.04 million','Mid-size networks'],
          ['192.168.0.0 – 192.168.255.255','192.168.0.0/16','65,536','Home / small office'],
        ]}
      />

      <InfoCard type="info">
        Private addresses are not routable on the public internet. NAT translates them to a public IP for outbound traffic.
      </InfoCard>

      <ConceptGrid concepts={[
        {
          label: 'TTL (Time To Live)',
          children: 'Decremented by 1 at each router hop. When it hits 0, the packet is dropped and an ICMP Time Exceeded message returns. Windows default TTL is 128; Linux is 64 — useful for passive OS fingerprinting.'
        },
        {
          label: 'ICMP',
          children: <>
            <code>ping</code> sends Echo Requests; <code>traceroute</code> exploits TTL expiry to map hops. 
            ICMP tunnelling can exfiltrate data through firewalls that allow ping.
          </>
        }
      ]} />

      <InfoCard type="warn" title="⚠️ Security Implications">
        IP headers can be spoofed (source IP is not authenticated). Fragmented packets can bypass 
        stateless firewalls. TCP sequence numbers were historically predictable, enabling session hijacking.
      </InfoCard>

      <MCQBlock questions={[
        { q: 'What is the correct sequence of the TCP three-way handshake?', options: ['A. SYN, ACK, SYN-ACK','B. SYN, SYN-ACK, ACK','C. ACK, SYN, SYN-ACK','D. SYN-ACK, SYN, ACK'], answer: 'B' },
        { q: 'What does IP provide that makes it a "best-effort" protocol?', options: ['A. Guaranteed delivery and ordering','B. Logical addressing and routing without guaranteeing delivery, order, or error correction','C. Encryption of all transmitted data','D. Authentication of the sender'], answer: 'B' },
        { q: "Why does IPv6 exist as a successor to IPv4?", options: ["A. IPv6 is faster than IPv4","B. IPv4's 32-bit address space (~4.3 billion addresses) is exhausted; IPv6's 128-bit space solves this","C. IPv6 is more secure by default","D. IPv4 does not support wireless networks"], answer: 'B' },
        { q: 'A host responds to ping with TTL=64. What OS does this suggest?', options: ['A. Windows (default TTL 128)','B. Linux/Unix (default TTL 64)','C. macOS (default TTL 255)','D. Cisco IOS (default TTL 255)'], answer: 'B' },
        { q: 'Which CIDR prefix gives 254 usable host addresses?', options: ['A. /8','B. /16','C. /24','D. /32'], answer: 'C' },
      ]} />

      <ContinueLink {...LINKS.osint} />
    </LessonCard>
  );
}

function TcpSection() {
  return (
    <LessonCard number="03" title="How TCP Works" subtitle="Reliable, ordered delivery with sequence tracking">
      <SectionIntro>
        TCP provides reliable, ordered, error-checked delivery. It tracks every byte with
        sequence numbers and retransmits anything lost. Understanding TCP internals is
        essential for Wireshark analysis, SYN flood defences, and session security.
      </SectionIntro>

      <DiagramContainer title="Three-Way Handshake" subtitle="How TCP establishes a connection">
        <TCPHandshakeDiagram />
      </DiagramContainer>

      <ConceptGrid concepts={[
        {
          label: 'Sequence Numbers',
          children: 'Every byte is numbered. The receiver ACKs the next expected byte — enabling retransmission of anything lost and correct reassembly order.'
        },
        {
          label: 'Sliding Window',
          children: 'Controls how much unacknowledged data can be in flight. Receiver advertises its window size to prevent buffer overflow. Larger window = higher throughput.'
        },
        {
          label: 'Congestion Control',
          children: 'TCP backs off when it detects congestion (packet loss). Algorithms: slow start, AIMD, CUBIC. Prevents one connection from overwhelming the network.'
        },
        {
          label: 'Connection Teardown',
          children: <>Four-way FIN exchange (FIN → ACK → FIN → ACK) closes gracefully. A RST packet abruptly terminates — used by firewalls and IDS to kill suspicious sessions.</>
        }
      ]} />

      <DiagramContainer title="SYN Flood Attack" subtitle="DoS attack exploiting TCP's connection state">
        <SynFloodDiagram />
      </DiagramContainer>

      <MCQBlock questions={[
        { q: "A SYN flood exploits which characteristic of TCP?", options: ["A. TCP's use of port numbers","B. TCP's connection state — the server allocates resources for each half-open SYN without a completing ACK","C. TCP's sliding window mechanism","D. TCP's use of sequence numbers"], answer: 'B' },
        { q: 'What is the purpose of TCP sequence numbers?', options: ['A. To identify source and destination ports','B. To track and acknowledge every byte, enabling retransmission and correct ordering','C. To encrypt the TCP payload','D. To determine maximum segment size'], answer: 'B' },
        { q: 'How does a TCP RST differ from a FIN packet?', options: ['A. RST is encrypted; FIN is not','B. RST abruptly terminates a connection; FIN initiates a graceful four-way close','C. FIN is for attacks; RST for legitimate close','D. They do the same thing'], answer: 'B' },
        { q: 'What does the sliding window control?', options: ['A. The encryption algorithm','B. How much unacknowledged data can be in flight, preventing buffer overflow and improving throughput','C. The TTL of packets','D. The three-way handshake'], answer: 'B' },
      ]} />

      <ContinueLink {...LINKS.wireshark} />
    </LessonCard>
  );
}

function TcpUdpSection() {
  return (
    <LessonCard number="04" title="TCP vs UDP" subtitle="Choosing between reliability and performance">
      <SectionIntro>
        TCP and UDP are the two primary transport protocols. The choice between them is
        about reliability semantics vs overhead — not simply speed.
      </SectionIntro>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', margin: '2rem 0' }}>
        <div style={{ background: 'rgba(45, 214, 143, 0.08)', border: '1px solid rgba(45, 214, 143, 0.25)', borderRadius: '16px', padding: '2rem' }}>
          <h4 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.5rem', fontWeight: 700, color: '#2dd68f', marginBottom: '1.5rem' }}>TCP</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.75rem' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'rgba(224, 224, 224, 0.9)' }}>
              <span style={{ color: '#2dd68f', fontSize: '1.25rem', lineHeight: 1 }}>•</span>
              Connection-oriented (three-way handshake)
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'rgba(224, 224, 224, 0.9)' }}>
              <span style={{ color: '#2dd68f', fontSize: '1.25rem', lineHeight: 1 }}>•</span>
              Reliable — guarantees delivery via ACKs
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'rgba(224, 224, 224, 0.9)' }}>
              <span style={{ color: '#2dd68f', fontSize: '1.25rem', lineHeight: 1 }}>•</span>
              Ordered — segments reassembled in sequence
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'rgba(224, 224, 224, 0.9)' }}>
              <span style={{ color: '#2dd68f', fontSize: '1.25rem', lineHeight: 1 }}>•</span>
              Retransmits lost segments automatically
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'rgba(224, 224, 224, 0.9)' }}>
              <span style={{ color: '#2dd68f', fontSize: '1.25rem', lineHeight: 1 }}>•</span>
              Flow control via sliding window
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'rgba(224, 224, 224, 0.9)' }}>
              <span style={{ color: '#2dd68f', fontSize: '1.25rem', lineHeight: 1 }}>•</span>
              Higher per-packet overhead
            </li>
          </ul>
          <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(45, 214, 143, 0.1)', borderRadius: '8px', fontSize: '0.9rem' }}>
            <strong style={{ color: '#2dd68f' }}>Used by:</strong> HTTPS, SSH, SMTP, FTP, SMB, RDP
          </div>
        </div>

        <div style={{ background: 'rgba(2, 168, 154, 0.08)', border: '1px solid rgba(2, 168, 154, 0.25)', borderRadius: '16px', padding: '2rem' }}>
          <h4 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.5rem', fontWeight: 700, color: '#02a89a', marginBottom: '1.5rem' }}>UDP</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.75rem' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'rgba(224, 224, 224, 0.9)' }}>
              <span style={{ color: '#02a89a', fontSize: '1.25rem', lineHeight: 1 }}>•</span>
              Connectionless — no handshake
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'rgba(224, 224, 224, 0.9)' }}>
              <span style={{ color: '#02a89a', fontSize: '1.25rem', lineHeight: 1 }}>•</span>
              No delivery guarantee
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'rgba(224, 224, 224, 0.9)' }}>
              <span style={{ color: '#02a89a', fontSize: '1.25rem', lineHeight: 1 }}>•</span>
              No ordering guarantee
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'rgba(224, 224, 224, 0.9)' }}>
              <span style={{ color: '#02a89a', fontSize: '1.25rem', lineHeight: 1 }}>•</span>
              No retransmission at transport layer
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'rgba(224, 224, 224, 0.9)' }}>
              <span style={{ color: '#02a89a', fontSize: '1.25rem', lineHeight: 1 }}>•</span>
              No flow or congestion control
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'rgba(224, 224, 224, 0.9)' }}>
              <span style={{ color: '#02a89a', fontSize: '1.25rem', lineHeight: 1 }}>•</span>
              Lower per-packet overhead
            </li>
          </ul>
          <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(2, 168, 154, 0.1)', borderRadius: '8px', fontSize: '0.9rem' }}>
            <strong style={{ color: '#02a89a' }}>Used by:</strong> DNS, DHCP, VoIP, video streaming, gaming, NTP, SNMP
          </div>
        </div>
      </div>

      <InfoCard type="info" title="🔄 The Real Trade-off">
        UDP offloads reliability to the application or accepts packet loss entirely. A video call drops 
        a frame rather than waiting for a retransmit. DNS uses UDP for small queries (single packet 
        round-trip is trivial) but falls back to TCP when responses exceed the traditional 512-byte limit.
      </InfoCard>

      <InfoCard type="warn" title="⚠️ UDP Amplification DDoS">
        An attacker sends a small UDP request to an open service (DNS, NTP, SSDP) with the source IP 
        spoofed to the victim. The service sends a much larger response to the victim. DNS amplification 
        can exceed 50× the request size; NTP monlist can exceed 556×. UDP makes this possible — there is 
        no handshake to verify the source IP.
      </InfoCard>

      <MCQBlock questions={[
        { q: 'Which protocol is most appropriate for a real-time video call where some packet loss is acceptable?', options: ['A. TCP — it guarantees delivery','B. UDP — lower overhead with no retransmission delays','C. ICMP — designed for real-time traffic','D. SCTP — combines TCP and UDP features'], answer: 'B' },
        { q: 'Which port number is assigned to HTTPS?', options: ['A. 80','B. 22','C. 443','D. 8080'], answer: 'C' },
        { q: 'Why does UDP enable amplification DDoS attacks while TCP does not?', options: ['A. UDP packets are larger','B. UDP has no three-way handshake — source IPs cannot be verified so attackers spoof the victim IP','C. UDP is faster so attacks execute sooner','D. TCP is blocked by most firewalls'], answer: 'B' },
        { q: 'DNS uses UDP but falls back to TCP under what condition?', options: ['A. When the DNS server is overloaded','B. When the response exceeds 512 bytes or the client requests TCP via EDNS','C. When the query contains special characters','D. TCP is never used for DNS'], answer: 'B' },
      ]} />
    </LessonCard>
  );
}

function ArpIcmpNatSection() {
  return (
    <LessonCard number="05" title="ARP, ICMP & NAT" subtitle="Essential protocols below TCP/UDP">
      <SectionIntro>
        Three protocols below TCP/UDP that are essential for how networks function — and
        how attackers abuse them.
      </SectionIntro>

      <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.35rem', fontWeight: 700, color: '#e6e9f0', marginTop: '2rem', marginBottom: '1rem' }}>
        ARP — Address Resolution Protocol
      </h3>
      <p style={{ fontFamily: "'Oxanium', sans-serif", fontSize: '1rem', lineHeight: 1.7, color: 'rgba(224, 224, 224, 0.9)', marginBottom: '1.5rem' }}>
        IP identifies hosts logically. To deliver a frame on a local network, the sender needs
        the destination MAC address. ARP resolves IP addresses to MAC addresses on the same segment.
      </p>
      <DiagramContainer>
        <ArpDiagram />
      </DiagramContainer>

      <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.35rem', fontWeight: 700, color: '#e6e9f0', marginTop: '2.5rem', marginBottom: '1rem' }}>
        ICMP — Internet Control Message Protocol
      </h3>
      <ConceptGrid concepts={[
        {
          label: 'Echo Request / Reply',
          children: <>The basis of <code>ping</code>. Sends Echo Request; a live host replies. Measures latency and confirms reachability.</>
        },
        {
          label: 'TTL Exceeded',
          children: <>When TTL reaches 0, the router discards the packet and sends ICMP Time Exceeded back. <code>traceroute</code> exploits this with incrementing TTLs to map each hop.</>
        },
        {
          label: 'Destination Unreachable',
          children: 'Sent when a packet cannot be delivered. Type 3 Code 3 (Port Unreachable) is the UDP scanning response for closed ports.'
        },
        {
          label: 'Security Relevance',
          children: <>ICMP flood = DoS. ICMP tunnelling encapsulates data in ping packets to exfiltrate through firewalls. Blocking all ICMP breaks <code>ping</code> and <code>traceroute</code> diagnostics.</>
        }
      ]} />

      <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.35rem', fontWeight: 700, color: '#e6e9f0', marginTop: '2.5rem', marginBottom: '1rem' }}>
        NAT — Network Address Translation
      </h3>
      <DiagramContainer>
        <NatDiagram />
      </DiagramContainer>

      <MCQBlock questions={[
        { q: 'Why is ARP vulnerable to spoofing?', options: ['A. ARP is an outdated protocol with known bugs','B. ARP has no authentication — any host can claim any IP-to-MAC mapping','C. ARP replies are weakly encrypted','D. ARP only works on wireless networks'], answer: 'B' },
        { q: 'A traceroute uses ICMP Time Exceeded messages. What does this reveal?', options: ['A. Open ports on the destination','B. Each router hop along the path, showing topology and latency per hop','C. MAC address of each router','D. Whether TLS is enabled on the destination'], answer: 'B' },
        { q: 'Why is NAT not a replacement for a firewall?', options: ['A. NAT cannot handle IPv6','B. NAT provides no access control, authentication, or inspection — it only translates addresses','C. NAT is too slow for real-time applications','D. NAT requires a separate licence'], answer: 'B' },
        { q: 'Which command detects active ARP poisoning on a local machine?', options: ['A. netstat -an','B. arp -a (look for two IPs sharing the same MAC address)','C. ipconfig /all','D. ping -t <gateway>'], answer: 'B' },
      ]} />

      <ContinueLink {...LINKS.mitm} />
    </LessonCard>
  );
}

function ServicesSection() {
  return (
    <LessonCard number="06" title="Common Network Services" subtitle="Protocols, ports, and security risks">
      <SectionIntro>
        Knowing which protocol uses which port, transport, and what its security risks are
        is fundamental to pen testing, threat modelling, and firewall rule design.
        Test yourself with the identification exercise first.
      </SectionIntro>

      <DiagramContainer title="Protocol Matching Exercise" subtitle="Drag protocols to their correct ports">
        <ProtocolMatcher />
      </DiagramContainer>

      <ProtocolTable
        title="Protocol Reference Table"
        headers={['Protocol', 'Port(s)', 'Transport', 'Purpose', 'Security Relevance']}
        rows={[
          ['DNS', '53', 'UDP / TCP', 'Name resolution', 'Poisoning, tunnelling, exfiltration'],
          ['DHCP', '67 / 68', 'UDP', 'Auto IP assignment', 'Rogue DHCP, starvation attacks'],
          ['HTTP', '80', 'TCP', 'Web — unencrypted', 'Eavesdropping, MITM, injection'],
          ['HTTPS', '443', 'TCP', 'Web — TLS encrypted', 'TLS configuration, certificate trust'],
          ['FTP', '21 / 20', 'TCP', 'File transfer — cleartext', 'Credential sniffing; use SFTP instead'],
          ['SFTP / SCP', '22', 'TCP', 'Encrypted file transfer over SSH', 'Same surface as SSH'],
          ['SSH', '22', 'TCP', 'Encrypted remote shell', 'Brute force, key theft'],
          ['Telnet', '23', 'TCP', 'Remote shell — cleartext', 'All data incl. passwords in plaintext'],
          ['SMTP', '25 / 587', 'TCP', 'Email transmission (MTA to MTA)', 'Open relays, spoofing, phishing'],
          ['POP3', '110 / 995', 'TCP', 'Email retrieval (client)', 'Cleartext on 110; use 995 (TLS)'],
          ['IMAP', '143 / 993', 'TCP', 'Email retrieval with sync', 'Cleartext on 143; use 993 (TLS)'],
          ['SMB', '445', 'TCP', 'Windows file / printer sharing', 'EternalBlue, WannaCry, pass-the-hash'],
          ['RDP', '3389', 'TCP', 'Remote Desktop (Windows)', 'Brute force, BlueKeep, ransomware pivot'],
          ['SNMP', '161 / 162', 'UDP', 'Device management & monitoring', 'Default community strings expose config'],
          ['NTP', '123', 'UDP', 'Time synchronisation', 'Amplification DDoS; Kerberos needs sync'],
          ['LDAP', '389 / 636', 'TCP', 'Directory queries (Active Directory)', 'Cleartext on 389; enumeration attacks'],
          ['Kerberos', '88', 'TCP / UDP', 'AD authentication tickets', 'Kerberoasting, AS-REP roasting, Golden Ticket'],
        ]}
      />

      <MCQBlock questions={[
        { q: 'Why is Telnet insecure compared to SSH?', options: ['A. Telnet uses a different port','B. Telnet transmits all data including credentials in plaintext, making it trivially interceptable','C. Telnet does not support remote access','D. Telnet requires more bandwidth'], answer: 'B' },
        { q: 'The EternalBlue exploit and WannaCry ransomware targeted which service?', options: ['A. HTTP on 80','B. SSH on 22','C. SMB on 445','D. DNS on 53'], answer: 'C' },
        { q: 'Which protocol automatically assigns IP addresses to hosts?', options: ['A. DNS on 53','B. DHCP on 67/68','C. ARP','D. ICMP'], answer: 'B' },
        { q: 'Why is NTP important for Active Directory security?', options: ['A. NTP encrypts Kerberos tickets','B. Kerberos fails if clocks drift more than 5 minutes between client and server','C. AD uses NTP to assign IP addresses','D. NTP provides the DC with DNS records'], answer: 'B' },
        { q: 'An SNMP device responds to the community string "public". What is the risk?', options: ['A. The device is correctly secured','B. "public" is the default — it exposes full device configuration to unauthenticated queries','C. SNMP is encrypted so community strings are safe','D. Read-only community strings pose no risk'], answer: 'B' },
      ]} />
    </LessonCard>
  );
}

function SecFundamentalsSection() {
  return (
    <LessonCard number="07" title="Network Security Fundamentals" subtitle="Defence in depth and Zero Trust architecture">
      <SectionIntro>
        Protecting a network requires layered controls. Click each component in the topology
        diagram to understand its role, then read the core principles below.
      </SectionIntro>

      <DiagramContainer title="Network Security Topology" subtitle="Click components to learn their security role" fullWidth>
        <NetworkSecurityTopology />
      </DiagramContainer>

      <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.35rem', fontWeight: 700, color: '#e6e9f0', marginTop: '2.5rem', marginBottom: '1rem' }}>
        Core Principles
      </h3>
      <ConceptGrid concepts={[
        {
          label: 'Defence in Depth',
          children: 'Multiple independent security controls at different layers. Firewall + IDS + endpoint protection + SIEM together are far more resilient than any single tool.'
        },
        {
          label: 'Network Segmentation',
          children: 'VLANs and DMZs divide the network into isolated zones. A compromised host in the user VLAN cannot directly reach database servers in a separate segment — limits lateral movement.'
        },
        {
          label: 'Least Privilege',
          children: 'Hosts communicate only with what they strictly need. All other traffic denied by default. Dramatically reduces blast radius of a compromise.'
        },
        {
          label: 'Zero Trust',
          children: 'No implicit trust based on network location. Every connection must be authenticated and authorised regardless of source. Implemented via MFA, device trust, micro-segmentation, SASE/ZTNA.'
        },
        {
          label: 'Encryption in Transit',
          children: 'TLS (HTTPS), SSH (remote access), IPSec (VPN tunnels). Data crossing any untrusted segment must be encrypted.'
        },
        {
          label: 'Network Monitoring',
          children: 'IDS/IPS detect and block attack patterns. NetFlow records who talked to whom. SIEM correlates all logs. Visibility is the prerequisite for detection.'
        }
      ]} />

      <InfoCard type="info" title="🔒 Micro-segmentation">
        Micro-segmentation isolates individual workloads from each other even within the same VLAN — 
        important in cloud and containerised environments.
      </InfoCard>

      <InfoCard type="info" title="🔐 NAC with 802.1X">
        NAC requires devices to authenticate before receiving an IP address. Rogue devices plugged 
        into a switch port are blocked before they can communicate.
      </InfoCard>

      <MCQBlock questions={[
        { q: 'What is the primary benefit of network segmentation?', options: ['A. It speeds up network traffic','B. It limits lateral movement after a compromise — an attacker cannot reach other zones','C. It eliminates the need for a firewall','D. It reduces infrastructure costs'], answer: 'B' },
        { q: 'What does Zero Trust assume about internal network connections?', options: ['A. Always trusted because internal','B. No authentication needed on VPN','C. Must still be authenticated and authorised — no implicit trust based on location','D. Encrypted by default'], answer: 'C' },
        { q: 'Which principle states hosts should communicate only with what they strictly need?', options: ['A. Defence in depth','B. Zero Trust','C. Principle of least privilege applied to network access','D. Network segmentation'], answer: 'C' },
        { q: 'A DMZ hosts a public web server. What is its primary security purpose?', options: ['A. To make the server faster','B. If the server is compromised, the attacker cannot directly reach the internal network','C. To eliminate the need for TLS','D. To allow direct inbound connections to internal servers'], answer: 'B' },
      ]} />

      <ContinueLink {...LINKS.firewall} />
    </LessonCard>
  );
}

function PracticalSection() {
  return (
    <LessonCard number="08" title="Practical Network Exercises" subtitle="Hands-on command-line exploration">
      <SectionIntro>
        Run these exercises on your own machine or an authorised lab. None require scanning
        external systems without permission.
      </SectionIntro>

      <InfoCard type="warn" title="⚠️ Safety Warning">
        Only run these on systems you own or have explicit written authorisation to test.
        Commands below target <code>localhost</code>, <code>example.com</code> (a designated test domain),
        or your own local network.
      </InfoCard>

      <TerminalBlock
        title="01. DNS Resolution"
        description="Query the A record and MX records for example.com."
        command="dig example.com A
dig example.com MX"
      />
      <p style={{ fontFamily: "'Oxanium', sans-serif", fontSize: '0.95rem', color: 'rgba(171, 207, 201, 0.8)', marginTop: '0.5rem' }}>
        <strong>Observe:</strong> The IP in the ANSWER section, the TTL (cache duration), and the authoritative name servers in AUTHORITY.
      </p>

      <TerminalBlock
        title="02. Connectivity & TTL"
        description="Ping example.com and observe the TTL in replies."
        command="# Linux / macOS
ping -c 4 example.com

# Windows
ping example.com"
      />
      <p style={{ fontFamily: "'Oxanium', sans-serif", fontSize: '0.95rem', color: 'rgba(171, 207, 201, 0.8)', marginTop: '0.5rem' }}>
        <strong>Observe:</strong> TTL ~56 suggests Linux destination (started at 64). TTL ~118 suggests Windows (started at 128). Each hop decrements by 1.
      </p>

      <TerminalBlock
        title="03. Route Tracing"
        description="Trace the network path to example.com."
        command="# Linux / macOS
traceroute example.com

# Windows
tracert example.com"
      />
      <p style={{ fontFamily: "'Oxanium', sans-serif", fontSize: '0.95rem', color: 'rgba(171, 207, 201, 0.8)', marginTop: '0.5rem' }}>
        <strong>Observe:</strong> Each line is one router hop. Asterisks (*) mean the router dropped the ICMP probe. IP addresses reveal your ISP, peering points, and CDN ingress nodes.
      </p>

      <TerminalBlock
        title="04. Listening Services"
        description="List all ports currently listening on your local machine."
        command="# Linux / macOS
ss -tuln

# Windows
netstat -ano"
      />
      <p style={{ fontFamily: "'Oxanium', sans-serif", fontSize: '0.95rem', color: 'rgba(171, 207, 201, 0.8)', marginTop: '0.5rem' }}>
        <strong>Observe:</strong> LISTEN entries show what is exposed. Port 22 = SSH, 80 = HTTP, 443 = HTTPS, 3389 = RDP. Any unexpected listening port is worth investigating.
      </p>

      <TerminalBlock
        title="05. Local Service Enumeration"
        description="Scan your own machine for open ports and service versions. Localhost only."
        command="nmap -sV localhost"
      />
      <p style={{ fontFamily: "'Oxanium', sans-serif", fontSize: '0.95rem', color: 'rgba(171, 207, 201, 0.8)', marginTop: '0.5rem' }}>
        <strong>Observe:</strong> Service names and versions on open ports. This is the same process used in pen test engagements — understanding your own exposure is the first step in hardening.
      </p>

      <TerminalBlock
        title="06. ARP Cache Inspection"
        description="Inspect your local ARP cache for IP-to-MAC mappings."
        command="arp -a"
      />
      <p style={{ fontFamily: "'Oxanium', sans-serif", fontSize: '0.95rem', color: 'rgba(171, 207, 201, 0.8)', marginTop: '0.5rem' }}>
        <strong>Observe:</strong> Your gateway entry. If two different IPs share the same MAC address, ARP spoofing may be active.
      </p>

      <TerminalBlock
        title="07. TCP Handshake in Wireshark"
        description="Capture local traffic and identify the TCP three-way handshake."
        command="# In Wireshark:
# 1. Start capture on active interface
# 2. Visit http://example.com in browser
# 3. Stop capture
# 4. Apply display filter:
tcp.flags.syn == 1"
      />
      <p style={{ fontFamily: "'Oxanium', sans-serif", fontSize: '0.95rem', color: 'rgba(171, 207, 201, 0.8)', marginTop: '0.5rem' }}>
        <strong>Observe:</strong> SYN (no ACK) = client initiating. SYN+ACK = server responding. ACK = handshake complete. Right-click any packet and choose Follow → TCP Stream.
      </p>

      <ContinueLink {...LINKS.recon} />
    </LessonCard>
  );
}

// Main Component
function NetSecProtocols() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0e27', position: 'relative' }}>
      <Navbar />
      
      <Suspense fallback={<div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#2dd68f', fontFamily: "'Sora', sans-serif" }}>Loading...</div>}>
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
          <ShaderGradientCanvas style={{ width: '100%', height: '100%' }}>
            <ShaderGradient
              control="query"
              urlString="https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=0.8&cAzimuthAngle=180&cDistance=3.6&cPolarAngle=90&cameraZoom=1&color1=%2302a89a&color2=%23324a5e&color3=%23000000&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=45&frameRate=10&gizmoHelper=hide&grain=on&lightType=3d&pixelDensity=2&positionX=-1.4&positionY=0&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=0&rotationY=10&rotationZ=50&shader=defaults&type=plane&uAmplitude=0&uDensity=1.3&uFrequency=5.5&uSpeed=0.1&uStrength=2.4&uTime=0&wireframe=false"
            />
          </ShaderGradientCanvas>
        </div>
      </Suspense>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1400px', margin: '0 auto', padding: '6rem 2rem 4rem' }}>
        {/* Hero Section */}
        <div style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 600px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, rgba(45, 214, 143, 0.15), rgba(2, 168, 154, 0.15))', border: '2px solid rgba(45, 214, 143, 0.3)', borderRadius: '20px' }}>
                  <NetworkSecurityIcon />
                </div>
                <div>
                  <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: '3rem', fontWeight: 800, color: '#e6e9f0', margin: 0, lineHeight: 1.1 }}>
                    Network Protocols<br/>Fundamentals
                  </h1>
                </div>
              </div>
              <p style={{ fontFamily: "'Oxanium', sans-serif", fontSize: '1.15rem', lineHeight: 1.7, color: 'rgba(171, 207, 201, 0.9)', margin: '0 0 2rem 0', maxWidth: '700px' }}>
                Understand how data moves across networks, how protocols communicate, and where 
                security weaknesses appear. Master the foundation for reconnaissance, traffic 
                analysis, and network defence.
              </p>

              {/* Metadata Cards */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ background: 'rgba(45, 214, 143, 0.08)', backdropFilter: 'blur(8px)', border: '1px solid rgba(45, 214, 143, 0.25)', borderRadius: '12px', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#2dd68f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="#2dd68f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="#2dd68f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(171, 207, 201, 0.6)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Level</div>
                    <div style={{ fontSize: '1rem', color: '#2dd68f', fontFamily: "'Sora', sans-serif", fontWeight: 700 }}>Intermediate</div>
                  </div>
                </div>

                <div style={{ background: 'rgba(2, 168, 154, 0.08)', backdropFilter: 'blur(8px)', border: '1px solid rgba(2, 168, 154, 0.25)', borderRadius: '12px', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="#02a89a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 4L12 14.01L9 11.01" stroke="#02a89a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(171, 207, 201, 0.6)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Lessons</div>
                    <div style={{ fontSize: '1rem', color: '#02a89a', fontFamily: "'Sora', sans-serif", fontWeight: 700 }}>8 Topics</div>
                  </div>
                </div>

                <div style={{ background: 'rgba(45, 214, 143, 0.08)', backdropFilter: 'blur(8px)', border: '1px solid rgba(45, 214, 143, 0.25)', borderRadius: '12px', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="#2dd68f" strokeWidth="2"/>
                    <path d="M12 6V12L16 14" stroke="#2dd68f" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(171, 207, 201, 0.6)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Duration</div>
                    <div style={{ fontSize: '1rem', color: '#2dd68f', fontFamily: "'Sora', sans-serif", fontWeight: 700 }}>60 min</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Network Illustration */}
            <div style={{ flex: '0 1 400px', minWidth: '300px' }}>
              <div style={{ background: 'rgba(10, 15, 25, 0.6)', backdropFilter: 'blur(12px)', border: '1px solid rgba(45, 214, 143, 0.2)', borderRadius: '20px', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, rgba(45, 214, 143, 0.15), rgba(2, 168, 154, 0.15))', border: '2px solid rgba(45, 214, 143, 0.3)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>🌐</div>
                <div style={{ width: '2px', height: '30px', background: 'linear-gradient(180deg, rgba(45, 214, 143, 0.5), rgba(45, 214, 143, 0.2))' }} />
                <div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, rgba(2, 168, 154, 0.15), rgba(45, 214, 143, 0.15))', border: '2px solid rgba(2, 168, 154, 0.3)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>🛡️</div>
                <div style={{ width: '2px', height: '30px', background: 'linear-gradient(180deg, rgba(2, 168, 154, 0.5), rgba(2, 168, 154, 0.2))' }} />
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ width: '70px', height: '70px', background: 'rgba(45, 214, 143, 0.1)', border: '2px solid rgba(45, 214, 143, 0.25)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem' }}>💻</div>
                  <div style={{ width: '70px', height: '70px', background: 'rgba(2, 168, 154, 0.1)', border: '2px solid rgba(2, 168, 154, 0.25)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem' }}>🖥️</div>
                </div>
                <p style={{ fontFamily: "'Oxanium', sans-serif", fontSize: '0.9rem', color: 'rgba(171, 207, 201, 0.7)', textAlign: 'center', margin: '1rem 0 0 0' }}>
                  Internet → Firewall → Client & Server
                </p>
              </div>
            </div>
          </div>

          {/* Learning Objectives */}
          <LearningObjective objectives={[
            'Explain the OSI model layers and map attacks to specific layers',
            'Understand TCP/IP addressing, subnetting, and CIDR notation',
            'Describe how TCP provides reliability via handshakes and sequence numbers',
            'Identify when UDP is preferred over TCP and explain UDP amplification attacks',
            'Explain ARP, ICMP, and NAT functionality and how they are exploited',
            'Recognise common network services, ports, and their security implications',
            'Apply defence in depth and Zero Trust principles to network architecture',
            'Use command-line tools to inspect local network state and traffic',
          ]} />
        </div>

        {/* Lesson Sections */}
        <div style={{ display: 'grid', gap: '0rem' }}>
          <OsiSection />
          <TcpIpSection />
          <TcpSection />
          <TcpUdpSection />
          <ArpIcmpNatSection />
          <ServicesSection />
          <SecFundamentalsSection />
          <PracticalSection />
        </div>
      </div>
    </div>
  );
}

export default NetSecProtocols;
