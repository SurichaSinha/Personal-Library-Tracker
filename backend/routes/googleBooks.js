const express = require('express');
const router = express.Router();
const googleBooksController = require('../controllers/googleBooksController');

router.get('/', googleBooksController.searchGoogleBooks);
 
module.exports = router; 