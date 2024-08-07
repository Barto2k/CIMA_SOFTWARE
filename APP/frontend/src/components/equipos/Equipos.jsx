import React, { useState, useEffect } from "react";
import moment from "moment";
import EquiposBuscar from "./EquiposBuscar";
import EquiposListado from "./EquiposListado";
import EquiposRegistro from "./EquiposRegistro";
import modalDialogService from "../../services/modalDialog.service";
import { equiposService } from "../../services/equipos.service";

function Equipos() {
  const TituloAccionABMC = {
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");

  const [Nombre, setNombre] = useState("");

  const [Equipos, setEquipos] = useState(null);
  const [Equipo, setEquipo] = useState(null); // usado en BuscarporId (Modificar, Consultar)
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Pagina, setPagina] = useState(1);
  const [Paginas, setPaginas] = useState([]);

  // cargar al "montar" el componente, solo la primera vez (por la dependencia [])
 useEffect(() => {
   async function BuscarEquipos() {
     let data = await equiposService.Buscar();
     setEquipos(data);
   }
   BuscarEquipos();
 }, []);
//
//  async function Buscar() {
//
//    modalDialogService.BloquearPantalla(true);
//    const data = await equiposService.Buscar(Nombre);
//    modalDialogService.BloquearPantalla(false);
//
//    setEquipos(data.Equipos);
//    setRegistrosTotal(data.RegistrosTotal);
//
//  }

 //  function Consultar(Equipo) {
 //    BuscarPorId(Equipo, "C"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
 //  }
  //  function Modificar(Equipo) {
  //    BuscarPorId(Equipo, "M"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  //  }

  //  async function Agregar() {
  //    setAccionABMC("A");
  //    setEquipo({
  //      IdEquipo: 0,
  //      Nombre: '',
  //      Titulos: 0,
  //      FechaCreacion: 'YYYY-MM-DD',
  //    });
  //    alert("preparando el Alta...");
  //  }

  //  async function Eliminar(Equipo) {
  //    modalDialogService.Confirm(
  //      "Esta seguro que quiere eliminar el equipo?",
  //      undefined,
  //      undefined,
  //      undefined,
  //      async () => {
  //        await equiposService.Eliminar(Equipo);
  //        await Buscar();
  //      }
  //    );
  //  }

  //  async function Grabar(Equipo) {
  //    // agregar o modificar
  //    try {
  //      await equiposService.Grabar(Equipo);
  //    }
  //    catch (error) {
  //      alert(error?.response?.data?.message ?? error.toString())
  //      return;
  //    }
  //    await Buscar();
  //    Volver();
//
  //    setTimeout(() => {
  //      alert(
  //        "Registro " +
  //        (AccionABMC === "A" ? "agregado" : "modificado") +
  //        " correctamente."
  //      );
  //    }, 0);
  //  }


    // Volver/Cancelar desde Agregar/Modificar/Consultar
  // function Volver() {
  //   setAccionABMC("L");
  // }

    return (
      <div>
        <div className="tituloPagina">
          Equipos <small>{TituloAccionABMC[AccionABMC]}</small>
        </div>



        {AccionABMC === "L" && Equipos?.length > 0 &&
          <EquiposListado
            {...{
              Equipos,
              RegistrosTotal,
            }}
          />
        }


        {AccionABMC === "L" && Equipos?.length === 0 &&
          <div className="alert alert-info mensajesAlert">
            <i className="fa fa-exclamation-sign"></i>
            No se encontraron registros...
          </div>
        }
      </div>
  
    );
  }

  export { Equipos };

