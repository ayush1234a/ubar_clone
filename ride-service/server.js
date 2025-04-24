const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4003;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DB_CONNECT_RIDES)
  .then(() => console.log('Connected to Rides DB'))
  .catch(err => console.error('DB Connection Error:', err));

app.use('/api/rides', require('./routes/ride.routes'));

app.listen(PORT, () => {
  console.log(`Ride Service running on port ${PORT}`);
});
