import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database/dbConfig';

interface RoomAttributes {
    registration?: number;
    nomeSala: string;
    capacidade: number;
    ocupada: boolean;
    horariosOcupados: string[];
    equipamentos: string[];
}

class Room extends Model<RoomAttributes> implements RoomAttributes {
    registration!: number;
    nomeSala!: string;
    capacidade!: number;
    ocupada!: boolean;
    horariosOcupados!: string[];
    equipamentos!: string[];

    isOcupada(horario: string): boolean {
        return this.horariosOcupados.includes(horario);
    }

    reservar(horario: string): void {
        if (!this.isOcupada(horario)) {
            this.horariosOcupados.push(horario);
            this.ocupada = true;
        }
    }

    liberar(horario: string): void {
        const index = this.horariosOcupados.indexOf(horario);
        if (index !== -1) {
            this.horariosOcupados.splice(index, 1);
            if (this.horariosOcupados.length === 0) {
                this.ocupada = false;
            }
        }
    }
}

Room.init(
    {
        registration: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nomeSala: {
            type: DataTypes.STRING,
            allowNull: false
        },
        capacidade: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ocupada: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        horariosOcupados: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: []
        },
        equipamentos: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: []
        }
    },
    {
        sequelize,
        modelName: 'Room',
        tableName: 'rooms'
    }
);

export { Room };
