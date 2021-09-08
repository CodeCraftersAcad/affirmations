const router = require('express').Router(),
    {registerUser, loginUser} = require('../../controllers/auth/auth-controller');

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)

module.exports = router;