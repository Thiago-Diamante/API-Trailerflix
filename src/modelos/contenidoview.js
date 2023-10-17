const { DataTypes } = require('sequelize');
const sequelize = require('../conexion/conexion');

const Viewprincipal = sequelize.define('Viewprincipal', {
    id_contenido: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    poster: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    resumen: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    temporadas: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    nombre_categoria: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nombre_actor: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nombre_generos: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},{
    tableName: 'viewprincipal',
    timestamps: false,
});

module.exports = Viewprincipal;