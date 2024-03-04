import express, { Request, Response, NextFunction } from 'express';
import { createRoomController, getAllRoomsController, getRoomByIdController, updateRoomController, deleteRoomController } from '../controllers/meetingRoomController';

const router = express.Router();

// Rota para criar uma nova sala
router.post('/rooms', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await createRoomController(req, res);
    } catch (error) {
        next(error); // Passa o erro para o próximo middleware de tratamento de erros
    }
});

// Rota para obter todas as salas
router.get('/rooms', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await getAllRoomsController(req, res);
    } catch (error) {
        next(error); // Passa o erro para o próximo middleware de tratamento de erros
    }
});

// Rota para obter uma sala por ID
router.get('/rooms/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await getRoomByIdController(req, res);
    } catch (error) {
        next(error); // Passa o erro para o próximo middleware de tratamento de erros
    }
});

// Rota para atualizar uma sala existente
router.put('/rooms/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await updateRoomController(req, res);
    } catch (error) {
        next(error); // Passa o erro para o próximo middleware de tratamento de erros
    }
});

// Rota para excluir uma sala
router.delete('/rooms/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await deleteRoomController(req, res);
    } catch (error) {
        next(error); // Passa o erro para o próximo middleware de tratamento de erros
    }
});

// Middleware para tratamento de erros
router.use((error: any, req: Request, res: Response, next: NextFunction) => {
    res.status(error.status || 500).json({ message: error.message || 'Ocorreu um erro inesperado.' });
});

export default router;
