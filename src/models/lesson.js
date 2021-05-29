const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

const { Schema } = mongoose;

const Lesson = new Schema(
  {
    name: { type: String },
    video: { type: String },
    duration: { type: Number, default: 0 },
    module: { type: Schema.ObjectId, ref: "Module" },
  },
  { timestamps: true },
);

Lesson.plugin(autoIncrement.plugin, { model: "Lesson", field: "lesson_id" });

module.exports = mongoose.model("Lessons", Lesson);
