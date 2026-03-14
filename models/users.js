const userSchema = new mongoose.Schema({
  login: {  
    type: String,
    required: true, 
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,   
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;