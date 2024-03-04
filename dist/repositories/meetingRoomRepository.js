"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRoom = exports.updateRoom = exports.getRoomById = exports.getAllRooms = exports.createRoom = void 0;
const meetingRoom_1 = require("../models/meetingRoom");
async function createRoom(nomeSala, capacidade, ocupada, horariosOcupados, equipamentos) {
    try {
        if (!nomeSala || !capacidade || !ocupada || !horariosOcupados || !equipamentos) {
            throw new Error('Todos os campos devem ser preenchidos.');
        }
        const room = await meetingRoom_1.Room.create({ nomeSala, capacidade, ocupada, horariosOcupados, equipamentos });
        console.log('Sala criada com sucesso.');
        return room;
    }
    catch (error) {
        console.error('Erro ao criar sala:', error.message);
        throw error;
    }
}
exports.createRoom = createRoom;
async function getAllRooms() {
    try {
        const rooms = await meetingRoom_1.Room.findAll();
        console.log('Lista de salas obtida com sucesso.');
        return rooms;
    }
    catch (error) {
        console.error('Erro ao obter lista de salas:', error.message);
        throw error;
    }
}
exports.getAllRooms = getAllRooms;
async function getRoomById(registration) {
    try {
        const room = await meetingRoom_1.Room.findByPk(registration);
        console.log('Sala obtida com sucesso.');
        return room;
    }
    catch (error) {
        console.error('Erro ao obter sala por ID:', error.message);
        throw error;
    }
}
exports.getRoomById = getRoomById;
async function updateRoom(registration, nomeSala, capacidade, ocupada, horariosOcupados, equipamentos) {
    try {
        const room = await meetingRoom_1.Room.findByPk(registration);
        if (!room) {
            throw new Error('Sala não encontrada.');
        }
        const updatedRoom = await room.update({ nomeSala, capacidade, ocupada, horariosOcupados, equipamentos });
        console.log('Sala atualizada com sucesso.');
        return updatedRoom;
    }
    catch (error) {
        console.error('Erro ao atualizar sala:', error.message);
        throw error;
    }
}
exports.updateRoom = updateRoom;
async function deleteRoom(registration) {
    try {
        const room = await meetingRoom_1.Room.findByPk(registration);
        if (!room) {
            throw new Error('Sala não encontrada.');
        }
        await room.destroy();
        console.log('Sala excluída com sucesso.');
        return true;
    }
    catch (error) {
        console.error('Erro ao excluir sala:', error.message);
        throw error;
    }
}
exports.deleteRoom = deleteRoom;
