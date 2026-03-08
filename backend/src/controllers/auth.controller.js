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

  if (error) return res.status(400).json({ error: error.message });

  res.status(201).json({ message: 'Account created successfully', user: data.user });
};

const googleLogin = async (req, res) => {
  const client = createAuthClient(req);

  const { data, error } = await client.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.BACKEND_URL}/api/auth/callback`,
      skipBrowserRedirect: true,
    },
  });

  if (error) return res.status(400).json({ error: error.message });

  req.session.save((err) => {
    if (err) return res.status(500).json({ error: 'Session error' });
    res.redirect(data.url);
  });
};

const googleCallback = async (req, res) => {
  const { code } = req.query;

  if (!code) return res.redirect(`${process.env.FRONTEND_URL}/login?error=missing_code`);

  const client = createAuthClient(req);

  const { data, error } = await client.auth.exchangeCodeForSession(code);

  if (error) return res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);

  const params = new URLSearchParams({
    access_token: data.session.access_token,
    refresh_token: data.session.refresh_token,
    expires_in: data.session.expires_in,
  });

  res.redirect(`${process.env.FRONTEND_URL}/auth/callback?${params.toString()}`);
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return res.status(401).json({ error: error.message });

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

  res.json({ message: 'Login successful', user: data.user });
};

const setSession = async (req, res) => {
  const { accessToken, refreshToken, expiresIn } = req.body;

  if (!accessToken) return res.status(400).json({ error: 'Missing token' });

  const { data, error } = await supabase.auth.getUser(accessToken);
  if (error || !data.user) return res.status(401).json({ error: 'Invalid token' });

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
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
  req.session.destroy();
  res.json({ message: 'Logged out successfully' });
};

module.exports = { signup, googleLogin, googleCallback, login, setSession, getMe, logout };
