const mongoose = require('mongoose')

const documentSchema = new mongoose.Schema({
    hash: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    message: String,
    signatories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
})

module.exports = mongoose.model('Document', documentSchema)
