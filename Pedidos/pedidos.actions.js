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
    const librosIds = orderData.productos; // Asume que orderData tiene un array de productos con sus ids
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

// async function getOrders(datos) {
//   try {
//     const orders = await Order.find(datos);
//     return orders;
//   } catch (error) {
//     throw new Error("Error al obtener los pedidos");
//   }
// }

// async function getOrders({ fechaInicio, fechaFin, estado }) {
//   try {
//     let query = {};
//     if (fechaInicio && fechaFin) {
//       // Convertir las fechas de inicio y fin en objetos Date
//       const startDate = new Date(fechaInicio);
//       const endDate = new Date(fechaFin);

//       // Construir la consulta para filtrar por fecha de creación
//       query.fecha_creacion = { $gte: startDate, $lte: endDate };
//     }
//     console.log(query);

//     const orders = await Order.find(query);
//     return orders;
//   } catch (error) {
//     throw new Error("Error al obtener los pedidos");
//   }
// }

async function getOrders({ fechaInicio, fechaFin, estado }) {
  try {
    let query = {};

    // Agregar filtro por fecha de creación si se proporcionan fechas
    if (fechaInicio && fechaFin) {
      const startDate = new Date(fechaInicio);
      startDate.setHours(0, 0, 0); // Establecer hora a las 00:00:00
      const endDate = new Date(fechaFin);
      endDate.setHours(23, 59, 59); // Establecer hora a las 23:59:59
      query.fecha_creacion = { $gte: startDate, $lte: endDate };
    }

    // Agregar filtro por estado del pedido si se proporciona
    if (estado) {
      query.estado = estado;
    }

    const orders = await Order.find(query);
    return orders;
  } catch (error) {
    throw new Error("Error al obtener los pedidos");
  }
}




async function getOrderByID(orderId) {
  try {
    const order = await Order.findById(orderId);
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

async function getPropietario(productos_id) {
  const productos = await Producto.find({ _id: { $in: productos_id } });
  return productos[0].propietario;
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
    const product = order.productos;
    await Producto.updateMany(
      { _id: { $in: product } },
      { $set: { habilitado: true } }
    );

    order.estado = "cancelado"; // Asume que hay un campo 'estado'
    await order.save();

    return order;
  } catch (error) {
    throw new Error("Error al cancelar el pedido");
  }
}

async function completeOrder(orderId) {
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      throw new Error("Pedido no encontrado");
    }

    const product = order.productos;
    await Producto.updateMany(
      { _id: { $in: product } },
      { $set: { habilitado: false } }
    );

    order.estado = "completado"; // Asume que hay un campo 'estado'
    await order.save();

    return order;
  } catch (error) {
    throw new Error("Error al completar el pedido");
  }
}
// Agrega más funciones de acciones según tus necesidades

module.exports = {
  createOrder,
  getOrderByID,
  getTotal,
  getOnlyPropietario,
  getOrders,
  cancelOrder,
  getPropietario,
  completeOrder,
  // Agrega más funciones de acciones aquí
};
