import { ResponseStructure } from "../models/Response.model.js";
import { createGame, getGameById, deleteGame } from "../models/Game.model.js";

export class GameController {
    async getAllGames(req, res) {
        try {
            const sql = "SELECT * FROM games";
            dbConfig.query(sql, (err, results) => {
                if (err) {
                    res.status(500).json(new ResponseStructure("Error", 500));
                }
                res.json(new ResponseStructure(games, 200));
            });
        } catch (error) {
            res.status(500).json(new ResponseStructure("Error", 500));
        }
    }

    async createGame(req, res) {
        try {
            const game = {
                label: req.body.label,
                difficulty_level: req.body.difficulty_level
            }
            await createGame(game);
            res.json(new ResponseStructure('New game created', 201));
        } catch (error) {
            res.status(500).json(new ResponseStructure("Error", 500));
        }
    }

    async getGameById(req, res) {
        try {
            const game = await getGameById(req.params.id);
            if (game) {
                res.json(new ResponseStructure(game, 200));
            } else {
                res.status(404).json(new ResponseStructure("Game not found", 404));
            }
        } catch (eror) {
            res.status(500).json(new ResponseStructure("Error", 500));
        }
    };

    async deleteGame(req, res) {
        try {
            const result = await deleteGame(req.params.id);
            if (result.affectedRow > 0) {
                res.json(new ResponseStructure("Game deleted", 200));
            } else {
                res.status(404).json(new ResponseStructure("Game not found", 404));
            }
        } catch (error) {
            res.status(500).json(new ResponseStructure("Error", 500));
        };
    };
};

