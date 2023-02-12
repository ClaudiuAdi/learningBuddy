const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sessionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    hours: {
      type: Number,
      required: true,
    },
    breaks: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Session", sessionSchema);
