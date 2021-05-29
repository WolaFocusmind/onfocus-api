const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

const { Schema } = mongoose;

const Event = new Schema(
  {
    name: { type: String },
    country: { type: String },
    email: { type: String },
  },
  { timestamps: true },
);

Event.plugin(autoIncrement.plugin, { model: "Event", field: "event_id" });

module.exports = mongoose.model("Events", Event);
