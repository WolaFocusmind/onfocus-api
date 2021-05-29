const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const autoIncrement = require("mongoose-auto-increment");
const { PAYMENT_STATUS, ENTITY_TYPES } = require("../tools/constants");

const { Schema } = mongoose;

const Purchase = new Schema(
  {
    user: { type: Schema.ObjectId, ref: "Student" },
    transaction: { type: String },
    transactionItem: { type: String },
    method: { type: Number },
    status: { type: Number, default: PAYMENT_STATUS.PENDING },
    item_type: { type: Number, default: ENTITY_TYPES.COURSE },
    item: { type: Schema.ObjectId, ref: "Courses" },
  },
  { timestamps: true },
);

Purchase.plugin(autoIncrement.plugin, { model: "Purchase", field: "purchase_id " });
Purchase.plugin(mongoosePaginate);

module.exports = mongoose.model("Purchases", Purchase);
