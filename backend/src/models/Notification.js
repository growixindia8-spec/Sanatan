const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  title: String,
  message: String,
  zone: String,               // optional — if set, only visible to coordinators of that zone
  type: { type: String, enum: ["info", "alert", "success"], default: "info" },
  isReadBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Notification", notificationSchema);
