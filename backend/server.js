const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const walletRoutes = require('./routes/walletRoutes');
const { User, Transaction } = require('./models');


require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api', walletRoutes);

sequelize.sync({ alter: true }).then(() => {
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.DB_HOST}:${process.env.PORT}`);
  });
});
