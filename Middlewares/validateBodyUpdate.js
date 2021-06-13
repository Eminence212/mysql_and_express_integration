const db = require("../connexion");
const validateBodyUpdate = (req, res, next) => {
  const { first_name, last_name, email } = req.body;
  const values = [first_name, last_name, email];
  //Vérifie si les champs sont non vide
  if (values.some((value) => value.length === 0)) {
    return res.status(422).json({ message: "Please fill correctly fields" });
  }
  // Vérifier si l\'Email existe
  const requete = "SELECT * FROM students WHERE email = ?";
  db.query(requete, [email], (error, result) => {
    if (result.length > 0) {
      return res.status(422).json({ message: "The email already exists" });
    }
    req.values = values;
    next();
  });
};

module.exports = validateBodyUpdate;
