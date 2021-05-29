const mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");
const mongoosePaginate = require("mongoose-paginate-v2");
const autoIncrement = require("mongoose-auto-increment");
const { STATUS } = require("../tools/constants");

const { Schema } = mongoose;

const Course = new Schema(
  {
    name: { type: String },
    description: { type: String },
    teacher: { type: Schema.ObjectId, ref: "Teacher" },
    category: { type: Schema.ObjectId, ref: "Category" },
    modules: [{ type: Schema.ObjectId, ref: "Modules", default: [] }],
    price: [{ type: Schema.ObjectId, ref: "Prices", default: [] }],
    testimonials: [{ type: Schema.ObjectId, ref: "Testimonials", default: [] }],
    video_intro: { type: String },
    featured_image: { type: String },
    status: { type: Boolean, default: STATUS.ACTIVE },
    entity_status: { type: Boolean, default: STATUS.PUBLISHED },
    about_this_course: { type: String },
    total_modules: { type: Number },
    total_duration: { type: Number },
    total_students: { type: Number, default: 0 },
    course_details_items: { type: [], default: [] },
    course_target_items: { type: [], default: [] },
  },
  { timestamps: true },
);

Course.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });
Course.plugin(autoIncrement.plugin, { model: "Course", field: "course_id" });
Course.plugin(mongoosePaginate);

module.exports = mongoose.model("Courses", Course);
