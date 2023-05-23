const express = require("express");
const bookController = require("../controllers/bookController");

const router = express.Router();

router
    .route("/book")
    .get(bookController.getAllBooks)
    .post(bookController.addBook);

router
    .route("/book/:id")
    .get(bookController.getBookById)
    .put(bookController.updateBook)
    .delete(bookController.deleteBook);

module.exports = router;
