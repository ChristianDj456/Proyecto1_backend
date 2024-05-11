const Usuario = require("../Usuarios/usuario.model");
const jwt = require("jsonwebtoken");
const { respondWithError } = require("../utils/functions");
const config = require("../config");
const argon2 = require("argon2");

async function getUsuarioMongo(filtros) {
  const cantidadUsuarios = await Usuario.countDocuments(filtros);
  const usuariosFiltrados = await Usuario.find(filtros);
  
  return {
    resultados: usuariosFiltrados,
    // paginaMax: cantidadUsuarios / 20,
    // paginaActual: 1,
    cantidadUsuarios: cantidadUsuarios,
  };
}

async function validatePassword(inputPassword, actualPassword) {
  if (await argon2.verify(actualPassword, inputPassword)) {
    return true;
  }else{
    return false;
  }
}

async function register(datos) {

  const usuarioCreado = await Usuario.create(datos);

  return usuarioCreado;
}

// Función para generar token para un usuario existente
async function generateTokenForExistingUser(user) {
  const token = jwt.sign({ id: user._id }, config.JWT_SECRET, { expiresIn: "1d" });
  return token;
}


async function updateUsuarioMongo(id, cambios) {
  
  const resultado = await Usuario.findByIdAndUpdate(id, cambios); // {new: true} para que devuelva el objeto actualizado

  return resultado;
}

async function deleteUsuarioMongo(id) {
  const resultado = await Usuario.findByIdAndDelete(id);

  return resultado;
}

module.exports = {
  register,
  validatePassword,
  getUsuarioMongo,
  generateTokenForExistingUser,
  updateUsuarioMongo,
  deleteUsuarioMongo,
};
