const request = require("supertest");
const app = require("../index.js");

const camisetaAlta = {
  Nombre: "camiseta " + (() => (Math.random() + 1).toString(10).substring(2))(), // Genera un nombre aleatorio
  Descripcion: "Esta es la descripcion" + (() => (Math.random() + 1).toString(30).substring(2))(), // Genera una descripcion aleatorio,
  IdEquipo: 1,
  Precio: 10.5,
  Disponible: true,
};

const camisetaModificacion = {
  Idcamiseta: 1,
  Nombre: "camiseta " + (() => (Math.random() + 1).toString(10).substring(2))(), // Genera un nombre aleatorio
  Descripcion: "Esta es la descripcion" + (() => (Math.random() + 1).toString(30).substring(2))(), // Genera una descripcion aleatorio,
  IdEquipo: 1,
  Precio: 10.5,
  Disponible: true,
};

// test route/articulos GET
describe("GET /api/camisetas", () => {
  it("Deberia devolver todos los camisetas paginados", async () => {
    const res = await request(app).get("/api/camisetas?Pagina=1");
    expect(res.statusCode).toEqual(200);

    expect(res.body).toEqual(
      expect.objectContaining({
        Items: expect.arrayContaining([
          expect.objectContaining({
            Idcamiseta: expect.any(Number),
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

// test route/camisetas GET
describe("GET /api/camisetas con filtros", () => {
  it("Deberia devolver los camisetas según filtro ", async () => {
    const res = await request(app).get("/api/camisetas?Nombre=Toalla&Disponible=true&Pagina=1");
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

// test route/camisetas/:id GET
describe("GET /api/camisetas/:id", () => {
  it("Deberia devolver el artículo con el id 1", async () => {
    const res = await request(app).get("/api/camisetas/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        Idcamiseta: expect.any(Number),
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
    const res = await request(app).post("/api/camisetas").send(camisetaAlta);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        Idcamiseta: expect.any(Number),
        Nombre: expect.any(String),
        Descripcion: expect.any(String),
        IdEquipo: expect.any(Number),
        Precio: expect.any(Number),
        Disponible: expect.any(Boolean)
      })
    );
  });
});

// test route/camisetas/:id PUT
describe("PUT /api/camisetas/:id", () => {
  it("Deberia devolver el articulo con el id 1 modificado", async () => {
    const res = await request(app)
      .put("/api/camisetas/1")
      .send(camisetaModificacion);
    expect(res.statusCode).toEqual(200);
  });
});

// test route/camisetas/:id DELETE
describe("DELETE /api/camisetas/:id", () => {
  it("Debería devolver el camiseta con el id 1 borrado", async () => {
    const res = await request(app).delete("/api/camisetas/1");
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
