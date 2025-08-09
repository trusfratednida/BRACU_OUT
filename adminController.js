const User = require('../models/user');

// Detect suspicious activity
const detectSpam = (user) => {
  const links = user.links || [];
  const messages = user.messages || [];
  const linkCount = links.filter(link => !link.startsWith('https://verified-domain.com')).length;
  const repetitiveMessages = messages.filter((v, i, a) => a.indexOf(v) !== i);
  return linkCount > 2 || repetitiveMessages.length > 0;
};


// GET all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    console.log('Fetched users:', users.length);
    const updatedUsers = users.map(u => ({
      ...u._doc,
      isSuspicious: detectSpam(u)
    }));
    res.json(updatedUsers);
  } catch (err) {
    console.error('Error in getAllUsers:', err);
    res.status(500).json({ message: 'Failed to get users' });
  }
};


// VERIFY user
exports.verifyUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      isVerified: true,
      isBlocked: false
    }, { new: true });
    res.json(user);
  } catch (err) {
    console.error('Error in verifyUser:', err);
    res.status(500).json({ message: 'Failed to verify user' });
  }
};

// BLOCK user
exports.blockUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      isBlocked: true,
      isVerified: false
    }, { new: true });
    res.json(user);
  } catch (err) {
    console.error('Error in blockUser:', err);
    res.status(500).json({ message: 'Failed to block user' });
  }
};
