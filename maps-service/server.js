const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4004;

app.use(cors());
app.use(express.json());

app.use('/api/maps', require('./routes/maps.routes'));

app.listen(PORT, () => {
  console.log(`Maps Service running on port ${PORT}`);
});
