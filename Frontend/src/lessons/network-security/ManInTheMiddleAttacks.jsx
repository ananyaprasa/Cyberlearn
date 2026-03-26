import Quiz from '../../components/Quiz';
import PracticalQuiz from '../../components/PracticalQuiz';

export const ManInTheMiddleAttacks = {
  id: 3,
  title: 'Man-in-the-Middle Attacks',
  difficulty: 'hard',
  description: 'Understanding and defending against MITM attacks',
  intro: (
    <div className="intro-section">
      <h2>Man-in-the-Middle Attacks</h2>
      <p>Man-in-the-Middle (MITM) attacks occur when an attacker secretly intercepts and potentially alters communications between two parties. These attacks can compromise confidentiality, integrity, and authentication in network communications.</p>
      <img src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=500&fit=crop" alt="Network Security Threats" />
    </div>
  ),
  sections: [
    {
      title: 'Understanding MITM Attacks',
      content: (
        <>
          <p>Man-in-the-Middle attacks involve an attacker positioning themselves between two communicating parties to intercept, monitor, or modify their communications.</p>
          
          <h4>Types of MITM Attacks:</h4>
          <ul>
            <li><strong>ARP Spoofing:</strong> Manipulating ARP tables to redirect traffic</li>
            <li><strong>DNS Spoofing:</strong> Providing false DNS responses</li>
            <li><strong>DHCP Spoofing:</strong> Rogue DHCP servers providing malicious configurations</li>
            <li><strong>SSL Stripping:</strong> Downgrading HTTPS connections to HTTP</li>
            <li><strong>Evil Twin:</strong> Malicious wireless access points</li>
            <li><strong>BGP Hijacking:</strong> Manipulating routing protocols</li>
          </ul>
          
          <Quiz questions={[
            {
              question: "What is the primary goal of a Man-in-the-Middle attack?",
              options: [
                "To crash network services",
                "To intercept and potentially modify communications",
                "To consume network bandwidth",
                "To create network loops"
              ],
              correct: "To intercept and potentially modify communications"
            }
          ]} />
        </>
      )
    }
  ]
};