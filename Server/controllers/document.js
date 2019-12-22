const Document = require('../models/Document.js')
const Signature = require('../models/Signature.js')

exports.getDocumentsSign = (req, res, next) => {

    Document.find({
        signatories: req.session.user_id
    }, function (err, doc_to_be_signed) {
        console.log(err);
        req.doc_to_be_signed = doc_to_be_signed;
        next();
    })
}

exports.getDocumentsUploaded = (req, res) => {
    console.log(req.session.user_id)
    Document.find({
        owner: req.session.user_id
    }, function (err, documents) {
        return res.render('dashboard', {
            docs_uploaded: documents,
            docs_to_be_signed: req.doc_to_be_signed
        });
    })
}

exports.getSignatories = (req, res) => {
    Document.find({
        hash: req.params.documentHash,
        owner: req.session.user_id
    }, function (err, response) {
        console.log(response);
        signatures = []
        response[0].signatories.forEach(function (user_id) {
            Signature.find({
                user: user_id,
                document: req.params.documentHash
            }, function (error, resp) {
                if (resp.count() != 0) {
                    signatures.append({
                        'status': "signed",
                        'signature': resp[0].signature,
                        'name': resp[0].user.name
                    });
                } else {
                    signatures.append({
                        'status': "pending",
                        'signature': "",
                        'name': user_id.name
                    });
                }
            });
        });
    });

}