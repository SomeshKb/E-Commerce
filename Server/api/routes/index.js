var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');
var ctrlProduct = require('../controllers/productController');

// profile
router.get('/profile', auth, ctrlProfile.profileRead);
router.get('/authorName/:id', ctrlProfile.authorName);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

router.post('/product', ctrlProduct.create);

// router.put('/product/update/likes/:_id', ctrlProduct.updateLike);

// router.put('/product/update/comments/:id', ctrlProduct.addComments);

// router.put('/product/update/:id', ctrlProduct.updateBlog);

 router.post('/product/create', ctrlProduct.create);

// router.get('/user/product/:id', ctrlProfile.userBlogs);

router.get('/product/all', ctrlProduct.findAll);
// router.get('/product/user/likes/:id', ctrlProduct.findUserLikes);

 router.get('/product/:_id', ctrlProduct.findOne);

// router.get('/user/likes/:id', ctrlProduct.findUserLikes);

// router.delete('/product/remove/:id', ctrlProduct.deletePost);


module.exports = router;
