const User = require('../models/User');
const Book = require('../models/Book');

exports.getPublicProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    const books = await Book.find({ owner: user._id });
    res.json({
      user: {
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
      },
      books,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};