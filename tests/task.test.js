const request = require('supertest');

const {userOne, userTwo, setupDatabase, UserModel:User, TaskModel:Task, taskOne, taskTwo, taskThree} = require('./fixtures/db')
const expressApp = require('../src/app');

const app = request(expressApp);

const sampleUser = {
    name: 'Harshit',
    email: 'harshit@example.com',
    password: 'MyPass777!'
}

const sampleTask = {
    description: 'Run all test cases',
    completed: false
}

beforeEach(setupDatabase)


// Should fetch only completed tasks
// Should fetch only incomplete tasks
// Should sort tasks by description/completed/createdAt/updatedAt
// Should fetch page of tasks


test('Should not create task for unauthenticated user', async () => {
    await app.post('/tasks')
        .send({description:sampleTask.description})
        .expect(401)
})

test('Should create new task for authenticated user', async () => {
    const response = await app.post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({description:sampleTask.description})
        .expect(201)
    
    const task = await Task.findById(response.body._id)
    
    // confirm if the task is created.
    expect(task).not.toBeNull()
    // confirm if the default values are added
    expect(task).toEqual(expect.objectContaining(sampleTask));
})

test('Should not create task without description', async () => {
    const response = await app.post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({completed:sampleTask.completed})
        .expect(400)
    
    const task = await Task.findById(response.body._id)
    
    // confirm if the task is created.
    expect(task).toBeNull()
})

test('Should not create task with invalid completed status', async () => {
    const response = await app.post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({description:sampleTask.description, completed: "hello"})
        .expect(400)
    
    const task = await Task.findById(response.body._id)
    // confirm if the task is created.
    expect(task).toBeNull()
})

test('Should not list other users task', async () => {
    const response = await app.get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    
    // confirm if the task is created.
    expect(response.body).not.toBeNull()
    expect(response.body.length).toEqual(2);
})

test('Should not get task for unauthenticated user', async () => {
    await app.get(`/tasks/${taskOne._id}`)
        .expect(401)
})

test('Should get task for authenticated user', async () => {
    const response = await app.get(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    expect(response.body).not.toBeNull()
    expect(response.body._id+"").toEqual(taskOne._id+"");
})

test('Should not get task for other user', async () => {
    const response = await app.get(`/tasks/${taskThree._id}`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(404)
    expect(response.body).not.toBeNull()
})

test('Should not update task with invalid status', async () => {
    await app.put(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({completed: "hello"})
        .expect(400)
})

test('Should not update task of other user', async () => {
    await app.put(`/tasks/${taskThree._id}`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            completed: false 
        })
        .expect(404)
    
    const task = await Task.findById(taskThree._id);
    expect(task.completed).toEqual(taskThree.completed)
})

test('Should not delete task for unauthenticated user', async () => {
    await app.delete(`/tasks/${taskOne._id}`)
        .expect(401)
})

test('Should not delete task of other user', async () => {
    await app.delete(`/tasks/${taskThree._id}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(404)
    
    const task = await Task.findById(taskThree._id);
    expect(task).not.toBeNull()
})

test('Should delete task for user', async () => {
    await app.delete(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(200)
    
    const task = await Task.findById(taskOne._id);
    expect(task).toBeNull()
})
