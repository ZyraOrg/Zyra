const SettingsModel = require('../models/settings.model');

const getSettings = async (req, res) => {
  try {
    const settings = await SettingsModel.findByUser(req.user.id);
    res.json({ settings });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const updateSettings = async (req, res) => {
  try {
    const { anonymous_donation } = req.body;
    const settings = await SettingsModel.update(req.user.id, { anonymous_donation });
    res.json({ message: 'Settings updated', settings });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const changePassword = async (req, res) => {
  const { current_password, new_password } = req.body;

  if (!current_password || !new_password) {
    return res.status(400).json({ error: 'current_password and new_password are required' });
  }

  if (new_password.length < 8) {
    return res.status(400).json({ error: 'New password must be at least 8 characters' });
  }

  if (current_password === new_password) {
    return res.status(400).json({ error: 'New password must be different from current password' });
  }

  try {
    await SettingsModel.changePassword(req.user.id, current_password, new_password);
    res.json({ message: 'Password changed successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { getSettings, updateSettings, changePassword };
