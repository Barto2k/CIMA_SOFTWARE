import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import {Inicio} from "./components/inicio";
import { Menu } from "./components/Menu";
import { Footer } from "./components/Footer";
import { Equipos } from "./components/equipos/Equipos";
import { Gorras } from "./components/gorras/Gorras";
import { Accesorios } from "./components/accesorios/Accesorios";
import { ModalDialog } from "./components/ModalDialog";
import { RequireAuth } from "./components/RequiereAuth" ;
import { Login } from "./components/login/Login";
import { Zapatillas } from "./components/zapatillas/Zapatillas";
import { Camisetas } from "./components/camisetas/Camisetas";
import { Pantalones } from "./components/pantalones/Pantalones";

function App() {
  return (
    <>
      <BrowserRouter>
      <ModalDialog/>
      <Menu/>
        <div className="divBody">
        <Routes>
          <Route path="/login/:componentFrom" element={<Login />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/equipos" element={<Equipos />} />
          <Route path="/gorras" element={<Gorras />} />
          <Route path="/accesorios" element={< Accesorios />} />
          <Route path="/zapatillas" element={<Zapatillas />} />
          <Route path="/camisetas" element={<Camisetas />} />
          <Route path="/pantalones" element={<Pantalones />} />
          <Route path="*" element={<Navigate to="/login/:componentFrom" replace />} />

        </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;

