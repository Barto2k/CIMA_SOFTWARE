import React, { useEffect, useState } from "react";
import { useForm  } from "react-hook-form";

export default function AccesoriosRegistro({
    AccionABMC,
    Accesorio,
    Grabar,
    Volver,
}) {
    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields, isValid, isSubmitted },
    } = useForm({ values: Accesorio });

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
                                        value: 60,
                                        message: "Nombre debe tener como máximo 60 caracteres",
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

                    {/* campo Descripcion */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor="Descripcion">
                                Descripcion<span className="text-danger">*</span>:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <input
                                type="text"
                                {...register("Descripcion", {
                                    required: { value: true, message: "Descripcion es requerido" },
                                    minLength: {
                                        value: 5,
                                        message: "Descripcion debe tener al menos 5 caracteres",
                                    },
                                    maxLength: {
                                        value: 300,
                                        message: "Descripcion debe tener como máximo 300 caracteres",
                                    },
                                })}
                                autoFocus
                                className={
                                    "form-control " + (errors?.Descripcion ? "is-invalid" : "")
                                }
                            />
                            {errors?.Descripcion && touchedFields.Descripcion && (
                                <div className="invalid-feedback">
                                    {errors?.Descripcion?.message}
                                </div>
                            )}
                        </div>
                    </div>

                    
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
