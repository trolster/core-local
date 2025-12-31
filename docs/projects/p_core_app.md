# Project: CORE App

## Overview

**Name:** CORE Workbench
**Type:** Local-only web application
**Category:** Skill Restoration / Tooling / Personal Infrastructure
**Status:** In Definition Phase
**Start Date:** TBD
**Target Duration:** 2-3 weeks of focused work

---

## Mission Alignment

This project directly advances:

- **M2: Manifest Sovereign Creative Ownership** — Building and finishing a tool that I own completely, transitioning from executing others' visions to creating my own. This project demonstrates technical authorship and represents the first shipped artifact of my return to building.

- **M4: Build Somatic Vitality and Temporal Coherence** — Establishing systems that turn daily effort into compounding trajectory. The CORE Workbench becomes the operational infrastructure for maintaining coherence across all other work.

---

## Strategic Context

### Why This Project Now

1. **Respects the Single-Thread Rule (S1):** This is the one self-owned build project in motion. All other ideas remain notes until this ships.

2. **Has an Irreversible Finish Line (S2):** Success is binary and externally observable: the app either runs and manages CORE content effectively, or it doesn't.

3. **Addresses C1 (The Loop of the Unfinished):** By building something that immediately serves daily use, completion pays back continuously rather than remaining theoretical.

4. **Supports Existential Honesty (D1):** The CORE system itself is a tool for stripping away comfortable narratives and confused thinking. Building the infrastructure to maintain it directly serves this driver.

5. **Re-engages Technical Mastery (D3):** After years in management, this restores the direct connection between thought and shipped reality, reestablishing autonomous agency through hands-on building.

6. **Ships Something Real:** Produces a working tool that provides immediate, continuous value rather than remaining a theoretical exercise.

---

## Problem Statement

Currently, CORE maintenance is fragmented across markdown files with no structured interface for:
- Rapid navigation between related concepts
- Consistent editing and refinement
- Tracking changes over time
- Ensuring structural coherence

This friction reduces the likelihood of keeping CORE current, which undermines its function as an operating system for coherent action.

**The cost of not building this:** CORE becomes static documentation rather than a living system, and the technical skills necessary for building real products remain theoretical rather than embodied.

---

## The Deliverable

A **local-only web application** that provides:

### Core Functionality

1. **Structured Navigation**
   - Browse CORE categories: Drivers, Missions, Goals, Challenges, Constraints, Projects, Narratives
   - Quick switching between items
   - Clear hierarchy and relationships

2. **Fast Editing**
   - Direct text editing with markdown support
   - Save changes to local files
   - Immediate visual feedback

3. **Persistence & History**
   - Local file storage (existing markdown files)
   - Basic change tracking (timestamps or snapshots)
   - No data loss, repeatable workflow

### Technical Architecture

**Frontend:**
- Modern web framework (React, Vue, or Svelte)
- Local development server
- Markdown rendering and editing

**Backend:**
- Node.js or similar for file system access
- Local API for CRUD operations on markdown files

**Storage:**
- Direct manipulation of markdown files in `/docs/` directory
- No database required (filesystem as source of truth)
- Version control via git (existing workflow)

**Deployment:**
- Runs on localhost
- Simple start command (`npm start` or similar)
- No hosting, no authentication, no multi-user concerns

---

## Success Criteria

The project is complete when ALL of the following are true:

1. **✓ It Runs:** The app starts reliably on localhost with a single command
2. **✓ It Reads:** CORE content is loaded and displayed correctly from markdown files
3. **✓ It Writes:** Changes made in the UI persist correctly to markdown files
4. **✓ It Ships:** I complete at least one full workflow: create → edit → save → revisit
5. **✓ I Use It:** The app becomes my primary interface for CORE work for 1 week

**Completion Threshold:** When conditions 1-5 are met, the project is finished. No feature creep, no "polish," no "version 2.0 planning."

---

## Constraints & Boundaries

### What This Is NOT

- Not a public product
- Not a portfolio piece
- Not a SaaS or multi-user system
- Not a general-purpose note-taking app

### Active Constraints

This project must respect:

- **The Single-Thread Rule:** This is the only active build project until it ships
- **The Irreversible Finish Line:** Success criteria are defined and non-negotiable
- **Resistance Audit:** If progress stalls, apply diagnostic questions immediately
- **Scope Discipline:** No feature additions after initial MVP definition is set
- **Somatic Respect:** Progress must not come at the cost of physical neglect or sleep

---

## Risk Factors

### Technical Risks

- **Filesystem API Complexity:** Reading/writing markdown files from a web app may introduce unexpected friction
- **Markdown Parsing Edge Cases:** Complex formatting might not render correctly

### Execution Risks

- **Novelty Fade:** Motivation may drop once initial architecture is in place
- **Scope Creep:** Temptation to add "just one more feature"
- **Context Switching:** Professional job search activities may fragment attention

### Mitigation Strategies

- Keep the tech stack familiar (use known tools, avoid learning new frameworks mid-project)
- Define MVP ruthlessly (defer all "nice to have" features)
- Start with read-only display, then add editing (progressive complexity)
- Use Resistance Audit at first sign of avoidance

---

## Definition of Done

A working local web application that:

1. Displays CORE content from markdown files in a structured, navigable interface
2. Allows direct editing and saving of CORE content back to markdown files
3. Runs reliably on localhost with simple setup
4. Handles basic error cases gracefully (missing files, malformed markdown, etc.)
5. Includes minimal documentation for starting and using the app
6. Has been used for real CORE work for at least 1 week

**When these conditions are met, the project is complete.**

---

## Next Actions

1. **Define Technical Stack** — Choose framework and file handling approach
2. **Create MVP Specification** — Document exact screens, interactions, and data flow
3. **Set Up Project Scaffold** — Initialize repo, install dependencies, verify local setup
4. **Implement Core Loop** — Read file → Display → Edit → Save → Verify
5. **Test Real Usage** — Complete one full CORE maintenance session using only the app
6. **Ship** — Mark project complete and move to next

---

## Connection to Larger Goals

This project is a **compounding node**:

- **Daily Infrastructure:** Becomes the tool for maintaining all other CORE work
- **Closure Practice:** Proves I can finish something for myself, breaking the pattern of abandonment
- **Skill Restoration:** Re-engages programming muscle memory after management years
- **Sovereignty Signal:** First artifact where I own 100% of the vision, execution, and outcome
- **Technical Foundation:** Establishes patterns and infrastructure for future tool-building projects

If this ships and works, it becomes the foundation for all subsequent CORE-based projects and validates the transition from manager to builder.

---

## Reflections & Learnings

*(To be completed after project is finished)*

- What worked well?
- What would I do differently?
- What did I learn about my execution patterns?
- How did constraints function in practice?
- What became possible after this shipped?
