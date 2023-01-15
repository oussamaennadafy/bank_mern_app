const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getBalance } = require('../controllers/userController')



router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/getBalance', getBalance)



module.exports = router