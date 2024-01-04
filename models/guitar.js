const mongoose = require("mongoose");

//Création du modèle pour upload une guitare
const guitarSchema = mongoose.SchemaType({
  userId: { type: String, required: true },
  model: { type: String, reuired: true },
  type: { type: String, required: true, unique: true },
  year: { type: Number, required: true, unique: true },
  body_type: { type: String, required: true, unique: true },
  body_wood: { type: String, required: true, unique: true },
  neck_wood: { type: String, required: true, unique: true },
  fretboard_wood: { type: String, required: true, unique: true },
  pickups: { type: String, required: true, unique: true },
  quantity: { type: String, required: false, unique: false },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

module.exports = mongoose.model("Guitares", guitarSchema);
