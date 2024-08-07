const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");
const auth = require("../seguridad/auth");

router.get("/api/gorras", async (req, res) => {
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

    const { count, rows } = await db.gorras.findAndCountAll({
        attributes: [
            "IdGorra",
            "IdEquipo",
            "Modelo",
            "Precio",
            "FechaElaboracion",
            "Disponible",
        ],
        order: [["Modelo", "ASC"]],
        where,
        offset: (pagina - 1) * tamañoPagina,
        limit: tamañoPagina,
    });
    return res.json({ Items: rows, RegistrosTotal: count });
});

router.get("/api/gorras/:id", async (req, res) => {
    let gorra = await db.gorras.findOne({
        attributes: [
            "IdGorra",
            "IdEquipo",
            "Modelo",
            "Precio",
            "FechaElaboracion",
            "Disponible",
        ],
        where: { IdGorra: req.params.id },
    });
    res.json(gorra);
});

router.post("/api/gorras", async (req, res) => {
    try {
        const nuevaGorra = await db.gorras.create(req.body);
        res.status(200).json(nuevaGorra);
    } catch (error) {
        res.status(400).json({ error: error.message });
    } '0'
});

router.put("/api/gorras/:id", async (req, res) => {
    try {
        const [numFilasActualizadas, gorraActualizada] =
            await db.gorras.update(req.body, {
                where: { IdGorra: req.params.id },
                returning: true,
            });
        if (gorraActualizada === 1) {
            res.sendStatus(204);
        } else {
            res.status(500).json({ error: error.message });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete("/api/gorras/:id", async (req, res) => {
    let bajaFisica = false;

    if (bajaFisica === false) {
        // baja lógica
        try {
            let data = await db.sequelize.query(
                "UPDATE gorras SET Disponible = case when Disponible = 1 then 0 else 1 end WHERE IdGorra = :IdGorra",
                {
                    replacements: { IdGorra: +req.params.id },
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
    "/api/gorrasJWT",
    auth.authenticateJWT,
    async function (req, res, next) {
        const { rol } = res.locals.user;
        if (rol !== "admin") {
            return res.status(403).json({ message: "usuario no autorizado!" });
        }

        let items = await db.gorras.findAll({
            attributes: [
                "IdGorra",
                "Modelo",
                "IdEquipo",
                "FechaElaboracion",
                "Precio",
                "Disponible",
            ],
            order: [["Modelo", "ASC"]],
        });
        res.json(items);
    }
);

module.exports = router;
