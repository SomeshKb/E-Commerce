var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
  buyerID: {
    type: String,
    required: true
  },
  productID: {
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
  },
  date: {
      type: String,
      required:true
  },
  isCancelled: {
      type: Boolean,
      required: true
  }
});

module.exports = mongoose.model("orders", orderSchema);
