const { model, Schema } = require('mongoose');

const entrySchema = new Schema({
    thought1: String,
    stress1: { type: Number, min: 1, max: 10 },
    thought2: String,
    stress2: { type: Number, min: 1, max: 10 },
    date: Date,
    updatedAt: { type: Date, default: Date.now },
    userId: { type: Schema.Types.ObjectId, ref: 'User' }, 
    labels: [{ type: Schema.Types.ObjectId, ref: 'Label' }]
})

module.exports = model('Entry', entrySchema)