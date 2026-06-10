const pool = require('../config/database');

exports.getOverview = async (req, res) => {
  try {
    const userId = req.user.userId;

    const result = await pool.query(
      `SELECT
        COUNT(DISTINCT id) as total_loans,
        SUM(principal_amount) as total_disbursed,
        SUM(CASE WHEN status = 'active' THEN principal_amount ELSE 0 END) as outstanding_balance,
        COUNT(CASE WHEN status = 'active' THEN 1 END) as active_loans,
        COUNT(CASE WHEN status = 'closed' THEN 1 END) as closed_loans
       FROM loans
       WHERE user_id = $1`,
      [userId]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Overview error:', error);
    res.status(500).json({ error: 'Failed to fetch overview' });
  }
};

exports.getLoansDue = async (req, res) => {
  try {
    const userId = req.user.userId;
    const today = new Date().toISOString().split('T')[0];

    const result = await pool.query(
      `SELECT id, loan_id, customer_name, principal_amount, interest_rate, end_date, status
       FROM loans
       WHERE user_id = $1 AND end_date = $2 AND status = 'active'
       ORDER BY end_date ASC`,
      [userId, today]
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch loans due' });
  }
};

exports.getCollections = async (req, res) => {
  try {
    const userId = req.user.userId;
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const result = await pool.query(
      `SELECT DATE_TRUNC('day', collection_date)::date as date, SUM(amount) as total_collected
       FROM collections c
       JOIN loans l ON c.loan_id = l.id
       WHERE l.user_id = $1 AND c.collection_date >= $2
       GROUP BY DATE_TRUNC('day', collection_date)
       ORDER BY date ASC`,
      [userId, thirtyDaysAgo]
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch collections' });
  }
};

exports.getOutstandingBalance = async (req, res) => {
  try {
    const userId = req.user.userId;

    const result = await pool.query(
      `SELECT
        SUM(principal_amount) as total_outstanding,
        COUNT(*) as total_active_loans,
        AVG(principal_amount) as average_loan_amount
       FROM loans
       WHERE user_id = $1 AND status = 'active'`,
      [userId]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch outstanding balance' });
  }
};

exports.getPerformanceMetrics = async (req, res) => {
  try {
    const userId = req.user.userId;

    const result = await pool.query(
      `SELECT
        COUNT(DISTINCT l.id) as total_loans,
        COUNT(DISTINCT CASE WHEN l.status = 'active' THEN l.id END) as active_loans,
        COUNT(DISTINCT CASE WHEN l.status = 'closed' THEN l.id END) as closed_loans,
        COUNT(DISTINCT c.id) as total_collections,
        SUM(c.amount) as total_collected
       FROM loans l
       LEFT JOIN collections c ON l.id = c.loan_id
       WHERE l.user_id = $1`,
      [userId]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch performance metrics' });
  }
};