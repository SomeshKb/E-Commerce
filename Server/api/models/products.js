var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  sellerID:{
    type: String,
    required: true
  },
  sellerName:{
    type: String,
    required: true
  },
  quantity:{
    type: Number,
    required: true
  },
  cost:{
    type: Number,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  genderSpecific:{
    type: String,
    required: true
  },
  sleeveLength:{
    type: String,
    required: true
  },
  color:{
    type: String,
    required: true
  },
  neck:{
    type: String,
    required: true
  },
  size:{
    type: String,
    required: true
  },
});

module.exports = mongoose.model("products", productSchema);
