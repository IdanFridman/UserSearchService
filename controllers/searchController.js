var express = require('express');
var router = express.Router();
var esService = require('../services/esService');
var Q = require('q');


var html_dir = './public/';
router.get("/home", function (req, res) {
    res.sendfile(html_dir + 'search.html');
});

router.get("/search", function (req, res) {
    var termToSearch = req.query.termToSearch;
    console.log("termToSearch=" + termToSearch);
    Q(esService.performSearch(termToSearch)
    ).then(function (data) {
            res.send("Session: %j", data);
        });
});

module.exports = router;
