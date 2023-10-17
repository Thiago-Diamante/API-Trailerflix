const { DataTypes } = require('sequelize');
const sequelize = require('../conexion/conexion');

const Categoria = sequelize.define('Categoria', {
    id_categoria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_categoria: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    tableName: 'categoria',
    timestamps: false,
});

module.exports = Categoria;