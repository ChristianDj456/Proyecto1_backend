const Producto = require("./producto.model");

async function getProductoMongo(filtros) {
  filtros = { ...filtros, habilitado: true };
  const cantidadProductos = await Producto.countDocuments(filtros);
  const productosFiltrados = await Producto.find(filtros);
  return {
    resultados: productosFiltrados, //,
    // paginaMax: cantidadProductos / 20,
    // paginaActual: 1,
    cantidadProductos: cantidadProductos,
  };
}

async function getProductoId(filtros) {
  const producto = await Producto.findById(filtros);

  return producto;
}

async function createProductoMongo(datos) {
  const productoCreado = await Producto.create(datos);

  return productoCreado;
}

async function updateProductoMongo(id, cambios) {
  const resultado = await Producto.findByIdAndUpdate(id, cambios);

  return resultado;
}

async function sfDeletePedido(id, cambios) {
  const resultado = await Producto.findByIdAndUpdate(id, cambios);
  return resultado;
}

module.exports = {
  createProductoMongo,
  getProductoMongo,
  updateProductoMongo,
  getProductoId,
  sfDeletePedido,
};
