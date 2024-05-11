const Order = require("./pedidos.model");
const Producto = require("../producto/producto.model");

async function createOrder(orderData) {
  try {
    const order = await Order.create(orderData);
    return order;
  } catch (error) {
    throw new Error("Error al crear el pedido");
  }
}

async function getOrderById(orderId) {
  try {
    const order = await Order.findById(orderId).populate("customer products");
    return order;
  } catch (error) {
    throw new Error("Pedido no encontrado");
  }
}

async function getOnlyPropietario(productos_id) {
  const productos = await Producto.find({ _id: { $in: productos_id } });
  const propietario = productos[0].propietario;

  for (const producto of productos) {
    //console.log(producto.propietario);
    if (!producto.propietario.equals(propietario)) {
      return false;
    }
  }
  return true;
}

async function getTotal(productos_id) {
  const productos = await Producto.find({ _id: { $in: productos_id } });
  return productos.reduce((acc, producto) => acc + producto.precio, 0);
}

// Agrega más funciones de acciones según tus necesidades

module.exports = {
  createOrder,
  getOrderById,
  getTotal,
  getOnlyPropietario,
  // Agrega más funciones de acciones aquí
};
