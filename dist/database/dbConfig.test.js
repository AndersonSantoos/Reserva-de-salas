"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbConfig_1 = require("./dbConfig"); // Importa a instância do Sequelize
const sequelize_1 = require("sequelize"); // Importa o Sequelize
describe('Database Connection', () => {
    beforeAll(async () => {
        try {
            await dbConfig_1.sequelize.authenticate();
        }
        catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    });
    it('should connect to the database successfully', () => {
        expect(dbConfig_1.sequelize).toBeInstanceOf(sequelize_1.Sequelize); // Verifica se a instância é do tipo Sequelize
        // Adicione outras verificações conforme necessário para as propriedades específicas que você deseja testar
    });
    afterAll(async () => {
        try {
            await dbConfig_1.sequelize.close(); // Fecha a conexão com o banco de dados após a execução dos testes
        }
        catch (error) {
            console.error('Error closing database connection:', error);
        }
    });
});
