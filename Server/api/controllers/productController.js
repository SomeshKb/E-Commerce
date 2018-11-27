var mongoose = require("mongoose")
let Product = mongoose.model("products")
let Order = mongoose.model("orders")
let Facets = mongoose.model("facets")

exports.create = (req, res) => {

  const product = new Product({
    name: req.body.name,
    sellerID: req.body.sellerID,
    sellerName: req.body.sellerName,
    quantity: req.body.quantity,
    cost: req.body.cost,
    description: req.body.description,
    gender: req.body.gender,
    sleeveLength: req.body.sleeveLength,
    color: req.body.color,
    neck: req.body.neck,
    size: req.body.size
  });

  product.save()
    .then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the product Record."
      });
    });

}

//get data

exports.findAll = (req, res) => {
  Product.find()
    .then(product => {
      res.send(product);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving product record."
      });
    });

};


// Find a single product
exports.findOne = (req, res) => {
  Product.findOne({
      '_id': req.params._id

    }) // search by id
    .then(product => {
      res.send(product);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Product not found  " + req.params._id
        });
      }
      return res.status(500).send({
        message: "Error while retrieving product " + req.params._id
      });
    });
};


// Find product using filter i.e query
exports.findByQuery = (req, res) => {
  console.log(req)
  Product.find({
      $and: [req.query]
    })
    .then(product => {
      res.send(product);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Product not found  " + req.params._id
        });
      }
      return res.status(500).send({
        message: "Error while retrieving product " + req.params._id
      });
    });
};

// Find product using filter i.e query
exports.findSearch = (req, res) => {
  Product.find({
      'name': {
        '$regex': req.params.id,
        '$options': 'i'
      }
    })
    .then(product => {
      res.send(product);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Product not found  " + req.params._id
        });
      }
      return res.status(500).send({
        message: "Error while retrieving product " + req.params._id
      });
    });
};

exports.findByGender = (req, res) => {
  Product.find({
      'gender': req.params.id
    })
    .then(product => {
      res.send(product);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Product not found  " + req.params._id
        });
      }
      return res.status(500).send({
        message: "Error while retrieving product " + req.params._id
      });
    });
};



exports.findByDistinct = (req, res) => {
  Product.distinct(req.params.id)
    .then(values => {
      res.send(values);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Product not found  " + req.params._id
        });
      }
      return res.status(500).send({
        message: "Error while retrieving product " + req.params._id
      });
    });
};

exports.updateLike = (req, res) => {

  Product.updateOne({
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
          message: "Product not found  " + req.params._id
        });
      }
      return res.status(500).send({
        message: "Error while retrieving product " + req.params._id
      });
    });
};


// find likes per user
exports.findUserLikes = (req, res) => {

  //  db.product.aggregate([{$match:{authorName:"Nayan"}},{$group:{_id:"$authorName",total:{$sum:{$size:'$like'}} }},{$project:{'_id':0}}])

  Product.aggregate({
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

exports.deleteProduct = (req, res) => {
  Product.deleteOne({
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

  Product.updateOne({
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
          message: "Product not found  " + req.params._id
        });
      }
      return res.status(500).send({
        message: "Error while retrieving product " + req.params._id
      });
    });
};
//facets and filter
exports.facetsSearch = (req, res) => {

  Facets.find({})
    .then(result => {
      res.send(result);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Data not found"
        });
      }
      return res.status(500).send({
        message: "Error while retrieving data " 
      });
    });
};

exports.updateProduct = (req, res) => {

  Product.updateOne({
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
          message: "Product not found  " + req.params._id
        });
      }
      return res.status(500).send({
        message: "Error while retrieving product " + req.params._id
      });
    });
};

exports.orderProduct = (req, res) => {
  Order.insertOne({
      'product_id': req.params.id,
      "title": req.body.title,
      "content": req.body.content
    })
    .then(res.send())
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Product not found  " + req.params._id
        });
      }
      return res.status(500).send({
        message: "Error while retrieving product " + req.params._id
      });
    });
}
