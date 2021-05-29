const mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");
const mongoosePaginate = require("mongoose-paginate-v2");
const autoIncrement = require("mongoose-auto-increment");
const { STATUS } = require("../tools/constants");

const { Schema } = mongoose;

const Category = new Schema(
  {
    name: { type: String, required: true },
    courses: [{ type: Schema.ObjectId, ref: "Course" }],
    status: { type: Boolean, default: STATUS.ACTIVE },
    entity_status: { type: Boolean, default: STATUS.PUBLISHED },
  },
  { timestamps: true },
);

Category.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });
Category.plugin(autoIncrement.plugin, { model: "Category", field: "category_id" });
Category.plugin(mongoosePaginate);

module.exports = mongoose.model("categories", Category);
