const { model, Schema } = require('mongoose');

const labelSchema = new Schema({
    name: String,
    def: String,
    example: String
});

module.exports = model('Label', labelSchema)