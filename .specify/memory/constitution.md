<!--
Sync Impact Report:
- Version change: 1.0.0 → 1.1.0
- Modified principles: [PRINCIPLE_1_NAME] → Spec-First Workflow, [PRINCIPLE_2_NAME] → Technical Accuracy, [PRINCIPLE_3_NAME] → Developer Focus, [PRINCIPLE_4_NAME] → Reproducible Setup, [PRINCIPLE_5_NAME] → GitHub-Based Control, [PRINCIPLE_6_NAME] → No Hallucination
- Added sections: RAG Chatbot Principles, Development Workflow
- Removed sections: None
- Templates requiring updates: ⚠ pending - .specify/templates/plan-template.md, .specify/templates/spec-template.md, .specify/templates/tasks-template.md
- Follow-up TODOs: None
-->
# AI/Spec-Driven Book with Embedded RAG Chatbot Constitution

## Core Principles

### Spec-First Workflow
Spec-driven development using Spec-Kit Plus for all features and changes; All functionality must be defined in specifications before implementation; Clear requirements and acceptance criteria required before coding begins.

### Technical Accuracy
All content and code must be technically accurate, sourced from official documentation and verified sources; No unverified claims or assumptions in the book content; Code examples must be runnable and well-documented.

### Developer Focus
Clear, developer-focused writing that prioritizes practical understanding; Documentation must be accessible to developers of varying skill levels; User experience optimized for learning and implementation.

### Reproducible Setup and Deployment
All setup and deployment processes must be fully reproducible with clear, step-by-step instructions; Environment configurations must be version-controlled and documented; Deployment processes must be automated and reliable.

### GitHub-Based Source Control
All source code and documentation managed through GitHub repositories; Branching strategy follows GitFlow or similar established patterns; Pull requests required for all changes with proper code review.

### No Hallucinated Responses
RAG chatbot must be grounded only in book content or user-selected text; No hallucinated or fabricated responses allowed in the chatbot; Responses must be traceable to specific sources in the knowledge base.

## RAG Chatbot Principles

- Book written with Docusaurus and deployed on GitHub Pages
- RAG chatbot stack: OpenAI Agents/ChatKit, FastAPI, Neon Postgres, Qdrant Cloud
- Chatbot responses must be grounded only in book content or user-selected text
- End-to-end reproducibility of the entire system including RAG functionality

## Development Workflow

- All specs implemented via Spec-Kit Plus following the spec-first workflow
- Success criteria: Live book on GitHub Pages with fully functional embedded RAG chatbot
- Code quality standards: Runnable, well-documented code with comprehensive testing
- Deployment: GitHub Pages for documentation, with all components properly integrated

## Governance

Constitution supersedes all other development practices and must be followed for all project work; Amendments require explicit documentation, approval from project stakeholders, and migration plan for existing code; All pull requests and code reviews must verify compliance with these principles; Use this constitution as the primary guidance document for all development decisions.

**Version**: 1.1.0 | **Ratified**: 2025-01-01 | **Last Amended**: 2025-12-27
