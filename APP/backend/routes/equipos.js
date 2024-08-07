const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");

router.get("/api/equipos", async function (req, res, next) {
  let data = await db.equipos.findAll({
    attributes: [
      "IdEquipo",
      "Nombre",
      "Titulos",
      "FechaCreacion",
    ],
  });
  res.json(data);
});

module.exports = router;