# CareerForge - Installation Guide

Complete step-by-step guide to set up and run the AI Career Coach Agent locally.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18 or higher ([Download](https://nodejs.org/))
- **npm or yarn**: Package manager (comes with Node.js)
- **Git**: Version control ([Download](https://git-scm.com/))
- **Text Editor**: VS Code recommended ([Download](https://code.visualstudio.com/))

### Required Accounts & API Keys

1. **Clerk Account** - Authentication service
   - Visit [clerk.com](https://clerk.com)
   - Sign up for a free account
   - Create an application

2. **Neon Database** - PostgreSQL database
   - Visit [neon.tech](https://neon.tech)
   - Sign up for a free account
   - Create a new project and get your connection string

3. **Google Cloud Account** - Gemini API
   - Visit [cloud.google.com](https://cloud.google.com)
   - Create a project
   - Enable Gemini API
   - Generate API key

4. **ImageKit Account** (Optional) - Image hosting
   - Visit [imagekit.io](https://imagekit.io)
   - Sign up for a free account
   - Get your public key, private key, and URL endpoint

## 🚀 Installation Steps

### Step 1: Clone the Repository

```bash
git clone https://github.com/dasundu/AI_Career_Agent.git
cd AI_Career_Agent
```

### Step 2: Install Dependencies

Install all required npm packages:

```bash
npm install
```

Or if you prefer yarn:

```bash
yarn install
```

**What this does:**
- Downloads all packages listed in `package.json`
- Installs Next.js, React, Tailwind CSS, and all dependencies
- Creates `node_modules` folder with ~500MB of dependencies
- Updates `package-lock.json` with exact versions

### Step 3: Set Up Environment Variables

Create a `.env.local` file in the project root directory:

```bash
# Windows (PowerShell)
New-Item -Path ".env.local" -ItemType File

# macOS/Linux
touch .env.local
```

Add the following environment variables to `.env.local`:

```env
# ===== CLERK AUTHENTICATION =====
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# ===== DATABASE (NEON) =====
DATABASE_URL=postgresql://user:password@host.neon.tech/dbname?sslmode=require

# ===== GEMINI API =====
GEMINI_API_KEY=your_gemini_api_key

# ===== IMAGEKIT (Optional) =====
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_ENDPOINT_URL=your_imagekit_url_endpoint
```

#### How to Get Each API Key:

**Clerk Keys:**
1. Go to [clerk.com](https://clerk.com) and sign in
2. Select your application
3. Go to "API Keys" in the left sidebar
4. Copy `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`

**Neon Database URL:**
1. Go to [neon.tech](https://neon.tech) and sign in
2. Select your project
3. Click "Connection string"
4. Copy the PostgreSQL connection string
5. Use it as `DATABASE_URL`

**Gemini API Key:**
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable "Generative Language API"
4. Create an API key
5. Copy the key as `GEMINI_API_KEY`

**ImageKit Credentials:**
1. Go to [imagekit.io](https://imagekit.io) and sign in
2. Go to "Settings" → "API Keys"
3. Copy your Public Key, Private Key, and URL Endpoint

### Step 4: Set Up the Database

Initialize the database schema using Drizzle ORM:

```bash
npm run db:push
```

This command:
- Connects to your Neon database
- Creates all required tables
- Sets up the schema based on `prisma/schema.prisma`

**Expected output:**
```
✓ Your database is now in sync with your schema. Done in 1.23s
```

### Step 5: Run the Development Server

Start the Next.js development server:

```bash
npm run dev
```

**Expected output:**
```
> next dev

> ready - started server on 0.0.0.0:3000, url: http://localhost:3000
> event - compiled client and server successfully
```

### Step 6: Open in Browser

Open your web browser and navigate to:

```
http://localhost:3000
```

You should see the CareerForge landing page. Click "Start Coaching" to sign in with Clerk.

## ✅ Verification Checklist

After installation, verify everything is working:

- [ ] `npm install` completed without errors
- [ ] `.env.local` file created with all required keys
- [ ] `npm run db:push` executed successfully
- [ ] `npm run dev` started without errors
- [ ] http://localhost:3000 loads in browser
- [ ] Clerk sign-in page appears
- [ ] Can sign up and access dashboard
- [ ] AI Tools are visible on dashboard

## 🔧 Available Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Push database schema changes
npm run db:push
```

## 📁 Project Structure After Installation

```
AI_Career_Coach_Agent/
├── app/                          # Next.js app directory
│   ├── api/                      # API routes for AI services
│   │   ├── ai-career-chat-agent/
│   │   ├── ai-resume-agent/
│   │   ├── ai-roadmap-agent/
│   │   ├── cover-letter-agent/
│   │   └── history/
│   ├── (auth)/                   # Auth pages (sign-in, sign-up)
│   ├── (routes)/                 # Protected routes
│   │   ├── dashboard/
│   │   ├── ai-tools/
│   │   ├── my-history/
│   │   ├── billing/
│   │   └── profile/
│   └── page.tsx                  # Home page
├── components/                   # Reusable React components
│   └── ui/                       # UI component library
├── configs/                      # Configuration files
│   ├── db.tsx                   # Database connection
│   └── schema.ts                # Database schema
├── lib/                          # Utility functions
├── public/                       # Static assets
├── node_modules/                 # Dependencies (after npm install)
├── .env.local                    # Environment variables (create this)
├── package.json                  # Project dependencies
├── next.config.ts               # Next.js configuration
├── tsconfig.json                # TypeScript configuration
└── tailwind.config.ts           # Tailwind CSS configuration
```

## 🐛 Troubleshooting

### Port 3000 Already in Use

If port 3000 is already in use:

```bash
# Use a different port
npm run dev -- -p 3001
```

### Database Connection Error

**Error:** `Error: connect ECONNREFUSED`

**Solution:**
- Verify `DATABASE_URL` is correct
- Check your Neon database is active
- Ensure your IP is whitelisted in Neon console

### Missing Environment Variables

**Error:** `undefined GEMINI_API_KEY`

**Solution:**
- Check `.env.local` file exists in project root
- Verify all keys are correctly set
- Restart the dev server after adding variables

### Authentication Issues

**Error:** `Clerk: Missing publishable key`

**Solution:**
- Verify `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is set
- Check Clerk application is created
- Ensure keys match your Clerk account

### Module Not Found

**Error:** `Cannot find module 'next'`

**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 🎯 Next Steps

1. **Explore the Dashboard**
   - Upload a resume to test AI Resume Analyzer
   - Chat with AI Career Agent
   - Generate a career roadmap
   - Create a cover letter

2. **Customize Your Instance**
   - Update branding in components
   - Modify prompts in API routes
   - Customize styling with Tailwind CSS

3. **Deploy to Production**
   - Use Vercel, Netlify, or your preferred hosting
   - Set environment variables in hosting platform
   - Update Clerk redirect URLs for production domain

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Neon Database Docs](https://neon.tech/docs)
- [Gemini API Guide](https://ai.google.dev/tutorials/python_quickstart)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

## 💬 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review error messages in console
3. Check `.env.local` file is configured correctly
4. Verify all API keys are valid
5. Contact: dasunathauda99@gmail.com

---

**Happy coding! 🚀**
