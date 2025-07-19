const Wallet = require('./wallet');
const User = require('./users');
const Transaction = require('./transactions');

User.hasMany(Transaction, { foreignKey: 'userId' });
Wallet.hasMany(Transaction, { foreignKey: 'userId' });
// Transaction.belongsTo(Wallet, { foreignKey: 'userId' });

// module.exports = { Wallet, Transaction };
Transaction.belongsTo(User, { foreignKey: 'user_id' });

module.exports = { Wallet, User, Transaction };