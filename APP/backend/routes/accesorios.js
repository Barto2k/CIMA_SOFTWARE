const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");
const auth = require("../seguridad/auth");

router.get("/api/accesorios", async (req, res) => {
  let where = {};
  if (req.query.nombre != undefined && req.query.nombre !== "") {
      where.nombre = {
          [Op.like]: "%" + req.query.nombre + "%",
      };
  }
  if (req.query.disponible != undefined && req.query.disponible !== "") {
      // true o false en el modelo, en base de datos es 1 o 0
      // convertir el string a booleano
      where.disponible = req.query.disponible === "true";
  }
  const pagina = req.query.pagina ?? 1;
  const tamañoPagina = 10;

  const { count, rows } = await db.accesorios.findAndCountAll({
      attributes: [
        "IdAccesorio",
        "Nombre",
        "Descripcion",
        "IdEquipo", // "IdEquipo" es el nombre del campo en la tabla
        "Precio",
        "Disponible",
      ],
      order: [["Nombre", "ASC"]],
      where,
      offset: (pagina - 1) * tamañoPagina,
      limit: tamañoPagina,
  });
  return res.json({ Items: rows, RegistrosTotal: count });
});

router.get("/api/accesorios/:id", async (req, res) => {
    let accesorio = await db.accesorios.findOne({
        attributes: [
            "IdAccesorio",
            "Nombre",
            "Descripcion",
            "IdEquipo",
            "Precio",
            "Disponible",
        ],
        where: { IdAccesorio: req.params.id},
    });
    res.json(accesorio);
});

router.post("/api/accesorios", async (req, res) => {
    try {
        let data = await db.accesorios.create({
            Nombre: req.body.Nombre,
            Descripcion: req.body.Descripcion,
            IdEquipo: req.body.IdEquipo,
            Precio: req.body.Precio,
            Disponible: req.body.Disponible,
        });
        res.status(200).json(data.dataValues); // devolvemos el registro agregado!
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(400).json(error.errors.map((e) => e.message));
        }
        return res.status(500).json(error.message);
    }
});

router.put("/api/accesorios/:id", async (req, res) => {
    try {
        let data = await db.accesorios.update({
            Nombre: req.body.Nombre,
            Descripcion: req.body.Descripcion,
            IdEquipo: req.body.IdEquipo,
            Precio: req.body.Precio,
            Disponible: req.body.Disponible,
        }, {
            where: { IdAccesorio: req.params.id },
        });
        res.status(200).json(data); // devolvemos el registro modificado!
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(400).json(error.errors.map((e) => e.message));
        }
        return res.status(500).json(error.message);
    }
});

router.delete("/api/accesorios/:id", async (req, res) => {
    let bajaFisica = false;
  
    if (bajaFisica === false) {
        // baja lógica
      try {
        let data = await db.sequelize.query(
          "UPDATE accesorios SET Disponible = case when Disponible = 1 then 0 else 1 end WHERE IdAccesorio = :IdAccesorio",
          {
            replacements: { IdAccesorio: +req.params.id },
          }
        );
        res.sendStatus(200);
      } catch (err) {
        if (err instanceof ValidationError) {
          // si son errores de validación, los devolvemos
          const messages = err.errors.map((x) => x.message);
          res.status(400).json(messages);
        } else {
          // si son errores desconocidos, los dejamos que los controle el middleware de errores
          throw err;
        }
      }
    }
  });

//------------------------------------
//-- SEGURIDAD ---------------------------
//------------------------------------

router.get(
    "/api/accesoriosJWT",
    auth.authenticateJWT,
    async function (req, res, next) {
      const { rol } = res.locals.user;
      if (rol !== "admin") {
        return res.status(403).json({ message: "usuario no autorizado!" });
      }
  
      let items = await db.accesorios.findAll({
        attributes: [
            "IdAccesorio",
            "Nombre",
            "Descripcion",
            "IdEquipo",
            "Precio",
            "Disponible",
        ],
        order: [["Nombre", "ASC"]],
      });
      res.json(items);
    }
  );
  

module.exports = router;