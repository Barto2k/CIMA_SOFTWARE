const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");
const auth = require("../seguridad/auth");

router.get("/api/zapatillas", async function (req, res, next) {
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

    const { count, rows } = await db.zapatillas.findAndCountAll({
        attributes: [
            "IdZapatilla",
            "Marca",
            "Modelo",
            "IdEquipo",
            "FechaLanzamiento",
            "Precio",
            "Disponible",
        ],
        order: [["Modelo", "ASC"]],
        where,
        offset: (pagina - 1) * tamañoPagina,
        limit: tamañoPagina,
    });
    return res.json({ Items: rows, RegistrosTotal: count });
});


router.get("/api/zapatillas/:id", async (req, res) => {
    let zapatilla = await db.zapatillas.findOne({
        attributes: [
            "IdZapatilla",
            "Marca",
            "Modelo",
            "IdEquipo",
            "FechaLanzamiento",
            "Precio",
            "Disponible",
        ],
        where: { IdZapatilla: req.params.id },
    });
    res.json(zapatilla);
});

router.post("/api/zapatillas", async (req, res) => {
    try {
        const nuevoZapatilla = await db.zapatillas.create(req.body);
        res.status(200).json(nuevoZapatilla);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    });

router.put("/api/zapatillas/:id", async (req, res) => {
    try {
        const [numFilasActualizadas, zapatillaActualizado] =
          await db.zapatillas.update(req.body, {
            where: { IdZapatilla: req.params.id },
            returning: true,
          });
        if (zapatillaActualizado === 1) {
          res.sendStatus(204);
        } else {
          res.status(404).json({ error: "Snickers no encontrado" });
        }
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    });

router.delete("/api/zapatillas/:id", async (req, res) => {
    let bajaFisica = false;

    if (bajaFisica === false) {
        // baja lógica
        try {
            let data = await db.sequelize.query(
                "UPDATE zapatillas SET Disponible = case when Disponible = 1 then 0 else 1 end WHERE IdZapatilla = :IdZapatilla",
                {
                    replacements: { IdZapatilla: +req.params.id },
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
    "/api/zapatillasJWT",
    auth.authenticateJWT,
    async function (req, res, next) {
        const { rol } = res.locals.user;
        if (rol !== "admin") {
            return res.status(403).json({ message: "usuario no autorizado!" });
        }

        let items = await db.zapatillas.findAll({
            attributes: [
                "IdZapatilla",
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
