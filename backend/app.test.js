const app = require('./app');
const request = require('supertest');

describe('BACKEND API', () => {

    it('should return "Hello, Express + TypeScript!" from /', async () => {
        
        const response = await request(app)
            .get('/')
            .expect(200);

        expect(response.text).toBe('Hello, Express + TypeScript!');
    });

});