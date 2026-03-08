const { supabase } = require('../config/supabase');

const TransactionModel = {
  async create({ campaign_id, donor_id, recipient_id, amount, tx_hash }) {
    const { data, error } = await supabase
      .from('transactions')
      .insert({ campaign_id, donor_id, recipient_id, amount, tx_hash, status: 'pending' })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async findByRecipient(recipient_id, { limit = 10, offset = 0 } = {}) {
    const { data, error, count } = await supabase
      .from('transactions')
      .select('*, campaigns(name)', { count: 'exact' })
      .eq('recipient_id', recipient_id)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return { transactions: data, total: count, hasMore: count > offset + limit };
  },

  async updateStatus(id, status) {
    const { data, error } = await supabase
      .from('transactions')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};

module.exports = TransactionModel;
