const Usuarios = require('./usuario.model');

async function getUsuarioMongo(filtros) {
  filtros = { ...filtros, habilitado: true };
  const cantidadUsuarios = await Usuarios.countDocuments(filtros);
  const usuariosFiltrados = await Usuarios.find(filtros);
  return {
    resultados: usuariosFiltrados,
    cantidadUsuarios: cantidadUsuarios,
  };
}

async function getUsuarioId(filtros) {
  const usuario = await Usuarios.findById(filtros);
  return usuario;
}

async function updateUsuarioMongo(id, cambios) {
  const resultado = await Usuarios.findByIdAndUpdate(id, cambios);
  return resultado;
}

async function sfDeleteUsuario(id, cambios) {
  const resultado = await Usuarios.findByIdAndUpdate(id ,cambios);
  return resultado;
}

module.exports = {
  getUsuarioMongo,
  getUsuarioId,
  updateUsuarioMongo,
  sfDeleteUsuario,
};