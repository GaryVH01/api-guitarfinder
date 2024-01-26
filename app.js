const express = require("express"); // importation du module express
const app = express(); // Création de l'application express
app.use(express.json()); // middleware pour extraire le corps des requêtes en format JSON
const connectDB = require("./db");
require("dotenv").config(); // Importation de la variable d'environnement
const path = require("path");

const guitarsModel = require("./models/guitar");
const multer = require("./middlewares/multer-config");

const fs = require("fs"); // permet de modifier le système de fichiers (en autre pour gèrer la suppression des images en local)

//  Installation du package "cors" pour contourner les problèmes de CORS rencontrés lors des requêtes,
var cors = require("cors");
app.use(cors());

connectDB(); // connexion à la database

// Ajout des headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.get("/api", (req, res) => {
  res.json({ message: "Well done... Everything serve!" });
});

// fonction pour créer une guitare avec plusieurs images
app.post("/api/guitars", multer.array("image", 9999), (req, res, next) => {
  guitarsModel
    .create(req.body)
    .then(() =>
      res
        .status(201)
        .json({ result: true, message: "Guitar successfully created !" })
    )
    .catch((err) => res.json(err));
});

//fonction pour récupérer toutes les guitares
app.get("/api/guitars", (req, res, next) => {
  guitarsModel
    .find() // utilisation de la méthode find pour récupérer la liste complète des guitares
    .then((guitars) => res.status(200).json(guitars)) // on renvoie le tableau de toutes les guitares
    .catch((error) => res.status(400).json({ error: error })); // sinon on renvoie une erreur 400
});

module.exports = app; // Export de l'application express
