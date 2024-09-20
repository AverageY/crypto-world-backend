import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

// Create a JWKS client to retrieve the signing key from Auth0

export const saveUser = async (req, res) => {
  const { user } = req.body;

  try {
    // Check if user already exists
    let existingUser = await User.findOne({ auth0Id: user.sub });
    if (!existingUser) {
      // If not, create a new user
      const newUser = new User({
        auth0Id: user.sub,
        email: user.email,
        name: user.name,
        picture: user.picture,
      });
      await newUser.save();
    }

    res.status(200).json({ message: 'User saved successfully' });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
