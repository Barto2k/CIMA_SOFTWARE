import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

export default function CamisetasRegistro({
    AccionABMC,
    Camiseta,
    Grabar,
    Volver,
}) {
    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields, isValid, isSubmitted },
    } = useForm({ values: Camiseta });

    const onSubmit = (data) => {
        Grabar(data);
    };
    const [equipos, setEquipos] = useState([]);

    useEffect(() => {
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

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container-fluid">

                <fieldset disabled={AccionABMC === "C"}>
                    {/* campo IdEquipo */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor="IdEquipo">
                                Equipo<span className="text-danger">*</span>:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <select
                                {...register("IdEquipo", {
                                    required: { value: true, message: "IdEquipo es requerido" },
                                })}
                                className={
                                    "form-control " + (errors?.IdEquipo ? "is-invalid" : "")
                                }
                            >
                                <option value="">Seleccione un equipo</option>
                                {equipos.map(equipo => (
                                    <option key={equipo.id} value={equipo.id}>{equipo.nombre}</option>
                                ))}
                            </select>
                            <div className="invalid-feedback">{errors?.IdEquipo?.message}</div>
                        </div>
                    </div>

                    {/* campo Nombre */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor="Nombre">
                                Nombre<span className="text-danger">*</span>:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <input
                                type="text"
                                {...register("Nombre", {
                                    required: { value: true, message: "Nombre es requerido" },
                                    minLength: {
                                        value: 5,
                                        message: "Nombre debe tener al menos 5 caracteres",
                                    },
                                    maxLength: {
                                        value: 20,
                                        message: "Nombre debe tener como máximo 20 caracteres",
                                    },
                                })}
                                autoFocus
                                className={
                                    "form-control " + (errors?.Nombre ? "is-invalid" : "")
                                }
                            />
                            {errors?.Nombre && touchedFields.Nombre && (
                                <div className="invalid-feedback">
                                    {errors?.Nombre?.message}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* campo Dorsal */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor="Dorsal">
                                Dorsal<span className="text-danger">*</span>:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <input
                                type="number"
                                {...register("Dorsal", {
                                    required: { value: true, message: "Dorsal es requerido" },
                                })}
                                className={
                                    "form-control " + (errors?.Dorsal ? "is-invalid" : "")
                                }
                            />
                            <div className="invalid-feedback">{errors?.Dorsal?.message}</div>
                        </div>
                    </div>


                    {/* campo Talle */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor="Talle">
                                Talle<span className="text-danger">*</span>:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <select
                                {...register("Talle", {
                                    required: { value: true, message: "Talle es requerido" },
                                })}
                                className={
                                    "form-control " + (errors?.Talle ? "is-invalid" : "")
                                }
                            >
                                <option value="">Seleccione un talle</option>
                                <option value="XS">XS</option>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                                <option value="XXL">XXL</option>
                            </select>
                            <div className="invalid-feedback">
                                {errors?.Talle?.message}
                            </div>
                        </div>
                    </div>

                    {/* campo Precio */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor="Precio">
                                Precio<span className="text-danger">*</span>:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <input
                                type="number" step=".01"
                                {...register("Precio", {
                                    required: { value: true, message: "Precio es requerido" },
                                    min: { value: 1, message: "Precio debe ser mayor a 0" },
                                })}
                                className={
                                    "form-control " + (errors?.Precio ? "is-invalid" : "")
                                }
                            />
                            <div className="invalid-feedback">{errors?.Precio?.message}</div>
                        </div>
                    </div>

                    {/* campo FechaElaboracion */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor="FechaElaboracion">
                                Fecha Lanzamiento<span className="text-danger">*</span>:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <input
                                type="date"
                                {...register("FechaElaboracion", {
                                    required: { value: true, message: "Fecha Lanzamiento es requerido" },
                                    validate: {
                                        beforeToday: value => {
                                            const today = new Date().toISOString().split("T")[0];
                                            return value <= today || "La fecha debe ser menor o igual a la fecha actual";
                                        }
                                    }
                                })}
                                className={
                                    "form-control " + (errors?.FechaElaboracion ? "is-invalid" : "")
                                }
                            />
                            <div className="invalid-feedback">
                                {errors?.FechaElaboracion?.message}
                            </div>
                        </div>
                    </div>

                    {/* campo Disponible */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor="Disponible">
                                Disponible<span className="text-danger">*</span>:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <select
                                name="Disponible"
                                {...register("Disponible", {
                                    required: { value: true, message: "Disponible es requerido" },
                                })}
                                className={
                                    "form-control" + (errors?.Disponible ? " is-invalid" : "")
                                }
                            >
                                <option value={null}></option>
                                <option value={false}>NO</option>
                                <option value={true}>SI</option>
                            </select>
                            <div className="invalid-feedback">{errors?.Disponible?.message}</div>
                        </div>
                    </div>

                </fieldset>

                {/* Botones Grabar, Cancelar/Volver' */}
                <hr />
                <div className="row justify-content-center">
                    <div className="col text-center botones">
                        {AccionABMC !== "C" && (
                            <button type="submit" className="btn btn-primary">
                                <i className="fa fa-check"></i> Grabar
                            </button>
                        )}
                        <button
                            type="button"
                            className="btn btn-warning"
                            onClick={() => Volver()}
                        >
                            <i className="fa fa-undo"></i>
                            {AccionABMC === "C" ? " Volver" : " Cancelar"}
                        </button>
                    </div>
                </div>

                {/* texto: Revisar los datos ingresados... */}
                {!isValid && isSubmitted && (
                    <div className="row alert alert-danger mensajesAlert">
                        <i className="fa fa-exclamation-sign"></i>
                        Revisar los datos ingresados...
                    </div>
                )}

            </div>
        </form>
    );
}
