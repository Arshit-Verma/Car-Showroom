const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true,
    trim: true
  },
  model: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: Number,
    required: true,
    min: 1900,
    max: new Date().getFullYear() + 1
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  mileage: {
    type: String,
    required: true
  },
  fuelType: {
    type: String,
    required: true,
    enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG']
  },
  transmission: {
    type: String,
    required: true,
    enum: ['Manual', 'Automatic']
  },
  description: {
    type: String,
    required: true
  },
  imageFilename: {
    type: String,
    required: true
  },
  features: [{
    type: String
  }],
  color: {
    type: String,
    default: 'Not Specified'
  },
  owners: {
    type: Number,
    default: 1
  },
  available: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Virtual property for full name
carSchema.virtual('fullName').get(function() {
  return `${this.make} ${this.model}`;
});

// Method to format price in INR
carSchema.methods.getFormattedPrice = function() {
  return `₹${this.price.toLocaleString('en-IN')}`;
};

module.exports = mongoose.model('Car', carSchema);
