const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const autoIncrement = require("mongoose-auto-increment");
const { STATUS } = require("../tools/constants");

const { Schema } = mongoose;

const Teacher = new Schema(
  {
    full_name: { type: String, required: true },
    profile_photo: { type: String },
    title: { type: String },
    description: { type: String },
    socials: { type: {} },
    courses: [{ type: Schema.ObjectId, ref: "Course" }],
    status: { type: Boolean, default: STATUS.ACTIVE },
    entity_status: { type: Boolean, default: STATUS.PUBLISHED },
  },
  { timestamps: true },
);

Teacher.plugin(autoIncrement.plugin, { model: "Teacher", field: "teacher_id" });
Teacher.plugin(mongoosePaginate);

module.exports = mongoose.model("teachers", Teacher);
