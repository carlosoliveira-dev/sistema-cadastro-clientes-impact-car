process.env.DATABASE_URL = 'postgres://postgres:secret@localhost:5432/cadastro-clientes-db?sslmode=disable';

const app = require('./app');
const request = require('supertest');

describe('BACKEND API', () => {

    it('deve retornar a lista de clientes em /clientes', async () => {
        
        const response = await request(app)
            .get('/clientes')
            .expect(200);
        console.log(response.body);
    });

});