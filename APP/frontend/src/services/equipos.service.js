import {config} from "../config";
import httpService from "./http.service.js";
const urlResource = config.urlResourceEquipos;




async function Buscar(IdEquipo) {
  const resp = await httpService.get(urlResource, {
    params: { IdEquipo },
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await httpService.get(urlResource + "/" + item.IdEquipo);
  return resp.data;
}


async function Eliminar(item) {
  await httpService.delete(urlResource + "/" + item.IdEquipo);
}


async function Grabar(item) {
  if (item.IdEquipo === 0) {
    await httpService.post(urlResource, item);
  } else {
    await httpService.put(urlResource + "/" + item.IdEquipo, item);
  }
}


export const equiposService = {
  Buscar,BuscarPorId,Eliminar,Grabar
};
