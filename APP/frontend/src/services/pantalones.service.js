import {config} from "../config";
import httpService from "./http.service.js";
//const urlResource = "https://labsys.frc.utn.edu.ar/dds-express/api/articulos";
// mas adelante podemos usar un archivo de configuracion para el urlResource
const urlResource = config.urlResourcePantalones;


async function Buscar(Modelo, Disponible, Pagina) {
  const resp = await httpService.get(urlResource, {
    params: { modelo:Modelo, disponible:Disponible, pagina:Pagina },
  });
  return resp.data;
}


async function BuscarPorId(item) {
  const resp = await httpService.get(urlResource + "/" + item.IdPantalon);
  return resp.data;
}


async function ActivarDesactivar(item) {
  await httpService.delete(urlResource + "/" + item.IdPantalon);
}


async function Grabar(item) {
  if (item.IdPantalon === 0) {
    item.IdPantalon = null;
    await httpService.post(urlResource, item);
  } else {
    await httpService.put(urlResource + "/" + item.IdPantalon, item);
  }
}


export const pantalonesService = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar
};
