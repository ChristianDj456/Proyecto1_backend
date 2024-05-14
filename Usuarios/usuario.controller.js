const { throwCustomError } = require("../utils/functions");
const Users = require('./usuario.actions');

async function readUsuarioConFiltros(query) {
  const datosUsuario = query;
  //console.log(datosLibros);
  // hacer llamado a base de datos con el filtro de tipo
  const resultadosBusqueda = await Users.getUsuarioMongo(datosUsuario);

  return resultadosBusqueda;
}

async function getUsuarioById(id) {
  const usuario = await Users.getUsuarioId(id);
  return usuario;
}

function updateUsuario(datos) {
  const { _id, ...cambios } = datos;

  // hacer llamado a base de datos con el filtro de tipo
  const usuarioCreado = Users.updateUsuarioMongo(_id, cambios);

  return usuarioCreado;
}


async function sfdeleteUsuario(id, cambios) {
  const usuario = await Users.getUsuarioId(id);
  if (!usuario) {
    throwCustomError(404, "Usuario no encontrado");
  }
  const usuarioEliminado = await Users.sfDeleteUsuario(id, cambios);
  return usuarioEliminado;
}

module.exports = {
    readUsuarioConFiltros,
    getUsuarioById,
    updateUsuario,
    sfdeleteUsuario,
};