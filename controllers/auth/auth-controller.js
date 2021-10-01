const User = require('../../models/UserSchema'),
    {genJWTToken} = require('../../utils/genJWT'),
    serverInfo = require('../../utils/constants');

exports.registerUser = async (req, res) => {
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