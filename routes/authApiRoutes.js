const express = require('express');
const authorApiController = require('../controllers/authorControllers')

const authorsApiRoutes = express.Router();

authorsApiRoutes.post('/', authorApiController.createAuthor);
authorsApiRoutes.get('/', authorApiController.getAuthors);
authorsApiRoutes.get('/prueba', authorApiController.getByEmail);
authorsApiRoutes.put('/', authorApiController.updateAuthor);
authorsApiRoutes.delete('/', authorApiController.deleteAuthor);

module.exports = authorsApiRoutes;