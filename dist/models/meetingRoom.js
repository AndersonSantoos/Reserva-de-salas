"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
const sequelize_1 = require("sequelize");
const dbConfig_1 = require("../database/dbConfig");
class Room extends sequelize_1.Model {
    isOcupada(horario) {
        return this.horariosOcupados.includes(horario);
    }
    reservar(horario) {
        if (!this.isOcupada(horario)) {
            this.horariosOcupados.push(horario);
            this.ocupada = true;
        }
    }
    liberar(horario) {
        const index = this.horariosOcupados.indexOf(horario);
        if (index !== -1) {
            this.horariosOcupados.splice(index, 1);
            if (this.horariosOcupados.length === 0) {
                this.ocupada = false;
            }
        }
    }
}
exports.Room = Room;
Room.init({
    registration: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nomeSala: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    capacidade: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    ocupada: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    },
    horariosOcupados: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
        defaultValue: []
    },
    equipamentos: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
        defaultValue: []
    }
}, {
    sequelize: dbConfig_1.sequelize,
    modelName: 'Room',
    tableName: 'rooms'
});
