const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stockSchema = new Schema({
        stockSymbol    : String

});

const ModelClass = mongoose.model('stock',stockSchema);

module.exports = ModelClass;
