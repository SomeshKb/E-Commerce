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
  isCancelled: {
      type: Boolean,
      required: true
  }
});


var cartItemSchema = new mongoose.Schema({
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
  date: {
      type: String,
      required:true
  }
});

module.exports = mongoose.model("orders", orderSchema);
module.exports = mongoose.model("cartItems", cartItemSchema);
