// configuration de base de mon serveur express

// dotenv doit être importé en haut du fichier pour garantir que les variables d'env sont disponible immédiatement
import "dotenv/config";
import { createRequire } from "module";

// fonctionnalités de base du server
import express from "express";
import session from "express-session";
// CORS permet les requêtes provenant de `http://localhost:5173`
import cors from "cors";

import pool from "./db/config.db.js";
import router from "./router/index.routes.js";

// createRequire permet de charger un module CommonJS dans un fichier ES6
// le module express-mysql-session n'est pas compatible ES6 donc on utilise createRequire pour le charger
const require = createRequire(import.meta.url);
// stocke les sessions dans mysql
const MySQLStore = require("express-mysql-session")(session);

const app = express();

const corsOptions = cors({
  origin: "http://localhost:5173", // url du frontend
  credentials: true,
});

const sessionStore = new MySQLStore(
  {
    clearExpired: true,
    checkExpirationInterval: 900000, // 15 min
    expiration: 3600000, // 1h
  },
  pool
);

const newSession = session({
  name: "session_id",
  secret: process.env.SECRET_SESSION || "default_secret", // utiliser une var d'env
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    secure: false,
    httpOnly: true,
    sameSite: "lax",
    maxAge: 3600000, // 1h
    domain: "localhost",
  },
  rolling: true,
});

app.use(corsOptions);
app.use(newSession);
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // utile pour parser les requêtes POST
app.use(express.static("public")); // pour servir les fichiers statics

app.use((req, res, next) => {
  console.log("MW", req.session);
  if (req.session.isAdmin) {
    console.log("Hello admin boy");
  } else {
    console.log("Hello user person");
  }
  next();
});

app.use(router);

const port = process.env.LOCAL_PORT || 5000; // fallback si LOCAL_PORT undifined
app.listen(port, () => {
  console.log(`My super server is now running on port ${port}`);
});
