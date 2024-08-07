import {config} from "../config";
import httpService from "./http.service";
const urlResource = config.urlResourceAccesorios;


async function Buscar(Nombre, Disponible, Pagina) {
  const resp = await httpService.get(urlResource, {
    params: { nombre:Nombre, disponible:Disponible, pagina:Pagina },
  });
  return resp.data;
}


async function BuscarPorId(accesorios) {
  const resp = await httpService.get(urlResource + "/" + accesorios.IdAccesorio);
  return resp.data;
}


async function ActivarDesactivar(accesorio) {
  await httpService.delete(urlResource + "/" + accesorio.IdAccesorio);
}


async function Grabar(accesorio) {
  if (accesorio.IdAccesorio === 0) {
    accesorio.IdAccesorio = null;
    await httpService.post(urlResource, accesorio);
  } else {
    await httpService.put(urlResource + "/" + accesorio.IdAccesorio, accesorio);
  }
}


export const accesoriosService = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar
};
