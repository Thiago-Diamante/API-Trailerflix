const express = require('express');
const app = express();
const sequelize = require('./src/conexion/conexion');
const Categoria = require('./src/modelos/categoria');
const Genero = require('./src/modelos/genero');
const Actores = require('./src/modelos/actores');
const Viewprincipal = require('./src/modelos/contenidoview');
const { Op } = require('sequelize');
const port = process.env.PORT || 3008;

app.use(express.json());

app.use(async (req, res, next) => {
    try {
      await sequelize.authenticate();
      await Categoria.sync();
      await Genero.sync();
      await Actores.sync();
      await Viewprincipal.sync();
      next();
    } catch (error) {
      res.status(500).json({ error: 'Error en el servidor', description: error.message });
    }
  })

  app.get('/', async (req, res) => {
    res.status(200).send('Bienvenido a la API de trailerflix');
  });

  app.get('/contenido', async (req, res) => {
    try {
      const todoContenido = await Viewprincipal.findAll();
      todoContenido.length !== 0 ? res.status(200).json(todoContenido) : res.status(404).json({ error: 'No se encontraron contenidos multimedia.'});
    } catch (error) {
      res.status(500).json({ error: 'Error en el servidor', description: error.message});
    }
  });

  app.get('/contenido/:id', async (req, res) => {
    try {
      const numeroId = req.params.id;
      const resultadoId = await Viewprincipal.findByPk(numeroId);
      resultadoId ? res.status(200).json(resultadoId) : res.status(404).json({ error: `No se encontraron contenidos multimedia con id ${numeroId}`});
    } catch (error) {
      res.status(500).json({ error: 'Error en el servidor', description: error.message});
    }
  });

  app.get('/contenido/nombre/:query', async (req, res) => {
    try {
      const { query } = req.params;
      const titulo = await Viewprincipal.findAll({
        where: {
          titulo: {
            [Op.like]: `%${ query }%`
          },
        },
      });
      titulo ? res.status(200).json(titulo) : res.status(404).json({ error: `No se encontro contenido con nombre ${query}`})
    } catch (error) {
      res.status(500).json({ error: 'Error en el servidor', description: error.message});
    }
  });

 app.get('/contenido/genero/:consulta', async (req, res) => {
   try {
     const { consulta } = req.params;
   const genero = await Viewprincipal.findAll({
     where: {
       nombre_generos: {
         [Op.like]: `%${ consulta }%`
       },
     },
   });
   genero ? res.status(200).json(genero) : res.status(404).json({ error: `No se encontro contenido con genero ${nombre_generos}`});
   } catch (error) {
     res.status(500).json({ error: 'Error en el servidor', description: error.message});
   }
 });

  app.get('/contenido/categoria/:nombre_categoria', async (req, res) => {
    try {
      const { nombre_categoria } = req.params;
      const categoria = await Viewprincipal.findAll({ where: { nombre_categoria }});
      categoria ? res.status(200).json(categoria) : res.status(404).json({ error: `No se encontro contenido con categoria ${nombre_categoria}`});
    } catch (error) {
      res.status(500).json({ error: 'Error en el servidor', description: error.message});
    }
  });

  app.get('/categorias', async (req, res) => {
    try{
      const todasLasCategorias = await Categoria.findAll();
      todasLasCategorias.length !== 0 ? res.status(200).json(todasLasCategorias) : res.status(404).json({ error: 'No se encontraron categorias.'});
    } catch(error){
      res.status(500).json({ error: 'Error en el servidor', description: error.message});
    }
  });

  app.get('/generos', async (req, res) => {
    try {
      const todosLosGeneros = await Genero.findAll();
      todosLosGeneros.length !== 0 ? res.status(200).json(todosLosGeneros) : res.status(404).json({ error: 'No se encontraron generos.'});
    } catch (error) {
      res.status(500).json({ error: 'Error en el servidor', description: error.message});
    }
  });

  app.get('/actores', async (req, res) => {
    try {
      const todosLosActores = await Actores.findAll();
      todosLosActores.length !== 0 ? res.status(200).json(todosLosActores) : res.status(404).json({ error: 'No se encontraron actores.'});
    } catch (error) {
      res.status(500).json({ error: 'Error en el servidor', description: error.message});
    }
  });

  app.listen(port, () => console.log(`Escuchando el puerto ${port}`));