# CareerForge: An AI-Powered Career Development Platform

Authors: Project Team
Date: February 19, 2026

## Abstract

CareerForge is a full-stack AI-powered platform designed to assist professionals in career planning, resume optimization, cover letter generation, and personalized skill roadmaps. Built with Next.js and using state-of-the-art generative models (Gemini) as the core reasoning and NLP engine, the system integrates user authentication (Clerk), serverless databases (Neon/Drizzle), and cloud media storage (ImageKit) to deliver an interactive, secure, and extensible career coaching experience.

## Keywords

AI Career Coach, Resume Analyzer, Roadmap Generator, Generative AI, Next.js, Serverless, Drizzle, Neon, Gemini API.

## 1. Introduction

Modern job markets demand personalized guidance and rapid iteration on career artifacts such as resumes and cover letters. CareerForge addresses these needs by combining generative AI with a modular web architecture to provide conversational coaching, resume analysis, cover letter drafting, and timeline-based learning roadmaps. This paper describes the system design, implementation details, API workflows, and potential evaluation strategies for future publication.

## 2. Related Work

Prior systems include AI-based resume scoring services, chatbot-driven career advisors, and learning-path recommenders. CareerForge differs by integrating multiple AI-assisted tools into a single platform with a focus on structured outputs (JSON roadmaps, structured resume feedback) and seamless user storage of artifacts and histories.

## 3. System Architecture

- Frontend: Next.js (app router), React 18, Tailwind CSS for styling, Radix UI primitives for accessible components.
- Authentication: Clerk (session management, user profiles).
- Backend/Serverless: Next.js API routes (Edge/Server functions) implementing AI agents for chat, resume analysis, roadmap generation, and cover-letter generation.
- Database: Neon (Postgres serverless) accessed via Drizzle ORM and Drizzle-kit; schema provided in `prisma/schema.prisma` and `configs/schema.ts`.
- AI Services: Gemini generative model via Google Generative Language API (calls to `gemini-2.5-flash` in the codebase).
- Media storage: ImageKit for uploading resume PDFs and serving assets.

Diagram (conceptual):

User Browser -> Next.js UI -> API endpoints -> Gemini API
                            \-> Database (Neon/Drizzle)
                            \-> ImageKit (media)

## 4. Implementation Details

This section summarizes relevant code, endpoints, and data formats extracted from the repository.

### 4.1 Technologies and Libraries

- Next.js (15.x) with the app router
- React 18
- TypeScript
- Tailwind CSS
- Clerk for authentication
- Drizzle ORM + Drizzle-kit for database migrations
- Neon serverless Postgres
- ImageKit for file uploads
- Gemini API (Generative Language)

### 4.2 Data Layer

The Drizzle schema defines two primary tables (excerpted):

- `users`: id, name, email
- `historyTable`: id, recordId, content (JSON), userEmail (references users.email), createdAt, aiAgentType, metaData

This table stores structured outputs from AI agents (reports, roadmaps, cover letters) and metadata such as resume URLs.

### 4.3 API Endpoints

The repository implements multiple API routes under `app/api/` that encapsulate the AI interactions:

- `ai-career-chat-agent` (POST): Receives `userInput`, forwards a conversational prompt to Gemini, and returns assistant text.

- `ai-resume-agent` (POST): Accepts a resume PDF (form data) and a `recordId`, extracts text via Gemini vision/inlineData (base64 PDF), sends resume text to Gemini with a structured JSON prompt; stores parsed JSON and optionally uploads the PDF to ImageKit. If the model response isn't valid JSON, the route attempts to fall back to a default structured summary.

- `ai-roadmap-agent` (POST): Receives `roadmapId` and `userInput` (desired career role). It prompts Gemini to return a JSON roadmap with 8–12 nodes and explicit coordinates and edges to support a visual roadmap canvas. The response is validated and stored in `historyTable`.

