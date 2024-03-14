let isEditing = false;
let selectedRoomId: number | null = null;

async function loadRooms() {
    try {
        const response = await fetch('http://localhost:3000/rooms');
        if (!response.ok) {
            throw new Error('Erro ao carregar a lista de salas');
        }
        const rooms = await response.json();
        const roomList = document.getElementById('roomList');
        if (!roomList) return;
        roomList.innerHTML = '';
        rooms.forEach((room: { nomeSala: any; capacidade: any; ocupada: any; horariosOcupados: any[]; equipamentos: any[]; registration: any; }) => {
            const roomItem = document.createElement('div');
            roomItem.className = 'roomItem';
            roomItem.innerHTML = `
                <h3>${room.nomeSala}</h3>
                <p>Capacidade: ${room.capacidade}</p>
                <p>Ocupada: ${room.ocupada ? 'Sim' : 'Não'}</p>
                <p>Horários Ocupados: ${room.horariosOcupados.join(', ')}</p>
                <p>Equipamentos: ${room.equipamentos.join(', ')}</p>
                <button class="btn" onclick="editRoom(${room.registration})">Editar</button>
                <button class="btn" onclick="deleteRoom(${room.registration})">Excluir</button>
            `;
            roomList.appendChild(roomItem);
        });
    } catch (error: any) {
        console.error('Erro ao carregar salas:', error.message);
    }
}


async function editRoom(roomId: number) {
    try {
        const response = await fetch(`http://localhost:3000/rooms/${roomId}`);
        if (!response.ok) {
            throw new Error('Erro ao carregar os dados da sala');
        }
        const room = await response.json();
        if (!room) {
            console.error('Sala não encontrada');
            return;
        }
        
        // Obter referências aos campos do formulário
        const roomIdInput = document.getElementById('roomId') as HTMLInputElement;
        const roomNameInput = document.getElementById('roomName') as HTMLInputElement;
        const roomCapacityInput = document.getElementById('roomCapacity') as HTMLInputElement;
        const roomOccupiedInput = document.getElementById('roomOccupied') as HTMLInputElement;

        // Verificar se os campos do formulário foram encontrados
        if (!roomIdInput || !roomNameInput || !roomCapacityInput || !roomOccupiedInput) {
            console.error('Elementos do formulário não encontrados');
            return;
        }

        // Preencher os campos com os dados da sala
        roomIdInput.value = room.registration?.toString() || '';
        roomNameInput.value = room.nomeSala;
        roomCapacityInput.value = room.capacidade.toString();
        roomOccupiedInput.checked = room.ocupada;

        // Exibir o formulário
        openCreateRoomForm();
        
        // Definir que está em modo de edição e armazenar o ID da sala selecionada
        isEditing = true;
        selectedRoomId = roomId;
    } catch (error: any) {
        console.error('Erro ao carregar dados da sala:', error.message);
    }
}

async function submitRoomForm(): Promise<boolean> {
    try {
        const roomNameInput = document.getElementById('roomName') as HTMLInputElement;
        const roomCapacityInput = document.getElementById('roomCapacity') as HTMLInputElement;
        const roomOccupiedInput = document.getElementById('roomOccupied') as HTMLInputElement;
        const roomScheduleInput = document.getElementById('roomSchedule') as HTMLInputElement;
        const roomEquipmentInput = document.getElementById('roomEquipment') as HTMLInputElement;

        // Verificar se os campos obrigatórios estão preenchidos
        if (!roomNameInput.value || !roomCapacityInput.value) {
            throw new Error('Todos os campos obrigatórios devem ser preenchidos');
        }

        // Obter os valores dos campos
        const roomName: string = roomNameInput.value;
        const roomCapacity: number = parseInt(roomCapacityInput.value);
        const roomOccupied: boolean = roomOccupiedInput.checked;
        const roomSchedule: string[] = roomScheduleInput.value.split(',').map(time => time.trim());
        const roomEquipment: string[] = roomEquipmentInput.value.split(',').map(equipment => equipment.trim());

        // Criar objeto com os dados da sala
        const data = {
            nomeSala: roomName,
            capacidade: roomCapacity,
            ocupada: roomOccupied,
            horariosOcupados: roomSchedule,
            equipamentos: roomEquipment
        };

        let url = 'http://localhost:3000/cadastrar';
        let method = 'POST';

        if (isEditing && selectedRoomId !== null) {
            // Se estiver editando, ajusta a URL e o método para atualizar a sala existente
            url = `http://localhost:3000/editar/${selectedRoomId}`;
            method = 'PUT';
        }

        // Enviar requisição para o servidor
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Erro ao ' + (isEditing ? 'editar' : 'cadastrar') + ' sala');
        }

        // Limpar campos do formulário e recarregar lista de salas
        const roomForm = document.getElementById('roomForm')!;
        if (roomForm) {
            roomForm.classList.add('hidden');
        }
        loadRooms();

        return false;
    } catch (error: any) {
        console.error('Erro ao ' + (isEditing ? 'editar' : 'cadastrar') + ' sala:', error.message);
        return false;
    }
}





async function deleteRoom(roomId: number) {
    if (!confirm('Tem certeza que deseja excluir esta sala?')) {
        return;
    }
    try {
        const response = await fetch(`http://localhost:3000/deletar/${roomId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Erro ao excluir sala');
        }
        loadRooms();
    } catch (error: any) {
        console.error('Erro ao excluir sala:', error.message);
    }
}

function openCreateRoomForm() {
    const formTitle = document.getElementById('formTitle') as HTMLHeadingElement;
    const roomForm = document.getElementById('roomForm') as HTMLDivElement;
    if (!formTitle || !roomForm) {
        console.error('Elementos do formulário não encontrados');
        return;
    }
    formTitle.innerText = isEditing ? 'Editar Sala' : 'Cadastrar Nova Sala';
    // Limpa os campos do formulário
    const inputs = Array.from(roomForm.getElementsByTagName('input')) as HTMLInputElement[];
    inputs.forEach(input => input.value = '');
    // Exibe o formulário
    roomForm.classList.remove('hidden');
}

window.onload = () => {
    loadRooms();
};
