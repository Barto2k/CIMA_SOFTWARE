import React, { useState, useEffect } from "react";
import "./Login.css"; //css global
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import AuthService from "../../services/auth.service";

const backgroundImage = "url('https://i.pinimg.com/564x/31/ec/7c/31ec7cc655b560aa787f7487201fdac6.jpg')";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const navigate = useNavigate();
  //const {componentFrom} = useParams();


  const navigateToComponent = () => {
    navigate(`/inicio`);
  };


  const handleIngresar = async () => {
    //AuthService.login(usuario, clave, navigate);
    AuthService.login(usuario, clave, navigateToComponent);
  };




  useEffect(() => {
    // lo primero que hacemos al ingresar al login es desloguearnos
    // borrando los datos de sessionStorage y el state usuarioLogueado
    AuthService.logout();
  });


  return (
    <>
    <div className="container" style={{ backgroundImage }}>
      <div className="divbody text-center">
        <main className="form-signin w-100 m-auto">
          <form className="p-5">
            <img
              className="mb-4"
              src="https://cdn.freebiesupply.com/logos/large/2x/cima-3-logo-png-transparent.png"
              alt=""
              width="72"
              height="57"
            />
            <h1 className="h3 mb-3 fw-normal">
              <i>Por favor ingrese</i>
            </h1>

            <div className="form-floating">
              <input
                type="text"
                autoComplete="off"
                placeholder="usuario"
                onChange={(e) => setUsuario(e.target.value)}
                value={usuario}
                autoFocus
                className="form-control"
                id="usuario"
              />
              <label className="custom-control" for="usuario">
                Usuario
              </label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                autoComplete="off"
                placeholder="Clave"
                onChange={(e) => setClave(e.target.value)}
                value={clave}
                className="form-control"
                id="clave"
              />
              <label className="custom-control" htmlFor="clave">
                Clave
              </label>
            </div>

            <div className="checkbox mb-3">
              <label className="custom-control">
                <input type="checkbox" value="remember-me" /> Recordarme
              </label>
            </div>
            <button
              className="w-100 btn btn-lg btn-primary"
              type="button"
              onClick={(e) => handleIngresar()}
            >
              Ingresar
            </button>
            <p className="mt-5 mb-3 text-muted">Powered By <i>Marco Figueroa</i> © 2024</p>
          </form>
        </main>
      </div>
    </div>
    </>
  );
}
export {Login};
