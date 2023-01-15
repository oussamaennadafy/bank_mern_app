const asyncHandler = require('express-async-handler')

const Transaction = require('../models/transactionModel')

const { updateBalance, getBalance } = require('../controllers/userController')


const User = require('../models/userModel')
// @desc    Get transactions
// @route   GET /api/transactions
// @access  Private
const getTransactions = asyncHandler(async (req, res) =>
{
  const transactions = await Transaction.find({ user: req.user.id })

  res.status(200).json(transactions)
})

// @desc    Set transaction
// @route   POST /api/transactions
// @access  Private
const setTransaction = asyncHandler(async (req, res) =>
{
  const { amount, type } = req.body
  if (!amount) {
    res.status(400)
    throw new Error('Please add a positive amount')
  }

  const transaction = await Transaction.create({
    amount,
    type,
    user: req.user.id,
  })

  const user = await getBalance(req.user.id)


  // update balance
  if (type === 'send') updateBalance(req.user.id, user.balance - amount)
  if (type === 'receive') updateBalance(req.user.id, user.balance + amount)


  res.status(200).json(transaction)
})

// // @desc    Update transaction
// // @route   PUT /api/transactions/:id
// // @access  Private
// const updatetransaction = asyncHandler(async (req, res) =>
// {
//   const transaction = await transaction.findById(req.params.id)

//   if (!transaction) {
//     res.status(400)
//     throw new Error('transaction not found')
//   }

//   // Check for user
//   if (!req.user) {
//     res.status(401)
//     throw new Error('User not found')
//   }

//   // Make sure the logged in user matches the transaction user
//   if (transaction.user.toString() !== req.user.id) {
//     res.status(401)
//     throw new Error('User not authorized')
//   }

//   const updatedtransaction = await transaction.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//   })

//   res.status(200).json(updatedtransaction)
// })

// // @desc    Delete transaction
// // @route   DELETE /api/transactions/:id
// // @access  Private
// const deletetransaction = asyncHandler(async (req, res) =>
// {
//   const transaction = await transaction.findById(req.params.id)

//   if (!transaction) {
//     res.status(400)
//     throw new Error('transaction not found')
//   }

//   // Check for user
//   if (!req.user) {
//     res.status(401)
//     throw new Error('User not found')
//   }

//   // Make sure the logged in user matches the transaction user
//   if (transaction.user.toString() !== req.user.id) {
//     res.status(401)
//     throw new Error('User not authorized')
//   }

//   await transaction.remove()

//   res.status(200).json({ id: req.params.id })
// })

module.exports = {
  getTransactions,
  setTransaction
}
