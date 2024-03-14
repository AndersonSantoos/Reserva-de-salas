"use strict";
let isEditing = false;
let selectedRoomId = null;
async function loadRooms() {
    try {
        const response = await fetch('http://localhost:3000/rooms');
        if (!response.ok) {
            throw new Error('Erro ao carregar a lista de salas');
        }
        const rooms = await response.json();
        const roomList = document.getElementById('roomList');
        if (!roomList)
            return;
        roomList.innerHTML = '';
        rooms.forEach((room) => {
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
    }
    catch (error) {
        console.error('Erro ao carregar salas:', error.message);
    }
}
async function editRoom(roomId) {
    var _a;
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
        const roomIdInput = document.getElementById('roomId');
        const roomNameInput = document.getElementById('roomName');
        const roomCapacityInput = document.getElementById('roomCapacity');
        const roomOccupiedInput = document.getElementById('roomOccupied');
        // Verificar se os campos do formulário foram encontrados
        if (!roomIdInput || !roomNameInput || !roomCapacityInput || !roomOccupiedInput) {
            console.error('Elementos do formulário não encontrados');
            return;
        }
        // Preencher os campos com os dados da sala
        roomIdInput.value = ((_a = room.registration) === null || _a === void 0 ? void 0 : _a.toString()) || '';
        roomNameInput.value = room.nomeSala;
        roomCapacityInput.value = room.capacidade.toString();
        roomOccupiedInput.checked = room.ocupada;
        // Exibir o formulário
        openCreateRoomForm();
        // Definir que está em modo de edição e armazenar o ID da sala selecionada
        isEditing = true;
        selectedRoomId = roomId;
    }
    catch (error) {
        console.error('Erro ao carregar dados da sala:', error.message);
    }
}
async function submitRoomForm() {
    try {
        const roomNameInput = document.getElementById('roomName');
        const roomCapacityInput = document.getElementById('roomCapacity');
        const roomOccupiedInput = document.getElementById('roomOccupied');
        const roomScheduleInput = document.getElementById('roomSchedule');
        const roomEquipmentInput = document.getElementById('roomEquipment');
        // Verificar se os campos obrigatórios estão preenchidos
        if (!roomNameInput.value || !roomCapacityInput.value) {
            throw new Error('Todos os campos obrigatórios devem ser preenchidos');
        }
        // Obter os valores dos campos
        const roomName = roomNameInput.value;
        const roomCapacity = parseInt(roomCapacityInput.value);
        const roomOccupied = roomOccupiedInput.checked;
        const roomSchedule = roomScheduleInput.value.split(',').map(time => time.trim());
        const roomEquipment = roomEquipmentInput.value.split(',').map(equipment => equipment.trim());
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
        const roomForm = document.getElementById('roomForm');
        if (roomForm) {
            roomForm.classList.add('hidden');
        }
        loadRooms();
        return false;
    }
    catch (error) {
        console.error('Erro ao ' + (isEditing ? 'editar' : 'cadastrar') + ' sala:', error.message);
        return false;
    }
}
async function deleteRoom(roomId) {
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
    }
    catch (error) {
        console.error('Erro ao excluir sala:', error.message);
    }
}
function openCreateRoomForm() {
    const formTitle = document.getElementById('formTitle');
    const roomForm = document.getElementById('roomForm');
    if (!formTitle || !roomForm) {
        console.error('Elementos do formulário não encontrados');
        return;
    }
    formTitle.innerText = isEditing ? 'Editar Sala' : 'Cadastrar Nova Sala';
    // Limpa os campos do formulário
    const inputs = Array.from(roomForm.getElementsByTagName('input'));
    inputs.forEach(input => input.value = '');
    // Exibe o formulário
    roomForm.classList.remove('hidden');
}
window.onload = () => {
    loadRooms();
};
