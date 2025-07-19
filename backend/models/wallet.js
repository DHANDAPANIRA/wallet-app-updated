const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Wallet = sequelize.define('Wallet', {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  balance: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.00 }
});

module.exports = Wallet;
