import Query from "../models/Query.model.js";

// fonction pour créer une partie
export const createGame => {
    const card_count = difficulty_level*10;
    const time_limit = Math.floor(card_count * 60 / difficulty_level);

    modele.insert()

    try {
        const Query = `INSERT INTO games (user_id, score, start_date) VALUES (?, ?, NOW())`;
        const params = [req.body.user_id, req.body.score];
        Query.runWithParams(query, params);
        res.status(201).json({ message: "Game created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
