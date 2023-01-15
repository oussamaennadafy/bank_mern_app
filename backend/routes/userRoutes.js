const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getBalance } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')



router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/getBalance', protect, getBalance)



module.exports = router