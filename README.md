# 🚀 CareerForge - AI-Powered Career Development

A full-stack AI-powered career development platform built with Next.js that helps professionals navigate their career journey with intelligent guidance and personalized recommendations. Forge your path to success!

## 🌟 Live Demo
**[🎯 Try the live demo here →](https://ai-career-agent-seven.vercel.app/)**

## ✨ Features

### 🤖 AI Career Coach Chat
- Interactive Q&A sessions with an AI career counselor
- Personalized career advice and guidance
- Real-time responses powered by Gemini API

### 📄 AI Resume Analyzer
- Intelligent resume analysis and feedback
- Optimization suggestions for better job matching
- Industry-specific recommendations

### 🗺️ AI Roadmap Generator
- Personalized career path planning
- Skill development recommendations
- Timeline-based learning plans

### 💼 AI Cover Letter Generator (Coming Soon)
- Tailored cover letters for specific job applications
- Industry and role-specific customization
- Professional formatting and tone optimization

## 🔧 Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js** | Full-stack React framework |
| **React** | Interactive UI development |
| **Clerk** | Authentication and user management |
| **Neon** | Serverless Postgres database |
| **Tailwind CSS** | Modern, responsive styling |
| **Gemini API** | AI-powered natural language processing |
| **AgentKit** | AI agent workflow management |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Clerk account
- Neon database account
- Google Cloud account (for Gemini API)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/reddysaikumar254/ai_career.git
   cd AI_Career_Agent
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

   # Neon Database
   DATABASE_URL=your_neon_database_url

   # Gemini API
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Set up the database**
   ```bash
   npm run db:push
   # or
   yarn db:push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
ai-career-agent/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication routes
│   ├── dashboard/         # Main dashboard
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── agents/           # AI agent components
│   └── layout/           # Layout components
├── lib/                   # Utility functions
│   ├── db/               # Database configuration
│   ├── ai/               # AI service integrations
│   └── utils.ts          # Helper functions
├── public/               # Static assets
└── types/                # TypeScript type definitions
```

## 🔐 Authentication

This app uses **Clerk** for authentication, providing:
- Email/password authentication
- Social login options
- User management
- Session handling
- Protected routes

## 💾 Database

**Neon** serves as the serverless Postgres database with:
- Auto-scaling capabilities
- Branching for development
- Connection pooling
- Backup and recovery

## 🤖 AI Integration

The application leverages **Gemini API** for:
- Natural language processing
- Career advice generation
- Resume analysis
- Cover letter creation
- Roadmap planning



## 🎨 Styling

**Tailwind CSS** provides:
- Utility-first CSS framework
- Responsive design
- Dark mode support
- Custom component styling

## 📦 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Configure environment variables** in Vercel dashboard
3. **Deploy** with automatic builds on git push

**Live Demo:** https://ai-career-agent-seven.vercel.app/

```bash
npm run build
npm start
```

### Manual Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## 🔧 Configuration

### Database Setup

1. Create a Neon database
2. Add the connection string to your environment variables
3. Run migrations to set up tables

### API Keys

Obtain the following API keys:
- **Clerk**: Authentication keys from Clerk dashboard
- **Gemini API**: Google Cloud Console

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Clerk](https://clerk.com/) for seamless authentication
- [Neon](https://neon.tech/) for serverless Postgres
- [Google Gemini](https://ai.google.dev/) for AI capabilities

