const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite:" + "./.data/utNBA.db");

// definicion del modelo de datos

const usuarios = sequelize.define(
  "usuarios",
  {
    IdUsuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING(15),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nombre es requerido",
        },
        len: {
          args: [2, 15],
          msg: "Nombre debe ser tipo caracteres, entre 2 y 15 de longitud",
        },
      }
    },
    Rol: {
      type: DataTypes.STRING(8),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Descripcion es requerido",
        },
        len: {
          args: [0, 8],
          msg: "Descripcion debe ser tipo caracteres, entre 0 y 8 de longitud",
        },
      }
    },
    // desactivar timestamps automáticos
    timestamps: false,
  });


const accesorios = sequelize.define(
  "accesorios",
  {
    IdAccesorio: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nombre es requerido",
        },
        len: {
          args: [2, 60],
          msg: "Nombre debe ser tipo caracteres, entre 2 y 60 de longitud",
        },
      }
    },
    Descripcion: {
      type: DataTypes.STRING(300),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Descripcion es requerido",
        },
        len: {
          args: [5, 300],
          msg: "Descripcion debe ser tipo caracteres, entre 5 y 300 de longitud",
        },
      }
    },
    IdEquipo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "IdEquipo es requerido",
        }
      }
    },
    Precio: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Precio es requerido",
        }
      }
    },
    Disponible: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Disponible es requerido",
        }
      }
    },
  },
  {
    // desactivar timestamps automáticos
    timestamps: false,
  });

const camisetas = sequelize.define(
  "camisetas",
  {
    IdCamiseta: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    IdEquipo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "IdEquipo es requerido",
        }
      }
    },
    Nombre: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nombre es requerido",
        },
        len: {
          args: [5, 60],
          msg: "Nombre debe ser tipo caracteres, entre 5 y 60 de longitud",
        },
      }
    },
    Dorsal: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Dorsal es requerido",
        }
      }
    },
    Talle: {
      type: DataTypes.STRING(2),
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Talle es requerido",
        }
      }
    },
    Precio: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Precio es requerido",
        }
      }
    },
    FechaElaboracion: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Fecha de elaboracion es requerido",
        }
      }
    },
    Disponible: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Disponible es requerido",
        }
      }
    },
  },
  {
    // desactivar timestamps automáticos
    timestamps: false,
  }
);

const gorras = sequelize.define(
  "gorras",
  {
    IdGorra: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    IdEquipo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "IdEquipo es requerido",
        }
      }
    },
    Modelo: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Modelo es requerido",
        },
        len: {
          args: [5, 60],
          msg: "Modelo debe ser tipo caracteres, entre 5 y 60 de longitud",
        },
      }
    },
    Precio: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Precio es requerido",
        }
      }
    },
    FechaElaboracion: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Fecha de elaboracion es requerido",
        }
      }
    },
    Disponible: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Disponible es requerido",
        }
      }
    },
  },
  {
    // desactivar timestamps automáticos
    timestamps: false,
  }
);

const pantalones = sequelize.define(
  "pantalones",
  {
    IdPantalon: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Marca: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Marca es requerido",
        },
        len: {
          args: [0, 20],
          msg: "Marca debe ser tipo caracteres, entre 0 y 20 de longitud",
        },
      }
    },
    Modelo: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Modelo es requerido",
        },
        len: {
          args: [0, 60],
          msg: "Modelo debe ser tipo caracteres, entre 0 y 60 de longitud",
        },
      }
    },
    IdEquipo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "IdEquipo es requerido",
        }
      }
    },
    FechaLanzamiento: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Fecha de lanzamiento es requerido",
        }
      }
    },
    Precio: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Precio es requerido",
        }
      }
    },
    Disponible: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Disponible es requerido",
        }
      }
    },
  },
  {
    // desactivar timestamps automáticos
    timestamps: false,
  }
);

const equipos = sequelize.define(
  "equipos",
  {
    IdEquipos: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nombre es requerido",
        },
        len: {
          args: [5, 60],
          msg: "Nombre debe ser tipo caracteres, entre 5 y 60 de longitud",
        },
      }
    },
    Titulos: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Titulos es requerido",
        }
      }
    },
    FechaCreacion: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Fecha de creacion es requerido",
        }
      }
    },
  },
  {
    // desactivar timestamps automáticos
    timestamps: false,
  }
);

const zapatillas = sequelize.define(
  "zapatillas",
  {
    IdZapatilla: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Marca: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Marca es requerido",
        },
        len: {
          args: [0, 20],
          msg: "Marca debe ser tipo caracteres, entre 0 y 20 de longitud",
        },
      }
    },
    Modelo: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Modelo es requerido",
        },
        len: {
          args: [3, 60],
          msg: "Modelo debe ser tipo caracteres, entre 3 y 60 de longitud",
        },
      }
    },
    IdEquipo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "IdEquipo es requerido",
        }
      }
    },
    FechaLanzamiento: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Fecha de lanzamiento es requerido",
        }
      }
    },
    Precio: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Precio es requerido",
        }
      }
    },
    Disponible: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Disponible es requerido",
        }
      }
    },
  },
  {
    // desactivar timestamps automáticos
    timestamps: false,
  });

// deficion de las relaciones
accesorios.belongsTo(equipos, { foreignKey: "IdEquipo" });
camisetas.belongsTo(equipos, { foreignKey: "IdEquipo" });
gorras.belongsTo(equipos, { foreignKey: "IdEquipo" });
pantalones.belongsTo(equipos, { foreignKey: "IdEquipo" });
zapatillas.belongsTo(equipos, { foreignKey: "IdEquipo" });

module.exports = {
  sequelize,
  accesorios,
  camisetas,
  gorras,
  pantalones,
  equipos,
  zapatillas,
};
