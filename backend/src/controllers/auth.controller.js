// définit les controllers pour gérer les requêtes HTTP authentifications users

import bcrypt from "bcrypt";
import query from "../db/config.db.js";

// validation des entrées
const inputValidate = (username, password) => {
  const usernameRegex = /^[a-zA-Z0-9]+$/;
  const passwordMinLength = 8;

  if (!usernameRegex.test(username)) {
    throw new Error("Invalid username format");
  }

  if (password.length < passwordMinLength) {
    throw new Error("Password must be at least 8 characters long")
  }
};

// fonction d'inscription user
export const registerUser = async (req, res) => {
    const { username, password } = req.body;

    try {
      inputValidate(username, password);
      // check si user est dans la BDD
      const [existingUser] = await query("SELECT * FROM users WHERE username = ?", [username]);
      if (existingUser.length > 0) {
        return res.status(400).json({ message: "Username already exist" });
      }
      // hash le pswd avant stocke dans la BDD
      const hashedPassword = await bcrypt.hash(password, 10);
      // insère nouvel user dans la BDD
      await query("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword]);
      res.status(201).json({ message: "User registered successfully"});
    } catch (error) {
        console.error("Error registering user", error.message);
        if (error.message === "Invalid username format" || error.message === "Password must be at least 8 characters long") {
          res.status(400).json({ message: error.message });
        } else {
          res.status(500).json({ message: "Server error" });
        }
    }
};


// fonction de connexion user
export const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
      // Récupérer les données utilisateur à partir de la base de données
      const [user] = await query('SELECT * FROM users WHERE username = ?', [username]);
      if (user.length === 0) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
      // Vérifier si le mot de passe est correct
      const passwordMatch = await bcrypt.compare(password, user[0].password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
      // Si l'authentification réussit, stocker l'ID de l'utilisateur dans la session
      req.session.userId = user[0].id;
      res.status(200).json({ message: 'User logged in successfully' });
    } catch (error) {
      console.error('Error logging in user', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

// fonction de deconnexion user
export const logoutUser = (req, res) => {
    // destroy session to deco
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Server error" });
        }
        res.clearCookie("session_id");
        res.status(200).json({ message: "User logged out successfully" });
    });
};
