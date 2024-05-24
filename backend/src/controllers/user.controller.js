import { ResponseStructure } from "../models/Response.model.js"
import { createUser, getUserById, updateUser, deleteUser } from "../models/User.model.js";
import bcrypt from "bcrypt";
import pool from "../db/config.db.js";

export class UserController {
    async getAllUsers(req, res) {
        try {
            const sql = "SELECT * FROM users";
            pool.query(sql, (err, results) => {
                if (err) {
                    return res.status(500).json(new ResponseStructure("Error", 500));
                }
                res.json(new ResponseStructure(users, 200));
            });
        } catch (error) {
            res.status(500).json(new ResponseStructure("Error", 500));
        }
    }

    async createUser(req, res) {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const user = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                bio: req.body.bio,
                avatar: req.body.avatar,
                email: req.body.email,
                password: hashedPassword,
                token: req.body.token,
                birthDate: req.body.birthDate
            };
            await createUser(user);
            res.json(new ResponseStructure("New user created", 201));
        } catch (error) {
            res.status(500).json(new ResponseStructure("Erro", 500));
        }
    }

    async editUser(req, res) {
        try {
            const user = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                bio: req.body.bio,
                avatar: req.body.avatar,
                email: req.body.email,
                password: hashedPassword,
                token: req.body.token,
                birthDate: req.body.birthDate
            };
            const result = await updateUser(req.params.id, user);
            if (result.affectedRows > 0) {
                res.json(new ResponseStructure(user, 200));
            } else {
                res.status(404).json(new ResponseStructure("User not found", 404));
            }
        } catch (error) {
            res.status(500).json(new ResponseStructure("Error", 500));
        }
    }

    async getUserById(req, res) {
        try {
            const user = await getUserById(req.params.id);
            if (user) {
                res.json(new ResponseStructure(user, 200));
            } else {
                res.status(404).json(new ResponseStructure("User not found", 404));
            }
        } catch (error) {
            res.status(500).json(new ResponseStructure("Error", 500));
        }
    }

    async deleteUser(req, res) {
        try {
            const result = await deleteUser(req.params.id);
            if (result) {
                res.json(new ResponseStructure("User deleted", 200));
            } else {
                res.status(404).json(new ResponseStructure("User not found", 404));
            }
        } catch (error) {
            res.status(500).json(new ResponseStructure("Error", 500));
        }
    }

    async login(req, res) {
        try {
            const sql = "SELECT * FROM users WHERE email = ?";
            pool.query(sql, [req.body.email], async (err, results) => {
                if (err) {
                    return res.status(404).json(new ResponseStructure("Error", 500));
                }
                if (results.length === 0) {
                    return res.status(404).json(new ResponseStructure("User not found", 404));
                }
                const user = results[0];
                const isValidPassword = await bcrypt.compare(req.body.password, user.password);
                if (!isValidPassword) {
                    return res.status(404).json(new ResponseStructure("", 404));
                }
                res.json(new ResponseStructure(user.token, 200));
            });
        } catch (error) {
            res.status(500).json(new ResponseStructure("Error", 500));
        }
    }
}
