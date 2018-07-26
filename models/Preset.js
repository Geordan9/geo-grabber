const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PresetSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  options: {
    type: Object,
    required: true
  },
  filters: {
    type: Array,
    required: true
  }
});

const Preset = mongoose.model("Preset", PresetSchema);

module.exports = Preset;