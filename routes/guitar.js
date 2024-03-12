const express = require("express");
const router = express.Router();
const multer = require("../middlewares/multer-config");

// Importation des controllers pour l'implémentation du CRUD
const guitarCtrl = require("../controllers/guitar");

// Implémentation du CRUD : Routes POST/GET/PUT/DELETE
router.get("/", guitarCtrl.getAllGuitars);
router.post("/", multer, guitarCtrl.createGuitar);
router.get("/:id", guitarCtrl.getOneGuitar);
// router.put("/:id", multer, guitarCtrl.updateGuitar);
// router.delete("/:id", guitarCtrl.deleteGuitar);
// router.patch("/:id", multer, guitarCtrl.patchGuitar);

// Exportationd des routes
module.exports = router;
