const express = require('express');

const entriesApiController = require("../controllers/apiControllers.js");
const authorsApiRoutes = express.Router();

authorsApiRoutes.post('/', entriesApiController.createAuthor);
authorsApiRoutes.get('/', entriesApiController.getAuthors);
authorsApiRoutes.get('/:email?', entriesApiController.getByEmail);
//authorsApiRoutes.put('/', entriesApiController.updateEntry);
//authorsApiRoutes.delete('/', entriesApiController.delEntry);

module.exports = authorsApiRoutes;