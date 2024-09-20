// routes/watchlist.js
import express from 'express';
const router = express.Router();
import Watchlist from '../models/Watchlist.js'
import User from '../models/User.js';

// POST: Add a cryptocurrency to the watchlist
router.post('/add', async (req, res) => {
    const { userId, cryptoName } = req.body;

    try {
      const user = await User.findOne({ auth0Id: userId });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the crypto is already in the watchlist
      if (user.watchlist.includes(cryptoName)) {
        return res.status(400).json({ message: 'Crypto already in the watchlist' });
      }
  
      // Add the crypto to the watchlist
      user.watchlist.push(cryptoName);
      await user.save();
  
      res.status(201).json(user);
    } catch (error) {
      console.error('Error adding to watchlist:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.delete('/remove', async (req, res) => {
    const { userId, cryptoName } = req.body;
  
    try {
      const user = await User.findOne({ auth0Id: userId });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Remove the crypto from the watchlist
      user.watchlist = user.watchlist.filter((name) => name !== cryptoName);
      await user.save();
  
      res.status(200).json(user);
    } catch (error) {
      console.error('Error removing from watchlist:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  router.get('/:email', async (req, res) => {
    const { email } = req.params;
  
    try {
      console.log('User email:', email); // Log the email for debugging
  
      // Find the user by email
      const user = await User.findOne({ email });
      
      if (!user) {
        console.log('User not found');
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(user.watchlist);
    } catch (error) {
      console.error('Error fetching watchlist:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  

  export default router;
