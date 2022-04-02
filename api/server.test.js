// Write your tests here
const request = require('supertest');
const server = require('./server');
const db = require('../data/dbConfig');

test("sanity", () => {
  expect(true).toBe(true);
});

test('is the correct environment', () => {
  expect(process.env.NODE_ENV).toBe('testing')
})
beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

afterAll(async () => {
  await db.destroy();
});


describe('[POST] /register', () => {  test('responds with error when no username', async () => {

    const res = await request(server).post('/api/auth/register').send({
      username: '', 
      password: 'password',
})
    expect(res.body).toMatchObject({message: 'username and password required'})
})
})


describe('[POST] /login', () => { test('responds with error when no username', async () => {

    const res = await request(server).post('/login').send({
      username: '', 
      password: 'vader'
})
    expect(res.status).toBe(404)
})
  test('responds with error when no password', async () => {

    const res = await request(server).post('/api/auth/login').send({
      username: 'James', 
      password: '',
})
    expect(res.body).toMatchObject({message: 'username and password required'})
})}) 
