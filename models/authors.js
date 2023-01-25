const authors = {
    getAuthors: `
    SELECT *
    FROM authors;`,
    getByEmail:`
    SELECT *
    FROM authors
    WHERE email = $1`,
    createAuthor:`
    INSERT INTO authors(name,surname,email,image) 
    VALUES ($1,$2,$3,$4)`
}

module.exports = authors;