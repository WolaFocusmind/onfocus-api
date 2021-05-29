const mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");

const { Schema } = mongoose;
const autoIncrement = require("mongoose-auto-increment");

const Module = new Schema(
  {
    name: { type: String },
    description: { type: String },
    lessons: [{ type: Schema.ObjectId, ref: "Lesson" }],
    course: { type: Schema.ObjectId, ref: "Course" },
    total_duration: { type: Number, default: 0 },
  },
  { timestamps: true },
);

Module.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });
Module.plugin(autoIncrement.plugin, { model: "Module", field: "module_id" });

module.exports = mongoose.model("Modules", Module);
