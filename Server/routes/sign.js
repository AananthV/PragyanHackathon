var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
const Document = require('../models/Document');
const Signature = require('../models/Signature');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

router.get('/sign/:documentHash', function (req, res) {
	res.render('sign', {
		document_hash: req.params.documentHash
	});
});

router.get('/sign_success/:tx_hash', (req, res, next) => {
	res.render('sign_success', {
		tx_hash: req.params.tx_hash
	});
});

router.post('/sign', function (req, res) {
	console.log(req.body.hash);
	Document.find({
			hash: req.body.hash
		},
		function (err, document) {
			document[0].signatories = [];
			console.log(req.body);
			for (let user of req.body.signatories) {
				console.log(user);
				// Set up functions to notify user here.
				const msg = {
					to: user.email,
					from: 'forusage1741@gmail.com',
					subject: 'Your signature is required',
					text: `click here to sign the api localhoast:3000/sign/${req.body.hash}`,
					html: `<strong>click here to sign the api localhoast:3000/sign/${req.body.hash}</strong>`
				};
				sgMail.send(msg);
				document[0].signatories.push(mongoose.Types.ObjectId(user));
			}
			document[0].message = req.body.message;
			document[0].save();
			Signature.create({
					document: document[0]._id,
					user: req.session.user_id,
					signature: req.body.ownerSignature
				},
				function (signature) {
					return res.send(true);
				}
			);
		}
	);
});

router.post('/signdoc', function (req, res) {
	Document.find({
		hash: req.body.hash
	}, function (err, docu) {
		Signature.create({
			user: req.session.user_id,
			document: docu[0]._id,
			signature: req.body.signature
		}, function (err, resp) {
			console.log(resp)
			return res.send(true);
		})
	})
})

module.exports = router;