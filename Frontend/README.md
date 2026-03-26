# CyberLearn - Gamified Cybersecurity Learning Platform

A modern, interactive platform for learning cybersecurity concepts through gamification and hands-on CTF challenges.

## Features

- **Multiple Learning Domains**
  - 🔍 OSINT (Open Source Intelligence)
  - 🎯 Reconnaissance
  - 🔐 Cryptography
  - 🛡️ Network Security

- **CTF Challenges**
  - 8 challenges across different categories
  - Point-based scoring system
  - Difficulty levels (Easy, Medium, Hard)
  - Real-time flag validation

- **Gamification Elements**
  - Progress tracking
  - Points system
  - Challenge completion status
  - Interactive lessons

## Tech Stack

- React 19
- React Router DOM
- Vite
- CSS3 with modern gradients and animations

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── pages/
│   ├── Home.jsx              # Landing page with domain cards
│   ├── OSINT.jsx             # OSINT learning module
│   ├── Reconnaissance.jsx    # Recon learning module
│   ├── Cryptography.jsx      # Crypto learning module
│   ├── NetworkSecurity.jsx   # Network security module
│   └── CTF.jsx               # CTF challenges page
├── App.jsx                   # Main app with routing
├── App.css                   # Global styles
└── main.jsx                  # Entry point
```

## Features to Expand

- User authentication and profiles
- Leaderboard system
- More CTF challenges
- Interactive coding environments
- Video tutorials
- Achievement badges
- Team competitions
