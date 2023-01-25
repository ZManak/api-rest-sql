require('dotenv').config()
const express = require('express')
const morgan = require('morgan');
const DB_PWD = process.env.DB_PWD;

// Módulos de Rutas
const entriesApiRoutes = require('./routes/entriesApiRoutes')
const authorsApiRoutes = require('./routes/authApiRoutes');

const app = express()
const port = 3000

// Template engine
app.set('view engine', 'pug');
app.set('views', './views');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use(morgan('combined'));

/* app.get('/', (req, res) => {
    res.render('content')
}) */

//Rutas 
app.use('/api/entries', entriesApiRoutes); 
app.use('/api/authors', authorsApiRoutes);

app.listen(port, () => {
    console.log(`Server up on port ${port}`)
})
