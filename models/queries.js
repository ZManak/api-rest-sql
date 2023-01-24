const queries = {
    getEntries: `
    SELECT e.title, e.content, e.date, e.category, 
    a.name,a.surname,a.image  
    FROM entries AS e
    INNER JOIN authors AS a
    ON e.id_author=a.id_author
    ORDER BY id_entry ASC;
    `,
    updateEntry:`
    UPDATE entries AS e 
    SET e.title = $1, e.content = $2, e.category = $3
    WHERE e.title=$4`,
    deleteEntry:`
    DELETE FROM entries AS e
    WHERE e.title=$1`,
    createEntry: 
    `INSERT INTO entries(title,content,id_author,category) 
    VALUES ($1,$2,
    (SELECT id_author FROM authors WHERE email=$3),$4)`,
}

module.exports = queries;