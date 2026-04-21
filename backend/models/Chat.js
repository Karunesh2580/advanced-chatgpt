const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    userId: String,
    title: String,
    messages: Array,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);