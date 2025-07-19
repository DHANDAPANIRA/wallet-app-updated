const Wallet = require('../models/wallet');
const { Transaction, User } = require('../models');
const { QueryTypes } = require('sequelize');
const sequelize = require('../config/db');

// POST /api/wallet/deposit
const deposit = async (req, res) => {
  try {
    const { userId, amount } = req.body;

    if (!userId || !amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid user or amount' });
    }

    // Get last transaction to find the running balance
    const lastTx = await Transaction.findOne({
      where: { user_id: userId },
      order: [['created_at', 'DESC']]
    });

    const prevBalance = lastTx ? parseFloat(lastTx.running_balance) : 0;
    const newBalance = prevBalance + parseFloat(amount);

    // Create deposit transaction
    const transaction = await Transaction.create({
      user_id: userId,
      type: 'deposit',
      amount: parseFloat(amount),
      running_balance: newBalance
    });

    res.status(201).json({
      message: 'Deposit successful',
      transaction
    });

  } catch (error) {
    console.error('Deposit error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};


// POST /api/wallet/withdraw
const withdraw = async (req, res) => {
  try {
    const { userId, amount } = req.body;

    if (!userId || !amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid user or amount' });
    }

    // Get last transaction to determine current balance
    const lastTx = await Transaction.findOne({
      where: { user_id: userId },
      order: [['created_at', 'DESC']]
    });

    const currentBalance = lastTx ? parseFloat(lastTx.running_balance) : 0;

    if (amount > currentBalance) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    const newBalance = currentBalance - parseFloat(amount);

    // Create withdrawal transaction
    const transaction = await Transaction.create({
      user_id: userId,
      type: 'withdraw',
      amount: parseFloat(amount),
      running_balance: newBalance
    });

    res.status(201).json({
      message: 'Withdrawal successful',
      transaction
    });

  } catch (error) {
    console.error('Withdraw error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getBalance = async (req, res) => {
  const { userId } = req.params;

  try {
    // Get the latest transaction for the user
    const latestTx = await Transaction.findOne({
      where: { user_id: userId },
      order: [['created_at', 'DESC']]
    });

    const balance = latestTx ? parseFloat(latestTx.running_balance) : 0;

    res.json({ userId, balance });

  } catch (error) {
    console.error('Error fetching balance:', error);
    res.status(500).json({ error: 'Failed to fetch balance' });
  }
};

// Get All Transactions
const getTransactions = async (req, res) => {
  const { userId } = req.params;
  try {
    const transactions = await Transaction.findAll({
      where: { user_id: userId },
      order: [['created_at', 'DESC']]
    });

    res.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};

// Daily Summary Grouped by created_at Date
const getDailySummary = async (req, res) => {
  const { userId } = req.params;
  try {
    const summary = await sequelize.query(
      `
      WITH tx_by_day AS (
        SELECT 
          DATE(created_at) AS tx_date,
          SUM(CASE WHEN type = 'deposit' THEN amount ELSE 0 END) AS total_deposit,
          SUM(CASE WHEN type = 'withdraw' THEN amount ELSE 0 END) AS total_withdrawal,
          MAX(created_at) AS last_tx_time
        FROM transactions
        WHERE user_id = :userId
        GROUP BY DATE(created_at)
      ),
      opening_balances AS (
        SELECT 
          tx.tx_date,
          COALESCE((
            SELECT running_balance
            FROM transactions t2
            WHERE t2.user_id = :userId AND DATE(t2.created_at) < tx.tx_date
            ORDER BY created_at DESC
            LIMIT 1
          ), 0) AS opening_balance
        FROM tx_by_day tx
      ),
      closing_balances AS (
        SELECT 
          tx.tx_date,
          (
            SELECT running_balance
            FROM transactions t2
            WHERE t2.user_id = :userId AND DATE(t2.created_at) = tx.tx_date
            ORDER BY created_at DESC
            LIMIT 1
          ) AS closing_balance
        FROM tx_by_day tx
      )
      SELECT 
        tx.tx_date AS date,
        ob.opening_balance,
        tx.total_deposit,
        tx.total_withdrawal,
        cb.closing_balance
      FROM tx_by_day tx
      JOIN opening_balances ob ON tx.tx_date = ob.tx_date
      JOIN closing_balances cb ON tx.tx_date = cb.tx_date
      ORDER BY tx.tx_date DESC;
      `,
      {
        replacements: { userId },
        type: QueryTypes.SELECT
      }
    );

    res.json(summary);

  } catch (error) {
    console.error('Error in daily summary:', error);
    res.status(500).json({ error: 'Failed to fetch daily summary' });
  }
};

module.exports = {
  deposit,
  withdraw,
  getBalance,
  getTransactions,
  getDailySummary,
};
