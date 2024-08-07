import {config} from "../config";
import httpService from "./http.service";
const urlResource = config.urlResourceGorras;


async function Buscar(Modelo, Disponible, Pagina) {
  const resp = await httpService.get(urlResource, {
    params: { modelo:Modelo, disponible:Disponible, pagina:Pagina },
  });
  return resp.data;
}


async function BuscarPorId(gorra) {
  const resp = await httpService.get(urlResource + "/" + gorra.IdGorra);
  return resp.data;
}


async function ActivarDesactivar(gorra) {
  await httpService.delete(urlResource + "/" + gorra.IdGorra);
}


async function Grabar(gorra) {
  if (gorra.IdGorra === 0) {
    gorra.IdGorra = null;
    await httpService.post(urlResource, gorra);
  } else {
    await httpService.put(urlResource + "/" + gorra.IdGorra, gorra);
  }
}


export const gorrasService = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar
};
