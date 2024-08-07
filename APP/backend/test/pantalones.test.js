const request = require("supertest");
const app = require("../index.js");

const pantalonesAlta = {
  Nombre: "pantalones " + (() => (Math.random() + 1).toString(10).substring(2))(), // Genera un nombre aleatorio
  Descripcion: "Esta es la descripcion" + (() => (Math.random() + 1).toString(30).substring(2))(), // Genera una descripcion aleatorio,
  IdEquipo: 1,
  Precio: 10.5,
  Disponible: true,
};

const pantalonesModificacion = {
  Idpantalones: 1,
  Nombre: "pantalones " + (() => (Math.random() + 1).toString(10).substring(2))(), // Genera un nombre aleatorio
  Descripcion: "Esta es la descripcion" + (() => (Math.random() + 1).toString(30).substring(2))(), // Genera una descripcion aleatorio,
  IdEquipo: 1,
  Precio: 10.5,
  Disponible: true,
};

// test route/articulos GET
describe("GET /api/pantaloness", () => {
  it("Deberia devolver todos los pantaloness paginados", async () => {
    const res = await request(app).get("/api/pantaloness?Pagina=1");
    expect(res.statusCode).toEqual(200);

    expect(res.body).toEqual(
      expect.objectContaining({
        Items: expect.arrayContaining([
          expect.objectContaining({
            Idpantalon: expect.any(Number),
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

// test route/pantaloness GET
describe("GET /api/pantaloness con filtros", () => {
  it("Deberia devolver los pantaloness según filtro ", async () => {
    const res = await request(app).get("/api/pantaloness?Nombre=Toalla&Disponible=true&Pagina=1");
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

// test route/pantaloness/:id GET
describe("GET /api/pantalones/:id", () => {
  it("Deberia devolver el artículo con el id 1", async () => {
    const res = await request(app).get("/api/pantaloness/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        Idpantalones: expect.any(Number),
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
    const res = await request(app).post("/api/pantaloness").send(pantalonesAlta);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        Idpantalones: expect.any(Number),
        Nombre: expect.any(String),
        Descripcion: expect.any(String),
        IdEquipo: expect.any(Number),
        Precio: expect.any(Number),
        Disponible: expect.any(Boolean)
      })
    );
  });
});

// test route/pantaloness/:id PUT
describe("PUT /api/pantalones/:id", () => {
  it("Deberia devolver el articulo con el id 1 modificado", async () => {
    const res = await request(app)
      .put("/api/pantalones/1")
      .send(pantalonesModificacion);
    expect(res.statusCode).toEqual(200);
  });
});

// test route/pantalones/:id DELETE
describe("DELETE /api/pantaloness/:id", () => {
  it("Debería devolver el pantalones con el id 1 borrado", async () => {
    const res = await request(app).delete("/api/pantalones/1");
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
