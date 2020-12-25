const db = require('./db')

const userScheme = {
  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String
  },
  loginDate: {
    type: Date,
    default: Date.now
  }
}

const userModel = db.model('users', userScheme)

module.exports = userModel