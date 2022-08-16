const { Schema, model } = require('mongoose');


const taskSchema = new Schema({
  title: String,
  weight: Number,
  description: String,
  projectId: String
});

module.exports = mongoose.model('Task', taskSchema);
