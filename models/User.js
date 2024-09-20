// models/User.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  auth0Id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  watchlist: { type: [String], default: [] },
});

export default mongoose.model('User', UserSchema);
