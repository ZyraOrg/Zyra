const { supabase } = require('../config/supabase');

const CampaignModel = {
  async create({ user_id, name, objective, goal_amount, end_date }) {
    const { data, error } = await supabase
      .from('campaigns')
      .insert({ user_id, name, objective, goal_amount, end_date, raised: 0, status: 'active', created_at: new Date() })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async findByUser(user_id, { limit = 4, offset = 0 } = {}) {
    const { data, error, count } = await supabase
      .from('campaigns')
      .select('*', { count: 'exact' })
      .eq('user_id', user_id)
      .is('deleted_at', null)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return { campaigns: data, total: count, hasMore: count > offset + limit };
  },

  async findById(id) {
    const { data, error } = await supabase
      .from('campaigns')
      .select('*, documents(*)')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw error;
    return data;
  },

  async deleteByIdAndUser(id, user_id) {
    const { error } = await supabase
      .from('campaigns')
      .update({ deleted_at: new Date() })
      .eq('id', id)
      .eq('user_id', user_id);

    if (error) throw error;
  },

  async getStatsByUser(user_id) {
    const { data, error, count } = await supabase
      .from('campaigns')
      .select('raised, goal_amount', { count: 'exact' })
      .eq('user_id', user_id)
      .is('deleted_at', null);

    if (error) throw error;

    const total_raised = (data || []).reduce((sum, c) => sum + Number(c.raised || 0), 0);

    return { total_campaigns: count || 0, total_raised };
  },

  async updateCover(id, user_id, cover_url) {
    const { error } = await supabase
      .from('campaigns')
      .update({ cover_url })
      .eq('id', id)
      .eq('user_id', user_id);

    if (error) throw error;
  },
};

module.exports = CampaignModel;
