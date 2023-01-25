const entry = require('../models/distro');

const getEntries = async (req, res) => {
    let entries = await entry.getEntries()
    res.status(200).json(entries);
}

const createEntry = async (req, res) => {
    const newEntry = req.body; 
    const response = await entry.createEntry(newEntry);
    res.status(201).json({
        items_created: response,
        data: newEntry
    });
}

const updateEntry = async (req, res) => {
    const upEntry = req.body;
    res.status(202).json({ 
        UPDATE: "success",
        data: upEntry
    })
}

const delEntry = async (res, req) => {
    const {title}  = req.body;
    const response = await entry.delEntry(title);
    res.status(200).json({
        DELETE: response,
        data: title
    })
}

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
        items_created: response,
        data: updatedAuthor
    });
}

module.exports = {
    getEntries,
    createEntry,
    updateEntry,
    delEntry, 
    getAuthors,
    getByEmail,
    createAuthor,
    updateAuthor
}