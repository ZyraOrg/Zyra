const TransactionModel = require('../models/transaction.model');

const getMyTransactions = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    const result = await TransactionModel.findByRecipient(req.user.id, { limit, offset });
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { getMyTransactions };
