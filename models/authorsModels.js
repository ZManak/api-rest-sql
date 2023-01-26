require('dotenv').config()
const { Pool } = require('pg');
const authors = require('../queries/authors');


const DB_PWD = process.env.DB_PWD

const pool = new Pool({
    host: '127.0.0.1',
    user: 'zmanak',
    database: 'postgres',
    password: DB_PWD
})


/*pool.connect((err, client, release) => {
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
}) */

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
    console.log(author);
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
    const { name, surname, email, image, id_author } = author;
    let client, result;
    try {
        console.log('ok')
        client = await pool.connect();
        const data = await client.query(authors.updateAuthor, [name, surname, email, image, id_author])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

const deleteAuthor = async (entry) =>{
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(authors.deleteAuthor, [entry])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result

}

module.exports = {
    getAuthors,
    getByEmail,
    updateAuthor,
    createAuthor,
    deleteAuthor
}