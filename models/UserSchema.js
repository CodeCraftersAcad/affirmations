const mongoose = require('mongoose'),
    bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add your name']
    },
    username: {
        type: String,
        required: [true, 'Please enter a username']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    dob: {
        type: String,
        required: [true, 'Please add your birthday']
    },
    avatar: {
        type: String,
        required: false,
        default: 'https://res.cloudinary.com/purity-cottage/image/upload/v1620865447/PCSv4/user_kfjvu4.png'
    },
    membershipType: {
        type: String,
        enum: ['basic', 'premium', 'admin']
    },
    favoriteQuotes: {
        type: [],
        required: false
    },
    theme: {
        type: String,
        required: true,
        default: 'light'
    },
    notifications: {
        notify: {
            type: Boolean,
            required: true,
            default: false
        },
        frequency: {
            type: Number,
            required: true,
            default: 1
        },
        days: {
            type: [],
            required: true,
            default: []
        },
        email: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        select: false
    },
    passwordReset: {
        passwordResetId: {
            type: String,
        },
        valid: {
            type: Date
        }
    },

}, {timestamps: true})

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});


module.exports = mongoose.model('User', UserSchema)