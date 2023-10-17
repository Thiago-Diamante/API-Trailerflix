const { DataTypes } = require('sequelize');
const sequelize = require('../conexion/conexion');

const Genero = sequelize.define('Genero', {
    id_genero: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    nombre_genero: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},{
    tableName: 'genero',
    timestamps: false,
});

module.exports = Genero;