const mongoose = require("mongoose");

const { Schema } = mongoose;
const autoIncrement = require("mongoose-auto-increment");
const { SESSION_STATUS } = require("../tools/constants");

const Session = new Schema(
  {
    token: { type: String },
    ipAddress: { type: String },
    status: { type: Boolean, default: SESSION_STATUS.ONLINE },
  },
  { timestamps: true },
);

Session.plugin(autoIncrement.plugin, { model: "Session", field: "session_id" });

module.exports = mongoose.model("sessions", Session);
