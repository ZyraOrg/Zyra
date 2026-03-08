const { supabase, createAuthClient } = require('../config/supabase');

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  // confirmPassword is validated by Zod before reaching here, no need to handle it

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { name },
  });

  if (error) {
    console.error('[signup] error:', error.message);
    return res.status(400).json({ error: error.message });
  }

  res.status(201).json({ message: 'Account created successfully', user: data.user });
};

const googleLogin = async (req, res) => {
  const client = createAuthClient(req);

  const { data, error } = await client.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.FRONTEND_URL}/auth/callback`,
      skipBrowserRedirect: true,
    },
  });

  if (error) {
    console.error('[googleLogin] error:', error.message);
    return res.status(400).json({ error: error.message });
  }

  res.redirect(data.url);
};

const googleCallback = async (req, res) => {
  console.log('[callback] query:', req.query);
  console.log('[callback] session keys:', Object.keys(req.session || {}));

  const { code } = req.query;

  if (!code) {
    console.error('[callback] no code in query');
    return res.redirect(`${process.env.FRONTEND_URL}/login?error=missing_code`);
  }

  const client = createAuthClient(req);

  const { data, error } = await client.auth.exchangeCodeForSession(code);

  console.log('[callback] exchange error:', error?.message);
  if (error) return res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  };

  res.cookie('access_token', data.session.access_token, {
    ...cookieOptions,
    maxAge: data.session.expires_in * 1000,
  });

  res.cookie('refresh_token', data.session.refresh_token, {
    ...cookieOptions,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    console.error('[login] error:', error.message);
    return res.status(401).json({ error: error.message });
  }

  const isProduction = process.env.NODE_ENV === 'production';
  const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
  };

  res.cookie('access_token', data.session.access_token, {
    ...cookieOptions,
    maxAge: data.session.expires_in * 1000,
  });

  res.cookie('refresh_token', data.session.refresh_token, {
    ...cookieOptions,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  res.json({ message: 'Login successful', user: data.user });
};

const setSession = async (req, res) => {
  const { accessToken, refreshToken, expiresIn } = req.body;

  if (!accessToken) {
    console.error('[setSession] missing access token');
    return res.status(400).json({ error: 'Missing token' });
  }

  const { data, error } = await supabase.auth.getUser(accessToken);
  if (error || !data.user) {
    console.error('[setSession] invalid token:', error?.message);
    return res.status(401).json({ error: 'Invalid token' });
  }

  const isProduction = process.env.NODE_ENV === 'production';
  const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
  };

  res.cookie('access_token', accessToken, {
    ...cookieOptions,
    maxAge: (expiresIn || 3600) * 1000,
  });

  res.cookie('refresh_token', refreshToken, {
    ...cookieOptions,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  res.json({ message: 'Session set' });
};

const getMe = async (req, res) => {
  const { id, email, created_at, user_metadata } = req.user;
  res.json({
    user: {
      id,
      email,
      name: user_metadata?.name || null,
      created_at,
    },
  });
};

const logout = async (req, res) => {
  res.clearCookie('access_token');
  res.clearCookie('refresh_token');
  req.session.destroy((err) => {
    if (err) console.error('[logout] session destroy error:', err.message);
  });
  res.json({ message: 'Logged out successfully' });
};

module.exports = { signup, googleLogin, googleCallback, login, setSession, getMe, logout };
