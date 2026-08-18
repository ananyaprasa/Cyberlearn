# CYBERLEARN LESSON TYPE CLASSIFICATION GUIDE

**Date:** August 13, 2026  
**Purpose:** Define lesson types and appropriate structures for migration

---

## TWO REFERENCE IMPLEMENTATIONS

### 1. Network Protocols Fundamentals — TECHNICAL CONCEPT LESSON
**Route:** `/network-security/protocols`  
**File:** `src/pages/NetSecProtocols.jsx`

**Characteristics:**
- Teaches **how technology works** (protocols, layers, mechanisms)
- Heavy use of **technical diagrams** (OSI model, TCP handshake, packet flows)
- **Protocol tables** and reference data
- **Technical specifications** (ports, addresses, headers)
- Focus: **"How does this work?"**

**Structure:**
- Technical diagrams with protocol mechanics
- Reference tables (protocol comparison, port lists)
- Mechanism explanations (TCP sequence numbers, sliding window)
- Packet-level analysis
- Network topology visualization

**Best For:**
- Protocols
- System architecture
- Technical mechanisms
- Cryptographic algorithms
- Packet analysis

---

### 2. OSINT Passive — INVESTIGATION METHODOLOGY LESSON
**Route:** `/osint/passive`  
**File:** `src/pages/OSINTPassive.jsx`

**Characteristics:**
- Teaches **how to conduct an investigation** (methodology, process, workflow)
- Heavy use of **process diagrams** (lifecycle, workflows, decision trees)
- **Practical commands** and tool usage
- **Ethical considerations** and decision-making
- Focus: **"How do I do this systematically?"**

**Structure:**
- Process flow diagrams (investigation lifecycle)
- Methodology workflows
- Source evaluation frameworks
- Tool usage with context (when/why/how)
- Ethical decision frameworks
- Verification processes

**Best For:**
- Reconnaissance techniques
- OSINT workflows
- Penetration testing methodologies
- Incident response procedures
- Attack techniques

---

## LESSON TYPE CLASSIFICATION

### 🔧 TECHNICAL CONCEPT LESSONS

**Definition:** Teaches how technology, protocols, or systems work internally.

**Indicators:**
- Explains **technical mechanisms** (encryption, handshakes, routing)
- Focuses on **"what happens under the hood"**
- Heavy protocol/algorithm detail
- System architecture
- Reference specifications

**Content Patterns:**
- Protocol tables
- Layer models
- State machines
- Algorithm flows
- Technical comparisons
- Packet/message structure

**Example Lessons:**
- ✅ Network Protocols Fundamentals (REFERENCE)
- TCP/IP deep dive
- Symmetric/Asymmetric Encryption
- Hash Functions
- Digital Signatures & PKI
- Firewall Architecture
- IDS/IPS Mechanisms

**Structure Emphasis:**
- DiagramContainer with technical diagrams
- ProtocolTable for specifications
- ConceptGrid for mechanism breakdown
- Technical comparisons (TCP vs UDP)
- InfoCard for technical notes
- Less TerminalBlock, more diagrams

---

### 🔍 INVESTIGATION METHODOLOGY LESSONS

**Definition:** Teaches how to conduct security investigations, reconnaissance, or attacks.

**Indicators:**
- Explains **investigative process** (how to gather intelligence, how to exploit)
- Focuses on **"what do I do next?"**
- Workflow-oriented
- Tool usage in context
- Decision-making frameworks

**Content Patterns:**
- Investigation workflows
- Tool command examples
- Source evaluation
- Evidence collection
- Attack chains
- Methodology steps

**Example Lessons:**
- ✅ OSINT Passive (REFERENCE)
- OSINT Active
- Passive Reconnaissance
- Active Reconnaissance
- Nmap Scanning
- Network Enumeration
- MITM Attacks
- Exploitation Techniques

**Structure Emphasis:**
- Process flow diagrams (lifecycle, decision trees)
- TerminalBlock for practical commands
- ConceptGrid for techniques/sources
- Methodology frameworks
- InfoCard for tips/warnings/ethics
- Less protocol tables, more workflows

---

### 🔀 HYBRID LESSONS

**Definition:** Combines technical concepts with practical methodology.

**Indicators:**
- Teaches **both how it works AND how to use it**
- Technical foundation + practical application
- Theory → Practice flow

**Content Patterns:**
- Technical explanation first
- Practical methodology second
- Tool usage with technical context
- "How it works" → "How to use it"

**Example Lessons:**
- Wireshark (protocol dissection + analysis workflow)
- Certificate Analysis (PKI concepts + CT log investigation)
- DNS Enumeration (DNS mechanics + reconnaissance)

