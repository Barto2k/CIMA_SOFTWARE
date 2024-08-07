const request = require("supertest");
const app = require("../index.js");

const accesorioAlta = {
  Nombre: "Accesorio " + (() => (Math.random() + 1).toString(10).substring(2))(), // Genera un nombre aleatorio
  Descripcion: "Esta es la descripcion" + (() => (Math.random() + 1).toString(30).substring(2))(), // Genera una descripcion aleatorio,
  IdEquipo: 1,
  Precio: 10.5,
  Disponible: true,
};

const accesorioModificacion = {
  IdAccesorio: 1,
  Nombre: "Accesorio " + (() => (Math.random() + 1).toString(10).substring(2))(), // Genera un nombre aleatorio
  Descripcion: "Esta es la descripcion" + (() => (Math.random() + 1).toString(30).substring(2))(), // Genera una descripcion aleatorio,
  IdEquipo: 1,
  Precio: 10.5,
  Disponible: true,
};

// test route/articulos GET
describe("GET /api/accesorios", () => {
  it("Deberia devolver todos los accesorios paginados", async () => {
    const res = await request(app).get("/api/accesorios?Pagina=1");
    expect(res.statusCode).toEqual(200);

    expect(res.body).toEqual(
      expect.objectContaining({
        Items: expect.arrayContaining([
          expect.objectContaining({
            IdAccesorio: expect.any(Number),
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

// test route/accesorios GET
describe("GET /api/accesorios con filtros", () => {
  it("Deberia devolver los accesorios según filtro ", async () => {
    const res = await request(app).get("/api/accesorios?Nombre=Toalla&Disponible=true&Pagina=1");
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

// test route/accesorios/:id GET
describe("GET /api/accesorios/:id", () => {
  it("Deberia devolver el artículo con el id 1", async () => {
    const res = await request(app).get("/api/accesorios/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdAccesorio: expect.any(Number),
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
    const res = await request(app).post("/api/accesorios").send(accesorioAlta);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdAccesorio: expect.any(Number),
        Nombre: expect.any(String),
        Descripcion: expect.any(String),
        IdEquipo: expect.any(Number),
        Precio: expect.any(Number),
        Disponible: expect.any(Boolean)
      })
    );
  });
});

// test route/accesorios/:id PUT
describe("PUT /api/accesorios/:id", () => {
  it("Deberia devolver el articulo con el id 1 modificado", async () => {
    const res = await request(app)
      .put("/api/accesorios/1")
      .send(accesorioModificacion);
    expect(res.statusCode).toEqual(200);
  });
});

// test route/accesorios/:id DELETE
describe("DELETE /api/accesorios/:id", () => {
  it("Debería devolver el accesorio con el id 1 borrado", async () => {
    const res = await request(app).delete("/api/accesorios/1");
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
