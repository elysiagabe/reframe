const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    firstName: String, 
    lastName: String,
    email: String, 
    password: String, 
    entires: [{ type: Schema.Types.ObjectId, ref: 'Entry' }]
})

module.exports = model('User', userSchema)