const Book = require("../models/book");

const getAllBooks = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10;
        const books = await Book.find()
            .skip((page - 1) * perPage)
            .limit(perPage);
        const totalBooks = await Book.countDocuments();
        const totalPages = Math.ceil(totalBooks / perPage);
        const response = {
            data: books,
            total: totalBooks,
            totalPages: totalPages,
            currentPage: page,
            perPage: perPage,
        };
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }
        const response = {
            data: book,
        };
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

const addBook = async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).json({ message: `Book added successfully id: ${book._id}` });
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ error: "Duplicate book found" });
        } else {
            res.status(500).json({ error: "Server error" });
        }
    }
};

const updateBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }
        Object.keys(req.body).forEach((key) => {
            book[key] = req.body[key];
        });
        await book.save();
        res.status(200).json({ message: "Book updated successfully" });
    } catch {
        res.status(500).json({ error: "Server error" });
    }
};

const deleteBook = async (req, res) => {
    try {
        const result = await Book.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    addBook,
    updateBook,
    deleteBook,
};
