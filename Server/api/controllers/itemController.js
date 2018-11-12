var mongoose = require("mongoose")
let Item = mongoose.model("items")
let Order = mongoose.model("orders")

exports.create = (req, res) => {

  const item = new Item({
    name: req.body.name,
    sellerName: req.body.sellerName,
    sellerID: req.body.sellerID,
    quantity: req.body.quantity,
    cost: req.body.cost });

  item.save()
    .then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the item Record."
      });
    });

}

//get data

exports.findAll = (req, res) => {
  Item.find()
    .then(item => {
      res.send(item);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving item record."
      });
    });

};


// Find a single item
exports.findOne = (req, res) => {
  Item.findOne({
      '_id': req.params._id

    }) // search by id
    .then(item => {
      res.send(item);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Item not found  " + req.params._id
        });
      }
      return res.status(500).send({
        message: "Error while retrieving item " + req.params._id
      });
    });
};

exports.updateLike = (req, res) => {

  Item.updateOne({
      '_id': req.params._id
    }, {
      $addToSet: {
        "like": req.body._id
      }
    })
    .then(res.send())
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Item not found  " + req.params._id
        });
      }
      return res.status(500).send({
        message: "Error while retrieving item " + req.params._id
      });
    });


};


// find likes per user
exports.findUserLikes = (req, res) => {

  //  db.item.aggregate([{$match:{authorName:"Nayan"}},{$group:{_id:"$authorName",total:{$sum:{$size:'$like'}} }},{$project:{'_id':0}}])

  Item.aggregate({
      '$match': {
        'authorID': req.params.id
      }
    }, {
      '$group': {
        "_id": "authorID",
        total: {
          $sum: {
            $size: '$like'
          }
        }
      }
    }, {
      $project: {
        '_id': 0
      }
    })
    .then(result => {
      res.send(result[0])
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Not found  " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Error while retrieving Data " + req.params.id
      });
    });
}

exports.deleteItem = (req, res) => {
  Item.deleteOne({
      _id: req.params.id
    })
    .then(result => {
      res.send("Record deleted")
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Not found  " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Error while retrieving Data " + req.params.id
      });
    });
}


exports.addComments = (req, res) => {
  
  Item.updateOne({
      '_id': req.params.id
    }, {
      $addToSet: {
        "comments": req.body
      }
    })
    .then(res.send())
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Item not found  " + req.params._id
        });
      }
      return res.status(500).send({
        message: "Error while retrieving item " + req.params._id
      });
    });
};



exports.updateItem = (req, res) => {
  
  Item.updateOne({
      '_id': req.params.id
    }, {
      $set: {
        "title": req.body.title,
        "content": req.body.content

      }
    })
    .then(res.send())
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Item not found  " + req.params._id
        });
      }
      return res.status(500).send({
        message: "Error while retrieving item " + req.params._id
      });
    });
};

exports.orderItem = (res, req) =>{
  Order.insertOne({
    'item_id': req.params.id,
      "title": req.body.title,
      "content": req.body.content
  })
  .then(res.send())
  .catch(err => {
    if (err.kind === 'ObjectId') {
      return res.status(404).send({
        message: "Item not found  " + req.params._id
      });
    }
    return res.status(500).send({
      message: "Error while retrieving item " + req.params._id
    });
  });


}