**Structure Approach:**
- **Part 1:** Technical foundation (use Technical Concept structure)
- **Part 2:** Practical methodology (use Investigation structure)
- Transition clearly between theory and practice

---

## CLASSIFICATION DECISION TREE

```
START: What is the primary learning goal?
│
├─ "Understand how [technology/protocol] works internally"
│  └─ TECHNICAL CONCEPT LESSON
│     Use: Network Protocols structure
│
├─ "Learn how to [investigate/attack/gather intelligence]"
│  └─ INVESTIGATION METHODOLOGY LESSON
│     Use: OSINT Passive structure
│
└─ "Understand [technology] AND use it in [investigation]"
   └─ HYBRID LESSON
      Use: Technical first, then Investigation
```

---

## LESSON-BY-LESSON CLASSIFICATION

### NETWORK SECURITY DOMAIN

#### ✅ Network Protocols Fundamentals — TECHNICAL CONCEPT (REFERENCE)
**Why:** Teaches how protocols work internally  
**Structure:** Protocol tables, layer models, technical diagrams  
**Reference:** Use as template for protocol/mechanism lessons

#### 🔍 Wireshark — HYBRID (Technical → Investigation)
**Why:** Protocol dissection (technical) + traffic analysis (investigation)  
**Structure:**
- Part 1: Wireshark interface, promiscuous mode, protocol dissection (Technical)
- Part 2: Analysis workflow, follow TCP stream, security analysis (Investigation)
**Approach:** Start with technical foundation, transition to methodology

#### 🔍 Man-in-the-Middle Attacks — INVESTIGATION METHODOLOGY
**Why:** Attack technique and methodology  
**Structure:** Attack workflow, ARP poisoning process, SSL stripping, detection  
**Reference:** Similar to OSINT Passive (process-focused)

#### 🔀 Firewall & IDS Evasion — HYBRID (Technical → Investigation)
**Why:** Firewall mechanics + evasion techniques  
**Structure:**
- Part 1: How firewalls work, rule matching, stateful inspection (Technical)
- Part 2: Evasion techniques, fragmentation, tunneling (Investigation)

---

### RECONNAISSANCE DOMAIN

#### 🔍 Network Scanning Fundamentals — INVESTIGATION METHODOLOGY
**Why:** Scanning process and methodology  
**Structure:** Scanning workflow, host discovery, network mapping  
**Reference:** Similar to OSINT Passive (process-focused)

#### 🔍 Passive Reconnaissance — INVESTIGATION METHODOLOGY
**Why:** Intelligence gathering methodology  
**Structure:** Similar to OSINT Passive  
**Reference:** Direct parallel to OSINT Passive

#### 🔍 Port Scanning with Nmap — INVESTIGATION METHODOLOGY
**Why:** Tool usage and scanning techniques  
**Structure:** Nmap workflow, scan types, result interpretation  
**Reference:** Heavy TerminalBlock usage like OSINT Passive

#### 🔍 Active Reconnaissance — INVESTIGATION METHODOLOGY
**Why:** Active intelligence gathering process  
**Structure:** Reconnaissance workflow, tool usage, data collection  
**Reference:** Similar to OSINT Passive but with direct interaction

#### 🔍 Service & Version Detection — INVESTIGATION METHODOLOGY
**Why:** Service enumeration process  
**Structure:** Detection workflow, banner grabbing, fingerprinting  
**Reference:** Process and tool-focused

---

### OSINT DOMAIN

#### ✅ OSINT Passive — INVESTIGATION METHODOLOGY (REFERENCE)
**Why:** Intelligence gathering methodology  
**Structure:** Process diagrams, tool usage, source evaluation  
**Reference:** Use as template for methodology lessons

#### 🔍 OSINT Active — INVESTIGATION METHODOLOGY
**Why:** Active intelligence gathering  
**Structure:** Similar to OSINT Passive (direct parallel)  
**Reference:** Use OSINT Passive structure

#### 🔍 OSINT Analysis & Reporting — INVESTIGATION METHODOLOGY
**Why:** Analysis process and reporting workflow  
**Structure:** Analysis workflow, evidence evaluation, reporting  
**Reference:** Process and methodology-focused

---

### CRYPTOGRAPHY DOMAIN

#### 🔧 Symmetric Encryption — TECHNICAL CONCEPT
**Why:** How encryption algorithms work  
**Structure:** Algorithm mechanics, cipher modes, key sizes  
**Reference:** Use Network Protocols structure (technical focus)

