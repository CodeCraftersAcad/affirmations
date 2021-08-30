const User = require('../../models/UserSchema'),
    {genJWTToken} = require('../../utils/genJWT'),
{sendSignupMessages} = require('../../email/messages')


exports.registerUser = async (req, res) => {
    const {name, username, email, dob, avatar, membershipType, notifications, password} = req.body;

    try {
        // Check for existing user
        let existingUser = await User.findOne({email});
        if (existingUser) return res.status(400).json({msg: 'A user already exist with this email'});

        // Check password length
        if (password.length < 6 || password.length > 20) return res.status(400).json({msg: 'Password must be between 6 and 20 characters'})

        const newUser = await User.create({
            name,
            username,
            email,
            dob,
            avatar,
            membershipType,
            notifications,
            password
        })
        await newUser.save()
        await sendSignupMessages(newUser)

        if (newUser) {
            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                membershipType: newUser.membershipType,
                token: genJWTToken(newUser._id),
                avatar: newUser.avatar
            })
        }

    } catch (err) {
        console.log(err)
    }


}