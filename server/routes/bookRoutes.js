const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Home route
router.get('/', bookController.home);

// Book routes
router.post('/books', bookController.createBook);
router.get('/books', bookController.getBooksByQuery); // Handles both getAllBooks and filtered search
router.get('/books/:id', bookController.getBookById);
router.put('/books/:id', bookController.updateBook);
router.delete('/books/:id', bookController.deleteBook);

// Student routes
router.post('/students', bookController.addStudent);
router.get('/students', bookController.getAllStuds);
router.post("/login", bookController.loginStudent);

module.exports = router;