#### 🔧 Asymmetric Encryption — TECHNICAL CONCEPT
**Why:** How public/private key cryptography works  
**Structure:** Key exchange diagrams, RSA mechanics, mathematical foundation  
**Reference:** Use Network Protocols structure (technical focus)

#### 🔧 Hash Functions & Integrity — TECHNICAL CONCEPT
**Why:** How hashing algorithms work  
**Structure:** Hash function properties, collision resistance, algorithm comparison  
**Reference:** Use Network Protocols structure (technical focus)

#### 🔧 Digital Signatures & PKI — TECHNICAL CONCEPT
**Why:** How PKI and certificates work  
**Structure:** Certificate chains, trust models, validation process  
**Reference:** Use Network Protocols structure (technical focus)

---

## STRUCTURAL GUIDELINES BY TYPE

### 🔧 TECHNICAL CONCEPT STRUCTURE

**Hero:**
- Title emphasizes mechanism/technology
- Subtitle explains what it is

**Learning Objectives:**
- Focus on understanding, explaining, describing mechanisms
- Example: "Explain how TCP provides reliability"

**Section Flow:**
1. **Introduction** — What is this?
2. **How It Works** — Mechanism explanation
3. **Technical Deep Dive** — Internal details
4. **Comparison** — vs alternatives
5. **Security Implications** — Vulnerabilities, attacks
6. **Practical Application** — Where/when used

**Component Priority:**
1. DiagramContainer (mechanism diagrams)
2. ProtocolTable (specifications, comparisons)
3. ConceptGrid (mechanism breakdown)
4. InfoCard (technical notes)
5. TerminalBlock (limited — only for demonstration)

**Diagram Types:**
- Layer models
- State machines
- Protocol flows
- Architecture diagrams
- Comparison charts

---

### 🔍 INVESTIGATION METHODOLOGY STRUCTURE

**Hero:**
- Title emphasizes action/methodology
- Subtitle explains the investigative goal

**Learning Objectives:**
- Focus on performing, conducting, gathering, analyzing
- Example: "Perform passive reconnaissance without detection"

**Section Flow:**
1. **Why This Matters** — Investigation context
2. **Methodology** — Step-by-step process
3. **Tools & Techniques** — Practical usage
4. **Analysis** — Interpreting results
5. **Verification** — Validating findings
6. **Ethics & Legal** — Boundaries and constraints
7. **Best Practices** — Professional workflow

**Component Priority:**
1. Process flow diagrams (workflows, lifecycles)
2. TerminalBlock (commands, tool usage)
3. ConceptGrid (techniques, sources, considerations)
4. InfoCard (tips, warnings, ethics)
5. ProtocolTable (minimal — only if needed for reference)

**Diagram Types:**
- Workflow diagrams
- Decision trees
- Investigation lifecycles
- Evidence chains
- Source maps

---

### 🔀 HYBRID STRUCTURE

**Approach:** Clearly demarcate technical and methodological sections

**Part 1: Technical Foundation**
- Use Technical Concept structure
- Focus: "How does this work?"
- Heavy diagrams, minimal commands

**Transition Marker:**
- Clear visual/textual break
- Example: "Now that you understand how X works, let's see how to use it for Y"

**Part 2: Practical Methodology**
- Use Investigation Methodology structure
- Focus: "How do I use this?"
- Heavy commands, workflow diagrams

**Example: Wireshark**
```
Part 1: Understanding Wireshark
├── What is Wireshark
├── How packet capture works (technical)
├── Promiscuous mode explained
└── Protocol dissection architecture

[TRANSITION]

Part 2: Traffic Analysis Workflow
├── Capture methodology
├── Follow TCP Stream (practical)
├── Protocol analysis techniques
├── Security analysis workflow
└── Best practices
```

---

## ANTI-PATTERNS TO AVOID

### ❌ DON'T Force Technical Lessons into Investigation Structure
**Bad:** Nmap lesson that never shows Nmap commands  
**Why:** Methodology lessons need practical tool usage  

### ❌ DON'T Force Investigation Lessons into Technical Structure
**Bad:** OSINT lesson with protocol tables and no workflows  
**Why:** Investigation lessons need process clarity  

### ❌ DON'T Mix Structures Within Single Section
**Bad:** Section starts with protocol table, then shows commands, then mechanism diagram  
**Why:** Confusing flow, unclear learning objective  

### ❌ DON'T Use Investigation Diagrams for Technical Concepts
**Bad:** "TCP Handshake Investigation Workflow"  
**Why:** TCP handshake is a mechanism, not an investigation process  

### ❌ DON'T Use Technical Diagrams for Investigation Processes
**Bad:** "OSINT Protocol Layer Model"  
**Why:** OSINT is a methodology, not a technical protocol  

