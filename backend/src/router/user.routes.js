
import express from "express";
import { UserController } from "../controllers/user.controller.js";
import { validationUserData } from "../middlewares/userValidation.middleware.js";

const router = express.Router();
const userController = new UserController();

// route pour créer un user avec validation
router.post("/", validationUserData, (req, res) => userController.createUser(req, res));

// route pour récupérer tous les users
router.get("/", (req, res) => userController.getAllUsers(req, res));

// route pour récupérer un user par ID
router.get("/:id", (req, res) => userController.getUserById(req, res));

// route pour maj un user par ID avec validation
router.put("/:id", validationUserData, (req, res) => userController.editUser(req, res));

// route pour supprimer un user par ID
router.delete("/:id", (req, res) => userController.deleteUser(req, res));

export default router;
