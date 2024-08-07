import React from "react";
import { useState, useEffect } from "react";

export default function CamisetasListado({
    Camisetas,
    Consultar,
    Modificar,
    ActivarDesactivar,
    Pagina,
    RegistrosTotal,
    Paginas,
    Buscar,
}) {
    const [equipos, setEquipos] = useState([]);
    useEffect(function () {
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

    function obtenerNombreEquipo(camisetas) {
        if (equipos.length === 0) {
            return 'Cargando equipos...';
        }
        const equipo = equipos.find(function (equipo) {
            return equipo.id === camisetas.IdEquipo;
        });
        return equipo ? equipo.nombre : 'No existe el equipo';
    }
    return (
        <div className="table-responsive">
            <table className="table table-hover table-sm table-bordered table-striped">
                <thead>
                    <tr>
                        <th className="text-center">Equipo</th>
                        <th className="text-center">Nombre</th>
                        <th className="text-center">Dorsal</th>
                        <th className="text-center">Talle</th>
                        <th className="text-center">Precio</th>
                        <th className="text-center">Fecha Elaboracion</th>
                        <th className="text-center">Disponible</th>
                        <th className="text-center text-nowrap">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {Camisetas &&
                        Camisetas.map((Camiseta) => (
                            <tr className="text-center" key={Camiseta.IdCamiseta}>
                                <td>{obtenerNombreEquipo(Camiseta)}</td>
                                <td>{Camiseta.Nombre}</td>
                                <td>{Camiseta.Dorsal}</td>
                                <td>{Camiseta.Talle}</td>
                                <td>{Camiseta.Precio}</td>
                                <td>{Camiseta.FechaElaboracion}</td>
                                <td style={{ backgroundColor: Camiseta.Disponible ? 'green' : 'red' }} className="text-center" >{Camiseta.Disponible ? "SI" : "NO"}</td>
                                <td className=" text-nowrap">
                                    <button
                                        className="btn btn-sm btn-outline-primary"
                                        title="Consultar"
                                        onClick={() => Consultar(Camiseta)}
                                    >
                                        <i className="fa fa-eye"></i>
                                    </button>
                                    <button
                                        className="btn btn-sm btn-outline-primary"
                                        title="Modificar"
                                        onClick={() => Modificar(Camiseta)}
                                    >
                                        <i className="fa fa-pencil"></i>
                                    </button>
                                    <button
                                        className={
                                            "btn btn-sm " +
                                            (Camiseta.Disponible
                                                ? "btn-outline-danger"
                                                : "btn-outline-success")
                                        }
                                        title={Camiseta.Disponible ? "Desactivar" : "Activar"}
                                        onClick={() => ActivarDesactivar(Camiseta)}
                                    >
                                        <i
                                            className={"fa fa-" + (Camiseta.Disponible ? "times" : "check")}
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
