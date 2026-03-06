const { supabase } = require('../config/supabase');

const createCampaign = async (req, res) => {
  const { title, description, goal, category } = req.body;

  const { data, error } = await supabase
    .from('campaigns')
    .insert({ user_id: req.user.id, title, description, goal, category, raised: 0, status: 'active' })
    .select()
    .single();

  if (error) return res.status(400).json({ error: error.message });

  res.status(201).json({ message: 'Campaign created', campaign: data });
};

const getMyCampaigns = async (req, res) => {
  const limit = parseInt(req.query.limit) || 4;
  const offset = parseInt(req.query.offset) || 0;

  const { data, error, count } = await supabase
    .from('campaigns')
    .select('*', { count: 'exact' })
    .eq('user_id', req.user.id)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) return res.status(400).json({ error: error.message });

  res.json({ campaigns: data, total: count });
};

const getCampaign = async (req, res) => {
  const { data, error } = await supabase
    .from('campaigns')
    .select('*, documents(*)')
    .eq('id', req.params.id)
    .single();

  if (error) return res.status(404).json({ error: 'Campaign not found' });

  res.json({ campaign: data });
};

const deleteCampaign = async (req, res) => {
  const { error } = await supabase
    .from('campaigns')
    .delete()
    .eq('id', req.params.id)
    .eq('user_id', req.user.id);

  if (error) return res.status(400).json({ error: error.message });

  res.json({ message: 'Campaign deleted' });
};

const uploadCover = async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  const { id } = req.params;
  const ext = req.file.originalname.split('.').pop();
  const path = `covers/${id}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from('campaigns')
    .upload(path, req.file.buffer, { contentType: req.file.mimetype, upsert: true });

  if (uploadError) return res.status(400).json({ error: uploadError.message });

  const { data: { publicUrl } } = supabase.storage.from('campaigns').getPublicUrl(path);

  const { error: updateError } = await supabase
    .from('campaigns')
    .update({ cover_url: publicUrl })
    .eq('id', id)
    .eq('user_id', req.user.id);

  if (updateError) return res.status(400).json({ error: updateError.message });

  res.json({ message: 'Cover uploaded', cover_url: publicUrl });
};

const uploadDocuments = async (req, res) => {
  if (!req.files?.length) return res.status(400).json({ error: 'No files uploaded' });

  const { id } = req.params;
  const uploaded = [];

  for (const file of req.files) {
    const path = `documents/${id}/${Date.now()}-${file.originalname}`;

    const { error: uploadError } = await supabase.storage
      .from('campaigns')
      .upload(path, file.buffer, { contentType: file.mimetype });

    if (uploadError) return res.status(400).json({ error: uploadError.message });

    const { data: { publicUrl } } = supabase.storage.from('campaigns').getPublicUrl(path);

    const { data, error: insertError } = await supabase
      .from('documents')
      .insert({ campaign_id: id, url: publicUrl, name: file.originalname })
      .select()
      .single();

    if (insertError) return res.status(400).json({ error: insertError.message });

    uploaded.push(data);
  }

  res.status(201).json({ message: 'Documents uploaded', documents: uploaded });
};

module.exports = { createCampaign, getMyCampaigns, getCampaign, deleteCampaign, uploadCover, uploadDocuments };
