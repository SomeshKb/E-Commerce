var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  sellerID: {
    type: String,
    required: true
  },
  sellerName: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  cost: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("items", itemSchema);
