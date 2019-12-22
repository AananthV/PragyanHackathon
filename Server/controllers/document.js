const User = require('../models/User.js')
const Document = require('../models/Document.js')
const Signature = require('../models/Signature.js')

exports.getDocumentsSign = (req, res, next) => {

    Document.find({
        signatories: req.session.user_id
    }, function (err, respo) {
        console.log(respo);
        doc_to_be_signed = [];
        counter = 0;
        respo.forEach(function (doc) {
            Signature.find({
                user: req.session.user_id,
                document: doc._id
            }, function (error, response) {
                console.log(response);
                if (response.length == 0) {
                    doc_to_be_signed.push(doc);
                }
                counter++;
                if (counter == respo.length) {
                    req.doc_to_be_signed = doc_to_be_signed;
                    next();
                }
            })
        });
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
                document: response[0]._id
            }, function (error, resp) {
                console.log(resp)
                if (resp.length > 0) {
                    User.find({
                        _id: user_id
                    }, function (err, user) {
                        signatures.push({
                            'status': "signed",
                            'signature': resp[0].signature,
                            'name': user[0].name
                        });
                        if (signatures.length == response[0].signatories.length) {
                            return res.render('document', {
                                signatures: signatures,
                                document_hash: req.params.documentHash
                            })
                        }
                    })
                } else {
                    User.find({
                        _id: user_id
                    }, function (err, user) {
                        signatures.push({
                            'status': "pending",
                            'signature': '',
                            'name': user[0].name
                        });
                        if (signatures.length == response[0].signatories.length) {
                            return res.render('document', {
                                signatures: signatures,
                                document_hash: req.params.documentHash
                            })
                        }
                    })
                    console.log(signatures)
                }
            });
        });
    });

}