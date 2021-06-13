const express = require("express");
const cors = require("cors");
const db = require('./connexion')
const { validateBody,validateBodyUpdate,checkStudentExistence } = require("./Middlewares");
const app = express();

app.use(express.json())

app.use(cors())

// Sélect students
app.get('/students', (req, res) => {
    const query = "SELECT * FROM students ORDER BY first_name ASC";
    db.query(query, (error, result) => {
        if (error) {
            return res.status(500).json({message : "Internal error !"})
        }
        return res.status(200).json(result)
    })
})
// Sélect students by id
app.get("/students/:id",checkStudentExistence, (req, res) => {
    return res.status(200).json(req.student);
});

// Create student
app.post("/students/add",validateBody,(req, res) => {
    const [first_name, last_name, email] = req.values
    const query = "INSERT INTO students(first_name,last_name,email) VALUES(?,?,?)"
    db.query(query, [first_name, last_name, email], (error, result) => {
        if (error) {
            return res.status(500).json({ message: "Internal error !" });
        }
        return res.status(201).json({ message: "Student successfully added" });
    });
   
})

// Delete student by id
app.delete("/students/delete/:id",checkStudentExistence,(req, res) => {
    const id = req.student[0].id
    const query = "DELETE FROM students WHERE id = ?"

    db.query(query, [id], (error) => {
        if (error) { return res.status(500).json({ message: "Internal error !" }); }
         return res.status(200).json({ message: "Student successfully deleted" })
    })
})

// Update student
app.put(
  "/students/update/:id",
  [checkStudentExistence,validateBodyUpdate],
  (req, res) => {
    const id = req.params.id;
    const { first_name, last_name, email } = req.body;
    console.log([id, first_name, last_name, email]);
    const query =
      "UPDATE students SET first_name = ?,last_name = ?,email = ? WHERE id = ?";
    db.query(query, [first_name, last_name, email, id], (error) => {
      if (error) {
        return res.status(500).json({ message: "Internal error !" });
      }
      return res.status(200).json({ message: "Student successfully updated" });
    });
  }
);

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log(`Le serveur écoute sur le port http://localhost:${PORT}`);
});
