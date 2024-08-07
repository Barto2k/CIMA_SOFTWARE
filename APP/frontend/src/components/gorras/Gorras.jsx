import React, { useState, useEffect } from "react";
import modalDialogService from "../../services/modalDialog.service";
import { gorrasService } from "../../services/gorras.service";
import GorrasListado from "./GorrasListado";
import GorrasBuscar from "./GorrasBuscar";
import GorrasRegistro from "./GorrasRegistro";


function Gorras() {
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
    const [Gorras, setGorras] = useState(null);
    const [Gorra, setGorra] = useState(null); // usado en BuscarporId (Modificar, Consultar)
    const [RegistrosTotal, setRegistrosTotal] = useState(0);
    const [Pagina, setPagina] = useState(1);
    const [Paginas, setPaginas] = useState([]);


    useEffect(() => {
        async function BuscarGorras() {
            let data = await gorrasService.Buscar(Modelo, Disponible, Pagina);
            setGorras(data.Items);
        }
        BuscarGorras();
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
        const data = await gorrasService.Buscar(Modelo, Disponible, _pagina);
        modalDialogService.BloquearPantalla(false);
        setGorras(data.Items);
        setRegistrosTotal(data.RegistrosTotal);


        //generar array de las paginas para mostrar en select del paginador
        const arrPaginas = [];
        for (let i = 1; i <= Math.ceil(data.RegistrosTotal / 10); i++) {
            arrPaginas.push(i);
        }
        setPaginas(arrPaginas);
    }


    async function BuscarPorId(gorra, accionABMC) {
        const data = await gorrasService.BuscarPorId(gorra);
        setGorra(data);
        setAccionABMC(accionABMC);
    }


    function Consultar(gorra) {
        BuscarPorId(gorra, "C"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
    }
    function Modificar(gorra) {
        if (!gorra.Disponible) {
            modalDialogService.Alert("No puede modificarse un registro no disponible.");
            return;
        }
        BuscarPorId(gorra, "M"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
    }

    async function Agregar() {
        setAccionABMC("A");
        setGorra({
            IdGorra: 0,
            IdEquipo: '',
            Modelo: '',
            Precio: '',
            FechaElaboracion: '',
            Disponible: true,
        });
        alert("preparando el Alta...");
    }


    async function ActivarDesactivar(gorra) {
        modalDialogService.Confirm(
            "Esta seguro que quiere " +
            (gorra.Disponible ? "desactivar" : "activar") +
            " el registro?",
            undefined,
            undefined,
            undefined,
            async () => {
                await gorrasService.ActivarDesactivar(gorra);
                await Buscar();
            }
        );
    }

    async function Grabar(gorra) {
        // agregar o modificar
        try {
            await gorrasService.Grabar(gorra);
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
                Gorras <small>{TituloAccionABMC[AccionABMC]}</small>
            </div>

            {AccionABMC === "L" && <GorrasBuscar
                Modelo={Modelo}
                setModelo={setModelo}
                Disponible={Disponible}
                setDisponible={setDisponible}
                Buscar={Buscar}
                Agregar={Agregar}
            />
            }


            {AccionABMC === "L" && Gorras?.length > 0 &&
                <GorrasListado
                    {...{
                        Gorras,
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


            {AccionABMC === "L" && Gorras?.length === 0 &&
                <div className="alert alert-info mensajesAlert">
                    <i className="fa fa-exclamation-sign"></i>
                    No se encontraron registros...
                </div>
            }

            {AccionABMC !== "L" &&
                <GorrasRegistro
                    {...{ AccionABMC, Gorra, Grabar, Volver }}
                />
            }
        </div>
    );
}
export { Gorras };
