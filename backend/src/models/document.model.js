const { supabase } = require('../config/supabase');

const DocumentModel = {
  async create({ campaign_id, url, name }) {
    const { data, error } = await supabase
      .from('documents')
      .insert({ campaign_id, url, name })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async findByCampaign(campaign_id) {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('campaign_id', campaign_id)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data;
  },
};

module.exports = DocumentModel;
