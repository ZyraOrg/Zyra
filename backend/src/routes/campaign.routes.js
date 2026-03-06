const express = require('express');
const multer = require('multer');
const router = express.Router();
const {
  createCampaign,
  getMyCampaigns,
  getCampaign,
  deleteCampaign,
  uploadCover,
  uploadDocuments,
} = require('../controllers/campaign.controller');
const { protect } = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');
const { createCampaignSchema } = require('../validators/campaign.validators');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/create', protect, validate(createCampaignSchema), createCampaign);
router.get('/mine', protect, getMyCampaigns);
router.get('/:id', getCampaign);
router.delete('/:id', protect, deleteCampaign);
router.post('/:id/cover', protect, upload.single('cover'), uploadCover);
router.post('/:id/documents', protect, upload.array('documents', 10), uploadDocuments);

module.exports = router;
