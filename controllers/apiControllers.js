const entry = require('../models/entriesModels');

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

const delEntry = async (req, res) => {
    const {title}  = req.body;
    const response = await entry.delEntry(title);
    res.status(200).json({
        DELETE: response,
        data: title
    })
}

module.exports = {
    getEntries,
    createEntry,
    updateEntry,
    delEntry
}