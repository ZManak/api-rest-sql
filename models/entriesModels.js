require('dotenv').config()
const { Pool } = require('pg');
const pool = require('../utils/pg_pool')
const queries = require('../queries/entry.queries');

// GET
const getEntries = async () => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.getEntries)
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

const createEntry = async (entry) => {
    const { title, content, email, category } = entry;
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.createEntry, [title, content, email, category])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

// DELETE 
const deleteEntry = async (entry) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.deleteEntry, [entry])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

//UPDATE
const updateEntry = async (entry) => {
    const { content, category, title } = entry
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.updateEntry, [content, category, title])
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

const deleteAllEntries = async () => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.deleteAllEntries)
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

const entries = {
    getEntries,
    deleteEntry,
    updateEntry,
    createEntry, 
    deleteAllEntries
}

module.exports = entries;