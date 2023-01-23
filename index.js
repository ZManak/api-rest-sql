const express = require('express')
const morgan = require('morgan')

const error404 = require('./middlewares/error404')

// Módulos de Rutas
const entriesApiRoutes = require('./routes/entriesApiRoutes')

const app = express()
const port = 3000

// Template engine
app.set('view engine', 'pug');
app.set('views', './views');

// Middlewares
app.use(express.json()); // Habilitar tipo de dato a recibir
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('content')
})

//Rutas 
app.use('/api/entries',entriesApiRoutes); // Rutas API entries
app.use(error404); // Middleware Para ruta no encontrada (404)

app.listen(port, () => {
    console.log(`Server up on port ${port}`)
        })
