# CYBERLEARN CONTENT MIGRATION — MASTER INDEX

**Purpose**: Single source of truth for all migration documentation  
**Status**: 4 of 19 lessons complete (21.1%)  
**Last Updated**: August 16, 2026 - Nmap Reconnaissance complete

---

## 📚 QUICK NAVIGATION

### Essential Documents (Read These First)
1. **[THIS FILE] MIGRATION_MASTER_INDEX.md** — You are here
2. **MIGRATION_STATUS_SUMMARY.md** — Current progress, reference implementations
3. **LESSON_TYPE_CLASSIFICATION_GUIDE.md** — Classify lessons before migration
4. **CONTENT_QUALITY_CHECKLIST.md** — Final acceptance criteria (37 items)
5. **QUALITY_CHECKLIST_QUICK_REFERENCE.md** — One-page checklist

### Planning Documents
- **CONTENT_SYSTEM_AUDIT_AND_MIGRATION_PLAN.md** — Complete inventory, detailed plan
- **TWO_REFERENCE_IMPLEMENTATIONS.md** — Original reference system (now three)
- **MIGRATION_EFFORT_BREAKDOWN.md** — Time estimates per lesson

### Completion Documents
- **NETWORK_PROTOCOLS_UI_REDESIGN_COMPLETE.md** — Technical Concept reference ✅
- **OSINT_PASSIVE_MIGRATION_COMPLETE.md** — Investigation Methodology reference ✅
- **WIRESHARK_HYBRID_MIGRATION_COMPLETE.md** — Hybrid reference ✅
- **NMAP_RECONNAISSANCE_MIGRATION_COMPLETE.md** — Investigation Methodology example ✅
- **WIRESHARK_QUALITY_CHECKLIST_COMPLETED.md** — Example checklist (100% score)
- **NMAP_RECONNAISSANCE_QUALITY_CHECKLIST.md** — Example checklist (100% score)

---

## 🎯 THREE REFERENCE IMPLEMENTATIONS

### 1. Network Protocols Fundamentals — 🔧 TECHNICAL CONCEPT
**File**: `src/pages/NetSecProtocols.jsx`  
**Use When**: Lesson explains how technology works  
**Examples**: Protocols, algorithms, network architecture, encryption mechanisms  
**Key Features**: DiagramContainer, ConceptGrid, ProtocolTable, technical focus  
**Documentation**: `NETWORK_PROTOCOLS_UI_REDESIGN_COMPLETE.md`

### 2. OSINT Passive — 🔍 INVESTIGATION METHODOLOGY
**File**: `src/pages/OSINTPassive.jsx`  
**Use When**: Lesson teaches how to investigate  
**Examples**: Intelligence workflows, reconnaissance techniques, threat hunting  
**Key Features**: Workflow diagrams, TerminalBlock, analyst thinking  
**Documentation**: `OSINT_PASSIVE_MIGRATION_COMPLETE.md`

### 3. Wireshark — 🔀 HYBRID
**File**: `src/pages/NetSecWireshark.jsx`  
**Use When**: Lesson combines technical foundation + investigation methodology  
**Examples**: Tool lessons (Metasploit, Burp Suite, Nmap)  
**Key Features**: Part 1 (Technical) + TransitionMarker + Part 2 (Investigation)  
**Documentation**: `WIRESHARK_HYBRID_MIGRATION_COMPLETE.md`

---

## 📋 MIGRATION WORKFLOW

### Step 1: Classify the Lesson
- Open `LESSON_TYPE_CLASSIFICATION_GUIDE.md`
- Use decision tree to classify
- Document classification decision

### Step 2: Select Reference
- **Technical Concept** → Use Network Protocols structure
- **Investigation Methodology** → Use OSINT Passive structure
- **Hybrid** → Use Wireshark structure

### Step 3: Migrate Content
- Follow reference structure
- Reuse existing components (16 available)
- Create domain-specific diagrams if needed
- Write educational content

### Step 4: Quality Check
- Complete `CONTENT_QUALITY_CHECKLIST.md` (37 items)
- Score must be ≥85%
- Fix any unchecked items

### Step 5: Document
- Create `[LESSON_NAME]_MIGRATION_COMPLETE.md`
- Update `CONTENT_SYSTEM_AUDIT_AND_MIGRATION_PLAN.md`
- Update `MIGRATION_STATUS_SUMMARY.md`

