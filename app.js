const express = require("express"); // importation du module express
const app = express(); // Création de l'application express
app.use(express.json()); // middleware pour extraire le corps des requêtes en format JSON
const connectDB = require("./db");
require("dotenv").config(); // Importation de la variable d'environnement
const path = require("path");

// const guitarsModel = require("./models/guitar");
// const multer = require("./middlewares/multer-config");

// Importation du rooting
const guitarRoutes = require("./routes/guitar"); // Importation des routes product

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

app.get("/", (req, res) => {
  res.json({ message: "Well done... Everything serve!" });
});

app.use("/guitars", guitarRoutes); // Enregistrement des routes guitars
app.use("/images", express.static(path.join(__dirname, "images"))); // Enregistrement des images

module.exports = app; // Export de l'application express
