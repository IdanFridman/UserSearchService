var express = require('express');
var router = express.Router();
var esService = require('../services/esService');
var Q = require('q');




router.get("/index", function (req, res) {
    var termToIndex = req.query.termToIndex;
    console.log("termToIndex=" + termToIndex);
    Q(esService.performIndex(termToIndex)
    ).then(function (data) {
            res.send("Session: %j", data);
        });
});

module.exports = router;
