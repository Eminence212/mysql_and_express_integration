const mysql = require('mysql')

//Etablissement de la connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '@Eminence1987',
    database : process.env.DATABASE || 'kda'
})
// Test de la connection
connection.connect((err) => {
    if (err) {
        console.error('Erreur connecting : ', err.stack)
        return
    }
    console.log('Database connected')
})
module.exports = connection
