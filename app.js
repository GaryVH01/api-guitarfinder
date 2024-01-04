const express = require("express"); // importation du module express
const app = express(); // Création de l'application express
app.use(express.json()); // middleware pour extraire le corps des requêtes en format JSON
const connectDB = require("./db");
require("dotenv").config(); // Importation de la variable d'environnement

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
  res.json({ message: "Hello from server!" });
});

module.exports = app; // Export de l'application express
