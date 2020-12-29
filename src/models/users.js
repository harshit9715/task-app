const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const {JWT_SECRET} = require('../config');
const Task = require('./tasks')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 7,
        trim: true,
        validate(password) {
            if(password.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain \'password\'');
            }
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(email) {
            if (!validator.default.isEmail(email)) {
                throw new Error('Email is invalid')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be positive number')
            }
        }
    },
    avatar: {
        type: Buffer
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true,
})

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({_id:user._id.toString()}, JWT_SECRET )

    user.tokens = user.tokens.concat({token})
    await user.save()
    return token;

}

userSchema.methods.toJSON = function () {
    const user = this
    const userObj = user.toObject()

    delete userObj.password
    delete userObj.tokens
    delete userObj.avatar
    return userObj;
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})
    if (!user) 
        throw new Error('Unable to login')
    
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) 
        throw new Error('Unable to login')
    
    return user;
}

// Hash the passwords before saving / updating
userSchema.pre('save', async function (next) {
    if(this.isModified('password')) 
        this.password = await bcrypt.hash(this.password, 8)
    next()
})

// Delete user task when user is removed

userSchema.pre('remove', async function (next) {
    const user = this
    await Task.deleteMany({owner: user._id})
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User