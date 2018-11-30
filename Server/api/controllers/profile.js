var mongoose = require('mongoose');
var User = mongoose.model('User');
var Product = mongoose.model("products")

module.exports.profileRead = function (req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message": "UnauthorizedError: private profile"
    });
  } else {
    User
      .findById(req.payload._id)
      .exec(function (err, user) {
        res.status(200).json(user);
      });
  }
};


exports.addAddress = (req, res) => {
  console.log(req.body)
  User.updateOne({
      '_id': req.params.id
    }, {
      $addToSet: {
        address: req.body
      }
    })
    .then(x=>res.send(x))
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "User not found  "
        });
      }
      return res.status(500).send({
        message: "Error while retrieving data"
      });
    });
};


exports.getAddress = (req, res) => {
  User.findOne({
      '_id': req.params.id
    }, {
      address: 1,
      _id: 0
    })
    .then(x => res.send(x.address))
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "User not found  "
        });
      }
      return res.status(500).send({
        message: "Error while retrieving data"
      });
    });
};



// exports.findUserProduct = (req, res) => {

//   User.find({
//       '_id': req.params.id},{orders:1,_id:0})
//     .then(res.send())
//     .catch(err => {
//       if (err.kind === 'ObjectId') {
//         return res.status(404).send({
//           message: "User not found  " + req.params.id
//         });
//       }
//       return res.status(500).send({
//         message: "Error while retrieving Details "
//       });
//     });
// };
