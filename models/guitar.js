const mongoose = require("mongoose");

//Création du modèle pour upload une guitare
const guitarSchema = mongoose.Schema(
  {
    brand: { type: String, required: false },
    model: { type: String, required: false },
    type: { type: String, required: false },
    year: { type: Number, required: false },
    body_type: { type: String, required: false },
    body_wood: { type: String, required: false },
    neck_wood: { type: String, required: false },
    fretboard_wood: { type: String, required: false },
    pickups: { type: String, required: false },
    quantity: { type: String, required: false },
    description: { type: String, required: false },
    imageUrl: { type: Array, required: false },
  },
  {
    timestamps: true, // ajout des propriétés: date de création et de modification dans la base de données
  }
);

module.exports = mongoose.model("Guitares", guitarSchema);
