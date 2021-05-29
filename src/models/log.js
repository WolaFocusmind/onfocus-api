const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const autoIncrement = require("mongoose-auto-increment");

const { Schema } = mongoose;

const Log = new Schema(
  {
    response_log: { type: String },
    type: { type: String },
  },
  { timestamps: true },
);

Log.plugin(autoIncrement.plugin, { model: "Log", field: "log_id " });
Log.plugin(mongoosePaginate);

module.exports = mongoose.model("Logs", Log);
