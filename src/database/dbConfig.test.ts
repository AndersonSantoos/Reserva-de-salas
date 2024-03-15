import { sequelize } from './dbConfig'; // Importa a instância do Sequelize
import { Sequelize } from 'sequelize'; // Importa o Sequelize

describe('Database Connection', () => {
  beforeAll(async () => {
    try {
      await sequelize.authenticate();
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  });

  it('should connect to the database successfully', () => {
    expect(sequelize).toBeInstanceOf(Sequelize); // Verifica se a instância é do tipo Sequelize
    // Adicione outras verificações conforme necessário para as propriedades específicas que você deseja testar
  });

  afterAll(async () => {
    try {
      await sequelize.close(); // Fecha a conexão com o banco de dados após a execução dos testes
    } catch (error) {
      console.error('Error closing database connection:', error);
    }
  });
});