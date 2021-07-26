import mongoose from 'mongoose';

// probably no updating of messages:
const messageSchema = new mongoose.Schema({
  username:{
    type: String,
    required: true
  },
  message:{
    type: String,
    required: true
  }
});

export default mongoose.model('Message', messageSchema);
