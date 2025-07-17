const Book = require('../models/Book');

// Create a new book
exports.createBook = async (req, res) => {
  try {
    const { title, author, genre, status, googleImage } = req.body;
    const coverImage = req.file ? req.file.path : undefined;
    const book = new Book({
      title,
      author,
      genre,
      status,
      coverImage,
      googleImage, // support Google Books image
      owner: req.user._id,
    });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get books (with optional filters)
exports.getBooks = async (req, res) => {
  try {
    const { status, title, author } = req.query;
    const query = { owner: req.user._id };
    if (status) query.status = status;
    if (title) query.title = { $regex: title, $options: 'i' };
    if (author) query.author = { $regex: author, $options: 'i' };
    const books = await Book.find(query).sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a book
exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id, owner: req.user._id });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    const { title, author, genre, status } = req.body;
    if (title) book.title = title;
    if (author) book.author = author;
    if (genre) book.genre = genre;
    if (status) book.status = status;
    if (req.file) book.coverImage = req.file.path;
    await book.save();
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a book
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};