const mongoose = require('mongoose');

const blacklistSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },// this is used to create a unique index on the token field to prevent duplicate tokens from being stored in the database
  expiresAt: { type: Date, default: Date.now,
     expires: 86400 // this is used to set the expiration time for the token to 24 hours (86400 seconds) from the time it is created
    }// this is used to set the expiration time for the token to 24 hours (86400 seconds) from the time it is created
});

module.exports = mongoose.model('BlacklistToken', blacklistSchema);// this is used to create a model for the blacklist schema and export it so that it can be used in other files
// this is used to create a unique index on the token field to prevent duplicate tokens from being stored in the database

