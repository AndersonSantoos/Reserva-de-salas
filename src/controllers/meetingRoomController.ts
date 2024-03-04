import { Request, Response } from 'express';
import { createRoom, getAllRooms, getRoomById, updateRoom, deleteRoom } from '../repositories/meetingRoomRepository';

async function createRoomController(req: Request, res: Response): Promise<void> {
    try {
        const { nomeSala, capacidade, ocupada, horariosOcupados, equipamentos } = req.body;
        const room = await createRoom(nomeSala, capacidade, ocupada, horariosOcupados, equipamentos);
        res.status(201).json(room);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
}

async function getAllRoomsController(req: Request, res: Response): Promise<void> {
    try {
        const rooms = await getAllRooms();
        res.status(200).json(rooms);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

async function getRoomByIdController(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;
        const room = await getRoomById(Number(id));
        if (!room) {
            res.status(404).json({ message: 'Sala não encontrada.' });
            return;
        }
        res.status(200).json(room);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

async function updateRoomController(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;
        const { nomeSala, capacidade, ocupada, horariosOcupados, equipamentos } = req.body;
        const room = await updateRoom(Number(id), nomeSala, capacidade, ocupada, horariosOcupados, equipamentos);
        res.status(200).json(room);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

async function deleteRoomController(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;
        await deleteRoom(Number(id));
        res.status(204).send();
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
}

export { createRoomController, getAllRoomsController, getRoomByIdController, updateRoomController, deleteRoomController };
