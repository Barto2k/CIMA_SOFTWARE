import React, { useState, useEffect } from "react";
import modalDialogService from "../../services/modalDialog.service";
import { camisetasService } from "../../services/camisetas.service";
import CamisetasBuscar from "./CamisetasBuscar";
import CamisetasListado from "./CamisetasListado";
import CamisetasRegistro from "./CamisetasRegistro";

function Camisetas() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");
  const [Nombre, setNombre] = useState("");
  const [Disponible, setDisponible] = useState("");
  const [Camisetas, setCamisetas] = useState(null);
  const [Camiseta, setCamiseta] = useState(null);
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Pagina, setPagina] = useState(1);
  const [Paginas, setPaginas] = useState([]);

  useEffect(() => {
    async function BuscarCamisetas() {
      let data = await camisetasService.Buscar(Nombre, Disponible, Pagina);
      setCamisetas(data.Items);
    }
    BuscarCamisetas();
  }, []);

  async function Buscar(_pagina) {
    if (_pagina && _pagina !== Pagina) {
      setPagina(_pagina);
    }
    // OJO Pagina (y cualquier estado...) se actualiza para el proximo render, para buscar usamos el parametro _pagina
    else {
      _pagina = Pagina;
    }
    modalDialogService.BloquearPantalla(true);
    const data = await camisetasService.Buscar(Nombre, Disponible, _pagina);
    modalDialogService.BloquearPantalla(false);
    setCamisetas(data.Items);
    setRegistrosTotal(data.RegistrosTotal);


    //generar array de las paginas para mostrar en select del paginador
    const arrPaginas = [];
    for (let i = 1; i <= Math.ceil(data.RegistrosTotal / 10); i++) {
      arrPaginas.push(i);
    }
    setPaginas(arrPaginas);
  }

  async function BuscarPorId(camiseta, accionABMC) {
    const data = await camisetasService.BuscarPorId(camiseta);
    setCamiseta(data);
    setAccionABMC(accionABMC);
  }


  function Consultar(camiseta) {
    BuscarPorId(camiseta, "C"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }
  function Modificar(camiseta) {
    if (!camiseta.Disponible) {
      modalDialogService.Alert("No puede modificarse un registro Inactivo.");
      return;
    }
    BuscarPorId(Camisetas, "M"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }

  async function Agregar() {
    setAccionABMC("A");
    setCamiseta({
      IdCamiseta: 0,
      IdEquipo: '',
      Nombre: '',
      Dorsal: '',
      Talle: '',
      Precio: '',
      FechaElaboracion: '',
      Disponible: true,
    });
    alert("preparando el Alta...");
  }


  async function ActivarDesactivar(camiseta) {
    modalDialogService.Confirm(
      "Esta seguro que quiere " +
      (camiseta.Disponible ? "desactivar" : "activar") +
      " el registro?",
      undefined,
      undefined,
      undefined,
      async () => {
        await camisetasService.ActivarDesactivar(camiseta);
        await Buscar();
      }
    );
  }

  async function Grabar(camiesta) {
    // agregar o modificar
    try {
      await camisetasService.Grabar(camiesta);
    }
    catch (error) {
      alert(error?.response?.data?.message ?? error.toString())
      return;
    }
    await Buscar();
    Volver();

    setTimeout(() => {
      alert(
        "Registro " +
        (AccionABMC === "A" ? "agregado" : "modificado") +
        " correctamente."
      );
    }, 0);
  }


  // Volver/Cancelar desde Agregar/Modificar/Consultar
  function Volver() {
    setAccionABMC("L");
  }

  return (
    <div>
      <div className="tituloPagina">
        Camisetas <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      {AccionABMC === "L" && <CamisetasBuscar
        Nombre={Nombre}
        setNombre={setNombre}
        Disponible={Disponible}
        setDisponible={setDisponible}
        Buscar={Buscar}
        Agregar={Agregar}
      />
      }


      {AccionABMC === "L" && Camisetas?.length > 0 &&
        <CamisetasListado
          {...{
            Camisetas,
            Consultar,
            Modificar,
            ActivarDesactivar,
            Pagina,
            RegistrosTotal,
            Paginas,
            Buscar,
          }}
        />
      }


      {AccionABMC === "L" && Camisetas?.length === 0 &&
        <div className="alert alert-info mensajesAlert">
          <i className="fa fa-exclamation-sign"></i>
          No se encontraron registros...
        </div>
      }

      {AccionABMC !== "L" &&
        <CamisetasRegistro
          {...{ AccionABMC, Camiseta, Grabar, Volver }}
        />
      }

    </div>
  );
}
export { Camisetas };