### Step 6: Deploy
- Commit changes
- Test in staging
- Deploy to production
- Mark as COMPLETE ✅

---

## 🧩 REUSABLE COMPONENTS (16 AVAILABLE)

### UI Components (`src/components/learning/ui/`)
Created during Network Protocols migration:

1. **LessonCard** — Accordion sections with gradient numbers
2. **InfoCard** — Type-based boxes (info/tip/warn/danger)
3. **DiagramContainer** — Centered diagram frames
4. **ProtocolTable** — Professional data tables
5. **TerminalBlock** — Command blocks with copy buttons
6. **LearningObjective** — "What You'll Learn" card
7. **ConceptGrid** — Responsive concept cards

### Network Components (`src/components/learning/network/`)
Created during Wireshark migration:

8. **TrafficAnalysisWorkflow** — 7-stage investigation workflow
9. **PacketCaptureWorkflow** — Traffic pipeline
10. **PacketEncapsulation** — Layer visualization
11. **WiresharkInterfaceMockup** — Three-pane mock
12. **WiresharkFilterCard** — Interactive filter cards

### OSINT Components (`src/components/learning/osint/`)
Created during OSINT Passive migration:

13. **OSINTLifecycle** — 6-stage intelligence process
14. **PassiveVsActiveComparison** — Risk visualization
15. **DigitalFootprintMap** — Source mapping
16. **SourceVerification** — Evidence evaluation

### Reconnaissance Components (`src/components/learning/reconnaissance/`)
Created during Nmap Reconnaissance migration:

17. **ReconnaissanceWorkflow** — Investigation workflow (Objective → Document)
18. **ScanProcessDiagram** — How Nmap scanning works
19. **PortStateDiagram** — OPEN/CLOSED/FILTERED states
20. **HostDiscoveryFlow** — Host discovery process
21. **NmapOutputAnnotation** — Interactive output interpretation
22. **ScanDetectionIndicators** — Defender perspective (IDS/IPS/SIEM)

**All components are production-ready and reusable.**

---

## ✅ CONTENT QUALITY CHECKLIST (37 ITEMS)

### Categories
- **Content Quality**: 10 items (objectives, progression, accuracy)
- **Visual Quality**: 10 items (hero, glassmorphism, diagrams, components)
- **Lesson Type**: 5 items (classification, reference structure)
- **Technical**: 8 items (build, functionality, scope)
- **Documentation**: 4 items (completion doc, plan updates)

### Acceptance Criteria
✅ All 37 items must be checked  
✅ Quality score ≥85%  
✅ Completion doc written  
✅ Build deployed

**No lesson is complete until checklist is 100% checked.**

Full checklist: `CONTENT_QUALITY_CHECKLIST.md`

---

## 📊 MIGRATION PROGRESS

### Completed (4/19) — 21.1%

| Lesson | Type | File | Size | Status | Doc |
|--------|------|------|------|--------|-----|
| Network Protocols | 🔧 Technical | NetSecProtocols.jsx | 116.91 KB | ✅ | NETWORK_PROTOCOLS_UI_REDESIGN_COMPLETE.md |
| OSINT Passive | 🔍 Investigation | OSINTPassive.jsx | 43.02 KB | ✅ | OSINT_PASSIVE_MIGRATION_COMPLETE.md |
| Wireshark | 🔀 Hybrid | NetSecWireshark.jsx | 60.27 KB | ✅ | WIRESHARK_HYBRID_MIGRATION_COMPLETE.md |
| Nmap Reconnaissance | 🔍 Investigation | ReconNmap.jsx | 84.40 KB | ✅ | NMAP_RECONNAISSANCE_MIGRATION_COMPLETE.md |

### Remaining (15/19) — 78.9%

**Network Security (2 remaining)**
- ⬜ Man-in-the-Middle (Hybrid)
- ⬜ Firewall & IDS Evasion (Technical)

**Reconnaissance (4 remaining)**
- ⬜ Network Scanning Fundamentals (Technical)
- ⬜ Passive Reconnaissance (Investigation)
- ✅ Port Scanning with Nmap (Investigation) — COMPLETE
- ⬜ Active Reconnaissance (Investigation)
- ⬜ Service & Version Detection (Hybrid)

