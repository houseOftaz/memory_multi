// contient les routes liées à la gestion des parties

import express from "express";
import { GameController } from "../controllers/game.controller.js";

const router = express.Router();
const gameController = new GameController();

// route pour créer une nouvelle partie
router.post("/create", (req, res) => gameController.createGame(req, res));

// route pour lister les parties non démarrées
router.get("/list", (req, res) => gameController.getAllGames(req, res));

// route pour récupérer l'état d'une partie par ID
router.get("/:id", (req, res) => gameController.getGameById(req, res));

// route pour supprimer une partie par ID
router.delete("/:id", (req, res) => gameController.deleteGame(req, res));

export default router;
