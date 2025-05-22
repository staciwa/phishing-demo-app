const mongoose = require("mongoose");

const credentialSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const Credential = mongoose.model("Credential", credentialSchema);

module.exports = Credential;