---

## CONTENT ADAPTATION EXAMPLES

### Example 1: Wireshark (Hybrid)

**Original Content:** Mixed technical and practical  

**Classification:** HYBRID — Protocol analysis tool + investigation workflow

**Migration Approach:**
```
Section 1-3: Technical Foundation (Network Protocols structure)
├── DiagramContainer: Wireshark interface architecture
├── ConceptGrid: Promiscuous mode, dissection, three-pane view
└── Technical explanation of packet capture

Section 4-6: Analysis Methodology (OSINT Passive structure)
├── TerminalBlock: Capture filters, display filters
├── Process diagram: Follow TCP Stream workflow
├── ConceptGrid: Analysis techniques
└── InfoCard: Security analysis tips
```

---

### Example 2: Nmap (Investigation Methodology)

**Original Content:** Tool commands and scan types  

**Classification:** INVESTIGATION METHODOLOGY — Scanning process

**Migration Approach:**
```
Use OSINT Passive structure:
├── Scanning lifecycle diagram (like OSINT Lifecycle)
├── TerminalBlock for each scan type (like Google Dorks)
├── ConceptGrid for scan type comparison
├── Port states diagram (simple, not protocol detail)
└── Interpretation workflow
```

**Not:** Protocol tables of TCP/UDP internals  
**Not:** Deep TCP handshake mechanism  
**Yes:** "What does this scan do?" and "When do I use it?"

---

### Example 3: Symmetric Encryption (Technical Concept)

**Original Content:** Cipher algorithms and modes  

**Classification:** TECHNICAL CONCEPT — How encryption works

**Migration Approach:**
```
Use Network Protocols structure:
├── DiagramContainer: Encryption flow (plaintext → cipher → ciphertext)
├── ProtocolTable: Algorithm comparison (AES-128/192/256, DES, 3DES)
├── DiagramContainer: Block cipher modes (ECB, CBC, CTR, GCM)
├── ConceptGrid: Key concepts (key size, block size, rounds)
└── Security implications
```

**Not:** Investigation workflow or tool commands  
**Not:** "How to encrypt files" step-by-step  
**Yes:** "How does AES-256-GCM work internally?"

---

## DECISION CHECKLIST

Before migrating a lesson, answer these questions:

### Primary Question:
**What is the learner expected to DO after completing this lesson?**

- [ ] **Explain how [technology] works** → TECHNICAL CONCEPT
- [ ] **Perform [investigation/attack/analysis]** → INVESTIGATION METHODOLOGY
- [ ] **Both understand AND perform** → HYBRID

### Secondary Questions:

**For Technical Concept:**
- [ ] Does this explain internal mechanisms?
- [ ] Does this need protocol/algorithm tables?
- [ ] Is the focus on "how it works"?
- [ ] Are diagrams showing states/flows/architecture?

**For Investigation Methodology:**
- [ ] Does this explain a process or workflow?
- [ ] Does this need tool commands?
- [ ] Is the focus on "how do I do this"?
- [ ] Are diagrams showing investigation steps?

**For Hybrid:**
- [ ] Does the lesson need both technical foundation AND practical usage?
- [ ] Can it be cleanly split into two parts?
- [ ] Is there a natural transition point?

---

## MIGRATION WORKFLOW

### Step 1: Classify the Lesson
- Read current content
- Identify primary learning objective
- Apply decision tree
- Tag as 🔧 Technical, 🔍 Investigation, or 🔀 Hybrid

### Step 2: Select Reference Implementation
- **Technical Concept** → Use Network Protocols structure
- **Investigation Methodology** → Use OSINT Passive structure
- **Hybrid** → Use both, with clear transition

### Step 3: Adapt Content Structure
- Don't force-fit content into wrong structure
- Preserve existing technical accuracy
- Enhance with appropriate component types
- Create diagrams that match lesson type

### Step 4: Verify Consistency
- Does structure match lesson type?
- Are components appropriate?
- Do diagrams teach the right concepts?
- Is the flow logical for this type?

---

## SUMMARY

### Two Templates, Not One

**Network Protocols** and **OSINT Passive** are NOT interchangeable templates.

They represent two distinct learning approaches:
- **Technical:** How does this work?
- **Methodological:** How do I do this?

**Choose the right structure for each lesson.**

**Don't force every page into the same template.**

**Respect the content's natural teaching style.**

---

**Created by:** Kiro AI Assistant  
**Date:** August 13, 2026  
**Purpose:** Guide lesson-type-appropriate migrations  
**Status:** ✅ READY FOR USE

