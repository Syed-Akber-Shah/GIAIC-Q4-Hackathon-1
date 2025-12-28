---
id: 001
title: Amend Constitution
stage: constitution
date: 2025-12-27
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: master
user: Claude Code
command: sp.constitution
labels: [constitution, governance, setup]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
 - .specify/templates/plan-template.md
 - .specify/templates/spec-template.md
 - .specify/templates/tasks-template.md
tests:
 - none
---

## Prompt

Project: AI/Spec-Driven Book with Embedded RAG Chatbot

Core principles:
- Spec-first workflow using Spec-Kit Plus
- Technical accuracy from official sources
- Clear, developer-focused writing
- Reproducible setup and deployment

Key standards:
- Book written with Docusaurus and deployed on GitHub Pages
- RAG chatbot grounded only in book content or user-selected text
- Stack: OpenAI Agents/ChatKit, FastAPI, Neon Postgres, Qdrant Cloud
- Runnable, well-documented code

Constraints:
- GitHub-based source control
- No hallucinated responses
- End-to-end reproducibility

Success criteria:
- Live book on GitHub Pages
- Fully functional embedded RAG chatbot
- All specs implemented via Spec-Kit Plus

## Response snapshot

Updated the project constitution to reflect the AI/Spec-Driven Book with Embedded RAG Chatbot project requirements. The new constitution includes:

Core Principles:
1. Spec-First Workflow: Spec-driven development using Spec-Kit Plus for all features and changes
2. Technical Accuracy: All content and code must be technically accurate from official sources
3. Developer Focus: Clear, developer-focused writing that prioritizes practical understanding
4. Reproducible Setup and Deployment: All setup and deployment processes must be fully reproducible
5. GitHub-Based Source Control: All source code and documentation managed through GitHub repositories
6. No Hallucinated Responses: RAG chatbot must be grounded only in book content or user-selected text

Additional sections:
- RAG Chatbot Principles: Specific requirements for the RAG functionality
- Development Workflow: Guidelines for implementation following Spec-Kit Plus
- Governance: Rules for constitution compliance and amendments

Also updated dependent templates (plan, spec, tasks) to align with the new constitution principles by adding constitution checklists and alignment requirements.

## Outcome

- ✅ Impact: Constitution updated from v1.0.0 to v1.1.0 with project-specific principles and governance
- 🧪 Tests: No tests required for constitution update
- 📁 Files: Updated 4 files (.specify/memory/constitution.md, .specify/templates/plan-template.md, .specify/templates/spec-template.md, .specify/templates/tasks-template.md)
- 🔁 Next prompts: Project setup can now proceed with the updated governance framework
- 🧠 Reflection: Constitution now properly reflects the specific requirements of the AI/Spec-Driven Book with RAG Chatbot project

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Begin spec creation for first feature