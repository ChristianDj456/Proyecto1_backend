const { throwCustomError } = require("../utils/functions");
const {
  createProductoMongo,
  getProductoMongo,
  updateProductoMongo,
  getProductoId,
  sfDeletePedido,
} = require("./libros.actions");

async function createProducto(datos) {
  const { estado } = datos;
  if (estado !== "Usado" && estado !== "Nuevo") {
    throwCustomError(501, "Estado invalido.");
  }

  // hacer llamado a base de datos con el filtro de tipo
  const productoCreado = await createProductoMongo(datos);

  return productoCreado;
}

async function readProductoConFiltros(query) {
  const datosLibros = query;
  //console.log(datosLibros);
  // hacer llamado a base de datos con el filtro de tipo
  const resultadosBusqueda = await getProductoMongo(datosLibros);

  return resultadosBusqueda;
}

async function getProductoById(id) {
  const producto = await getProductoId(id);
  return producto;
}

function updateProducto(datos) {
  const { _id, ...cambios } = datos;

  // hacer llamado a base de datos con el filtro de tipo
  const productoCreado = updateProductoMongo(_id, cambios);

  return productoCreado;
}

async function deleteProducto(id) {
  const producto = await getProductoId(id);

  try {
    //const productoCreado = deleteProductoMongo(id);
    // return productoCreado;
  } catch (error) {
    throwCustomError(500, "Error al eliminar producto");
  }
  //const productoCreado = deleteProductoMongo(id);

  //return productoCreado;
}

async function sfdeleteProducto(id, cambios) {
  const producto = await getProductoId(id);
  if (!producto) {
    throwCustomError(404, "Producto no encontrado");
  }

  try {
    const productoEliminado = sfDeletePedido(id, cambios);
    return productoEliminado;
  } catch (error) {
    throwCustomError(500, "Error al eliminar producto");
  }
}

module.exports = {
  readProductoConFiltros,
  createProducto,
  updateProducto,
  deleteProducto,
  getProductoById,
  sfdeleteProducto,
};