**OSINT (2 remaining)**
- ⬜ OSINT Active (Investigation)
- ⬜ OSINT Analysis & Reporting (Investigation)

**Cryptography (4 remaining)**
- ⬜ Symmetric Encryption (Technical)
- ⬜ Asymmetric Encryption (Technical)
- ⬜ Hash Functions & Integrity (Technical)
- ⬜ Digital Signatures & PKI (Technical)

**Domain Hubs (4 remaining)**
- ⬜ Network Security hub
- ⬜ Reconnaissance hub
- ⬜ OSINT hub
- ⬜ Cryptography hub

---

## 🎨 DESIGN SYSTEM

### Premium Cybersecurity Academy Style
- Dark glassmorphism panels
- Teal/cyan accents (#2dd68f, #02a89a)
- Gradient hero sections
- Sora headings, Oxanium body text

### No Stock Images Policy
- All visuals are educational diagrams (SVG/CSS)
- Illustrate concepts, not decoration
- Custom-built for each lesson

### Interactive Learning
- Copy buttons on commands
- Expandable sections
- MCQ interactions
- Hover effects

---

## ⏱️ ESTIMATED TIME PER LESSON

Based on completed migrations:

- **First lesson (Network Protocols)**: 6-8 hours (created all base components)
- **Second lesson (OSINT Passive)**: 4 hours (reused base, created OSINT components)
- **Third lesson (Wireshark)**: 4 hours (reused base, created network components)

**Going forward**: 2-4 hours per lesson (all base components exist)

**Total remaining**: ~32-64 hours for 16 lessons

---

## 🔒 SCOPE BOUNDARIES

### ✅ In Scope
- Content/learning pages only
- Domain overview pages (hubs)
- Lesson pages (19 total)
- Learning components

### ❌ Out of Scope (DO NOT MODIFY)
- Authentication system
- Assignment system
- Classroom system
- CTF challenges
- User management
- Admin panels
- Backend APIs

**CRITICAL**: Always verify a file is used ONLY by learning pages before modifying.

---

## 📖 LESSON TYPE DECISION TREE

### Does the lesson teach HOW SOMETHING WORKS?
- ✅ YES → **🔧 Technical Concept** (use Network Protocols reference)
- ❌ NO → Continue to next question

### Does the lesson teach HOW TO INVESTIGATE/GATHER INTELLIGENCE?
- ✅ YES → **🔍 Investigation Methodology** (use OSINT Passive reference)
- ❌ NO → Continue to next question

### Does the lesson teach BOTH (tool with technical foundation + usage)?
- ✅ YES → **🔀 Hybrid** (use Wireshark reference with Part 1 + Part 2)

**Full decision tree**: `LESSON_TYPE_CLASSIFICATION_GUIDE.md`

---

## 🏆 QUALITY STANDARDS

### Target Quality Score
- **Minimum**: 85% (Good — Production ready)
- **Goal**: 95%+ (Excellent — Reference quality)

### All Lessons Must Have
✅ Premium glassmorphism UI  
✅ Educational diagrams (no stock images)  
✅ Reusable components used  
✅ MCQs with correct answers  
✅ Terminal blocks where appropriate  
✅ Learning objectives stated  
✅ Build successful (<150 KB)  
✅ Documentation created  
✅ Classification documented

---

## 🚀 SUGGESTED MIGRATION ORDER

### Phase 1: Complete Network Security Domain (2 lessons)
1. **Man-in-the-Middle** (Hybrid) — Similar to Wireshark structure
2. **Firewall & IDS Evasion** (Technical) — Network concepts

### Phase 2: Complete Cryptography Domain (4 lessons)
3. **Symmetric Encryption** (Technical)
4. **Asymmetric Encryption** (Technical)
5. **Hash Functions** (Technical)
6. **Digital Signatures** (Technical)

### Phase 3: Complete Reconnaissance Domain (5 lessons)
7. **Network Scanning** (Technical)
8. **Passive Recon** (Investigation)
9. **Port Scanning with Nmap** (Hybrid)
10. **Active Recon** (Investigation)
11. **Service Detection** (Hybrid)

### Phase 4: Complete OSINT Domain (2 lessons)
12. **OSINT Active** (Investigation)
13. **OSINT Analysis** (Investigation)

### Phase 5: Upgrade Domain Hubs (4 pages)
14. Network Security hub
15. Reconnaissance hub
16. OSINT hub
17. Cryptography hub

---

## 📞 NEED HELP?

### Classification Unclear?
- Read `LESSON_TYPE_CLASSIFICATION_GUIDE.md`
- Check anti-patterns section
- Review example lessons

### Don't Know Which Reference to Use?
- Read `MIGRATION_STATUS_SUMMARY.md`
- Review completed reference implementations
- Check two-reference system doc

### Quality Check Failing?
- Complete `CONTENT_QUALITY_CHECKLIST.md` systematically
- Review `WIRESHARK_QUALITY_CHECKLIST_COMPLETED.md` example
- Fix unchecked items before proceeding

---

## 📈 SUCCESS METRICS

### Per-Lesson Success
- ✅ Checklist 100% complete
- ✅ Quality score ≥85%
- ✅ Build passes
- ✅ Documentation written

### Overall Migration Success
- ✅ All 19 lessons migrated
- ✅ Consistent premium quality
- ✅ No stock images
- ✅ All educational diagrams

**Current**: 3/19 complete (15.8%)  
**Target**: 19/19 complete (100%)

---

## 🔄 CONTINUOUS IMPROVEMENT

After each migration:
1. Note what went well
2. Identify challenges
3. Document lessons learned
4. Update processes as needed

**Goal**: Each migration faster and better than the last.

---

## ✅ FINAL CHECKLIST FOR USING THIS INDEX

Before starting next migration:
- [ ] Read this master index
- [ ] Review classification guide
- [ ] Select appropriate reference
- [ ] Check reusable components list
- [ ] Have quality checklist ready

During migration:
- [ ] Follow reference structure
- [ ] Reuse components where possible
- [ ] Create educational diagrams
- [ ] Build frequently

After migration:
- [ ] Complete quality checklist
- [ ] Write completion doc
- [ ] Update migration plan
- [ ] Update this index

---

## 📚 ALL DOCUMENTATION FILES

### Planning & Classification
1. MIGRATION_MASTER_INDEX.md (this file)
2. MIGRATION_STATUS_SUMMARY.md
3. CONTENT_SYSTEM_AUDIT_AND_MIGRATION_PLAN.md
4. LESSON_TYPE_CLASSIFICATION_GUIDE.md
5. TWO_REFERENCE_IMPLEMENTATIONS.md
6. MIGRATION_EFFORT_BREAKDOWN.md

### Quality Assurance
7. CONTENT_QUALITY_CHECKLIST.md
8. QUALITY_CHECKLIST_QUICK_REFERENCE.md
9. WIRESHARK_QUALITY_CHECKLIST_COMPLETED.md (example)

### Completed Migrations
10. NETWORK_PROTOCOLS_UI_REDESIGN_COMPLETE.md
11. OSINT_PASSIVE_MIGRATION_COMPLETE.md
12. WIRESHARK_HYBRID_MIGRATION_COMPLETE.md
13. NMAP_RECONNAISSANCE_MIGRATION_COMPLETE.md
14. WIRESHARK_QUALITY_CHECKLIST_COMPLETED.md (example)
15. NMAP_RECONNAISSANCE_QUALITY_CHECKLIST.md (example)

**All docs in**: `d:\Website-Projects\Cyberlearn\Cyberlearn\`

---

## 🎯 NEXT STEPS

1. **Read this entire master index** ✅
2. **Review the three reference implementations**
3. **Select next lesson to migrate** (suggest: Active Reconnaissance or Network Scanning Fundamentals)
4. **Classify the lesson** using guide
5. **Begin migration** following workflow
6. **Complete quality checklist** after migration

**You are ready to continue the migration!**

---

## CONCLUSION

This master index is your **single source of truth** for the CyberLearn content migration project.

- **3 reference implementations complete** (all lesson types covered)
- **22 reusable components available** (7 UI + 5 network + 4 OSINT + 6 reconnaissance)
- **37-item quality checklist established**
- **15 lessons remaining**

**Every tool you need is documented. Every process is defined. Every standard is clear.**

**Start the next migration with confidence. 🚀**
