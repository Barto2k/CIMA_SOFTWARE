import {config} from "../config";
import httpService from "./http.service";
const urlResource = config.urlResourceZapatillas;


async function Buscar(Modelo, Disponible, Pagina) {
  const resp = await httpService.get(urlResource, {
    params: { modelo:Modelo, disponible:Disponible, pagina:Pagina },
  });
  return resp.data;
}


async function BuscarPorId(zapatilla) {
  const resp = await httpService.get(urlResource + "/" + zapatilla.IdZapatilla);
  return resp.data;
}


async function ActivarDesactivar(zapatilla) {
  await httpService.delete(urlResource + "/" + zapatilla.IdZapatilla);
}


async function Grabar(zapatilla) {
  if (zapatilla.IdZapatilla === 0) {
    zapatilla.IdZapatilla = null;
    await httpService.post(urlResource, zapatilla);
  } else {
    await httpService.put(urlResource + "/" + zapatilla.IdZapatilla, zapatilla);
  }
}


export const zapatillasService = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar
};
