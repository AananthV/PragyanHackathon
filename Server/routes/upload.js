var express = require('express');
var router = express.Router();
var sha256File = require('sha256-file');
const fileUpload = require('express-fileupload');

router.use(fileUpload());

router.get('/upload', function (req, res, next) {
	res.render('upload');
});

// default options

router.post('/upload', function (req, res) {
	console.log('upload post');
	console.log(req.files);

	if (!req.files || Object.keys(req.files).length === 0) {
		return res.status(400).send('No files were uploaded.');
	}

	// The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
	let sampleFile = req.files.sampleFile;

	console.log(sampleFile);

	// Use the mv() method to place the file somewhere on your server
	sampleFile.mv(`./files/${sampleFile.name}`, function (err) {
		if (err) return res.status(500).send(err);

		sha256File(`./files/${sampleFile.name}`, (error, sum) => {
			if (error) return console.log(error);
			console.log(sum);
			return res.render('upload_confirm', {
				document_hash: sum
			})
		});
	});
});

module.exports = router;