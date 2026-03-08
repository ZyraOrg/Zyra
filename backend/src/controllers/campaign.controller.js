const { supabase } = require('../config/supabase');
const CampaignModel = require('../models/campaign.model');
const DocumentModel = require('../models/document.model');

const createCampaign = async (req, res) => {
  try {
    const { name, objective, goal_amount, end_date } = req.body;
    const campaign = await CampaignModel.create({ user_id: req.user.id, name, objective, goal_amount, end_date });
    res.status(201).json({ message: 'Campaign created', campaign });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getMyStats = async (req, res) => {
  try {
    const stats = await CampaignModel.getStatsByUser(req.user.id);
    res.json(stats);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getMyCampaigns = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 4;
    const offset = parseInt(req.query.offset) || 0;
    const result = await CampaignModel.findByUser(req.user.id, { limit, offset });
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getCampaign = async (req, res) => {
  try {
    const campaign = await CampaignModel.findById(req.params.id);
    res.json({ campaign });
  } catch {
    res.status(404).json({ error: 'Campaign not found' });
  }
};

const deleteCampaign = async (req, res) => {
  try {
    await CampaignModel.deleteByIdAndUser(req.params.id, req.user.id);
    res.json({ message: 'Campaign deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
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

  try {
    await CampaignModel.updateCover(id, req.user.id, publicUrl);
    res.json({ message: 'Cover uploaded', cover_url: publicUrl });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const MB = 1024 * 1024;
const FILE_SIZE_LIMITS = { video: 20 * MB, default: 10 * MB };

const uploadDocuments = async (req, res) => {
  if (!req.files?.length) return res.status(400).json({ error: 'No files uploaded' });

  for (const file of req.files) {
    const isVideo = file.mimetype.startsWith('video/');
    const limit = isVideo ? FILE_SIZE_LIMITS.video : FILE_SIZE_LIMITS.default;
    if (file.size > limit) {
      const mb = limit / MB;
      return res.status(400).json({ error: `"${file.originalname}" exceeds the ${mb}MB limit for ${isVideo ? 'videos' : 'documents'}` });
    }
  }

  const { id } = req.params;
  const uploaded = [];

  for (const file of req.files) {
    const path = `documents/${id}/${Date.now()}-${file.originalname}`;

    const { error: uploadError } = await supabase.storage
      .from('campaigns')
      .upload(path, file.buffer, { contentType: file.mimetype });

    if (uploadError) return res.status(400).json({ error: uploadError.message });

    const { data: { publicUrl } } = supabase.storage.from('campaigns').getPublicUrl(path);

    try {
      const doc = await DocumentModel.create({ campaign_id: id, url: publicUrl, name: file.originalname });
      uploaded.push(doc);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  res.status(201).json({ message: 'Documents uploaded', documents: uploaded });
};

module.exports = { createCampaign, getMyStats, getMyCampaigns, getCampaign, deleteCampaign, uploadCover, uploadDocuments };
