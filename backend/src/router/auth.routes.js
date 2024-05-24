/*
contient les routes liées a l'authentification,
modification du profil user,
récupération des informations users
*/

import express from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

export default router;
