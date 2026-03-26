import Quiz from '../../components/Quiz';

export const AnalysisReporting = {
  id: 3,
  title: 'Analysis & Reporting',
  difficulty: 'hard',
  description: 'Turning raw information into actionable intelligence',
  intro: (
    <div className="intro-section">
      <h2>Analysis & Reporting: From Data to Intelligence</h2>
      <p>The final and most critical stage of OSINT involves transforming raw data into actionable intelligence through systematic analysis and professional reporting.</p>
      <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=500&fit=crop" alt="Data Analysis and Reporting" />
    </div>
  ),
  sections: [
    {
      title: 'The Intelligence Cycle',
      content: (
        <>
          <p>OSINT analysis follows the intelligence cycle:</p>
          <ol>
            <li><strong>Planning & Direction:</strong> Define objectives and requirements</li>
            <li><strong>Collection:</strong> Gather information from various sources</li>
            <li><strong>Processing:</strong> Convert raw data into usable format</li>
            <li><strong>Analysis & Production:</strong> Interpret and synthesize information</li>
            <li><strong>Dissemination:</strong> Deliver intelligence to stakeholders</li>
            <li><strong>Feedback:</strong> Refine based on user needs</li>
          </ol>
          <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=400&fit=crop" alt="Intelligence Cycle" />
        </>
      )
    },
    {
      title: 'Data Correlation and Analysis',
      content: (
        <>
          <p>Connecting disparate pieces of information to reveal relationships:</p>
          <ul>
            <li><strong>Entity Resolution:</strong> Identifying when different data points refer to the same entity</li>
            <li><strong>Link Analysis:</strong> Mapping relationships between entities</li>
            <li><strong>Timeline Analysis:</strong> Organizing events chronologically</li>
            <li><strong>Geospatial Analysis:</strong> Mapping location-based data</li>
          </ul>
          <p><strong>Tools for Correlation:</strong></p>
          <ul>
            <li>Maltego - Visual link analysis</li>
            <li>i2 Analyst's Notebook - Intelligence analysis</li>
            <li>Gephi - Network visualization</li>
          </ul>
          <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=400&fit=crop" alt="Data Correlation" />
        </>
      )
    },
    {
      title: 'Risk Assessment',
      content: (
        <>
          <p>Evaluating security implications of findings:</p>
          <ul>
            <li><strong>Threat Identification:</strong> What vulnerabilities exist?</li>
            <li><strong>Likelihood Assessment:</strong> How probable is exploitation?</li>
            <li><strong>Impact Evaluation:</strong> What are the consequences?</li>
            <li><strong>Risk Prioritization:</strong> Which risks need immediate attention?</li>
          </ul>
          <p><strong>Risk Rating Matrix:</strong></p>
          <ul>
            <li><strong>Critical:</strong> Immediate action required, severe impact</li>
            <li><strong>High:</strong> Urgent attention needed, significant impact</li>
            <li><strong>Medium:</strong> Should be addressed, moderate impact</li>
            <li><strong>Low:</strong> Minor concern, minimal impact</li>
          </ul>
          <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=400&fit=crop" alt="Risk Assessment" />
          
          <Quiz questions={[
            {
              question: "What does a 'Critical' risk rating indicate?",
              options: [
                "The issue can be addressed later",
                "Immediate action is required with severe impact",
                "The risk is informational only",
                "The vulnerability is theoretical"
              ],
              correct: "Immediate action is required with severe impact"
            },
            {
              question: "Which factor is NOT part of risk assessment?",
              options: [
                "Threat identification",
                "Likelihood assessment",
                "Marketing strategy",
                "Impact evaluation"
              ],
              correct: "Marketing strategy"
            }
          ]} />
        </>
      )
    },
    {
      title: 'Report Structure',
      content: (
        <>
          <p>A comprehensive security report should include:</p>
          <ol>
            <li><strong>Executive Summary:</strong> High-level overview for decision-makers</li>
            <li><strong>Methodology:</strong> Detailed explanation of approach</li>
            <li><strong>Findings:</strong> Organized by severity with evidence</li>
            <li><strong>Recommendations:</strong> Actionable guidance for remediation</li>
            <li><strong>Appendices:</strong> Supporting information and references</li>
          </ol>
          <p><strong>For Each Finding Include:</strong></p>
          <ul>
            <li>Title and severity rating</li>
            <li>Description and impact</li>
            <li>Evidence (screenshots, logs)</li>
            <li>Remediation steps</li>
          </ul>
          <img src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&h=400&fit=crop" alt="Report Writing" />
        </>
      )
    },
    {
      title: 'Visualization and Presentation',
      content: (
        <>
          <p>Effective visual elements enhance understanding:</p>
          <ul>
            <li><strong>Network Diagrams:</strong> Show infrastructure and relationships</li>
            <li><strong>Charts and Graphs:</strong> Illustrate trends and distributions</li>
            <li><strong>Heat Maps:</strong> Display risk concentrations</li>
            <li><strong>Timelines:</strong> Show event sequences</li>
            <li><strong>Tables:</strong> Organize structured data</li>
          </ul>
          <p><strong>Tools:</strong> Microsoft Visio, Draw.io, Tableau, D3.js</p>
          <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=400&fit=crop" alt="Data Visualization" />
        </>
      )
    },
    {
      title: 'Best Practices',
      content: (
        <>
          <h4>Writing Style:</h4>
          <ul>
            <li><strong>Clarity:</strong> Use simple, direct language</li>
            <li><strong>Objectivity:</strong> Present facts without bias</li>
            <li><strong>Professionalism:</strong> Maintain formal tone</li>
            <li><strong>Accuracy:</strong> Verify all statements</li>
          </ul>
          <h4>Quality Assurance:</h4>
          <ul>
            <li>All findings are accurate and verified</li>
            <li>Evidence supports conclusions</li>
            <li>Recommendations are actionable</li>
            <li>Grammar and spelling are correct</li>
            <li>Sensitive information is properly handled</li>
          </ul>
        </>
      )
    }
  ]
};