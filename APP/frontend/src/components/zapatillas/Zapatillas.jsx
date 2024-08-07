import React, { useState, useEffect } from "react";
import modalDialogService from "../../services/modalDialog.service";
import { zapatillasService } from "../../services/zapatillas.service";
import ZapatillasListado from "./ZapatillasListado";
import ZapatillasBuscar from "./ZapatillasBuscar";
import ZapatillasRegistro from "./ZapatillasRegistro";


function Zapatillas() {
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
    const [Zapatillas, setZapatillas] = useState(null);
    const [Zapatilla, setZapatilla] = useState(null); // usado en BuscarporId (Modificar, Consultar)
    const [RegistrosTotal, setRegistrosTotal] = useState(0);
    const [Pagina, setPagina] = useState(1);
    const [Paginas, setPaginas] = useState([]);


    useEffect(() => {
        async function BuscarZapatillas() {
            let data = await zapatillasService.Buscar(Modelo, Disponible, Pagina);
            setZapatillas(data.Items);
        }
        BuscarZapatillas();
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
        const data = await zapatillasService.Buscar(Modelo, Disponible, _pagina);
        modalDialogService.BloquearPantalla(false);
        setZapatillas(data.Items);
        setRegistrosTotal(data.RegistrosTotal);


        //generar array de las paginas para mostrar en select del paginador
        const arrPaginas = [];
        for (let i = 1; i <= Math.ceil(data.RegistrosTotal / 10); i++) {
            arrPaginas.push(i);
        }
        setPaginas(arrPaginas);
    }


    async function BuscarPorId(zapatilla, accionABMC) {
        const data = await zapatillasService.BuscarPorId(zapatilla);
        setZapatilla(data);
        setAccionABMC(accionABMC);
    }


    function Consultar(zapatilla) {
        BuscarPorId(zapatilla, "C"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
    }
    function Modificar(zapatilla) {
        if (!zapatilla.Disponible) {
            modalDialogService.Alert("No puede modificarse un registro no disponible.");
            return;
        }
        BuscarPorId(zapatilla, "M"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
    }

    async function Agregar() {
        setAccionABMC("A");
        setZapatilla({
            IdZapatilla: 0,
            Marca: '',
            Modelo: '',
            IdEquipo: '',
            FechaLanzamiento: '',
            Precio: '',
            Disponible: true,
        });
        alert("preparando el Alta...");
    }

    async function ActivarDesactivar(zapatilla) {
        modalDialogService.Confirm(
            "Esta seguro que quiere " +
            (zapatilla.Disponible ? "desactivar" : "activar") +
            " el registro?",
            undefined,
            undefined,
            undefined,
            async () => {
                await zapatillasService.ActivarDesactivar(zapatilla);
                await Buscar();
            }
        );
    }

    async function Grabar(zapatilla) {
        // agregar o modificar
        try {
            await zapatillasService.Grabar(zapatilla);
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

            {AccionABMC === "L" && <ZapatillasBuscar
                Modelo={Modelo}
                setModelo={setModelo}
                Disponible={Disponible}
                setDisponible={setDisponible}
                Buscar={Buscar}
                Agregar={Agregar}
            />
            }


            {AccionABMC === "L" && Zapatillas?.length > 0 &&
                <ZapatillasListado
                    {...{
                        Zapatillas,
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


            {AccionABMC === "L" && Zapatillas?.length === 0 &&
                <div className="alert alert-info mensajesAlert">
                    <i className="fa fa-exclamation-sign"></i>
                    No se encontraron registros...
                </div>
            }

            {AccionABMC !== "L" &&
                <ZapatillasRegistro
                    {...{ AccionABMC, Zapatilla, Grabar, Volver }}
                />
            }
        </div>
    );
}
export { Zapatillas };
