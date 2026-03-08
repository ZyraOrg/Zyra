const { z } = require('zod');

const createCampaignSchema = z.object({
  name: z.string().min(5, 'Campaign name must be at least 5 characters').max(100),
  objective: z.string().min(20, 'Objective must be at least 20 characters'),
  goal_amount: z.coerce.number({ invalid_type_error: 'Goal amount must be a number' }).positive('Goal amount must be greater than 0'),
  end_date: z.string().min(1, 'End date is required').refine((val) => {
    const selected = new Date(val);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selected > today;
  }, 'End date must be in the future'),
});

module.exports = { createCampaignSchema };
