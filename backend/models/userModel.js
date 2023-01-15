const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      unique: true
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    balance: {
      type: Number,
      required: [true, 'Please add an initial balance'],
      default: 0
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)
