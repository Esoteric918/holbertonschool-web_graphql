const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title,
  weight,
  description
});

module.exports = mongoose.model('Project', projectSchema);
