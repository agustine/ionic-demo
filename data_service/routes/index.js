var express = require('express');
var router = express.Router();
var dataController = require('../controllers/data');
var toolsController = require('../controllers/tools');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/categories', dataController.categories);
router.get('/category', dataController.category);
router.get('/items', dataController.items);
router.get('/item', dataController.item);
router.get('/item/comments', dataController.comments);

router.post('/item/comment', dataController.comment);

router.get('/init', toolsController.init);


module.exports = router;
