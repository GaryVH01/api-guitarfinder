const mongoose = require("mongoose");

//Création du modèle pour upload une guitare
const guitarSchema = mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  type: { type: String, required: true },
  year: { type: Number, required: true },
  body_type: { type: String, required: true },
  body_wood: { type: String, required: true },
  neck_wood: { type: String, required: true },
  fretboard_wood: { type: String, required: true },
  pickups: { type: String, required: true },
  quantity: { type: String, required: false },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

module.exports = mongoose.model("Guitares", guitarSchema);
