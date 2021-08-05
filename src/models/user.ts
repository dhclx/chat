import mongoose from 'mongoose';

// probably no updating of messages:
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  socketId: {
    type: String,
    required: true
  }
});

export default mongoose.model('User', userSchema);
