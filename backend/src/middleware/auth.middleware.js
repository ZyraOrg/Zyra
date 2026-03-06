const { supabase } = require('../config/supabase');

const protect = async (req, res, next) => {
  const token = req.cookies?.access_token;

  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) return res.status(401).json({ error: 'Invalid or expired token' });

  req.user = data.user;
  next();
};

module.exports = { protect };
