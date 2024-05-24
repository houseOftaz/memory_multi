// router principal, regroupe toutes les routes de mon app et import les routes spécifiques de chaque module

import express from "express";

import authRoutes from "./auth.routes.js";
import gameRoutes from "./game.routes.js";
import userRoutes from "./user.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/game", gameRoutes);
router.use("/user", userRoutes);

export default router;
