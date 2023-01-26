require('dotenv').config()
const { Pool } = require('pg');
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
 
module.exports = Pool