const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title,
  weight,
  description,
  projectId
});

module.exports = mongoose.model('Task', taskSchema);
