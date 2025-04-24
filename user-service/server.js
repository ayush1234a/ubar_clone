const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DB_CONNECT_USERS)
  .then(() => console.log('Connected to Users DB'))
  .catch(err => console.error('DB Connection Error:', err));

app.use('/api/users', require('./routes/user.routes'));

app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
});
