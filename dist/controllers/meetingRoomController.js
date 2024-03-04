"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRoomController = exports.updateRoomController = exports.getRoomByIdController = exports.getAllRoomsController = exports.createRoomController = void 0;
const meetingRoomRepository_1 = require("../repositories/meetingRoomRepository");
async function createRoomController(req, res) {
    try {
        const { nomeSala, capacidade, ocupada, horariosOcupados, equipamentos } = req.body;
        const room = await (0, meetingRoomRepository_1.createRoom)(nomeSala, capacidade, ocupada, horariosOcupados, equipamentos);
        res.status(201).json(room);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
}
exports.createRoomController = createRoomController;
async function getAllRoomsController(req, res) {
    try {
        const rooms = await (0, meetingRoomRepository_1.getAllRooms)();
        res.status(200).json(rooms);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
exports.getAllRoomsController = getAllRoomsController;
async function getRoomByIdController(req, res) {
    try {
        const { id } = req.params;
        const room = await (0, meetingRoomRepository_1.getRoomById)(Number(id));
        if (!room) {
            res.status(404).json({ message: 'Sala não encontrada.' });
            return;
        }
        res.status(200).json(room);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
exports.getRoomByIdController = getRoomByIdController;
async function updateRoomController(req, res) {
    try {
        const { id } = req.params;
        const { nomeSala, capacidade, ocupada, horariosOcupados, equipamentos } = req.body;
        const room = await (0, meetingRoomRepository_1.updateRoom)(Number(id), nomeSala, capacidade, ocupada, horariosOcupados, equipamentos);
        res.status(200).json(room);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
exports.updateRoomController = updateRoomController;
async function deleteRoomController(req, res) {
    try {
        const { id } = req.params;
        await (0, meetingRoomRepository_1.deleteRoom)(Number(id));
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
exports.deleteRoomController = deleteRoomController;
