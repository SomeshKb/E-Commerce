var mongoose = require("mongoose")
let Item = mongoose.model("items")
let Order = mongoose.model("orders")
let User = mongoose.model("users")  

exports.create = (req, res) => {

  const order = new Order({
    itemID: req.body.itemID,
    buyerID: req.body.buyerID,
    quantity: req.body.quantity,
    cost: req.body.cost,
    date: req.body.date,
    isCancelled: false
});

  order.save()
    .then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the item Record."
      });
    });

}


exports.cancelOrder=(req,res)=>{
    Order.update({_id:req.params.id},
        {set: {isCancelled:true}})
        .catch(err =>{
            res.status(500).send({
                message: err.message || "Error while updating Order"
            });
        });
}