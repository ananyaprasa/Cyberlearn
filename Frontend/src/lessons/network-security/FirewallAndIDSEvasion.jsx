import Quiz from '../../components/Quiz';
import PracticalQuiz from '../../components/PracticalQuiz';

export const FirewallAndIDSEvasion = {
  id: 4,
  title: 'Firewall & IDS Evasion',
  difficulty: 'hard',
  description: 'Techniques to bypass security controls and detection systems',
  intro: (
    <div className="intro-section">
      <h2>Firewall & IDS Evasion</h2>
      <p>Understanding how to bypass firewalls and intrusion detection systems is crucial for penetration testers and security professionals. This knowledge helps in both offensive security testing and defensive security hardening.</p>
      <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=500&fit=crop" alt="Network Security Controls" />
    </div>
  ),
  sections: [
    {
      title: 'Understanding Firewalls',
      content: (
        <>
          <p>Firewalls are network security devices that monitor and control incoming and outgoing network traffic based on predetermined security rules.</p>
          
          <h4>Types of Firewalls:</h4>
          <ul>
            <li><strong>Packet Filtering:</strong> Examines packets based on IP, port, and protocol</li>
            <li><strong>Stateful Inspection:</strong> Tracks connection states and context</li>
            <li><strong>Application Layer:</strong> Deep packet inspection of application data</li>
            <li><strong>Next-Generation:</strong> Combines multiple security functions</li>
          </ul>
          
          <h4>Common Firewall Rules:</h4>
          <ul>
            <li>Block all traffic by default (default deny)</li>
            <li>Allow specific services (HTTP, HTTPS, SSH)</li>
            <li>Restrict access by source IP or network</li>
            <li>Block known malicious IP addresses</li>
            <li>Rate limiting to prevent DoS attacks</li>
          </ul>
          
          <Quiz questions={[
            {
              question: "What is the main difference between stateless and stateful firewalls?",
              options: [
                "Stateless firewalls are faster",
                "Stateful firewalls track connection states",
                "Stateless firewalls are more secure",
                "There is no difference"
              ],
              correct: "Stateful firewalls track connection states"
            }
          ]} />
        </>
      )
    },
    {
      title: 'Firewall Evasion Techniques',
      content: (
        <>
          <h4>Port-Based Evasion:</h4>
          <ul>
            <li><strong>Port Hopping:</strong> Using different ports for the same service</li>
            <li><strong>Common Ports:</strong> Using ports typically allowed (80, 443, 53)</li>
            <li><strong>High Ports:</strong> Using ports above 1024 that may be less filtered</li>
            <li><strong>Source Port Manipulation:</strong> Using specific source ports (53 for DNS)</li>
          </ul>
          
          <h4>Protocol-Based Evasion:</h4>
          <ul>
            <li><strong>Protocol Tunneling:</strong> Encapsulating traffic in allowed protocols</li>
            <li><strong>HTTP Tunneling:</strong> Using HTTP for non-web traffic</li>
            <li><strong>DNS Tunneling:</strong> Hiding data in DNS queries and responses</li>
            <li><strong>ICMP Tunneling:</strong> Using ping packets for data transfer</li>
          </ul>
          
          <PracticalQuiz exercises={[
            {
              title: "Port Connectivity Test",
              difficulty: "beginner",
              description: "Test connectivity to common ports on a remote server",
              command: "telnet google.com 80",
              placeholder: "Did the connection succeed?",
              expectedAnswer: "yes",
              alternativeAnswers: ["connected", "success", "y"],
              hint: "Look for 'Connected' or similar message",
              explanation: "Port 80 is commonly allowed through firewalls for web traffic."
            }
          ]} />
        </>
      )
    }
  ]
};