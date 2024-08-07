const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");
const auth = require("../seguridad/auth");

router.get("/api/pantalones", async function (req, res, next) {
  let where = {};
  if (req.query.modelo != undefined && req.query.modelo !== "") {
      where.modelo = {
          [Op.like]: "%" + req.query.modelo + "%",
      };
  }
  if (req.query.disponible != undefined && req.query.disponible !== "") {
      // true o false en el modelo, en base de datos es 1 o 0
      // convertir el string a booleano
      where.disponible = req.query.disponible === "true";
  }
  const pagina = req.query.pagina ?? 1;
  const tamañoPagina = 10;

  const { count, rows } = await db.pantalones.findAndCountAll({
      attributes: [
        "IdPantalon",
        "Marca",
        "Modelo",
        "IdEquipo",
        "FechaLanzamiento",
        "Precio",
        "Disponible",
      ],
      order: [["IdPantalon", "ASC"]],
      where,
      offset: (pagina - 1) * tamañoPagina,
      limit: tamañoPagina,
  });
  return res.json({ Items: rows, RegistrosTotal: count });
});

router.get("/api/pantalones/:id", async (req, res) => {
    let pantalon = await db.pantalones.findOne({
        attributes: [
            "IdPantalon",
            "Marca",
            "Modelo",
            "IdEquipo",
            "FechaLanzamiento",
            "Precio",
            "Disponible",
        ],
        where: { IdPantalon: req.params.id },
        });
        res.json(pantalon);
    });

router.post("/api/pantalones", async (req, res) => {
  try {
    const nuevoPantalon = await db.pantalones.create(req.body);
    res.status(200).json(nuevoPantalon);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/api/pantalones/:id", async (req, res) => {
  try {
    const [numFilasActualizadas, pantalonActualizado] =
      await db.pantalones.update(req.body, {
        where: { IdPantalon: req.params.id },
        returning: true,
      });
    if (pantalonActualizado === 1) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: "Pantalon no encontrado" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/api/pantalones/:id", async (req, res) => {
    let bajaFisica = false;
  
    if (bajaFisica === false) {
        // baja lógica
      try {
        let data = await db.sequelize.query(
          "UPDATE pantalones SET Disponible = case when Disponible = 1 then 0 else 1 end WHERE IdPantalon = :IdPantalon",
          {
            replacements: { IdPantalon: +req.params.id },
          }
        );
        res.sendStatus(200);
      } catch (err) {
        if (err instanceof ValidationError) {
          // si son errores de validación, los devolvemos
          const messages = err.errors.map((x) => x.message);
          res.status(400).json(messages);
        } else {
          throw err;
        }
      }
    }
  });
  

//------------------------------------
//-- SEGURIDAD ---------------------------
//------------------------------------

router.get(
    "/api/pantalonesJWT",
    auth.authenticateJWT,
    async function (req, res, next) {
      const { rol } = res.locals.user;
      if (rol !== "admin") {
        return res.status(403).json({ message: "usuario no autorizado!" });
      }
  
      let items = await db.pantalones.findAll({
        attributes: [
            "IdPantalon",
            "Marca",
            "Modelo",
            "IdEquipo",
            "FechaLanzamiento",
            "Precio",
            "Disponible",
        ],
        order: [["Modelo", "ASC"]],
      });
      res.json(items);
    }
  );
  
  module.exports = router;
  