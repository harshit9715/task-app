const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const UserModel = require('../../src/models/users');
const TaskModel = require('../../src/models/tasks');

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: "Mike",
    email: "mike@example.com",
    password: "56what!!",
    tokens: [{
        token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET)
    }]
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    name: "Andrew",
    email: "andrew@example.com",
    password: "1211wwf!!",
    tokens: [{
        token: jwt.sign({_id: userTwoId}, process.env.JWT_SECRET)
    }]
}


const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: "Run all test cases",
    completed: false,
    owner: userOneId
}
const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Run all test cases again',
    completed: false,
    owner: userOneId
}
const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Do laundry',
    completed: true,
    owner: userTwoId
}

const setupDatabase = async () => {
    await UserModel.deleteMany()
    await TaskModel.deleteMany()
    await new UserModel(userOne).save()
    await new UserModel(userTwo).save()
    await new TaskModel(taskOne).save()
    await new TaskModel(taskTwo).save()
    await new TaskModel(taskThree).save()
}

module.exports = {
    userOne,
    userTwo,
    setupDatabase,
    UserModel,
    TaskModel,
    taskOne,
    taskTwo,
    taskThree
}