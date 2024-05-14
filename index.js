const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");

const mongoose = require("mongoose");
const { Schema } = mongoose;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
// {{Create method override for put}}
app.use(methodOverride("_method"));

const Books = require("./models/books.js");
mongoose
  .connect("mongodb://127.0.0.1/books_db")
  .then((res) => {
    console.log("Connected to mongodb");
  })
  .catch((err) => {
    console.log("Error connecting to database");
  });

// Our Code
app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.get("/books", async (req, res) => {
  const { genre } = req.query;
  if (genre) {
    console.log(genre);
    const books = await Books.find({ genre });
    res.render("books/index", { books, genre });
  } else {
    const books = await Books.find({});
    res.render("books/index", { books, genre: "All" });
  }
});

app.get("/books/create", (req, res) => {
  res.render("books/create");
});

app.post("/books", async (req, res) => {
  const books = new Books(req.body);
  await books.save();

  res.redirect(`/books/${books._id}`);
});

app.get("/books/:id/edit", async (req, res) => {
  const { id } = req.params;
  const books = await Books.findById(id);
  res.render("books/edit", { books });
});

app.put("/books/:id", async (req, res) => {
  const { id } = req.params;
  const books = await Books.findByIdAndUpdate(id, req.body, {
    runValidators: true,
  });
  res.redirect(`/books/${books._id}`);
});

app.delete("/books/:id", async (req, res) => {
  const { id } = req.params;
  await Books.findByIdAndDelete(id);
  res.redirect(`/books`);
});

app.get("/books/:id", async (req, res) => {
  const { id } = req.params;
  const books = await Books.findById(id);

  res.render("books/show", { books });
});

app.listen(8080, () => {
  console.log("ShopApp server is running on port 8080");
});
