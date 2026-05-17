process.env.DATABASE_URL = 'postgres://postgres:secret@localhost:5432/cadastro-clientes-db?sslmode=disable';

const { app, db, pgp } = require('./app');
const request = require('supertest');

describe('BACKEND API', () => {

    beforeAll(async () => {
    try {
      // Deleta todos os dados da tabela de clientes
      // Usar TRUNCATE com RESTART IDENTITY é bom porque zera os IDs (1, 2, 3...) de volta para o 1
      await db.none('TRUNCATE TABLE users RESTART IDENTITY CASCADE;');
      console.log('Database limpa com sucesso antes dos testes.');
    } catch (error) {
      console.error('Erro ao limpar o banco de dados:', error);
      throw error; // Para o teste se não conseguir limpar o banco
    }
  });

    afterAll(async () => {
    // Fecha todas as conexões abertas para o Jest poder encerrar
        await pgp.end(); 
    });
    
    it('deve retornar a lista de clientes em /clientes', async () => {
        
        const response = await request(app)
            .get('/clientes')
            .expect(200);
        console.log(response.body);
    });

});