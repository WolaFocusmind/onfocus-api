const mongoose = require("mongoose");

const { Schema } = mongoose;
const autoIncrement = require("mongoose-auto-increment");

const Price = new Schema(
  {
    country: { type: String },
    real_price: { type: Number },
    final_price: { type: Number },
    currency: { type: String },
    offer_discount: { type: Number },
    offer_ends: { type: String },
    offer_starts: { type: Date },
    course: { type: Schema.ObjectId, ref: "Course" },
  },
  { timestamps: true },
);

Price.plugin(autoIncrement.plugin, { model: "Price", field: "price_id" });

module.exports = mongoose.model("Prices", Price);
