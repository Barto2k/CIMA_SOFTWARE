import React from "react";
import moment from "moment";

export default function EquiposListado({
  Equipos,
  RegistrosTotal,
}) {
  return (
    <div className="table-responsive">
      <table className="table table-hover table-sm table-bordered table-striped">
        <thead>
          <tr>
            <th className="text-center">Nombre</th>
            <th className="text-center">Titulos</th>
            <th className="text-center">Fecha de Creacion</th>
          </tr>
        </thead>
        <tbody>
          {Equipos &&
            Equipos.map((Equipo) => (
              <tr className="text-center" key={Equipo.IdEquipo}>
                <td>{Equipo.Nombre}</td>
                <td >{Equipo.Titulos}</td>
                <td >{Equipo.FechaCreacion}</td>
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
        </div>
      </div>
    </div>
  );
}
