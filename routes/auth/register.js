const router = require('express').Router(),
    {registerUser} = require('../../controllers/auth/register')

router.route('/register').get(registerUser)

module.exports = router;