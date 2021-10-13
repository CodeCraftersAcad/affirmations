const router = require('express').Router(),
    {postRegisterNewUser, postUserLoginUser, getResetUserPassword, putUserPasswordResetUpdate, putUpdateUserInformation,
        deleteUserAccountInformation} = require('../../controllers/auth/auth-controller');

router.route('/register').post(postRegisterNewUser);
router.route('/login').post(postUserLoginUser);

router.route('/resetPassword/:email').get(getResetUserPassword);
router.route('/resetPassword/:id').put(putUserPasswordResetUpdate);

router.route('/user/update/:id').put(putUpdateUserInformation);
router.route('/user/delete/:id').delete(deleteUserAccountInformation);

module.exports = router;