const ProfileModel = require('../models/profile.model');

const getProfile = async (req, res) => {
  try {
    const profile = await ProfileModel.findById(req.user.id);
    res.json({ profile, isComplete: ProfileModel.isComplete(profile) });
  } catch {
    res.status(404).json({ error: 'Profile not found' });
  }
};

const updateProfile = async (req, res) => {
  const { foundation_name, country, receiving_wallet_address, name, phone } = req.body;

  const fields = {};
  if (foundation_name !== undefined) fields.foundation_name = foundation_name;
  if (country !== undefined) fields.country = country;
  if (receiving_wallet_address !== undefined) fields.receiving_wallet_address = receiving_wallet_address;
  if (name !== undefined) fields.name = name;
  if (phone !== undefined) fields.phone = phone;

  try {
    const profile = await ProfileModel.upsert(req.user.id, fields);
    res.json({ message: 'Profile updated', profile, isComplete: ProfileModel.isComplete(profile) });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { getProfile, updateProfile };
