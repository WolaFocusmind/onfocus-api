const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const autoIncrement = require("mongoose-auto-increment");

const { Schema } = mongoose;

const Testimonial = new Schema(
  {
    name: { type: String },
    testimonial: { type: String },
    profile_picture: { type: String },
    course: { type: Schema.ObjectId, ref: "Course" },
  },
  { timestamps: true },
);

Testimonial.plugin(autoIncrement.plugin, { model: "Testimonial", field: "testimonial_id" });
Testimonial.plugin(mongoosePaginate);

module.exports = mongoose.model("Testimonials", Testimonial);
