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
var ctrlOrder = require('../controllers/orderController');

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// router.get('/authorName/:id', ctrlProfile.authorName);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

//cart
router.get("/product/cart/get/:id",ctrlOrder.getCartItem);
router.put("/product/cart/update/:id",ctrlOrder.setCartItem);
router.put("/product/cart/delete/:id",ctrlOrder.deleteCartItem);

//order
router.post("/product/order",ctrlOrder.create);
router.post("/product/order",ctrlOrder.findAllOrders);
router.get("/product/order/:id",ctrlOrder.findOrder);
router.get("/product/user/order/:id",ctrlOrder.findUserOrders);

//product
router.post('/product/create', ctrlProduct.create);
router.get('/product/all', ctrlProduct.findAll);
router.get('/product/:_id', ctrlProduct.findOne);

// router.put('/product/update/likes/:_id', ctrlProduct.updateLike);
// router.put('/product/update/comments/:id', ctrlProduct.addComments);
// router.put('/product/update/:id', ctrlProduct.updateBlog);
// router.get('/user/product/:id', ctrlProfile.userBlogs);
// router.get('/product/user/likes/:id', ctrlProduct.findUserLikes);
// router.get('/user/likes/:id', ctrlProduct.findUserLikes);
// router.delete('/product/remove/:id', ctrlProduct.deletePost);

module.exports = router;
