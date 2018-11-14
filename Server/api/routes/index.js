var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');
var ctrlItem = require('../controllers/itemController');

// profile
router.get('/profile', auth, ctrlProfile.profileRead);
router.get('/authorName/:id', ctrlProfile.authorName);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

router.post('/item', ctrlItem.create);

// router.put('/item/update/likes/:_id', ctrlItem.updateLike);

// router.put('/item/update/comments/:id', ctrlItem.addComments);

// router.put('/item/update/:id', ctrlItem.updateBlog);

 router.post('/item/create', ctrlItem.create);

// router.get('/user/item/:id', ctrlProfile.userBlogs);

router.get('/item/all', ctrlItem.findAll);
// router.get('/item/user/likes/:id', ctrlItem.findUserLikes);

 router.get('/item/:_id', ctrlItem.findOne);

// router.get('/user/likes/:id', ctrlItem.findUserLikes);

// router.delete('/item/remove/:id', ctrlItem.deletePost);


module.exports = router;
