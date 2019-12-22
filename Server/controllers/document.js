const Document = require('../models/Document.js')

exports.getDocumentsSign = (req, res, next) => {

    Document.find({
        signatories: req.session.user_id
    }, function (err, doc_to_be_signed) {
        req.doc_to_be_signed = doc_to_be_signed;
        next();
    })
}

exports.getDocumentsUploaded = (req, res) => {
    console.log(req.session.user_id)
    Document.find({
        user: req.session.user_id
    }, function (err, documents) {
        return res.render('dashboard', {
            docs_uploaded: documents,
            docs_to_be_signed: req.doc_to_be_signed
        });
    })
}