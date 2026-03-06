const { z } = require('zod');

const updateProfileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50).optional(),
  bio: z.string().max(300, 'Bio must be under 300 characters').optional(),
  avatar_url: z.string().url('Invalid avatar URL').optional(),
});

module.exports = { updateProfileSchema };
