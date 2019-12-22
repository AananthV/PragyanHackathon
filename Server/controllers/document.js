const Document = require('../models/Document.js')

exports.getDocuments = (req, res) => {
    console.log(req.session.user_id)
    Document.find({
        user: req.session.user_id
    }, function (err, documents) {
        return res.render('dashboard', {
            documents: documents
        });
    })
}