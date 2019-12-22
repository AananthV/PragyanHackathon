var express = require('express');
var mongoose = require('mongoose')
var router = express.Router();
const Document = require('../models/Document')
const Signature = require('../models/Signature')

router.get('/sign/:documentHash', function(req, res) {
	res.render('sign', { document_hash: req.params.documentHash });
});

router.get('/sign_success/:tx_hash', (req, res, next) => {
	res.render('sign_success', { tx_hash: req.params.tx_hash });
});

router.post('/sign', function (req, res) {
    console.log(req.body.hash);
    Document.find({ hash: req.body.hash }, function(err, document) {
      document[0].signatories = [];
      console.log(req.body)
      for(let user of req.body.signatories) {
        console.log(user);
        // Set up functions to notify user here.
        document[0].signatories.push(mongoose.Types.ObjectId(user))
      }
      document[0].message = req.body.message;
      document[0].save();
      Signature.create({ document: document[0]._id, user: req.session.user_id, signature: req.body.ownerSignature }, function(signature) {
        return res.send(true);
      })
    })
})

module.exports = router;
