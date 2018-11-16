var mongoose = require("mongoose")
let Order = mongoose.model("orders")
let User = mongoose.model("User")

exports.create = (req, res) => {

  const order = new Order({
    products: req.body.products,
    buyerID: req.body.buyerID,
    date: req.body.date,
    totalCost: req.body.totalCost,
    status: req.body.status
  });

  order.save()
    .then(data => {
      User.update({
        _id: data.buyerID
      }, {
        $addToSet: {
          orders: data._id
        }
      }).then(data => res.send(data))

    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the product Record."
      });
    });
}

exports.findAllOrders = (req, res) => {
  Order.find()
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error while getting order details"
      });
    });
}


exports.findOrder = (req, res) => {
  Order.findOne({
      _id: req.params.id
    })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error while finding order"
      });
    });
}

exports.findUserOrders = (req, res) => {
  User.findOne({
      _id: req.params.id
    }, {
      orders: 1,
      _id: 0
    })
    .then(data => {
      res.send(data.orders)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error while updating Cart"
      });
    });
}

exports.cancelOrder = (req, res) => {
  Order.update({
      _id: req.params.id
    }, {
      set: {
        isCancelled: true
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error while updating Order"
      });
    });
}



exports.getCartItem = (req, res) => {
  User.findOne({
      _id: req.params.id
    }, {
      cart: 1,_id:0
    })
    .then(data => {
      res.send(data.cart);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error while updating Cart"
      });
    });
}

exports.setCartItem = (req, res) => {
  console.log(req)
  User.update({
      _id: req.params.id
    }, {
      $addToSet: {
        cart: req.body.productID
      }
    })
    .then(res.send())
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error while updating Cart"
      });
    });
}

exports.deleteCartItem = (req, res) => {
  console.log(req)
  User.updateOne({
      _id: req.params.id
    }, {
      $pull: {
        cart: req.body.productID
      }
    })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error while deleting Cart"
      });
    });
}
