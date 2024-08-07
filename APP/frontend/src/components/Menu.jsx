
import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import AuthService from "../services/auth.service";

function Menu() {
  const [usuarioLogueado, setUsuarioLogueado] = useState(
    AuthService.getUsuarioLogueado()
  );
  const location = useLocation();

  function CambioUsuarioLogueado(_usuarioLogueado) {
    setUsuarioLogueado(_usuarioLogueado);
  }

  useEffect(() => {
    AuthService.subscribeUsuarioLogueado(CambioUsuarioLogueado);
    return () => {
      AuthService.subscribeUsuarioLogueado(null);
    };
  }, []);

  if (location.pathname.startsWith("/login/")) {
    return null;
  }

  return (
    <nav className="navbar navbar-primary bg-danger navbar-expand-md">
      <div className="container-fluid">
        <a className="navbar-brand" href="#!">
          <i className="fas fa-c"></i>
          &nbsp;<i>IMA</i>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/inicio">
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/equipos">
                Equipos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/gorras">
                Gorras
              </NavLink>
            </li>
            {usuarioLogueado === "admin" && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/pantalones">
                    Pantalones
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/accesorios">
                    Accesorios
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          <ul className="navbar-nav ms-auto">
            {usuarioLogueado && (
              <li className="nav-item">
                <a className="nav-link" href="#!">
                  Bienvenido: {usuarioLogueado}
                </a>
              </li>
            )}
            <li className="nav-item">
              <NavLink className="nav-link" to="/login/Inicio">
                <span
                  className={
                    usuarioLogueado ? "text-warning" : "text-success"
                  }
                >
                  <i
                    className={
                      usuarioLogueado ? "fa fa-sign-out" : "fa fa-sign-in"
                    }
                  ></i>
                </span>
                {usuarioLogueado ? " Logout" : " Login"}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export { Menu };
