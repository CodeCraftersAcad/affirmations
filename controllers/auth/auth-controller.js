const User = require('../../models/UserSchema'),
    {genJWTToken} = require('../../utils/genJWT'),
    {processCreditCardInfo} = require('../../utils/Payment/payment'),
    moment = require('moment'),
    serverInfo = require('../../utils/constants'),
    {sendSignupMessages} = require('../../email/messages'),
    {dbErrorHandling} = require("../../utils/error/db-errrors"),
    {logErrorToDb} = require("../../utils/helpers/db-helpers");

exports.registerUser = async (req, res) => {
    if (req.method !== serverInfo.route.METHOD_POST) return res.status(400).json({msg: serverInfo.error.INVALID_REQUEST})

    const {name, address, username, email, dob, avatar, membership, notifications, password, card, isAdmin} = req.body;

    try {
        // Check for existing user
        let existingUser = await User.findOne({email});
        if (existingUser) return res.status(400).json({msg: serverInfo.user.USER_ALREADY_EXISTS});

        // Check password length
        if (password.length < 6 || password.length > 20) return res.status(400).json({msg: serverInfo.user.PASSWORD_ERROR})

        // If member decides to sign up during registration process credit
        if (membership.membershipType !== serverInfo.membership.BASIC_MEMBERSHIP) {

            if (membership.confirmSubscription) {
                let processCard = await processCreditCardInfo(card, name, address)

                if (processCard.paymentProcess) {
                    membership.membershipStartDate = moment();

                    switch (membership.paymentFrequency) {
                        case serverInfo.membership.MEMBERSHIP_LENGTH_MONTH:
                            membership.membershipEndDate = moment(membership.membershipStartDate).add(1, serverInfo.membership.MEMBERSHIP_LENGTH_MONTH)
                            break;
                        case serverInfo.membership.MEMBERSHIP_LENGTH_YEAR:
                            membership.membershipEndDate = moment(membership.membershipStartDate).add(1, serverInfo.membership.MEMBERSHIP_LENGTH_YEAR);
                            break;
                    }
                } else {
                    return res.status(500).json({msg: serverInfo.error.SERVER_ERROR})
                }
            }
        }

        // Create new user
        const newUser = await User.create({
            name,
            username,
            email,
            dob,
            avatar,
            membership,
            notifications,
            password,
            isAdmin
        })
        await newUser.save()
        await sendSignupMessages(newUser)

        // Send back user information
        if (newUser) {
            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                membership: newUser.membership,
                token: genJWTToken(newUser._id),
                avatar: newUser.avatar
            })
        }

    } catch (err) {
        let error = dbErrorHandling(err);
        if (error) {
            // Log error data to db
            await logErrorToDb(error, req.originalUrl, req.method)

            // Send message to frontend
            res.status(500).json({msg: error.msg})
        }
    }
}

exports.loginUser = async (req, res) => {
    if (req.method !== serverInfo.route.METHOD_POST) return res.status(400).json({msg: serverInfo.error.INVALID_REQUEST})

    try {
        // Receive incoming data
        const {username, password} = req.body;

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
        let error = dbErrorHandling(err);
        if (error) {
            // Log error data to db
            await logErrorToDb(error, req.originalUrl, req.method)

            // Send message to frontend
            res.status(500).json({msg: error.msg})
        }
    }
}