var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({

  products:{
    type:Array,
    required:true
  },
  buyerID: {
    type: String,
    required: true
  },
  totalCost: {
    type: Number,
    required: true
  },
  date: {
      type: String,
      required:true
  },
  status: {
      type: String,
      required: true
  }
});



module.exports = mongoose.model("orders", orderSchema);
