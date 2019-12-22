const mongoose = require('mongoose')

const signatureSchema = new mongoose.Schema({
    signature: String,
    document: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Document'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Signature', signatureSchema)
