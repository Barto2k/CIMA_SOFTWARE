import React, { useState, useEffect } from "react";
import modalDialogService from "../../services/modalDialog.service";
import { pantalonesService } from "../../services/pantalones.service";
import PantalonesListado from "./PantalonesListado";
import PantalonesBuscar from "./PantalonesBuscar";
import PantalonesRegistro from "./PantalonesRegistro";


function Pantalones() {
    const TituloAccionABMC = {
        A: "(Agregar)",
        B: "(Eliminar)",
        M: "(Modificar)",
        C: "(Consultar)",
        L: "(Listado)",
    };
    const [AccionABMC, setAccionABMC] = useState("L");
    const [Modelo, setModelo] = useState("");
    const [Disponible, setDisponible] = useState("");
    const [Pantalones, setPantalones] = useState(null);
    const [Pantalon, setPantalon] = useState(null); // usado en BuscarporId (Modificar, Consultar)
    const [RegistrosTotal, setRegistrosTotal] = useState(0);
    const [Pagina, setPagina] = useState(1);
    const [Paginas, setPaginas] = useState([]);


    useEffect(() => {
        async function BuscarPantalones() {
            let data = await pantalonesService.Buscar(Modelo, Disponible, Pagina);
            setPantalones(data.Items);
        }
        BuscarPantalones();
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
        const data = await pantalonesService.Buscar(Modelo, Disponible, _pagina);
        modalDialogService.BloquearPantalla(false);
        setPantalones(data.Items);
        setRegistrosTotal(data.RegistrosTotal);


        //generar array de las paginas para mostrar en select del paginador
        const arrPaginas = [];
        for (let i = 1; i <= Math.ceil(data.RegistrosTotal / 10); i++) {
            arrPaginas.push(i);
        }
        setPaginas(arrPaginas);
    }


    async function BuscarPorId(Pantalon, accionABMC) {
        const data = await pantalonesService.BuscarPorId(Pantalon);
        setPantalon(data);
        setAccionABMC(accionABMC);
    }


    function Consultar(Pantalon) {
        BuscarPorId(Pantalon, "C"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
    }
    function Modificar(Pantalon) {
        if (!Pantalon.Disponible) {
            modalDialogService.Alert("No puede modificarse un registro no disponible.");
            return;
        }
        BuscarPorId(Pantalon, "M"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
    }

    async function Agregar() {
        setAccionABMC("A");
        setPantalon({
            IdPantalon: 0,
            Marca: '',
            Modelo: '',
            IdEquipo: '',
            FechaLanzamiento: '',
            Precio: '',
            Disponible: true,
        });
        alert("preparando el Alta...");
    }

    async function ActivarDesactivar(Pantalon) {
        modalDialogService.Confirm(
            "Esta seguro que quiere " +
            (Pantalon.Disponible ? "desactivar" : "activar") +
            " el registro?",
            undefined,
            undefined,
            undefined,
            async () => {
                await pantalonesService.ActivarDesactivar(Pantalon);
                await Buscar();
            }
        );
    }

    async function Grabar(Pantalon) {
        // agregar o modificar
        try {
            await pantalonesService.Grabar(Pantalon);
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
                Snickers <small>{TituloAccionABMC[AccionABMC]}</small>
            </div>

            {AccionABMC === "L" && <PantalonesBuscar
                Modelo={Modelo}
                setModelo={setModelo}
                Disponible={Disponible}
                setDisponible={setDisponible}
                Buscar={Buscar}
                Agregar={Agregar}
            />
            }


            {AccionABMC === "L" && Pantalones?.length > 0 &&
                <PantalonesListado
                    {...{
                        Pantalones,
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


            {AccionABMC === "L" && Pantalones?.length === 0 &&
                <div className="alert alert-info mensajesAlert">
                    <i className="fa fa-exclamation-sign"></i>
                    No se encontraron registros...
                </div>
            }

            {AccionABMC !== "L" &&
                <PantalonesRegistro
                    {...{ AccionABMC, Pantalon, Grabar, Volver }}
                />
            }
        </div>
    );
}
export { Pantalones };
