var express = require('express');
var router = express.Router();

/* GET home page. *//*
router.get('/', function(req, res) {
  res.render('index', { title: 'Expres' });
});*/

router.get("/", function(req,res){
    res.send(400);
})

module.exports = router;