- `cover-letter-agent` (POST): Receives form data including resume PDF, `jobTitle`, `companyName`, and optional `jobDescription`. It extracts resume text, prompts Gemini to generate a plain-text cover letter, and stores the result.

- `history` and `user` APIs exist to fetch user histories and details (used by the frontend).

### 4.4 Key Prompting Patterns

- Use of system instruction: e.g., "You are a professional AI Career Coach" or "You are an AI Resume Analyzer." These prompts require the model to return structured JSON or plain text depending on the endpoint.
- Defensive parsing: endpoints strip markdown code fences and attempt to JSON.parse the model output; fallbacks applied on parse failures.
- PDF text extraction: PDF bytes are converted to base64 and sent to Gemini with an instruction to extract the plaintext.

### 4.5 Frontend

- The app uses Clerk components for sign-in and user sessions.
- Main UI pages include a landing `app/page.tsx`, dashboard pages, and per-tool UI for chat, resume upload, roadmap visualization, and cover letter generation.
- Visual components rely on Tailwind CSS and Radix UI primitives.

## 5. Evaluation Strategy

Because CareerForge relies on generative AI, evaluation includes both qualitative and quantitative measures:

- Human evaluation: Recruit participants to rate resume feedback and cover letters on usefulness, accuracy, and clarity.
- Automated metrics: Compare resume analyzer outputs against a rule-based baseline (keyword coverage, action-verb presence) and compute improvements.
- Ablation: Assess the effect of prompt variants and preprocessing (e.g., PDF extraction quality) on final outputs.
- Usability testing: Measure task completion time and user satisfaction for workflows (resume upload -> suggestions, cover letter generation, roadmap generation).

## 6. Privacy, Safety, and Ethics

- The system stores user-uploaded resumes and generated content in the database and ImageKit. Proper consent, retention, and deletion policies should be implemented in production.
- Generative models may hallucinate; endpoints implement defensive parsing and store raw model outputs. For production, add model-output verification steps and human-in-the-loop review for sensitive recommendations.

## 7. Limitations and Future Work

- Dependence on third-party APIs (Gemini, ImageKit, Clerk) may introduce latency and cost. Consider hybrid local+cloud approaches or model fine-tuning for domain specificity.
- Add explicit evaluation datasets and benchmarking for resume scoring.
- Expand multi-lingual support and customizable roadmap templates.

## 8. Reproducibility and How to Run

Repository contains `INSTALLATION.md` with setup steps. Key environment variables required (examples):

- `DATABASE_URL` — Neon/Postgres connection
- `GEMINI_API_KEY` — Google Generative Language API key
- `IMAGEKIT_PUBLIC_KEY`, `IMAGEKIT_PRIVATE_KEY`, `IMAGEKIT_ENDPOINT_URL` — ImageKit credentials
- Clerk environment variables for authentication

To run locally (typical Next.js flow):

```bash
npm install
npm run dev
```

To run tests or database push:

```bash
npm run db:push
```

## 9. Conclusion

CareerForge demonstrates how modular web architectures, serverless databases, and modern generative models can combine to deliver actionable career coaching and artifact generation. With further evaluation and iteration, this platform can become a valuable tool for job seekers and career developers.

## Acknowledgements

Project dependencies and libraries are listed in `package.json` and configuration files in the repository root.

## References

- Google Generative Language API (Gemini)
- Next.js documentation
- Drizzle ORM and Neon Postgres
- Clerk authentication

## Appendix - Notable Files

- `README.md`, `INSTALLATION.md`
- `app/api/ai-career-chat-agent/route.tsx`
- `app/api/ai-resume-agent/route.tsx`
- `app/api/ai-roadmap-agent/route.tsx`
- `app/api/cover-letter-agent/route.tsx`
- `configs/schema.ts`, `configs/db.tsx`
- `prisma/schema.prisma`
- Frontend pages under `app/` and UI components under `components/`


---

Generated from repository state on 2026-02-19.
