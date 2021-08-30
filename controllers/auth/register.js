const User = require('../../models/UserSchema'),
    {genJWTToken} = require('../../utils/genJWT'),
    {processCreditCardInfo} = require('../../utils/Payment/payment'),
    moment = require('moment');

exports.registerUser = async (req, res) => {
    if (req.method !== 'POST') return res.status(400).json({msg: 'Invalid request'})

    const {name, address, username, email, dob, avatar, membership, notifications, password, card} = req.body;

    try {
        // Check for existing user
        let existingUser = await User.findOne({email});
        if (existingUser) return res.status(400).json({msg: 'A user already exist with this email'});

        // Check password length
        if (password.length < 6 || password.length > 20) return res.status(400).json({msg: 'Password must be between 6 and 20 characters'})

        // If member decides to sign up during registration process credit
        if (membership.membershipType !== 'basic') {

            if (membership.confirmSubscription) {
                let processCard = await processCreditCardInfo(card, name, address)

                if (processCard) {
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
        console.log(err)
    }
}