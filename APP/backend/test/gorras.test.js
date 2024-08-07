const request = require("supertest");
const app = require("../index.js");

const gorraAlta = {
  Nombre: "gorra " + (() => (Math.random() + 1).toString(10).substring(2))(), // Genera un nombre aleatorio
  Descripcion: "Esta es la descripcion" + (() => (Math.random() + 1).toString(30).substring(2))(), // Genera una descripcion aleatorio,
  IdEquipo: 1,
  Precio: 10.5,
  Disponible: true,
};

const gorraModificacion = {
  Idgorra: 1,
  Nombre: "gorra " + (() => (Math.random() + 1).toString(10).substring(2))(), // Genera un nombre aleatorio
  Descripcion: "Esta es la descripcion" + (() => (Math.random() + 1).toString(30).substring(2))(), // Genera una descripcion aleatorio,
  IdEquipo: 1,
  Precio: 10.5,
  Disponible: true,
};

// test route/articulos GET
describe("GET /api/gorras", () => {
  it("Deberia devolver todos los gorras paginados", async () => {
    const res = await request(app).get("/api/gorras?Pagina=1");
    expect(res.statusCode).toEqual(200);

    expect(res.body).toEqual(
      expect.objectContaining({
        Items: expect.arrayContaining([
          expect.objectContaining({
            Idgorra: expect.any(Number),
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

// test route/gorras GET
describe("GET /api/gorras con filtros", () => {
  it("Deberia devolver los gorras según filtro ", async () => {
    const res = await request(app).get("/api/gorras?Nombre=Toalla&Disponible=true&Pagina=1");
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

// test route/gorras/:id GET
describe("GET /api/gorras/:id", () => {
  it("Deberia devolver el artículo con el id 1", async () => {
    const res = await request(app).get("/api/gorras/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        Idgorra: expect.any(Number),
        Nombre: expect.any(String),
        Descripcion: expect.any(String),
        IdEquipo: expect.any(Number),
        Precio: expect.any(Number),
        Disponible: expect.any(Boolean)
      })
    );
  });
});

// test route/articulos POST
describe("POST /api/acces", () => {
  it("Deberia devolver el articulo que acabo de crear", async () => {
    const res = await request(app).post("/api/gorras").send(gorraAlta);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        Idgorra: expect.any(Number),
        Nombre: expect.any(String),
        Descripcion: expect.any(String),
        IdEquipo: expect.any(Number),
        Precio: expect.any(Number),
        Disponible: expect.any(Boolean)
      })
    );
  });
});

// test route/gorras/:id PUT
describe("PUT /api/gorras/:id", () => {
  it("Deberia devolver el articulo con el id 1 modificado", async () => {
    const res = await request(app)
      .put("/api/gorras/1")
      .send(gorraModificacion);
    expect(res.statusCode).toEqual(200);
  });
});

// test route/gorras/:id DELETE
describe("DELETE /api/gorras/:id", () => {
  it("Debería devolver el gorra con el id 1 borrado", async () => {
    const res = await request(app).delete("/api/gorras/1");
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
