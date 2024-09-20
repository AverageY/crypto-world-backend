import User from '../models/User.js';

export const getUserWatchlist = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    res.status(200).json(user.watchlist);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }

  
};
