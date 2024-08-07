const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");
const auth = require("../seguridad/auth");

router.get("/api/camisetas", async (req, res) => {
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

    const { count, rows } = await db.camisetas.findAndCountAll({
        attributes: [
            "IdCamiseta",
            "IdEquipo",
            "Nombre",
            "Dorsal",
            "Talle",
            "Precio",
            "FechaElaboracion",
            "Disponible",
        ],
        order: [["IdCamiseta", "ASC"]],
        where,
        offset: (pagina - 1) * tamañoPagina,
        limit: tamañoPagina,
    });
    return res.json({ Items: rows, RegistrosTotal: count });
});

router.get("/api/camisetas/:id", async (req, res) => {
    let camiseta = await db.camisetas.findOne({
        attributes: [
            "IdCamiseta",
            "IdEquipo",
            "Nombre",
            "Dorsal",
            "Talle",
            "Precio",
            "FechaElaboracion",
            "Disponible",
        ],
        where: { IdCamiseta: req.params.id },
    });
    res.json(camiseta);
});

router.post("/api/camisetas", async (req, res) => {
    try {
        const nuevaCamiseta = await db.camisetas.create(req.body);
        res.status(200).json(nuevaCamiseta);
    } catch (error) {
        console.error("Error al crear camiseta:", error); // Mejorando el logging de errores
        res.status(400).json({ error: error.message });
    }
});

router.post("/api/camisetas", async (req, res) => {
    try {
        const nuevaCamiseta = await db.camisetas.create(req.body);
        res.status(200).json(nuevaCamiseta);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put("/api/camisetas/:id", async (req, res) => {
    try {
        let data = await db.camisetas.update({
            IdEquipo: req.body.IdEquipo,
            Nombre: req.body.Nombre,
            Dorsal: req.body.Dorsal,
            Talle: req.body.Talle,
            Precio: req.body.Precio,
            FechaElaboracion: req.body.FechaElaboracion,
            Disponible: req.body.Disponible,
        }, {
            where: { IdCamiseta: req.params.id },
        });
        res.sendStatus(200);
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(400).json({ error: error.message });
        } else {
            throw error;
        }
    }
}
);

router.delete("/api/camisetas/:id", async (req, res) => {
    let bajaFisica = false;

    if (bajaFisica === false) {
        // baja lógica
        try {
            let data = await db.sequelize.query(
                "UPDATE camisetas SET Disponible = case when Disponible = 1 then 0 else 1 end WHERE IdCamiseta = :IdCamiseta",
                {
                    replacements: { IdCamiseta: +req.params.id },
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
    "/api/remerasJWT",
    auth.authenticateJWT,
    async function (req, res, next) {
        const { rol } = res.locals.user;
        if (rol !== "admin") {
            return res.status(403).json({ message: "usuario no autorizado!" });
        }

        let items = await db.remeras.findAll({
            attributes: [
                "IdCamiseta",
                "IdEquipo",
                "Nombre",
                "Dorsal",
                "Talle",
                "Precio",
                "FechaElaboracion",
                "Disponible",
            ],
            order: [["Nombre", "ASC"]],
        });
        res.json(items);
    }
);



module.exports = router;