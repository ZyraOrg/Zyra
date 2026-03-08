const { supabase } = require('../config/supabase');
const CampaignModel = require('../models/campaign.model');
const DocumentModel = require('../models/document.model');
const devError = require('../utils/devError');

const createCampaign = async (req, res) => {
  try {
    const { name, objective, goal_amount, end_date } = req.body;
    const campaign = await CampaignModel.create({ user_id: req.user.id, name, objective, goal_amount, end_date });
    res.status(201).json({ message: 'Campaign created', campaign });
  } catch (err) {
    devError(res, 400, 'Failed to create campaign. Please try again.', err);
  }
};

const getMyStats = async (req, res) => {
  try {
    const stats = await CampaignModel.getStatsByUser(req.user.id);
    res.json(stats);
  } catch (err) {
    devError(res, 400, 'Failed to load stats. Please refresh.', err);
  }
};

const getMyCampaigns = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 4;
    const offset = parseInt(req.query.offset) || 0;
    const result = await CampaignModel.findByUser(req.user.id, { limit, offset });
    res.json(result);
  } catch (err) {
    devError(res, 400, 'Failed to load campaigns. Please refresh.', err);
  }
};

const getCampaign = async (req, res) => {
  try {
    const campaign = await CampaignModel.findById(req.params.id);
    res.json({ campaign });
  } catch (err) {
    devError(res, 404, 'Campaign not found.', err);
  }
};

const deleteCampaign = async (req, res) => {
  try {
    await CampaignModel.deleteByIdAndUser(req.params.id, req.user.id);
    res.json({ message: 'Campaign deleted' });
  } catch (err) {
    devError(res, 400, 'Failed to delete campaign. Please try again.', err);
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

  if (uploadError) return devError(res, 400, 'Failed to upload cover image. Please try again.', uploadError);

  const { data: { publicUrl } } = supabase.storage.from('campaigns').getPublicUrl(path);

  try {
    await CampaignModel.updateCover(id, req.user.id, publicUrl);
    res.json({ message: 'Cover uploaded', cover_url: publicUrl });
  } catch (err) {
    devError(res, 400, 'Cover uploaded but failed to save. Please try again.', err);
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

    if (uploadError) return devError(res, 400, 'Failed to upload one or more files. Please try again.', uploadError);

    const { data: { publicUrl } } = supabase.storage.from('campaigns').getPublicUrl(path);

    try {
      const doc = await DocumentModel.create({ campaign_id: id, url: publicUrl, name: file.originalname });
      uploaded.push(doc);
    } catch (err) {
      return devError(res, 400, 'Files uploaded but failed to save records. Please try again.', err);
    }
  }

  res.status(201).json({ message: 'Documents uploaded', documents: uploaded });
};

module.exports = { createCampaign, getMyStats, getMyCampaigns, getCampaign, deleteCampaign, uploadCover, uploadDocuments };
