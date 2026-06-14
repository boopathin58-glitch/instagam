const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  oldPassword: String,
  newPassword: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Submission", submissionSchema);