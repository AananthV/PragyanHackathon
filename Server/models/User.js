const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    password_hashed: String,
    email: String,
    phone: Number,
    public_address: String
})

module.exports = mongoose.model('User', userSchema)
