const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  time: {
    type: String
  }
}, { timestamps: true });

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;