const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/student_mg")
.then(() => console.log("DB connect successfull"))

const DbSchema = new mongoose.Schema({
  title: String,
  roll: String,
  class_name: String,
  scholl: String,
  phone: String
});

module.exports = new mongoose.model('students', DbSchema);
