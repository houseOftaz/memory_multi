// ce fichier contient les fonctions CRUD pour interagir avec la BDD

import pool from "../db/config.db.js";

// create
export const createUser = (user) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO users (firstName, lastName, bio, avatar, email, password, token, birthDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        const values = [user.firstName, user.lastName, user.bio, user.avatar, user.email, user.password, user.token, user.birthDate];
        pool.query(sql, values, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

// read
export const getUserById = (userId) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM users WHERE id = ?";
        pool.query(sql, [userId], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
    });
};

// update
export const updateUser = (userId, user) => {
    return new Promise((resolve, reject) => {
        const sql = "UPDATE users SET firstName = ?, lastName = ?, nickName = ?, bio = ?, avatar = ?, email = ?, password = ?, token = ?, birthDate = ?, updateAt = NOW() WHERE id = ?";
        const values = [user.firstName, user.lastName, user.nickName, user.bio, user.avatar, user.email, user.password, user.token, user.birthDate, userId];
        pool.query(sql, values, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

// delete
export const deleteUser = (userId) => {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM users WHERE id = ?";
        pool.query(sql, [userId], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};
