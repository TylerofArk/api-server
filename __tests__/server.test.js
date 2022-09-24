'use strict';

const supertest = require('supertest');
const { app } = require('../src/server');
const request = supertest(app);
const { sequelizeDatabase } = require('../src/models');

beforeAll(async () => {
  await sequelizeDatabase.sync();
});

afterAll(async () => {
  await sequelizeDatabase.drop();
});

describe('API Server', () => {

  it('handles invalid requests', async () => {
    const response = await request.get('/foo');
    expect(response.status).toEqual(404);
  });

  it('handles errors', async () => {
    const response = await request.get('/bad');

    expect(response.status).toEqual(500);
    expect(response.body.route).toEqual('/bad');
    expect(response.body.message).toEqual('this is a bad route');
  });

  it('handles root path', async () => {
    const response = await request.get('/');

    expect(response.status).toBe(200);
    expect(response.text).toBeTruthy();
    expect(response.text).toEqual('Hello World');
  });
});


describe('Test /dogs endpoint', () => {
  test('getting all dogs', async () => {
    const response = await request.get('/dogs');
    expect(response.status).toEqual(200);
    expect(response.body[0]).toBeUndefined();
  });

  test('creating a dog', async () => {
    let response = await request.post('/dogs').send({
      name: 'koda',
      breed: 'mix',
      age: 2,
    });
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('koda');
    expect(response.body.breed).toEqual('mix');
    expect(response.body.age).toEqual(2);
  });

  test('get a dog using id', async () => {
    const response = await request.get('/dogs/1');
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('koda');
    expect(response.body.breed).toEqual('mix');
    expect(response.body.age).toEqual(2);
  });

  test('Updating a dog', async () => {
    let response = await request.put('/dogs/1');
    expect(response.status).toEqual(200);
  });

  test('Deleting a dog', async () => {
    let response = await request.delete('/dogs/1');
    expect(response.status).toEqual(200);
  });
});

describe('Test /songs endpoint', () => {
  test('getting all songs', async () => {
    const response = await request.get('/songs');
    expect(response.status).toEqual(200);
  });

  test('Creating a songs', async () => {
    let response = await request.post('/songs').send({
      title:'Wonderful Tonight',
      artist:'Eric Clapton',
      album:'Slowhand',
      year: 1977,
    });
    expect(response.status).toEqual(200);
    expect(response.body.title).toEqual('Wonderful Tonight');
    expect(response.body.artist).toEqual('Eric Clapton');
    expect(response.body.album).toEqual('Slowhand');
    expect(response.body.year).toEqual(1977);
  });

  test('Get songs by id', async () => {
    const response = await request.get('/songs/1');
    expect(response.status).toEqual(200);
    expect(response.body.title).toEqual('Wonderful Tonight');
    expect(response.body.artist).toEqual('Eric Clapton');
    expect(response.body.album).toEqual('Slowhand');
    expect(response.body.year).toEqual(1977);
  });

  test('Update songs', async () => {
    let response = await request.put('/songs/1');
    expect(response.status).toEqual(200);
  });

  test('Deleting songs', async () => {
    await request.delete('/songs/1');
    let response = await request.delete('/songs/1');
    expect(response.status).toEqual(200);
  });
});
