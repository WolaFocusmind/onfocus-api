const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const autoIncrement = require("mongoose-auto-increment");
const { USER_TYPES } = require("../tools/constants");

const { Schema } = mongoose;

const Student = new Schema(
  {
    name: { type: String },
    username: { type: String },
    password: { type: String, required: true },
    activated: { type: Boolean, default: true },
    activation_code: { type: String },
    country: { type: String },
    email: { type: String, required: true },
    purchased_courses: [{ type: Schema.ObjectId, ref: "Courses" }],
    user_type: { type: Number, default: USER_TYPES.STUDENT },
  },
  { timestamps: true },
);

Student.plugin(autoIncrement.plugin, { model: "Student", field: "student_id" });
Student.plugin(mongoosePaginate);

module.exports = mongoose.model("students", Student);
