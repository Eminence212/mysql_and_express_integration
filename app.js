const express = require('express');
const mysql = require('mysql');
const PORT = process.env.PORT || 3000;
const app = express();

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'kda',
});
connection.connect((error) => {
	if (error) {
		console.log(error);
		return;
	}
	console.log('La connection à la base des données est établi');
});

app.use(express.json());

app.get('/students', (req, res) => {
	connection.query('SELECT * FROM students', (error, result) => {
		if (error) throw error;
		console.log(result);
		res.send(result);
	});
});

app.post('/students', (req, res) => {
	const { first_name, last_name, email } = req.body;
	connection.query(
		'INSERT INTO students (first_name, last_name, email) VALUES (?, ?, ?)',
		[first_name, last_name, email],
		(error, result) => {
			if (error) throw error;
			console.log(result);
			res.send({ message: 'Ok' });
		},
	);
});
app.delete('/students/:id', (req, res) => {

});

app.put('/students/:id', (req, res) => {});

app.listen(PORT, () => {
	console.log('server listens on port', PORT);
});
