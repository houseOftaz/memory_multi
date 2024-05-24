import Query from "../models/Query.model.js";

// fonction pour créer une partie
export const createUser = async (req, res) => {
    try {
        const Query = `INSERT INTO users (firstName, lastName, nickName, bio, avatar, email, password, token, birthDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const params = [user.firstName, user.lastName, user.nickName, user.bio, user.avatar, user.email, user.password, user.token, user.birthDate, userId];
        await Query.runWithParams(query, params);
        res.status(201).json({ message: "Game created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
