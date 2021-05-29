const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const autoIncrement = require("mongoose-auto-increment");

const { Schema } = mongoose;

const Progress = new Schema(
  {
    user: { type: Schema.ObjectId, ref: "Student" },
    course: { type: Schema.ObjectId, ref: "Course" },
    progress: { type: Array, default: [] },
  },
  { timestamps: true },
);

Progress.plugin(autoIncrement.plugin, {
  model: "Progress",
  field: "progress_id",
});
Progress.plugin(mongoosePaginate);

module.exports = mongoose.model("Progresses", Progress);
