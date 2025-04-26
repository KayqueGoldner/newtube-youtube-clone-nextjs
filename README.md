# [NewTube YouTube Clone](https://newtube-youtube-clone-nextjs.vercel.app/)

**A modern YouTube clone built with Next.js 15 that allows users to watch videos, create and manage channels, upload content, create playlists, and interact with other users. The application provides a seamless experience similar to YouTube.**

![Application Screenshot](/newtube-youtube-clone.png "Application Screenshot")

## 🚀 Features  

- **Video Streaming**: Watch videos with a modern video player powered by Mux
- **Channel Management**: Create and manage your own channel
- **Video Upload**: Upload videos with metadata including titles, descriptions, and thumbnails
- **Playlists**: Create and manage playlists of your favorite videos
- **User Authentication**: Secure user authentication with Clerk
- **Video Interactions**: Like, comment, and share videos
- **Subscriptions**: Subscribe to channels and get notified of new content
- **Responsive Design**: Works seamlessly on all device sizes

## 🛠️ Technologies Used  

- **Frontend**:  
  - [Next.js 15](https://nextjs.org/) - React framework with server-side rendering capabilities
  - [React 19](https://react.dev/) - JavaScript library for building user interfaces

- **Backend**:  
  - [tRPC](https://trpc.io/) - End-to-end typesafe APIs
  - [Clerk](https://clerk.com/) - Authentication and user management
  - [Neon Database](https://neon.tech/) - Serverless Postgres database
  - [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM for SQL databases
  - [Mux](https://mux.com/) - Video hosting and streaming

- **Programming Language**:  
  - [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript

- **Styling**:  
  - [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
  - [Shadcn UI](https://ui.shadcn.com/) - A collection of accessible and customizable UI components

## 📦 NPM Packages  

- [React Hook Form](https://www.react-hook-form.com/) - Performant form validation
- [Zod](https://zod.dev/) - TypeScript-first schema validation
- [date-fns](https://date-fns.org/) - Modern JavaScript date utility library
- [Drizzle Kit](https://orm.drizzle.team/kit-docs/overview) - Database migration and management tools
- [Uploadthing](https://uploadthing.com/) - File uploads
- [Recharts](https://recharts.org/) - Charting library for analytics
- [Embla Carousel](https://www.embla-carousel.com/) - Carousel component
- [Sonner](https://sonner.emilkowal.ski/) - Toast notifications

## 💻 Setup

Follow these steps to set up and run the application locally:

### 1. Clone the Repository

```bash
git clone https://github.com/KayqueGoldner/newtube-youtube-clone-nextjs.git
cd newtube-youtube-clone-nextjs
```

### 2. Install Dependencies

```bash
npm install
# or
bun install
```

### 3. Configure Environment Variables

Create a `.env.local` file with the following variables:

```
NEXT_PUBLIC_APP_URL=http://localhost:3000

# CLERK
CLERK_SECRET_KEY=
CLERK_SIGNING_SECRET=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

# DATABASE
DATABASE_URL=

# UPSTASH REDIS
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# UPSTASH QSTASH
QSTASH_TOKEN=
UPSTASH_WORKFLOW_URL=
QSTASH_CURRENT_SIGNING_KEY=
QSTASH_NEXT_SIGNING_KEY=

# MUX
MUX_TOKEN_ID=
MUX_TOKEN_SECRET=
MUX_WEBHOOK_SECRET=

# UPLOADTHING
UPLOADTHING_TOKEN=
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=

# OPENAI
OPENAI_API_KEY=
```

### 4. Set Up the Database

```bash
npx drizzle-kit push
# or
bunx drizzle-kit push
```

### 5. Run the Application

```bash
npm run dev
# or
bun run dev
```

### 6. Access the Application

Open [http://localhost:3000](http://localhost:3000) in your browser to access the application.

## 🔒 Authentication 

The application uses Clerk for secure authentication with support for:
- Email and password authentication
- Social login (Google, GitHub, etc.)
- Two-factor authentication

## 🎬 Video Features

- **Video Upload**: Upload videos with a modern UI and progress tracking
- **Video Processing**: Automatic video processing with Mux
- **Video Player**: Responsive video player with playback controls
- **Video Recommendations**: Personalized video recommendations
- **Watch History**: Track and display watched videos

## 🤝 Contribute

1. Fork this repository
2. Create a branch for your changes (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

All contributions are welcome!