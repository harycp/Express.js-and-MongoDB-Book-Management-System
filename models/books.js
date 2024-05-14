const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    require: true,
  },
  pages: {
    type: Number,
    min: 0,
    require: true,
  },
  genre: {
    type: String,
    enum: [
      "fiction",
      "non-fiction",
      "thriller",
      "romance",
      "history",
      "philosophy",
    ],
    require: true,
  },
  year: {
    type: Number,
    min: 0,
    max: new Date().getFullYear(),
    require: true,
  },
  language: {
    type: String,
    require: true,
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
