"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const meetingRoomController_1 = require("../controllers/meetingRoomController");
const router = express_1.default.Router();
// Rota para criar uma nova sala
router.post('/', async (req, res, next) => {
    try {
        await (0, meetingRoomController_1.createRoomController)(req, res);
    }
    catch (error) {
        next(error); // Passa o erro para o próximo middleware de tratamento de erros
    }
});
// Rota para obter todas as salas
router.get('/rooms', async (req, res, next) => {
    try {
        await (0, meetingRoomController_1.getAllRoomsController)(req, res);
    }
    catch (error) {
        next(error); // Passa o erro para o próximo middleware de tratamento de erros
    }
});
// Rota para obter uma sala por ID
router.get('/rooms/:id', async (req, res, next) => {
    try {
        await (0, meetingRoomController_1.getRoomByIdController)(req, res);
    }
    catch (error) {
        next(error); // Passa o erro para o próximo middleware de tratamento de erros
    }
});
// Rota para atualizar uma sala existente
router.put('/rooms/:id', async (req, res, next) => {
    try {
        await (0, meetingRoomController_1.updateRoomController)(req, res);
    }
    catch (error) {
        next(error); // Passa o erro para o próximo middleware de tratamento de erros
    }
});
// Rota para excluir uma sala
router.delete('/rooms/:id', async (req, res, next) => {
    try {
        await (0, meetingRoomController_1.deleteRoomController)(req, res);
    }
    catch (error) {
        next(error); // Passa o erro para o próximo middleware de tratamento de erros
    }
});
// Middleware para tratamento de erros
router.use((error, req, res, next) => {
    res.status(error.status || 500).json({ message: error.message || 'Ocorreu um erro inesperado.' });
});
exports.default = router;
