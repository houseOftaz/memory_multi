// ce module doit utiliser le pool de connexion pour exécuter les requêtes SQL


import pool from "../db/config.db.js";

export class Query {
    static async runWithParams(query, params) {
        try {
            const [results] = await pool.query(query, params);
            return results;
        } catch (error) {
            throw error;
        }
    }
}
