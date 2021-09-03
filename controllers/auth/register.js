const User = require('../../models/UserSchema'),
    {genJWTToken} = require('../../utils/genJWT'),
    {processCreditCardInfo} = require('../../utils/Payment/payment'),
    moment = require('moment'),
    pageInfo = require('../../utils/constatns'),
{sendSignupMessages} = require('../../email/messages');

exports.registerUser = async (req, res) => {
    if (req.method !== 'POST') return res.status(400).json({msg: 'Invalid request'})

    const {name, address, username, email, dob, avatar, membership, notifications, password, card} = req.body;

    try {
        // Check for existing user
        let existingUser = await User.findOne({email});
        if (existingUser) return res.status(400).json({msg: pageInfo.user.USER_ALREADY_EXISTS});

        // Check password length
        if (password.length < 6 || password.length > 20) return res.status(400).json({msg: pageInfo.user.PASSWORD_ERROR})

        // If member decides to sign up during registration process credit
        if (membership.membershipType !== 'basic') {

            if (membership.confirmSubscription) {
                let processCard = await processCreditCardInfo(card, name, address)

                if (processCard.paymentProcess) {
                    membership.membershipStartDate = moment();

                    switch (membership.paymentFrequency) {
                        case 'monthly':
                            membership.membershipEndDate = moment(membership.membershipStartDate).add(1, 'M')
                            break;
                        case 'yearly':
                            membership.membershipEndDate = moment(membership.membershipStartDate).add(1, 'year');
                            break;
                    }
                } else {
                    return res.status(500).json({msg: 'Something went wrong'})
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
            password
        })
        await newUser.save()
        await sendSignupMessages(newUser)

        // Send back user information
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
        console.log(pageInfo.error.SOMETHING_WENT_WRONG)
    }
}