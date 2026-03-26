# 🚨 Google Authentication Setup Required

## Current Status: ⚠️ Not Working

**The Google authentication is not working because:**

1. **Missing Google Client ID** - The `.env` file still has placeholder values
2. **Google Cloud Console not configured** - OAuth credentials need to be created

## 🔧 Quick Fix Steps:

### Step 1: Get Google Client ID (5 minutes)

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Create/Select Project**: Create a new project or select existing one
3. **Enable Google+ API**:
   - Go to "APIs & Services" → "Library"
   - Search "Google+ API" → Enable it
4. **Create OAuth Credentials**:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client IDs"
   - Application type: "Web application"
   - Name: "CyberLearn App"
   - Authorized JavaScript origins: `http://localhost:5174`
   - Authorized redirect URIs: `http://localhost:5174`
   - Click "Create"
5. **Copy the Client ID** (looks like: `123456789-abc...xyz.apps.googleusercontent.com`)

### Step 2: Update Environment File

1. **Open** `minor/.env` file
2. **Replace** this line:
   ```
   VITE_GOOGLE_CLIENT_ID=your-google-client-id-here
   ```
   **With** your actual Client ID:
   ```
   VITE_GOOGLE_CLIENT_ID=123456789-abc...xyz.apps.googleusercontent.com
   ```
3. **Save** the file

### Step 3: Restart Development Server

```bash
cd minor
npm run dev
```

## 🎯 What You'll See After Setup:

- ✅ Google "Sign in with Google" button appears
- ✅ Clicking it opens Google OAuth popup
- ✅ After login, redirects to dashboard
- ✅ User profile shows in navbar
- ✅ Dashboard is protected (requires login)

## 🔍 Current Debug Info:

When you visit `http://localhost:5174/auth`, you should see:
- ⚠️ Yellow warning box saying "Google OAuth not configured"
- Console message showing the Client ID status

## 🆘 Need Help?

If you're still having issues:
1. Check browser console for error messages
2. Verify the Client ID is correctly copied (no extra spaces)
3. Make sure the authorized origins match your dev server URL
4. Try refreshing the page after updating .env

## 🚀 Alternative: Test Without Google Setup

If you want to test the app functionality without Google OAuth:
- The regular login/signup forms still work (UI only)
- You can manually set `localStorage.setItem('isLoggedIn', 'true')` in browser console to access dashboard