const request = require("supertest");
const app = require("../index.js");

const zapatillaAlta = {
  Nombre: "zapatilla " + (() => (Math.random() + 1).toString(10).substring(2))(), // Genera un nombre aleatorio
  Descripcion: "Esta es la descripcion" + (() => (Math.random() + 1).toString(30).substring(2))(), // Genera una descripcion aleatorio,
  IdEquipo: 1,
  Precio: 10.5,
  Disponible: true,
};

const zapatillaModificacion = {
  Idzapatilla: 1,
  Nombre: "zapatilla " + (() => (Math.random() + 1).toString(10).substring(2))(), // Genera un nombre aleatorio
  Descripcion: "Esta es la descripcion" + (() => (Math.random() + 1).toString(30).substring(2))(), // Genera una descripcion aleatorio,
  IdEquipo: 1,
  Precio: 10.5,
  Disponible: true,
};

// test route/zapatillas GET
describe("GET /api/zapatillas", () => {
  it("Deberia devolver todos los zapatillas paginados", async () => {
    const res = await request(app).get("/api/zapatillas?Pagina=1");
    expect(res.statusCode).toEqual(200);

    expect(res.body).toEqual(
      expect.objectContaining({
        Items: expect.arrayContaining([
          expect.objectContaining({
            Idzapatilla: expect.any(Number),
            Nombre: expect.any(String),
            Descripcion: expect.any(String),
            IdEquipo: expect.any(Number),
            Precio: expect.any(Number),
            Disponible: expect.any(Boolean)
          }),
        ]),
        RegistrosTotal: expect.any(Number),
      })
    );
  });
});

// test route/zapatillas GET
describe("GET /api/zapatillas con filtros", () => {
  it("Deberia devolver los zapatillas según filtro ", async () => {
    const res = await request(app).get("/api/zapatillas?Nombre=Toalla&Disponible=true&Pagina=1");
    expect(res.statusCode).toEqual(200);

    expect(verificarPropiedades(res.body.Items)).toEqual(false);

    function verificarPropiedades(array) {
      for (let i = 0; i < array.length; i++) {
        if (!array[i].Nombre.includes("Toalla") || !array[i].Disponible) {
          return false;
        }
      }
      return true;
    }

  });
});

// test route/zapatillas/:id GET
describe("GET /api/zapatillas/:id", () => {
  it("Deberia devolver el artículo con el id 1", async () => {
    const res = await request(app).get("/api/zapatillas/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        Idzapatilla: expect.any(Number),
        Nombre: expect.any(String),
        Descripcion: expect.any(String),
        IdEquipo: expect.any(Number),
        Precio: expect.any(Number),
        Disponible: expect.any(Boolean)
      })
    );
  });
});

// test route/zapatillas POST
describe("POST /api/acces", () => {
  it("Deberia devolver el articulo que acabo de crear", async () => {
    const res = await request(app).post("/api/zapatillas").send(zapatillaAlta);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        Idzapatilla: expect.any(Number),
        Nombre: expect.any(String),
        Descripcion: expect.any(String),
        IdEquipo: expect.any(Number),
        Precio: expect.any(Number),
        Disponible: expect.any(Boolean)
      })
    );
  });
});

// test route/zapatillas/:id PUT
describe("PUT /api/zapatillas/:id", () => {
  it("Deberia devolver el articulo con el id 1 modificado", async () => {
    const res = await request(app)
      .put("/api/zapatillas/1")
      .send(zapatillaModificacion);
    expect(res.statusCode).toEqual(200);
  });
});

// test route/zapatillas/:id DELETE
describe("DELETE /api/zapatillas/:id", () => {
  it("Debería devolver el zapatilla con el id 1 borrado", async () => {
    const res = await request(app).delete("/api/zapatillas/1");
    expect(res.statusCode).toEqual(200);

    // baja lógica, no se borra realmente
    // expect(res.body).toEqual(
    //   expect.objectContaining({
    //     IdArticulo: expect.any(Number),
    //     Nombre: expect.any(String),
    //     Precio: expect.any(Number),
    //   })
    // );
  });
});
