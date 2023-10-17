const { DataTypes } = require('sequelize');
const sequelize = require('../conexion/conexion');

const Actores = sequelize.define('Actores', {
    id_actor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    nombre_actor: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},{
    tableName: 'actores',
    timestamps: false,
});

module.exports = Actores;