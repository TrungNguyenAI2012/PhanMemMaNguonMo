var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var tintuc = new Schema({
    ma_tintuc: { type: String, required: true },
    tieude: { type: String, required: true },
    mota: { type: String, required: true },
    date: { type: String, required: true },
    loai: { type: Number, required: true }

}, { collection: "tintuc" });

module.exports = mongoose.model('Tintuc', tintuc);