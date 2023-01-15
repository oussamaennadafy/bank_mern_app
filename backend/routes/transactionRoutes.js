const express = require('express')
const router = express.Router()
const {
  getTransactions,
  setTransaction
} = require('../controllers/transactionController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getTransactions).post(protect, setTransaction)
// router.route('/:id').delete(protect, deletetransaction).put(protect, updatetransaction)

module.exports = router
