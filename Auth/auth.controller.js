const { throwCustomError } = require("../utils/functions");
const {
  register,
  generateTokenForExistingUser,
  getUsuarioMongo,
  validatePassword,
  updateUsuarioMongo,
  deleteUsuarioMongo,
} = require("./auth.action");
const argon2 = require("argon2");

async function readUsuarioConFiltros(query) {
  const { nombre, apellido, correo, direccion_envio, historial_compras } =
    query;

  // hacer llamado a base de datos con el filtro de tipo
  const resultadosBusqueda = await getUsuarioMongo(query);

  return resultadosBusqueda;
}

async function createUsuario(datos) {
  // Extraer el correo de los datos recibidos
  const { correo } = datos;
  //console.log(correo);
  // Buscar en la base de datos sólo por correo
  const usuarioExistente = await getUsuarioMongo({ correo });
  // Verificar si ya existe un usuario con el mismo correo
  if (usuarioExistente !== null && usuarioExistente.resultados.length > 0) {
    throw new Error("El correo electrónico ya está asociado a otro usuario");
  }

  // Hashing de la contraseña
  try {
    const hashedPassword = await argon2.hash(datos.contrasena);
    datos.contrasena = hashedPassword; // Reemplaza la contraseña original con la versión hasheada
  } catch (error) {
    console.error("Error hashing password:", error);
    throw new Error("Error al procesar la contraseña");
  }

  // Si no existe, crear el nuevo usuario con todos los datos
  const usuarioCreado = await register(datos);
  return usuarioCreado;
}

async function VerifyLogin(datos) {
    const { correo, contrasena } = datos;
    
    try {
        const user = await getUsuarioMongo({correo});
        if (user.resultados[0].correo !== correo) {
            return respondWithError(res, { code: 404, message: 'Usuario no encontrado' });
        }
        const isValid = await validatePassword(contrasena, user.resultados[0].contrasena);
        if (isValid !== true) {
            return respondWithError(res, { code: 401, message: 'Contraseña invalida' });
        }
        const token = await generateTokenForExistingUser(user.resultados[0]._id);
        //console.log(user.resultados[0]._id);
        return token;
    } catch (error) {
        //console.log('error');
        respondWithError(res, error);
    }
}

function updateUsuario(datos) {
  const { _id, ...cambios } = datos;

  // hacer llamado a base de datos con el filtro de tipo
  const usuarioCreado = updateUsuarioMongo(_id, cambios);

  return usuarioCreado;
}

function deleteUsuario(id) {
  // hacer llamado a base de datos con el filtro de tipo
  const usuarioCreado = deleteUsuarioMongo(id);

  return usuarioCreado;
}

module.exports = {
  readUsuarioConFiltros,
  createUsuario,
  VerifyLogin,
  updateUsuario,
  deleteUsuario,
};
