const { Schema, model } = require('mongoose');

const clientSchema = new Schema({
    name: { type: String, required: true },
    telefono: { type: String, required: false },
    email: { type: String },
    creationDate: { type: Date, default: Date.now }
})

module.exports = model('client', clientSchema);