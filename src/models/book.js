const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    genre: { type: String, required: true },
    rating: { type: Number, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    publisher: { type: String, required: true },
    language: { type: String, required: true },
    isbn10: { type: String, required: true },
    isbn13: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Book", bookSchema);
