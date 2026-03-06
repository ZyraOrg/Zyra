const { z } = require('zod');

const createCampaignSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(100),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  goal: z.number({ invalid_type_error: 'Goal must be a number' }).positive('Goal must be greater than 0'),
  category: z.string().min(1, 'Category is required'),
});

module.exports = { createCampaignSchema };
