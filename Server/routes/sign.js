var express = require('express');
var router = express.Router();

router.get('/sign/:documentHash', function(req, res) {
	res.render('sign', { document_hash: req.params.documentHash });
});

router.get('/sign_success/:tx_hash', (req, res, next) => {
	res.render('sign_success', { tx_hash: req.params.tx_hash });
});

module.exports = router;
