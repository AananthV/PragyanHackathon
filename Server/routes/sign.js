var express = require('express');
var router = express.Router();

router.get('/sign', function (req, res, next) {
    res.render('sign');
})

module.exports = router;