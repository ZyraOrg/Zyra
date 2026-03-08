const { supabase } = require('../config/supabase');

const SettingsModel = {
  async findByUser(user_id) {
    const { data, error } = await supabase
      .from('profiles')
      .select('anonymous_donation')
      .eq('id', user_id)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async update(user_id, { anonymous_donation }) {
    const fields = { id: user_id, updated_at: new Date() };
    if (anonymous_donation !== undefined) fields.anonymous_donation = anonymous_donation;

    const { data, error } = await supabase
      .from('profiles')
      .upsert(fields)
      .select('anonymous_donation')
      .single();

    if (error) throw error;
    return data;
  },

  async changePassword(user_id, current_password, new_password) {
    // Verify current password by signing in with the user's email
    const { data: userData, error: userError } = await supabase.auth.admin.getUserById(user_id);
    if (userError || !userData.user) throw new Error('User not found');

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: userData.user.email,
      password: current_password,
    });
    if (signInError) throw new Error('Current password is incorrect');

    // Update to new password
    const { error: updateError } = await supabase.auth.admin.updateUserById(user_id, {
      password: new_password,
    });
    if (updateError) throw updateError;
  },
};

module.exports = SettingsModel;
