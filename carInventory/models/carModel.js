// Import mongoose
const mongoose = require('mongoose');

// Create schema 
const carSchema = new mongoose.Schema({
  model: String,
  make: String,
  colour: String,
  registration: String,
  owner: String,
  address: String,
  previousOwners: [String],
});

// Create and export model 
module.exports = mongoose.model('Car', carSchema);