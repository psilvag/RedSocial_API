const router = require('express').Router()
const authServices = require('./auth.services')


router.post('/login', authServices.postLogin)

// RECOVERY PASSWORD
router.post('/recovery-password',authServices.postRecoveryToken)
router.patch('/recovery-password/:id',authServices.patchPassword)


module.exports = router
