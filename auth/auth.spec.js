const request = require('supertest');

const auth = require('./auth-router.js');
const server = require('../api/server.js');

describe('server.js', () => {

    describe('POST /register', () => {
        it('returns 200', () => {
            return request(server)
                .post('/api/auth/register')
                .send({username: `test${Date.now()}`, password: `test${Date.now()}`})
                .then(res=> {
                    expect(res.status).toBe(201)
                })
        });

        it('returns 500', () => {
            return request(server)
                .post('/api/auth/register')
                .send()
                .then(res=> {
                    expect(res.status).toBe(500)
                })
        });
    })

    describe('POST /login', () => {
        it('returns 200', () => {
            return request(server)
                .post('/api/auth/login')
                .send({username: "test", password: "testpass"})
                .then(res=> {
                    expect(res.status).toBe(200)
                })
        });

        it('returns 500', () => {
            return request(server)
                .post('/api/auth/login')
                .send()
                .then(res=> {
                    expect(res.status).toBe(500)
                })
        })
    })
})