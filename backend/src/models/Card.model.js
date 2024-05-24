// ce fichier contient les fonctions CRUD pour interagir avec la BDD


import dbConfig from "../db/config.db";

// create
export const createCard = (card) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO users (value, style, theme) VALUES (?, ?, ?)";
        const values = [card.value, card.style, card.theme]
        dbConfig.query(sql, values, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    })
};

// read
export const getCardById = (cardId) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM cards WHERE id = ?";
        dbConfig.query(sql, [cardId], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
    });
};

// update
export const updateCard = (cardId, card) => {
    return new Promise((resolve, reject) => {
        const sql = "UPDATE cards SET value = ?, style = ?, updateAt = NOW() WHERE id = ?";
        const values = [card.value, card.style, card.theme]
        dbConfig.query(sql, values, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

// delete
export const deleteCard = (cardId) => {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM cards WHERE id = ?";
        dbConfig.query(sql, [cardId], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};
