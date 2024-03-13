const Guitar = require("../models/guitar"); // importation du modèle product
const fs = require("fs"); // permet de manipuler le système de fichiers pou la suppression des images

// Fonction pour créer une guitare
exports.createGuitar = (req, res) => {
  const guitar = new Guitar({
    id: Date.now(),
    ...req.body,
    // image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  });
  Guitar.create(guitar)
    .then(() => res.status(201).json({ message: "Guitare Créée !" }))
    .catch((error) => res.status(400).json({ error }));
};

//Fonction pour retrouver une guitare en particulier (GET)
exports.getOneGuitar = (req, res, next) => {
  Guitar.findOne({ id: req.params._id }) // Avec la méthode findOne on récupère un seule guitare grâce à son id
    .then((guitar) => res.status(200).json(guitar)) // On renvoie l'objet guitare
    .catch((error) => res.status(404).json({ error: error })); // Sinon on renvoie une erreur 404
};

// Fonction pour modifier une guitare (PUT)
//   exports.updateGuitar = (req, res) => {
//     const guitarObject = req.file // si la requête comprend un champ file =>
//       ? {
//           ...req.body, // on récupère l'objet requête avec l'URL de l'image
//           image: `${req.protocol}://${req.get("host")}/images/${
//             req.file.filename
//           }`,
//         }
//       : { ...req.body }; // Si aucun objet n'est transmit, on récupère l'objet du corps de la requête
//     console.log(guitarObject);
//     Guitar.findOne({ id: req.params.id }) // Récupération de l'objet dans la base de données
//       .then(() => {
//         Guitar.updateOne(
//           // Mise à jour du produit
//           { id: req.params.id },
//           { ...guitarObject, id: req.params.id }
//         )
//           .then(() => res.status(200).json({ message: "Guitare modifiée!" }))
//           .catch((error) => res.status(401).json({ error }));
//       })
//       .catch((error) => {
//         res.status(400).json({ error });
//       });
//   };

// Fonction pour modifier une guitare avec un PATCH (Même fonction que le PUT)
//   exports.patchGuitar = (req, res) => {
//     const guitarObject = req.file // si la requête comprend un champ file =>
//       ? {
//           ...req.body, // on récupère l'objet requête avec l'URL de l'image
//           image: `${req.protocol}://${req.get("host")}/images/${
//             req.file.filename
//           }`,
//         }
//       : { ...req.body }; // Si aucun objet n'est transmit, on récupère l'objet du corps de la requête
//     console.log(guitarObject);
//     Guitar.findOne({ id: req.params.id }) // Récupération de l'objet dans la base de données
//       .then(() => {
//         Guitar.updateOne(
//           // Mise à jour du produit
//           { id: req.params.id },
//           { ...guitarObject, id: req.params.id }
//         )
//           .then(() => res.status(200).json({ message: "Guitare modifiée!" }))
//           .catch((error) => res.status(401).json({ error }));
//       })
//       .catch((error) => {
//         res.status(400).json({ error });
//       });
//   };

// Fonction de suppression d'une guitare (DELETE)
exports.deleteGuitar = (req, res) => {
  Guitar.findOne({ id: req.params.id }) // On récupère l'objet dans la base de données
    .then((guitar) => {
      const filename = guitar.image.split("/images/")[1]; // on récupère l'url de l'image pour la supprimer
      fs.unlink(`images/${filename}`, () => {
        Guitar.deleteOne({ id: req.params.id }) // Puis on supprime le produit de la base de données
          .then(() => {
            res.status(200).json({ message: "Objet supprimé !" });
          })
          .catch((error) => {
            res.status(401).json({ error });
          });
      });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

// Fonction permettant de récupérer toutes les guitares (GET)
exports.getAllGuitars = (req, res) => {
  Guitar.find() // utilisation de la méthode find pour récupérer la liste complète des produits
    .then((product) => res.status(200).json(product)) // on renvoie le tableau de tous les produits
    .catch((error) => res.status(400).json({ error: error })); // sinon on renvoie une erreur 400
};
