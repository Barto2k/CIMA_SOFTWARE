const db = require("aa-sqlite");

async function CrearBaseSiNoExiste() {
    await db.open("./.data/utNBA.db");

    let existe = false;
    let res = null;
    // Tabla Usuarios
    res = await db.get(
      "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'usuarios'",
      []
    );
    if (res.contar > 0) existe = true;
    if (!existe) {
      await db.run(
        "CREATE table usuarios( IdUsuario INTEGER PRIMARY KEY AUTOINCREMENT, Nombre text NOT NULL UNIQUE, Clave text NOT NULL, Rol text NOT NULL);"
      );
      console.log("tabla usuarios creada!");
      await db.run(
        "insert into usuarios values	(1,'admin','123','admin'),(2,'agustin','44897919','member'), (3,'marco','45488175','member');"
      );
    }


    // Tabla equipos
    existe = false;
    res = await db.get(
      "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'equipos'",
      []
    );
    if (res.contar > 0) existe = true;
    if (!existe) {
      await db.run(
        "CREATE table equipos( IdEquipo INTEGER PRIMARY KEY AUTOINCREMENT, Nombre TEXT UNIQUE, Titulos INTEGER NOT NULL, FechaCreacion TEXT NOT NULL);"
      );
      console.log("tabla equipos creada!");
      await db.run(
        `INSERT INTO equipos (IdEquipo, Nombre, Titulos, FechaCreacion)
      VALUES (1, 'Los Angeles Lakers', 17, '1947-01-01'),
             (2, 'Boston Celtics', 17, '1946-06-06'),
             (3, 'Golden State Warriors', 7, '1946-01-01'),
             (4, 'Chicago Bulls', 6, '1966-01-26'),
             (5, 'San Antonio Spurs', 5, '1967-01-01'),
             (6, 'Miami Heat', 3, '1988-01-01'),
             (7, 'Detroit Pistons', 3, '1941-01-01'),
             (8, 'Philadelphia 76ers', 3, '1946-01-01'),
             (9, 'New York Knicks', 2, '1946-01-01'),
             (10, 'Houston Rockets', 2, '1967-01-01');`
      );
    }

    //Tabla zapatillasBasquet
    existe = false;
    res = await db.get(
      "SELECT count(*) as contar FROM sqlite_master WHERE type = 'table' and name= 'zapatillas'",
      []
    );
    if (res.contar > 0) existe = true;
    if (!existe) {
      await db.run(
        `CREATE TABLE zapatillas (
      IdZapatilla INTEGER PRIMARY KEY AUTOINCREMENT, 
      Marca TEXT, 
      Modelo TEXT, 
      IdEquipo INTEGER, 
      FechaLanzamiento TEXT, 
      Precio REAL, 
      Disponible BOOLEAN, 
      FOREIGN KEY (IdEquipo) REFERENCES equipos(IdEquipo)
    );`
      );
      console.log("tabla zapatillas creada!");
      await db.run(
        `INSERT INTO zapatillas (Marca, Modelo, IdEquipo, FechaLanzamiento, Precio, Disponible)
      VALUES 
        ('Nike', 'Air Zoom', 1, '2023-01-15', 120.00, 1),
        ('Adidas', 'Dame 7', 6, '2023-02-20', 130.00, 1),
        ('Puma', 'Melo 02', 7, '2023-03-10', 115.00, 0),
        ('Under Armour', 'Curry 8', 3, '2023-04-05', 125.00, 1),
        ('Reebok', 'Question Mid', 5, '2023-05-25', 110.00, 0),
        ('Nike', 'LeBron 18', 2, '2023-06-15', 140.00, 1),
        ('Adidas', 'Harden Vol. 5', 9, '2023-07-20', 135.00, 1),
        ('Nike', 'Kyrie 7', 8, '2023-08-10', 125.00, 0),
        ('Nike', 'Kobe 6', 10, '2023-09-05', 120.00, 1),
        ('Adidas', 'Drose 5', 4, '2023-10-25', 115.00, 0);`
      );
    }

    // Tabla Camisetas
    existe = false;
    res = await db.get(
      "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'camisetas'",
      []
    );
    if (res.contar > 0) existe = true;
    if (!existe) {
      await db.run(
        "CREATE table camisetas( IdCamiseta INTEGER PRIMARY KEY AUTOINCREMENT, IdEquipo INTEGER, Nombre TEXT, Dorsal INTEGER, Talle TEXT, Precio REAL, FechaElaboracion TEXT, Disponible BOOLEAN, FOREIGN KEY (IdEquipo) REFERENCES equipos(IdEquipo));"
      );
      console.log("tabla camisetas creada!");
      await db.run(
        `INSERT INTO camisetas (IdCamiseta, IdEquipo, Nombre, Dorsal, Talle, Precio, FechaElaboracion, Disponible)
      VALUES (1, 1, 'Lakers Home', 23, 'M', 75.00, '2023-01-01', 1),
             (2, 6, 'Heat Home', 3, 'L', 85.00, '2023-06-01', 1),
             (3, 7, 'Pistons City Edition', 11, 'M', 65.00, '2023-07-01', 0),
             (4, 3, 'Warriors Alternate', 30, 'S', 90.00, '2023-03-01', 1),
             (5, 5, 'Spurs Away', 21, 'M', 75.00, '2023-05-01', 1),
             (6, 2, 'Celtics City Edition', 33, 'L', 80.00, '2023-02-01', 1),
             (7, 4, 'Bulls Home', 23, 'XL', 70.00, '2023-04-01', 0),
             (8, 8, '76ers Home', 25, 'S', 70.00, '2023-08-01', 1),
             (9, 10, 'Rockets Away', 13, 'L', 75.00, '2023-10-01', 0),
             (10, 9, 'Knicks Alternate', 7, 'M', 80.00, '2023-09-01', 1);`
      );
    }

    // Tabla Gorras
    existe = false;
    res = await db.get(
      "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'gorras'",
      []
    );
    if (res.contar > 0) existe = true;
    if (!existe) {
      await db.run(
        "CREATE table gorras( IdGorra INTEGER PRIMARY KEY AUTOINCREMENT, IdEquipo INTEGER, Modelo TEXT, Precio REAL, FechaElaboracion TEXT, Disponible BOOLEAN);"
      );
      console.log("tabla gorras creada!");
      await db.run(
        `INSERT INTO gorras (IdGorra, IdEquipo, Modelo, Precio, FechaElaboracion, Disponible)
      VALUES (1, 1, 'Lakers Snapback', 25.00, '2023-01-01', 1),
             (2, 2, 'Celtics Fitted', 30.00, '2023-02-01', 1),
             (3, 3, 'Warriors Beanie', 20.00, '2023-03-01', 0),
             (4, 4, 'Bulls Cap', 28.00, '2023-04-01', 1),
             (5, 5, 'Spurs Trucker', 22.00, '2023-05-01', 0),
             (6, 6, 'Heat Snapback', 25.00, '2023-06-01', 1),
             (7, 7, 'Pistons Fitted', 30.00, '2023-07-01', 1),
             (8, 8, '76ers Beanie', 20.00, '2023-08-01', 0),
             (9, 9, 'Knicks Cap', 28.00, '2023-09-01', 1),
             (10, 10, 'Rockets Trucker', 22.00, '2023-10-01', 0);`
      );
    }

    // Tabla Pantalones
    existe = false;
    res = await db.get(
      "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'pantalones'",
      []
    );
    if (res.contar > 0) existe = true;
    if (!existe) {
      await db.run(
        "CREATE table pantalones( IdPantalon INTEGER PRIMARY KEY AUTOINCREMENT, Marca TEXT, Modelo TEXT, IdEquipo INTEGER, FechaLanzamiento TEXT, Precio REAL, Disponible BOOLEAN);"
      );
      console.log("tabla pantalones creada!");
      await db.run(
        `INSERT INTO pantalones (IdPantalon, Marca, Modelo, IdEquipo, FechaLanzamiento, Precio, Disponible)
      VALUES (1, 'Nike', 'Elite', 1, '2023-01-15', 80.00, 1),
             (2, 'Adidas', 'Pro Bounce', 2, '2023-02-20', 75.00, 1),
             (3, 'Under Armour', 'SC30', 3, '2023-03-10', 70.00, 0),
             (4, 'Puma', 'Clyde', 4, '2023-04-05', 85.00, 1),
             (5, 'Reebok', 'Vector', 5, '2023-05-25', 65.00, 0),
             (6, 'Nike', 'Therma Flex', 6, '2023-06-15', 90.00, 1),
             (7, 'Adidas', 'Tiro 19', 7, '2023-07-20', 80.00, 1),
             (8, 'Nike', 'Showtime', 8, '2023-08-10', 75.00, 0),
             (9, 'Under Armour', 'SC30 Essentials', 9, '2023-09-05', 70.00, 1),
             (10, 'Puma', 'Clyde Court', 10, '2023-10-25', 85.00, 0);`
      );
    }

    // Verificar si la tabla accesorios existe y crearla si no existe
    let existeAccesorios = await db.get(
      "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'accesorios'",
      []
    );
    if (existeAccesorios.contar === 0) {
      await db.run(
        "CREATE TABLE accesorios (IdAccesorio INTEGER PRIMARY KEY AUTOINCREMENT, Nombre TEXT, Descripcion TEXT, IdEquipo INTEGER, Precio REAL, Disponible BOOLEAN);"
      );
      console.log("Tabla accesorios creada!");
      await db.run(
        `INSERT INTO accesorios (IdAccesorio, Nombre, Descripcion, IdEquipo, Precio, Disponible)
     VALUES (1, 'Toalla Lakers', 'Toalla de microfibra con logo de los Lakers', 1, 15.00, 1),
            (2, 'Mochila Celtics', 'Mochila con diseño del equipo Celtics', 2, 30.00, 1),
            (3, 'Bufanda Warriors', 'Bufanda de lana con colores y logo de los Warriors', 3, 20.00, 0),
            (4, 'Botella termo Bulls', 'Botella de acero inoxidable con diseño de los Bulls', 4, 25.00, 1),
            (5, 'Gorra ajustable Spurs', 'Gorra ajustable con bordado de los Spurs', 5, 18.00, 1),
            (6, 'Gorra ajustable Knicks', 'Gorra ajustable con bordado de los Knicks', 9,  18.00, 1),
            (7, 'Bufanda Celtics', 'Bufanda de lana con colores y logo de los Celtics', 2, 20.00, 1),
            (8, 'Toalla Bulls', 'Toalla de microfibra con logo de los Bulls', 4, 15.00, 1),
            (9, 'Mochila Warriors', 'Mochila con diseño del equipo Warriors', 3, 30.00, 0),
            (10, 'Botella termo Lakers', 'Botella de acero inoxidable con diseño de los Lakers', 1, 25.00, 1);`
      );
      console.log("Registros insertados en la tabla accesorios.");
    }
    // cerrar la base
    db.close();
  }

CrearBaseSiNoExiste();

module.exports = CrearBaseSiNoExiste;

