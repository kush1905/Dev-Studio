const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: [true, 'Please provide an image URL'],
    },
    name: {
      type: String,
      required: [true, 'Please provide a client name'],
      trim: true,
      maxlength: [100, 'Client name cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a client description'],
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    designation: {
      type: String,
      required: [true, 'Please provide a designation'],
      trim: true,
      maxlength: [100, 'Designation cannot exceed 100 characters'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Client', clientSchema);



