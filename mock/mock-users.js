const bcrypt = require('bcryptjs')
const users = [

    {
        "name": "Perry Craft",
        "username": "LjCraft12",
        "email": "ljcraft12@gmail.com",
        "dob": "07/01/1986",
        "avatar": "https://res.cloudinary.com/purity-cottage/image/upload/v1620865447/PCSv4/user_kfjvu4.png",
        "membership": {
            "membershipType": "premium",
            "paymentFrequency": "month",
            "confirmSubscription": true
        },
        "card": {
            "address": "123 Main St Lithonia Ga, 30044",
            "cardNumber": 4111111111111111,
            "cardExpireDate": "06/2022",
            "cardCVW": 123,
            "paymentType": "monthly"
        },
        "notifications": {
            "notify": true,
            "frequency": 10,
            "days": [0, 2, 4],
            "email": true
        },
        "password": bcrypt.hashSync('123123', 10),
        "isAdmin": true

    },
    {
        "name": "Chasity Craft",
        "username": "KillaC",
        "email": "b@b.com",
        "dob": "12/14/1986",
        "avatar": "https://res.cloudinary.com/purity-cottage/image/upload/v1620865447/PCSv4/user_kfjvu4.png",
        "membership": {
            "membershipType": "basic",
            "paymentFrequency": "none",
            "confirmSubscription": false
        },
        "card": {
            "address": "123 Main St Lithonia Ga, 30044",
            "cardNumber": 4111111111111111,
            "cardExpireDate": "06/2022",
            "cardCVW": 123,
            "paymentType": "monthly"
        },
        "notifications": {
            "notify": true,
            "frequency": 10,
            "days": [0, 4, 6],
            "email": false
        },
        "password": bcrypt.hashSync('123123', 10),
        "isAdmin": false
    },
    {
        "name": "Maximus Craft",
        "username": "BigGirl",
        "email": "c@c.com",
        "dob": "04/28/2017",
        "avatar": "https://res.cloudinary.com/purity-cottage/image/upload/v1620865447/PCSv4/user_kfjvu4.png",
        "membership": {
            "membershipType": "basic",
            "paymentFrequency": "none",
            "confirmSubscription": false
        },
        "card": {
            "address": "123 Main St Lithonia Ga, 30044",
            "cardNumber": 4111111111111111,
            "cardExpireDate": "06/2022",
            "cardCVW": 123,
            "paymentType": "monthly"
        },
        "notifications": {
            "notify": true,
            "frequency": 2,
            "days": [0],
            "email": false
        },
        "password": bcrypt.hashSync('123123', 10),
        "isAdmin": false
    },
]

module.exports = users