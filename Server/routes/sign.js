var express = require('express');
var router = express.Router();

router.get('/sign/:documentHash', function (req, res) {
    res.render('sign', { document_hash: req.params.documentHash });
})

module.exports = router;
