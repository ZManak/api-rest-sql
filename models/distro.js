require('dotenv').config()
const { Pool } = require('pg');
const queries = require('./entries');
const authors = require('./authors');
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

const getAuthors = async () => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(authors.getAuthors)
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

const getByEmail = async (author) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(authors.getByEmail, [author])
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

const createAuthor = async (author) => {
    const { name, surname, mail, image } = author;
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(authors.createAuthor, [name, surname, mail, image])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

const updateAuthor = async (author) => {
    const { name, surname, mail, image, id } = author;
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(authors.updateAuthor, [name, surname, mail, image, id])
        result = data.rowCount
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
    createEntry,
    getAuthors,
    getByEmail,
    createAuthor,
    updateAuthor
}

module.exports = entries;