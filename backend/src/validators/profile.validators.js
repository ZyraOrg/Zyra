const { z } = require('zod');

const updateProfileSchema = z.object({
  // Campaign profile fields (Profile page)
  foundation_name: z.string().min(2, 'Foundation name must be at least 2 characters').max(100).optional(),
  country: z.string().min(1, 'Country is required').optional(),
  receiving_wallet_address: z
    .string()
    .regex(/^0x[0-9a-fA-F]{40}$/, 'Invalid wallet address — must be a valid Ethereum address (0x followed by 40 hex characters)')
    .optional(),
  // Account info fields (Settings page)
  name: z.string().min(2, 'Name must be at least 2 characters').max(100).optional(),
  phone: z.string().max(20).optional(),
});

module.exports = { updateProfileSchema };
