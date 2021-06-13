const db = require("../connexion");

const checkStudentExistence = (req, res, next) => {
  const id = req.params.id;
  const query = "SELECT * FROM students WHERE  id = ?";
  db.query(query, [id], (error,result) => {
    if (error) { return res.status(500).json({ message: "Internal error !" }) }
    if (!result.length > 0) { return res.status(404).json({ message: "Not found" }) }
    req.student = result
    next();
  })
 
};
module.exports = checkStudentExistence;
