import {config} from "../config";
import httpService from "./http.service";
const urlResource = config.urlResourceCamisetas;


async function Buscar(Nombre, Disponible, Pagina) {
  const resp = await httpService.get(urlResource, {
    params: { nombre:Nombre, disponible:Disponible, pagina:Pagina },
  });
  return resp.data;
}


async function BuscarPorId(camiseta) {
  const resp = await httpService.get(urlResource + "/" + camiseta.IdCamiseta);
  return resp.data;
}


async function ActivarDesactivar(camiseta) {
  await httpService.delete(urlResource + "/" + camiseta.IdCamiseta);
}


async function Grabar(camiseta) {
  if (camiseta.IdCamiseta === 0) {
    camiseta.IdCamiseta = null;
    await httpService.post(urlResource, camiseta);
  } else {
    await httpService.put(urlResource + "/" + camiseta.IdCamiseta, camiseta);
  }
}


export const camisetasService = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar
};
