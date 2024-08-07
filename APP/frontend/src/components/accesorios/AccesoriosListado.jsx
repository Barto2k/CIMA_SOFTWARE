import React from "react";
import moment from "moment";
import { useState, useEffect } from "react";

export default function AccesoriosListado({
  Accesorios,
  Consultar,
  Modificar,
  ActivarDesactivar,
  Pagina,
  RegistrosTotal,
  Paginas,
  Buscar,
}) {
  const [equipos, setEquipos] = useState([]);
  useEffect(function() {
    // Simulamos las llamadas a la API con datos estáticos por ahora
    setEquipos([
      { id: 1, nombre: 'Los Angeles Lakers' },
      { id: 2, nombre: 'Boston Celtics' },
      { id: 3, nombre: 'Golden State Warriors' },
      { id: 4, nombre: 'Chicago Bulls' },
      { id: 5, nombre: 'San Antonio Spurs' },
      { id: 6, nombre: 'Miami Heat' },
      { id: 7, nombre: 'Detroit Pistons' },
      { id: 8, nombre: 'Philadelphia 76ers' },
      { id: 9, nombre: 'New York Knicks' },
      { id: 10, nombre: 'Houston Rockets' },
    ]);
  }, []);

  function obtenerNombreEquipo(accesorio) {
    if (equipos.length === 0) {
      return 'Cargando equipos...';
    }
    const equipo = equipos.find(function(equipo) {
      return equipo.id === accesorio.IdEquipo;
    });
    return equipo ? equipo.nombre : 'No existe el equipo';
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover table-sm table-bordered table-striped">
        <thead>
          <tr>
            <th className="text-center">Nombre</th>
            <th className="text-center">Descripcion</th>
            <th className="text-center">Equipo</th>
            <th className="text-center">Precio</th>
            <th className="text-center">Disponible</th>
          </tr>
        </thead>
        <tbody>
          {Accesorios &&
            Accesorios.map((Item) => (
              <tr key={Item.IdAccesorio}>
                <td>{Item.Nombre}</td>
                <td className="text-end">{Item.Descripcion}</td>
                <td className="text-end">{obtenerNombreEquipo(Item)}</td>
                <td className="text-end">{Item.Precio}</td>
                <td style={{ backgroundColor: Item.Disponible ? 'green' : 'red' }} className="text-center" >{Item.Disponible ? "SI" : "NO"}</td>
                <td className="text-center text-nowrap">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    title="Consultar"
                    onClick={() => Consultar(Item)}
                  >
                    <i className="fa fa-eye"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    title="Modificar"
                    onClick={() => Modificar(Item)}
                  >
                    <i className="fa fa-pencil"></i>
                  </button>
                  <button
                    className={
                      "btn btn-sm " +
                      (Item.Disponible
                        ? "btn-outline-danger"
                        : "btn-outline-success")
                    }
                    title={Item.Disponible ? "Desactivar" : "Activar"}
                    onClick={() => ActivarDesactivar(Item)}
                  >
                    <i
                      className={"fa fa-" + (Item.Disponible ? "times" : "check")}
                    ></i>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Paginador*/}
      <div className="paginador">
        <div className="row">
          <div className="col">
            <span className="pyBadge">Registros: {RegistrosTotal}</span>
          </div>
          <div className="col text-center">
            Pagina: &nbsp;
            <select
              value={Pagina}
              onChange={(e) => {
                Buscar(e.target.value);
              }}
            >
              {Paginas?.map((x) => (
                <option value={x} key={x}>
                  {x}
                </option>
              ))}
            </select>
            &nbsp; de {Paginas?.length}
          </div>
        </div>
      </div>
    </div>
  );
}
