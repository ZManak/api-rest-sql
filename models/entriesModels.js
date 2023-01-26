require('dotenv').config()
const { Pool } = require('pg');
const queries = require('../queries/entries');
const DB_PWD = process.env.DB_PWD

const pool = new Pool({
    host: '127.0.0.1',
    user: 'zmanak',
    database: 'postgres',
    password: DB_PWD
})

pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack)
    }
    client.query('SELECT NOW()', (err, result) => {
        release()
        if (err) {
            return console.error('Error executing query', err.stack)
        }
        console.log(result.rows)
    })
})

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
const delEntry = async (entry) => {
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


const entries = {
    getEntries,
    delEntry,
    updateEntry,
    createEntry
}

module.exports = entries;