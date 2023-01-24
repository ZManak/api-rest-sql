const entry = require('../models/entries');

const getEntries = async (req, res) => {
    let entries = await entry.getEntries()
    res.status(200).json(entries); 
}

module.exports = {
    getEntries
}