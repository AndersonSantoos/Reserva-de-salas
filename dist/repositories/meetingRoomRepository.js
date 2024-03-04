"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const meetingRoom_1 = require("../models/meetingRoom");
async function createRoom(nomeSala, capacidade, ocupada, horariosOcupados, equipamentos) {
    try {
        const room = await meetingRoom_1.Room.create({ nomeSala, capacidade, ocupada, horariosOcupados, equipamentos });
        console.log('Sala criada com sucesso.');
        return room;
    }
    catch (error) {
        console.error("Erro ao criar sala:", error.message);
        throw error;
    }
}
