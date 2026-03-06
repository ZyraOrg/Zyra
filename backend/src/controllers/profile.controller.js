const { supabase } = require('../config/supabase');

const getProfile = async (req, res) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', req.user.id)
    .single();

  if (error) return res.status(404).json({ error: 'Profile not found' });

  res.json({ user: data });
};

const updateProfile = async (req, res) => {
  const { name, bio, avatar_url } = req.body;

  const { data, error } = await supabase
    .from('profiles')
    .upsert({ id: req.user.id, name, bio, avatar_url, updated_at: new Date() })
    .select()
    .single();

  if (error) return res.status(400).json({ error: error.message });

  res.json({ message: 'Profile updated', user: data });
};

module.exports = { getProfile, updateProfile };
