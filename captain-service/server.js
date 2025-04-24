const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4002;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DB_CONNECT_CAPTAINS)
  .then(() => console.log('Connected to Captains DB'))
  .catch(err => console.error('DB Connection Error:', err));

app.use('/api/captains', require('./routes/captain.routes'));

app.listen(PORT, () => {
  console.log(`Captain Service running on port ${PORT}`);
});
