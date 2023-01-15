const mongoose = require('mongoose')

const transactionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    amount: {
      type: Number,
      required: [true, 'Please add an amount to make a transaction'],
    },
    type: {
      type: String,
      required: [true, 'Please add a type of transaction'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Transaction', transactionSchema)
