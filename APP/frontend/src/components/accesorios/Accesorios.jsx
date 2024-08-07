import React, { useState, useEffect } from "react";
import modalDialogService from "../../services/modalDialog.service";
import { accesoriosService } from "../../services/accesorios.service";
import AccesoriosListado from "./AccesoriosListado";
import AccesoriosBuscar from "./AccesoriosBuscar";
import AccesoriosRegistro from "./AccesoriosRegistro";


function Accesorios() {
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
    const [Accesorios, setAccesorios] = useState(null);
    const [Accesorio, setAccesorio] = useState(null); // usado en BuscarporId (Modificar, Consultar)
    const [RegistrosTotal, setRegistrosTotal] = useState(0);
    const [Pagina, setPagina] = useState(1);
    const [Paginas, setPaginas] = useState([]);


    useEffect(() => {
        async function BuscarAccesorios() {
            let data = await accesoriosService.Buscar(Nombre, Disponible, Pagina);
            setAccesorios(data.Items);
        }
        BuscarAccesorios();
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
        const data = await accesoriosService.Buscar(Nombre, Disponible, _pagina);
        modalDialogService.BloquearPantalla(false);
        setAccesorios(data.Items);
        setRegistrosTotal(data.RegistrosTotal);


        //generar array de las paginas para mostrar en select del paginador
        const arrPaginas = [];
        for (let i = 1; i <= Math.ceil(data.RegistrosTotal / 10); i++) {
            arrPaginas.push(i);
        }
        setPaginas(arrPaginas);
    }


    async function BuscarPorId(accesorio, accionABMC) {
        const data = await accesoriosService.BuscarPorId(accesorio);
        setAccesorio(data);
        setAccionABMC(accionABMC);
    }


    function Consultar(accesorio) {
        BuscarPorId(accesorio, "C"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
    }
    function Modificar(accesorio) {
        if (!accesorio.Disponible) {
            modalDialogService.Alert("No puede modificarse un registro no disponible.");
            return;
        }
        BuscarPorId(accesorio, "M"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
    }

    async function Agregar() {
        setAccionABMC("A");
        setAccesorio({
            IdAccesorio: 0,
            Nombre: '',
            Descripcion: '',
            IdEquipo: '',
            Precio: '',
            Disponible: true,
        });
        alert("preparando el Alta...");
    }

    async function ActivarDesactivar(accesorio) {
        modalDialogService.Confirm(
            "Esta seguro que quiere " +
            (accesorio.Disponible ? "desactivar" : "activar") +
            " el registro?",
            undefined,
            undefined,
            undefined,
            async () => {
                await accesoriosService.ActivarDesactivar(accesorio);
                await Buscar();
            }
        );
    }

    async function Grabar(accesorio) {
        // agregar o modificar
        try {
            await accesoriosService.Grabar(accesorio);
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
                Accesorios <small>{TituloAccionABMC[AccionABMC]}</small>
            </div>

            {AccionABMC === "L" && <AccesoriosBuscar
                Nombre={Nombre}
                setNombre={setNombre}
                Disponible={Disponible}
                setDisponible={setDisponible}
                Buscar={Buscar}
                Agregar={Agregar}
            />
            }

            {AccionABMC === "L" && Accesorios?.length > 0 &&
                <AccesoriosListado
                    {...{
                        Accesorios,
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


            {AccionABMC === "L" && Accesorios?.length === 0 &&
                <div className="alert alert-info mensajesAlert">
                    <i className="fa fa-exclamation-sign"></i>
                    No se encontraron registros...
                </div>
            }

            {AccionABMC !== "L" &&
                <AccesoriosRegistro
                    {...{ AccionABMC, Accesorio, Grabar, Volver }}
                />
            }
        </div>
    );
}
export { Accesorios };
