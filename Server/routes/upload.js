var express = require('express');
var router = express.Router();
var sha256File = require('sha256-file');
var pdfUtil = require('pdf-to-text');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const nlp = require('compromise');
Document = require('../models/Document');


router.use(fileUpload());

router.get('/upload', function (req, res, next) {
	res.render('upload');
});

router.get('/upload_success/:tx_hash', (req, res, next) => {
	res.render('upload_success', {
		tx_hash: req.params.tx_hash
	});
});

// default options

router.post('/upload', function (req, res) {
	if (!req.files || Object.keys(req.files).length === 0) {
		return res.status(400).send('No files were uploaded.');
	}

	// The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
	let sampleFile = req.files.sampleFile;

	// Use the mv() method to place the file somewhere on your server
	sampleFile.mv(`./files/${sampleFile.md5}`, function (err) {
		if (err) return res.status(500).send(err);

		sha256File(`./files/${sampleFile.md5}`, (error, sum) => {
			if (error) return console.log(error);
			fs.rename(`./files/${sampleFile.md5}`, `./files/${sum}.pdf`, (err) => {
				Document.create({
						hash: sum,
						owner: req.session.user_id
					},
					function (err, document) {
						console.log(req.session.user_id);
						return res.render('upload_confirm', {
							document_hash: sum
						});
					}
				);

			});
		});
	});
});

module.exports = router;