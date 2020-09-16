const { model, Schema } = require('mongoose');

const entrySchema = new Schema({
    thought1: String,
    thought2: String,
    stress1: { type: Number, min: 1, max: 10 },
    stress2: { type: Number, min: 1, max: 10 },
    createdAt: String,
    updatedAt: { type: Date, default: Date.now },
    userId: { type: Schema.Types.ObjectId, ref: 'User' }, 
    // labels: [{ type: Schema.Types.ObjectId, ref: 'Label' }]
    labels: Array
})

module.exports = model('Entry', entrySchema)