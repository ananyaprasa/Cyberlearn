import csurf from "csurf";

const isProduction = process.env.NODE_ENV === 'production';

// CSRF Protection middleware
// Cross-domain (Vercel → Render) requires sameSite: "None" + secure: true
export const csrfProtection = csurf({
  cookie: {
    key: '_csrf',
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'None' : 'Lax',
  }
});
