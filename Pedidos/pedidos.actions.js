const Order = require("./pedidos.model");
const Producto = require("../Libros/libros.model");
const { get } = require("mongoose");

// async function createOrder(orderData) {
//   try {
//     const order = await Order.create(orderData);
//     return order;
//   } catch (error) {
//     throw new Error("Error al crear el pedido");
//   }
// }

async function createOrder(orderData) {
  try {
    
    // Cambiar el estado de los libros a no disponible
    const librosIds = orderData.productos  // Asume que orderData tiene un array de productos con sus ids
    await Producto.updateMany(
      { _id: { $in: librosIds } },
      { $set: { habilitado: false } }
    );

    const order = await Order.create(orderData);
    return order;
  } catch (error) {
    throw new Error("Error al crear el pedido");
  }
}

async function getOrders() {
  try {
    const orders = await Order.find().populate("customer products");
    return orders;
  } catch (error) {
    throw new Error("Error al obtener los pedidos");
  }
}

// async function getOrderById(orderId) {
//   try {
//     const order = await Order.findById(orderId).populate("customer products");
//     return order;
//   } catch (error) {
//     throw new Error("Pedido no encontrado");
//   }
// }

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

async function cancelOrder(orderId) {
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      throw new Error("Pedido no encontrado");
    }

    const librosIds = order.productos;
    await Producto.updateMany(
      { _id: { $in: librosIds } },
      { $set: { habilitado: true } }
    );

    order.estado = "Cancelado";  // Asume que hay un campo 'estado'
    await order.save();

    return order;
  } catch (error) {
    throw new Error("Error al cancelar el pedido");
  }
}
// Agrega más funciones de acciones según tus necesidades

module.exports = {
  createOrder,
  //getOrderById,
  getTotal,
  getOnlyPropietario,
  getOrders,
  cancelOrder,
  // Agrega más funciones de acciones aquí
};
