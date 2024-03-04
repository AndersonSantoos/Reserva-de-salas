import { Room } from '../models/meetingRoom';

async function createRoom(nomeSala: string, capacidade: number, ocupada: boolean, horariosOcupados: string[], equipamentos: string[]): Promise<Room> {
    try {
        if(!nomeSala || !capacidade || !ocupada || !horariosOcupados || !equipamentos) {
            throw new Error('Todos os campos devem ser preenchidos.')
        }
        const room = await Room.create({ nomeSala, capacidade, ocupada, horariosOcupados, equipamentos });
        console.log('Sala criada com sucesso.');
        return room;
    } catch (error: any) {
        console.error('Erro ao criar sala:', error.message);
        throw error;
    }
}

async function getAllRooms(): Promise<Room[]> {
    try {
        const rooms = await Room.findAll();
        console.log('Lista de salas obtida com sucesso.');
        return rooms;
    } catch (error: any) {
        console.error('Erro ao obter lista de salas:', error.message);
        throw error;
    }
}

async function getRoomById(registration: number): Promise<Room | null> {
    try {
        const room = await Room.findByPk(registration);
        console.log('Sala obtida com sucesso.');
        return room;
    } catch (error: any) {
        console.error('Erro ao obter sala por ID:', error.message);
        throw error;
    }
}

async function updateRoom(registration: number, nomeSala: string, capacidade: number, ocupada: boolean, horariosOcupados: string[], equipamentos: string[]): Promise<Room> {
    try {
        const room = await Room.findByPk(registration);
        if (!room) {
            throw new Error('Sala não encontrada.');
        }
        const updatedRoom = await room.update({ nomeSala, capacidade, ocupada, horariosOcupados, equipamentos });
        console.log('Sala atualizada com sucesso.');
        return updatedRoom;
    } catch (error: any) {
        console.error('Erro ao atualizar sala:', error.message);
        throw error;
    }
}

async function deleteRoom(registration: number): Promise<boolean> {
    try {
        const room = await Room.findByPk(registration);
        if (!room) {
            throw new Error('Sala não encontrada.');
        }
        await room.destroy();
        console.log('Sala excluída com sucesso.');
        return true;
    } catch (error: any) {
        console.error('Erro ao excluir sala:', error.message);
        throw error;
    }
}

export { createRoom, getAllRooms, getRoomById, updateRoom, deleteRoom };
