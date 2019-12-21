const mongoose = require('mongoose')

const documentSchema = new mongoose.Schema({
    hash: String,
    name: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    signatories: [String]
})

module.exports = mongoose.model('Document', documentSchema)