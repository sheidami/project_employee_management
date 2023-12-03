const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    
    firstname: {
      type: String,
      required: true,
      maxlength: 100,
      lowercase: true
    },
    lastname: {
      type: String,
      required: true,
      maxlength: 50,
      lowercase: true,
    },
    email: {
        type: String,
        maxlength: 50,
        unique: true,
        lowercase: true,
    },
    gender: {
        type: String,
        maxlength: 25,
        enum: ['Male', 'Female', 'Other'],
    },
    salary: {
      type: Number,
      required: true,
      validate(value) {
        if (value < 0.0) throw new Error("Invalid Data");
      }
    },
  });
  
  module.exports = mongoose.model("Employee", EmployeeSchema);
