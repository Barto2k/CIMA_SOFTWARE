import { Link } from "react-router-dom";
import React, {  useState } from "react";
import AuthService from "../services/auth.service";

function Inicio() {
  const [usuarioLogueado, setUsuarioLogueado] = useState(
    AuthService.getUsuarioLogueado()
  );
    return (
      <div className="mt-6 p-5 rounded" style={{ backgroundColor: "lightblue" }}>
        <h1>Bienvenido/a {usuarioLogueado}</h1>
        <p>Si quieres ver tu datos pulsa en:</p>
        <Link to="/equipos" className="btn btn-lg btn-sucess">
          <i className="fa fa-search"> </i>  Ver Mis Datos
          </Link>
      </div>
    );
  }
  export { Inicio };