var mongoose = require('mongoose');

var facetSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
      },
  value:{
    type:Array,
    required:true
  } 
});

module.exports = mongoose.model("facets", facetSchema);
