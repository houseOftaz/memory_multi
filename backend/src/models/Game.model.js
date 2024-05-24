// ce fichier contient les fonctions CRUD pour interagir avec la BDD


import dbConfig from "../db/config.db.js";

// create
export const createGame = (card_count,difficulty_level,label,moves_counter,time_limit) => {
    return new Promise((resolve, reject) => {
        const card_count = difficulty_level*10
        const time_limit = Math.floor(card_count * 60 / difficulty_level)
        const sql = "INSERT INTO game(card_count,difficulty_level,label,moves_counter,time_limit) \
                     VALUES(?,?,?,0,?)";
        const values = [card_count,difficulty_level,label,time_limit]
        dbConfig.query(sql, values, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

// read
export const getGameById = (gameId) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM games WHERE id = ?";
        dbConfig.query(sql, [gameId], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
    });
};

// update
export const updateGame = (gameId, game) => {
    return new Promise((resolve, reject) => {
        const sql = "UPDATE games SET user_id = ?, score = ?, start_date = NOW() WHERE id = ?";
        const values = [game.user_id, game.score, game.start_date]
        dbConfig.query(sql, [...values, gameId], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

// delete
export const deleteGame = (gameId) => {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM games WHERE id = ?";
        dbConfig.query(sql, [gameId], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};
