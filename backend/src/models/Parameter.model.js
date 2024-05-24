// ce fichier contient les fonctions CRUD pour interagir avec la BDD


import pool from "../db/config.db";

// create
export const createUser = (parameter) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO parameters (difficulty_level, card_count, time_limit, chrono) VALUES (?, ?, ?, ?)";
        const values = [parameter.difficulty_level, parameter.card_count, parameter.time_limit, parameter.chrono]
        pool.query(sql, values, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    })
};

// read
export const getParameterById = (parameterId) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM parameters WHERE id = ?";
        pool.query(sql, [parameterId], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
    });
};

// update
export const updateUser = (parameterId, parameter) => {
    return new Promise((resolve, reject) => {
        const sql = "UPDATE parameter SET difficulty_level = ?, card_count = ?, time_limit = ?, chrono = ?";
        const values = [parameter.difficulty_level, parameter.card_count, parameter.time_limit, parameter.chrono];
        pool.query(sql, values, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

// delete
export const deleteParameter = (parameterId) => {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM users WHERE id = ?";
        pool.query(sql, [parameterId], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};
