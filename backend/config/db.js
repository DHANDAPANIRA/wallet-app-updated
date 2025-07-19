const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASS, 
    {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: console.log,
    });

// test connection
sequelize.authenticate()
  .then(() => console.log('DB connected'))
  .catch(err => console.error('DB connection error:', err));

module.exports = sequelize;