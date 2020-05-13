const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const sampleSchema = new Schema({
  name: String,
  email: String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const sampleModel = new mongoose.model("sample", sampleSchema);
module.exports = sampleModel;
