const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const autoIncrement = require("mongoose-auto-increment");

const { Schema } = mongoose;

const Trash = new Schema(
  {
    name: { type: String },
    type: { type: Number },
    entity_id: { type: Number },
  },
  { timestamps: true },
);

Trash.plugin(autoIncrement.plugin, { model: "Trash", field: "trash_id" });
Trash.plugin(mongoosePaginate);

module.exports = mongoose.model("trashes", Trash);
