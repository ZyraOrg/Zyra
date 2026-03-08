const express = require('express');
const multer = require('multer');
const router = express.Router();
const {
  createCampaign,
  getMyStats,
  getMyCampaigns,
  getCampaign,
  deleteCampaign,
  uploadCover,
  uploadDocuments,
} = require('../controllers/campaign.controller');
const { protect } = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');
const { createCampaignSchema } = require('../validators/campaign.validators');

const MB = 1024 * 1024;

const uploadCoverMiddleware = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * MB },
});

const uploadDocumentsMiddleware = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * MB },
});

router.post('/create', protect, validate(createCampaignSchema), createCampaign);
router.get('/stats', protect, getMyStats);
router.get('/mine', protect, getMyCampaigns);
router.get('/:id', getCampaign);
router.delete('/:id', protect, deleteCampaign);
router.post('/:id/cover', protect, uploadCoverMiddleware.single('cover'), uploadCover);
router.post('/:id/documents', protect, uploadDocumentsMiddleware.array('documents', 10), uploadDocuments);

module.exports = router;
