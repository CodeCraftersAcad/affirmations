const User = require('../../models/UserSchema'),
    {genJWTToken} = require('../../utils/genJWT'),
    serverInfo = require('../../utils/constants'),
    {v4: uuidv4} = require('uuid'),
    moment = require('moment'),
    {sendPasswordResetEmail} = require('../../email/messages');

exports.registerUser = async (req, res) => {
    // Check for correct HTTP method
    if (req.method !== serverInfo.route.METHOD_POST) return res.status(400).json({msg: serverInfo.error.INVALID_REQUEST})

    const {name, username, email, password} = req.body.user;
    try {
        // Check for existing user
        let existingUser = await User.findOne({email});
        if (existingUser) return res.status(400).json({msg: serverInfo.user.USER_ALREADY_EXISTS});

        // Check password length
        if (password.length < 6 || password.length > 20) return res.status(400).json({msg: serverInfo.user.PASSWORD_ERROR})

        // Create new user
        const newUser = await User.create({
            name,
            username,
            email,
            password,
        })
        await newUser.save()
        // await sendSignupMessages(newUser)

        // Send back user information
        if (newUser) {
            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                username: newUser.username,
                email: newUser.email,
                token: genJWTToken(newUser._id),
            })
        }

    } catch (err) {
        res.status(500).json({msg: err})
    }
}

exports.loginUser = async (req, res) => {
    // Check for correct HTTP method
    if (req.method !== serverInfo.route.METHOD_POST) return res.status(400).json({msg: serverInfo.error.INVALID_REQUEST})

    try {
        // Receive incoming data
        const {username, password} = req.body.userLoginInfo;

        // Check for username and password are not empty
        if (!username && !password) return res.status(400).json({msg: serverInfo.user.EMPTY_USERNAME_PASSWORD})

        // Check if user exists
        let user = await User.findOne({username}).select('password email name membership');
        if (!user) return res.status(400).json({msg: serverInfo.user.NO_USER_FOUND});

        // Compare user password with password passed in and pass the user to frontend if found
        let loginUser = await user.comparePassword(password)
        if (loginUser) {
            return res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                membership: user.membership,
                token: genJWTToken(user._id)
            })
        } else {
            return res.status(400).json({msg: serverInfo.user.NO_USER_FOUND})
        }
    } catch (err) {
        // Send message to frontend
        res.status(500).json({msg: err})
    }
}

exports.resetUserPassword = async (req, res) => {
    // Check for correct HTTP method
    if (req.method !== serverInfo.route.METHOD_GET) return res.status(400).json({msg: serverInfo.user.INVALID_REQUEST});

    try {
        // Validate email passed in
        let validEmailAddress = await validateEmail(req.params.email);
        if (!validEmailAddress) return res.status(400).json({msg: serverInfo.user.EMAIL_NOT_VALID});

        // Check if user exist with passed in email
        const user = await User.findOne({email: req.params.email});
        if (!user) return res.status(400).json({msg: serverInfo.user.NO_USER_FOUND});

        // Check if they have already requested a password reset. If not set user password reset code and validation time.
        if (moment(user.resetPassword.validTime).isAfter()) return res.status(400).json({msg: serverInfo.user.PASSWORD_RESET_ACTIVE});
        else {
            user.resetPassword.resetCode = uuidv4();
            user.resetPassword.validTime = moment().add(15, 'm').format();
            await user.save();

            // Send reset email and notify user it was sent
            await sendPasswordResetEmail(user);
            return res.status(200).json({msg: serverInfo.user.PASSWORD_RESET_CONFIRMED});
        }
    } catch (err) {
        console.log(err)
    }
}

exports.userPasswordResetUpdate = async (req, res) => {
    // Check for correct HTTP method
    if (req.method !== serverInfo.route.METHOD_PUT) return res.status(400).json({msg: serverInfo.user.INVALID_REQUEST});

    // Set variable to save password coming in
    const password = req.body.password;

    try {
        // Check for user by password reset code
        const user = await User.findOne({'resetPassword.resetCode': req.params.id}).select('+password');
        if (!user) return res.status(400).json({msg: serverInfo.user.INVALID_TOKEN});

        // Set new user password
        user.password = password;
        user.resetPassword.resetCode = '';
        user.resetPassword.validTime = '';

        await user.save();

        return res.status(200).json({msg: serverInfo.user.PASSWORD_UPDATED})
    } catch (err) {
        console.log(err)
    }
}

const validateEmail = async (email) => {
    const testEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return testEmail.test(String(email).toLowerCase());
}