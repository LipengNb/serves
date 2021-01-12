const db = require('./db')

const mongoose = require('mongoose')

const accountScheme = {
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  roles: { type: mongoose.SchemaTypes.ObjectId, ref: 'roles' },
  status: Boolean
}

const accountModel = db.model('accounts', accountScheme)

module.exports = accountModel