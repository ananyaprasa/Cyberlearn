import csurf from "csurf";

// CSRF Protection middleware
export const csrfProtection = csurf({
  cookie: {
    key: '_csrf',
    httpOnly: true,
    secure: true, // change to true in production
    sameSite: 'Lax'
  }
});