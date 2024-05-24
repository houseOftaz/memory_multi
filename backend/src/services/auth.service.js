import bcrypt from "bcrypt";
import Query from "../models/Query.model.js";

// Fonction d'inscription
export const register = async (req, res) => {
	try {
		// Récupérer les données de l'utilisateur depuis la requête
		const query1 = `SELECT * FROM user WHERE nickname = ?`;
		// Vérifier si l'utilisateur existe déjà dans la base de données
		const existingUser = await Query.runWithParams(query1, [req.body.nickname]);
		if (existingUser.length) {
			// code 409 pour indiquer un conflit
			return res.status(409).json({ message: "User already exists" });
		}
		// si l'utilisateur n'existe pas, on peut l'ajouter en BDD
		const query2 = `INSERT INTO user (nickname, password, creationDate) VALUES (?, ?, NOW())`;
		// Hasher le mot de passe avant de le sauvegarder dans la base de données
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		// Sauvegarder le nouvel utilisateur dans la base de données
		await Query.runWithParams(query2, [req.body.nickname, hashedPassword]);
		res.status(201).json({ message: "Succeed inscription" });
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

// Fonction de connexion
export const login = async (req, res) => {
	try {
		// Récupérer les données de l'utilisateur depuis la requête
		const query = `SELECT * FROM user WHERE nickname = ?`;
		const [user] = await Query.runWithParams(query, [req.body.nickname]);
		// Vérifier si l'utilisateur existe dans la base de données
		// Comparer le mot de passe fourni avec celui stocké dans la base de données
		if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
			return res.status(401).json({ message: "Incorrect informations" });
		}
		// Sauvegarder les informations de l'utilisateur dans la session
		req.session.user = {
			nickname: user.nickname,
            isAdmin : user.isAdmin
			// Ajoutez d'autres informations de l'utilisateur si nécessaire
		};
		res.status(200).json({ message: "Succeed to connect" });
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const logout = async (req, res) => {   
    req.session.destroy((err) => {
        if(err){
            return res.status(500).json({message: "Server error"});
        }
        res.clearCookie("session_id");
        res.status(200).json({message: "Succeed logout"});
    });
};
