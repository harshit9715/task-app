const request = require('supertest');

const {userOne, setupDatabase, UserModel:User} = require('./fixtures/db')
const expressApp = require('../src/app');

const app = request(expressApp);

const mongoose = require('mongoose');
beforeAll(done => {
    done()
  })
  
afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.connection.close()
    done()
})
  
const sampleUserInput = {
    "name": "Testman",
    "email": "testman@eg.com",
    "password": "wassup77!!"
}

beforeEach(setupDatabase)

// REGISTER

test('Should not register an existent user', async () => {
    const response = await app.post('/users').send(userOne).expect(400)
})

test('Should not register with invalid email/password', async () => {
    
    // Invalid email
    await app.post('/users').send({
        name: sampleUserInput.name,
        email: "testingbot123",
        password: sampleUserInput.password
    }).expect(400)
    // Invalid password (<7 characters)
    await app.post('/users').send({
        name: sampleUserInput.name,
        email: sampleUserInput.email,
        password: "ab12"
    }).expect(400)
})


test('Should register a new user', async () => {
    const response = await app.post('/users').send(sampleUserInput).expect(201)

    // Assertion that DB was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // Assertions about the response
    expect(response.body).toMatchObject({
        user: {email: sampleUserInput.email, name: sampleUserInput.name},
        token: user.tokens[0].token
    })
    // Assertion about password hashing
    expect(user.password).not.toBe(sampleUserInput.password)
})

// LOGIN

test('Should not login nonexistent user', async () => {
    await app.post('/users/login').send({email:sampleUserInput.email, password:sampleUserInput.password}).expect(400);
})

test('Should login existing user', async () => {
    const response = await app.post('/users/login').send({email:userOne.email, password:userOne.password}).expect(200);
    const user = await User.findById(response.body.user._id)
    expect(response.body.token).toBe(user.tokens[1].token)
})

// GET PROFILE
test('Should not get profile for unauthenticated user', async () => {
    await app
        .get('/users/me')
        .send()
        .expect(401);
})

test('Should get profile for authenticated user', async () => {
    await app
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
})

// PUT PROFILE
test('Should not update profile for unauthenticated user', async () => {
    await app
        .put('/users/me')
        .send({
            name: "Gunther"
        })
        .expect(401);
})

test('Should not update invalid profile fields', async () => {
    await app
        .put('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: "Philly"
        })
        .expect(400);
})

test('Should not update with invalid email/password', async () => {
    // invalid email and password
    const invalid_data = {
        email: "testingBot123",
        password: '123'
    }
    const response = await app
        .put('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send(invalid_data)
        .expect(400);

        // all invalid items should be present in response
        expect(Object.keys(response.body.errors)).toEqual(Object.keys(invalid_data))
})

test('Should update profile for authenticated user', async () => {
    const response = await app
        .put('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: "Gunther"
        })
        .expect(200);

    const user = await User.findById(userOne._id)
    expect(user.name).toEqual(response.body.name)
})

// PUT PROFILE PICTURE

test('Should not upload avatar image for unauthenticated user', async () => {
    await app
        .put('/users/me/avatar')
        .send()
        .expect(401);
})

test('Should upload avatar image for authenticated user', async () => {
    await app
        .put('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/me.jpg')
        .expect(200);

    const user = await User.findById(userOne._id)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should not delete account for unauthenticated user', async () => {
    await app
        .delete('/users/me')
        .send()
        .expect(401);
})

test('Should delete account for the user', async () => {
    const response = await app
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
    const user = await User.findById(response.body._id)
    expect(user).toBeNull()
})