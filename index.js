const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");

const mongoose = require("mongoose");
const { Schema } = mongoose;

const ErrorHandler = require("./ErrorHandler");

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

// Fungsi untuk membungkus async function dan mencetak errornya
// Helper Error Async Func
const wrapAsync = (fn) => {
  return function (req, res, next) {
    fn(req, res, next).catch((err) => next(err));
  };
};

// Our Code
app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.get(
  "/books",
  wrapAsync(async (req, res) => {
    const { genre } = req.query;
    if (genre) {
      console.log(genre);
      const books = await Books.find({ genre });
      res.render("books/index", { books, genre });
    } else {
      const books = await Books.find({});
      res.render("books/index", { books, genre: "All" });
    }
  })
);

app.get("/books/create", (req, res) => {
  res.render("books/create");
});

app.post(
  "/books",
  wrapAsync(async (req, res) => {
    const books = new Books(req.body);
    await books.save();

    res.redirect(`/books/${books._id}`);
  })
);

app.get(
  "/books/:id/edit",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const books = await Books.findById(id);
    res.render("books/edit", { books });
  })
);

app.put(
  "/books/:id",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const books = await Books.findByIdAndUpdate(id, req.body, {
      runValidators: true,
    });
    res.redirect(`/books/${books._id}`);
  })
);

app.delete(
  "/books/:id",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    await Books.findByIdAndDelete(id);
    res.redirect(`/books`);
  })
);

app.get(
  "/books/:id",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const books = await Books.findById(id);

    res.render("books/show", { books });
  })
);

const validatorHandler = (err) => {
  err.status = 400;
  err.message = Object.values(err.errors).map((e) => e.message);
  return new ErrorHandler(err.message, err.status);
};

const castHandler = (err) => {
  err.status = 404;
  err.message = "Book Not Found";
  return new ErrorHandler(err.message, err.status);
};

// ada 2 tipe error dalam mongosh
// cast error dan validation error
app.use((err, req, res, next) => {
  console.dir(err);
  if (err.name === "ValidationError") err = validatorHandler(err);
  if (err.name === "CastError") {
    err = castHandler(err);
  }
  next(err);
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong" } = err;
  res.status(status).send(message);
});

app.get("*", (req, res) => {
  res.status(404).send("Page Not Found");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
