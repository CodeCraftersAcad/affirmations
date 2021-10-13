const router = require('express').Router(),
    {registerUser, loginUser, resetUserPassword, userPasswordResetUpdate} = require('../../controllers/auth/auth-controller');

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/resetPassword/:email').get(resetUserPassword)
router.route('/resetPassword/:id').put(userPasswordResetUpdate)

module.exports = router;