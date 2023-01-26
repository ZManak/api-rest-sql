const entry = require('../models/authorsModels');

const getAuthors = async (req, res) => {
    let authors = await entry.getAuthors();
    res.status(200).json(authors);
}

const getByEmail = async (req, res) => {
    const email = req.query;
    const response = await entry.getByEmail(email);
    res.status(200).json(response)
}

const createAuthor = async (req, res) => {
    const newAuthor = req.body; 
    const response = await entry.createAuthor(newAuthor);
    res.status(201).json({
        items_created: response,
        data: newAuthor
    });
}

const updateAuthor = async (req, res) => {
    const updatedAuthor = req.body; 
    const response = await entry.updateAuthor(updatedAuthor);
    res.status(201).json({
        items_modified: response,
        data: updatedAuthor
    });
}

const deleteAuthor = async (res, req) => {
    const {delEmail}  = req.body;
    const response = await entry.deleteAuthor(delEmail);
    res.status(200).json({
        DELETE: response,
        data: delEmail
    })
}

module.exports = {
    getAuthors,
    updateAuthor,
    createAuthor,
    deleteAuthor,
    getByEmail
}