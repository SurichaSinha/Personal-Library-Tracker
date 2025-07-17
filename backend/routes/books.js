const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// All routes protected
router.use(auth);

router.post('/', upload.single('coverImage'), bookController.createBook);
router.get('/', bookController.getBooks);
router.put('/:id', upload.single('coverImage'), bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

module.exports = router; 