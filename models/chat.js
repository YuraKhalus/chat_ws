const chatSchema = new mongoose.Schema({
  login: {  
    type: String,
    required: true, 
    trim: true
  },
     message: {
    type: String,
    required: true,
    trim: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;