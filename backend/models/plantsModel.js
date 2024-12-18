const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const plantSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true},
    isFavourite: { type: Boolean, default: false},
    price: { type: Number, required: true },
});

module.exports = mongoose.model("Plants", plantSchema);
