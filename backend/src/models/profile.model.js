const { supabase } = require('../config/supabase');

const ProfileModel = {
  async findById(id) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async upsert(id, fields) {
    const { data, error } = await supabase
      .from('profiles')
      .upsert({ id, ...fields, updated_at: new Date() })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  isComplete(profile) {
    return !!(
      profile?.foundation_name &&
      profile?.country &&
      profile?.receiving_wallet_address
    );
  },
};

module.exports = ProfileModel;
