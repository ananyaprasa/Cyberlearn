import { Suspense, useState, memo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { OsintIcon } from '../components/OsintIcon';
import QuestionCard from '../components/QuestionCard';

const SECTIONS = [
  {
    id: 'intelligence-cycle',
    title: '1. The Intelligence Cycle',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=60',
    imgAlt: 'Intelligence cycle',
    bullets: [
      'The intelligence cycle is a structured process for converting raw data into actionable intelligence: Direction ? Collection ? Processing ? Analysis ? Dissemination ? Feedback.',
      'Direction defines the intelligence requirements � what questions need answering, what the scope is, and what decisions the intelligence will support.',
      'Collection gathers raw data from passive and active sources; processing organises and normalises it into a usable format (deduplication, categorisation, timestamping).',
      'Analysis applies critical thinking to identify what the data means in context � distinguishing confirmed facts from inferences and low-confidence speculation.',
      'Dissemination delivers the finished intelligence product to the right audience in the right format; feedback from consumers refines future collection and analysis priorities.',
    ],
    questions: [
      { q: 'What is the correct order of the intelligence cycle?', options: ['A. Collection ? Analysis ? Direction ? Dissemination', 'B. Direction ? Collection ? Processing ? Analysis ? Dissemination ? Feedback', 'C. Analysis ? Collection ? Processing ? Direction', 'D. Dissemination ? Direction ? Collection ? Analysis'], answer: 'B' },
      { q: 'What is the purpose of the "Direction" phase in the intelligence cycle?', options: ['A. To collect data from all available sources', 'B. To define intelligence requirements � what questions need answering and what decisions the intelligence will support', 'C. To write the final report', 'D. To disseminate findings to stakeholders'], answer: 'B' },
      { q: 'Why is the "Feedback" phase important in the intelligence cycle?', options: ['A. It allows the analyst to bill the client', 'B. Consumer feedback refines future collection priorities and improves the quality of subsequent intelligence products', 'C. It is a legal requirement before closing an engagement', 'D. It automatically updates the tools used in the collection phase'], answer: 'B' },
    ],
  },
  {
    id: 'data-correlation',
    title: '2. Data Correlation and Analysis',
    img: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=700&q=60',
    imgAlt: 'Data correlation',
    bullets: [
      'Data correlation cross-references findings from multiple independent sources � when two unrelated sources point to the same entity, confidence in that finding increases significantly.',
      'Timeline analysis reconstructs a chronological sequence of events from timestamps across logs, domain registrations, social media posts, and certificate issuance records to reveal cause-and-effect relationships.',
      'Link analysis maps relationships between entities (people, IPs, domains, organisations) as a graph, making indirect connections visible that would be invisible in a flat data table.',
      'Pattern recognition identifies recurring indicators of compromise (IoCs), behavioural signatures, or infrastructure reuse patterns that suggest a common actor or campaign.',
      'Each finding should be assigned a confidence level � confirmed (directly evidenced), probable (logically supported), or possible (speculative) � so consumers understand how much weight to place on it.',
    ],
    questions: [
      { q: 'Three separate data sources all reference the same email address used to register malicious domains. What analytical principle increases confidence in this finding?', options: ['A. Visualisation � the data has been charted', 'B. Data correlation � independent sources converging on the same entity raises confidence significantly', 'C. Timeline analysis � the registrations happened at different times', 'D. Pattern recognition � the email format matches a known template'], answer: 'B' },
      { q: 'An analyst maps domains, IPs, and registrant emails as nodes in a graph. Which technique is this?', options: ['A. Timeline analysis', 'B. Data correlation', 'C. Link analysis', 'D. Pattern recognition'], answer: 'C' },
      { q: 'A finding is labelled "probable" rather than "confirmed". What does this mean?', options: ['A. The finding should be excluded from the report', 'B. The finding is logically supported by evidence but not directly proven � it is an inference, not a confirmed fact', 'C. The analyst made an error during data collection', 'D. The finding came from a single passive source'], answer: 'B' },
    ],
  },
  {
    id: 'risk-assessment',
    title: '3. Risk Assessment',
    img: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=700&q=60',
    imgAlt: 'Risk assessment',
    bullets: [
      'Risk assessment contextualises findings by evaluating both the likelihood of exploitation and the potential impact � a critical vulnerability on an internet-facing server is far higher risk than the same flaw on an isolated internal host.',
      'The standard risk formula is Risk = Likelihood � Impact; findings are typically rated Critical, High, Medium, or Low based on this combined score.',
      'Accurate risk assessment depends on contextualised findings: knowing a server runs an outdated Apache version is only meaningful when combined with knowledge of what data it hosts and who can reach it.',
      'Threat modelling identifies the most likely adversaries and their capabilities, helping prioritise which risks are realistic threats versus theoretical ones for the specific organisation.',
      'Risk ratings must be justified with evidence � an unsupported "Critical" rating undermines credibility; each rating should reference the specific data points that drove the assessment.',
    ],
    questions: [
      { q: 'Why is contextualisation important when reporting that a server runs an outdated software version?', options: ['A. Outdated software is always critical regardless of context', 'B. Context � what data the server hosts and who can reach it � determines the actual risk level of the finding', 'C. Contextualisation is only needed for executive summaries', 'D. It allows the analyst to avoid mentioning the vulnerability'], answer: 'B' },
      { q: 'Using the formula Risk = Likelihood � Impact, a vulnerability with high likelihood but very low impact would be rated:', options: ['A. Critical', 'B. High', 'C. Medium or Low � high likelihood does not automatically mean high risk without significant impact', 'D. The formula does not apply to OSINT findings'], answer: 'C' },
      { q: 'What is the purpose of threat modelling in a risk assessment?', options: ['A. To list all possible vulnerabilities regardless of relevance', 'B. To identify the most likely adversaries and their capabilities, helping prioritise realistic threats over theoretical ones', 'C. To generate a compliance checklist', 'D. To replace the need for active reconnaissance'], answer: 'B' },
    ],
  },
  {
    id: 'report-structure',
    title: '4. Report Structure',
    img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=700&q=60',
    imgAlt: 'Report structure',
    bullets: [
      'Executive Summary � a concise, non-technical overview of the most critical findings, overall risk posture, and top recommended actions; written for leadership who will not read the full report.',
      'Methodology � describes the scope, tools used, data sources queried, and the analytical approach; enables independent verification and demonstrates professional rigour.',
      'Findings � the core of the report; each finding should include a title, description, evidence (with source attribution), risk rating, and specific remediation recommendation.',
      'Appendices � contain raw tool outputs, full data tables, and technical details that support the findings but would overwhelm the main body; referenced from findings as needed.',
      'Every claim in the report must be traceable to a specific source or tool output � unattributed claims cannot be verified and expose the analyst to legal and reputational risk.',
    ],
    questions: [
      { q: 'Who is the primary audience for the Executive Summary section of an OSINT report?', options: ['A. The penetration testing team', 'B. Leadership and decision-makers who need a concise risk overview without technical detail', 'C. The IT helpdesk team', 'D. Regulatory auditors only'], answer: 'B' },
      { q: 'Why must every finding include a specific remediation recommendation?', options: ['A. It makes the report longer', 'B. A finding without remediation leaves the reader informed but unable to act � actionable recommendations are the mark of a mature intelligence product', 'C. Remediation is required by all OSINT frameworks', 'D. It allows the analyst to charge more for the engagement'], answer: 'B' },
      { q: 'What is the purpose of the Appendices section in an OSINT report?', options: ['A. To summarise the executive findings', 'B. To contain raw tool outputs and technical details that support findings without overwhelming the main body', 'C. To list the analyst\'s qualifications', 'D. To provide a glossary of terms'], answer: 'B' },
    ],
  },
  {
    id: 'visualization',
    title: '5. Visualization and Presentation',
    img: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=700&q=60',
    imgAlt: 'Data visualization',
    bullets: [
      'Visualisation translates complex multi-entity datasets into charts, network graphs, heat maps, or timelines � making it easier for both analysts and non-technical stakeholders to grasp the intelligence picture.',
      'Network graphs (Maltego, Gephi) show entity relationships visually; a graph can reveal infrastructure reuse and indirect connections in seconds that would take hours to spot in a flat data table.',
      'Timelines (TimelineJS, Excel) plot events chronologically, making cause-and-effect relationships and attacker behaviour patterns immediately apparent.',
      'Heat maps and geographic plots (Tableau, Power BI) show where activity is concentrated � useful for identifying geographic anomalies in login attempts, domain registrations, or infrastructure location.',
      'Visuals should clarify, not decorate � every chart or graph must directly support a finding; decorative visuals add length without adding intelligence value.',
    ],
    questions: [
      { q: 'Which tool is specifically designed for visual link analysis and entity relationship mapping using automated data transforms?', options: ['A. Tableau', 'B. Power BI', 'C. Maltego', 'D. Excel'], answer: 'C' },
      { q: 'An analyst notices that a threat actor always registers new domains 48 hours before launching phishing campaigns. Which visualisation technique best reveals this pattern?', options: ['A. Network graph', 'B. Heat map', 'C. Timeline analysis', 'D. Geographic plot'], answer: 'C' },
      { q: 'What is the key principle for using visuals in an OSINT report?', options: ['A. Include as many charts as possible to appear thorough', 'B. Visuals should clarify findings � every chart must directly support intelligence value, not just add length', 'C. Visuals are only appropriate in executive summaries', 'D. All visuals must be created with Maltego'], answer: 'B' },
    ],
  },
  {
    id: 'best-practices',
    title: '6. Best Practices',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=60',
    imgAlt: 'Best practices',
    bullets: [
      'Clarity over completeness � a report that clearly communicates three critical findings is more valuable than one listing fifty findings without prioritisation or context.',
      'Separate facts from inferences � explicitly label which statements are directly evidenced and which are analytical conclusions; conflating the two undermines credibility.',
      'Tailor to the audience � technical appendices with raw data serve analysts; executive summaries with risk ratings and recommended actions serve leadership.',
      'Cross-reference findings across multiple sources before drawing conclusions � a single data point is rarely sufficient; corroboration increases confidence and reduces false positives.',
      'Document everything with timestamps and source references � raw outputs must be reproducible so findings can be independently verified by another analyst.',
      'Regularly update your toolset and source list � OSINT sources change frequently; tools that worked last year may be deprecated or blocked today.',
    ],
    questions: [
      { q: 'A report lists 80 findings with equal weight and no prioritisation. What is the main problem?', options: ['A. The report is too short', 'B. Decision-makers cannot identify which findings require immediate action, reducing the report\'s operational value', 'C. Eighty findings is too many for a single engagement', 'D. The findings should have been collected using active methods'], answer: 'B' },
      { q: 'Why should OSINT analysis work be performed in a dedicated isolated environment?', options: ['A. To make the tools run faster', 'B. To prevent accidental account linkage or cookie-based tracking that could alert the target', 'C. Isolated environments are required by law for OSINT', 'D. To avoid using too much bandwidth'], answer: 'B' },
      { q: 'What is the purpose of archiving raw tool outputs with timestamps?', options: ['A. To compress data for faster transmission', 'B. To allow findings to be independently verified and reproduced later by another analyst', 'C. To automatically generate a final report', 'D. To encrypt sensitive findings'], answer: 'B' },
    ],
  },
];

const CollapsibleCard = memo(function CollapsibleCard({ title, img, imgAlt, bullets, questions }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`analysis-panel${open ? ' analysis-panel--open' : ''}`}>
      <button className="analysis-panel-header" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <span className="analysis-panel-title">{title}</span>
        <span className="analysis-panel-toggle" aria-hidden="true">{open ? '-' : '+'}</span>
      </button>
      <div className="analysis-panel-body">
        <div>
          <img className="analysis-panel-img" src={img} alt={imgAlt} />
          <div className="analysis-panel-content">
            <ul className="analysis-card-list">{bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>
            <div className="analysis-mcq-block">
              <p className="analysis-mcq-heading">Practice Questions</p>
              {questions.map((item, qi) => (
                <QuestionCard key={`${item.q}-${qi}`} question={item.q} options={item.options} correctAnswer={item.answer} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

function OSINTAnalysis() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Suspense fallback={<div />}>
        <ShaderGradientCanvas style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, opacity: 0.8 }}>
          <ShaderGradient animate="off" brightness={1.4} cAzimuthAngle={0} cDistance={7.1} cPolarAngle={140} cameraZoom={17.29} color1="#aeacb7" color2="#152921" color3="#002f00" destination="onCanvas" embedMode="off" envPreset="city" format="gif" fov={45} frameRate={10} gizmoHelper="hide" grain="off" lightType="3d" pixelDensity={1} positionX={0} positionY={0} positionZ={0} range="disabled" rangeEnd={40} rangeStart={0} reflection={0.1} rotationX={0} rotationY={0} rotationZ={0} shader="defaults" type="sphere" uAmplitude={1.6} uDensity={1.1} uFrequency={5.5} uSpeed={0.1} uStrength={1} uTime={0} wireframe={false} />
        </ShaderGradientCanvas>
      </Suspense>
      <style>{`
        .analysis-back-btn { transition: transform 0.2s ease; }
        .analysis-back-btn:hover { transform: scale(1.05) translateY(-2px); background: rgba(92,242,255,0.25) !important; border-color: #5CF2FF !important; color: #FFFFFF !important; }
        .analysis-header-title { color: #abcfc9 !important; -webkit-text-fill-color: #abcfc9 !important; background: none !important; font-family: 'Sora', sans-serif !important; }
        .analysis-header-subtitle { font-family: 'Sora', sans-serif !important; }
        .analysis-accordion { display: flex; flex-direction: column; gap: 0.85rem; margin-top: 2rem; }
        .analysis-panel { background: linear-gradient(135deg,#0a0f0f 0%,#0d0d0d 100%); border: 1px solid rgba(1,107,97,0.2); border-radius: 8px; transition: border-color 0.25s ease, box-shadow 0.25s ease; }
        .analysis-panel:hover, .analysis-panel--open { border-color: #02a89a; box-shadow: 0 4px 18px rgba(1,107,97,0.18); }
        .analysis-panel-header { width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.5rem; background: transparent; border: none; cursor: pointer; text-align: left; gap: 1rem; }
        .analysis-panel-header:focus-visible { outline: 2px solid #02a89a; outline-offset: -2px; }
        .analysis-panel-title { font-family: 'Sora', sans-serif; font-size: 1rem; font-weight: 700; color: #02a89a; letter-spacing: 0.01em; line-height: 1.3; }
        .analysis-panel-toggle { flex-shrink: 0; width: 26px; height: 26px; display: flex; align-items: center; justify-content: center; border-radius: 50%; border: 1px solid rgba(2,168,154,0.45); color: #02a89a; font-size: 1.2rem; line-height: 1; font-family: 'Sora', sans-serif; font-weight: 300; transition: background 0.2s ease, border-color 0.2s ease; user-select: none; }
        .analysis-panel--open .analysis-panel-toggle { background: rgba(2,168,154,0.12); border-color: #02a89a; }
        .analysis-panel-body { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.3s ease; overflow: hidden; }
        .analysis-panel--open .analysis-panel-body { grid-template-rows: 1fr; overflow: visible; }
        .analysis-panel-body > div { overflow: hidden; }
        .analysis-panel--open .analysis-panel-body > div { overflow: visible; }
        .analysis-panel-img { width: 100%; height: auto; max-height: 240px; object-fit: cover; display: block; border-radius: 6px; margin-bottom: 1rem; opacity: 0.68; filter: saturate(0.5) brightness(0.8); transition: opacity 0.25s ease; }
        .analysis-panel--open .analysis-panel-img { opacity: 0.82; }
        .analysis-panel-content { padding: 1rem 1.5rem 1.4rem; }
        .analysis-card-list { margin: 0; padding-left: 1.15rem; list-style: disc; }
        .analysis-card-list li { font-family: 'Oxanium', sans-serif; font-size: 0.875rem; color: rgba(224,224,224,0.85); line-height: 1.7; margin-bottom: 0.35rem; }
        .analysis-card-list li::marker { color: #016B61; }
        .analysis-mcq-block { margin-top: 1.25rem; padding-top: 1rem; border-top: 1px solid rgba(1,107,97,0.25); }
        .analysis-mcq-heading { font-family: 'Sora', sans-serif; font-size: 0.82rem; font-weight: 700; color: #2dd68f; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.75rem; }
      `}</style>
      <Navbar />
      <div className="container" style={{ position: 'relative', zIndex: 1, paddingBottom: '4rem' }}>
        <div className="page-header elegant-header">
          <div className="header-icon"><OsintIcon size={80} /></div>
          <h1 className="elegant-title analysis-header-title">Analysis &amp; Reporting</h1>
          <p className="elegant-subtitle analysis-header-subtitle">
            Correlate intelligence and produce actionable reports
            <span className="difficulty hard" style={{ marginLeft: '1rem', verticalAlign: 'middle' }}>hard</span>
          </p>
          <div className="header-divider"></div>
        </div>
        <Link to="/osint" className="back-btn analysis-back-btn" style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid #00FFC8', color: '#FFFFFF' }}>
          ← Back to OSINT
        </Link>
        <div className="analysis-accordion">
          {SECTIONS.map((s) => <CollapsibleCard key={s.id} {...s} />)}
        </div>
      </div>
    </div>
  );
}

export default OSINTAnalysis;
