const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

const { Schema } = mongoose;

const Total = new Schema(
  {
    user: { type: Schema.ObjectId, ref: "Student" },
    item: { type: Schema.ObjectId },
    progress: { type: Number, default: 0 },
  },
  { timestamps: true },
);

Total.plugin(autoIncrement.plugin, {
  model: "Total",
  field: "total_id",
});

module.exports = mongoose.model("Total", Total);
