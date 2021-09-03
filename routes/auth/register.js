const router = require('express').Router(),
    {registerUser} = require('../../controllers/auth/register');

router.route('/register').post(registerUser)

module.exports = router;