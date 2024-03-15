const jestConfig = require("../config/jest.config");
import { sequelize } from "../database/dbConfig";
import { Room } from "./meetingRoom";

beforeAll(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to the database successfully.");
    await sequelize.sync({ force: true }); // Isso irá sincronizar os modelos e recriar as tabelas (cuidado em produção!)
    console.log("Models synchronized with the database.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});

afterAll(async () => {
  try {
    await sequelize.close();
    console.log("Database connection closed.");
  } catch (error) {
    console.error("Error closing database connection:", error);
  }
});

describe("Room class", () => {
  let room: Room;

  beforeEach(() => {
    // Criar uma nova instância da sala antes de cada teste
    room = new Room({
      nomeSala: "Sala de Teste",
      capacidade: 10,
      ocupada: false,
      horariosOcupados: [],
      equipamentos: ["Projetor", "Quadro Branco"],
    });
  });

  test("isOcupada() retorna verdadeiro se a sala estiver ocupada em um determinado horário", () => {
    room.horariosOcupados = ["08:00", "10:00", "13:00"];
    expect(room.isOcupada("10:00")).toBe(true);
  });

  test("isOcupada() retorna falso se a sala não estiver ocupada em um determinado horário", () => {
    room.horariosOcupados = ["08:00", "10:00", "13:00"];
    expect(room.isOcupada("12:00")).toBe(false);
  });

  test("reservar() reserva a sala em um determinado horário se não estiver ocupada", () => {
    room.reservar("15:00");
    expect(room.horariosOcupados).toContain("15:00");
    expect(room.ocupada).toBe(true);
  });

  test("liberar() libera a sala em um determinado horário se estiver ocupada", () => {
    room.horariosOcupados = ["10:00", "12:00", "14:00"];
    room.liberar("10:00");
    expect(room.horariosOcupados).not.toContain("10:00");
    expect(room.ocupada).toBe(false); // Deve ser false após a liberação
  });
});
