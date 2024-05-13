const orderActions = require("./pedidos.actions");
// const { getProductoById } = require("../Libros/libros.actions");
const {
  getOnlyPropietario,
  getTotal,
  getOrders,
  cancelOrder,
  getPropietario,
  getOrderByID,
  completeOrder,
} = require("./pedidos.actions");

async function createOrder(req, res) {
  const productos = req.productos; // productos debería ser una lista de objetos con productoId y cantidad
  let precioTotal = 0;
  // [id1, id2, id3, ...
  //Se iteran los id de cada pedido para obtener el precio de cada uno
  const verificacion = await getOnlyPropietario(productos);
  if (!verificacion) {
    return {
      error:
        "No se puede realizar el pedido los libros deben ser del mismo vendedor",
    };
  }
  const propietario = await getPropietario(productos);
  precioTotal = await getTotal(productos);
  try {
    const request = {
      ...req,
      precioTotal: precioTotal,
      productos: productos,
      vendedor: propietario,
    };
    const order = await orderActions.createOrder(request);
    //console.log(order);
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function cancelOrderController(datos) {
  try {
    const orderId = datos;
    // console.log("ID del pedido ", orderId);
    const order = await cancelOrder(orderId);
    return order;
  } catch (error) {
    throw new Error("Error al cancelar el pedido");
  }
}

async function completeOrderController(datos) {
  try {
    const orderId = datos;
    // console.log("ID del pedido ", orderId);
    const order = await completeOrder(orderId);
    return order;
  } catch (error) {
    throw new Error("Error al completar el pedido");
  }
}

async function getOrderById(orden) {
  try {
    const orderId = orden;
    const order = await getOrderByID(orderId);
    return order;
  } catch (error) {
    throw new Error(" Error al obtener el pedido por id");
  }
}

// async function getOrder(req) {
//   try {
//     const orders = await getOrders(req);
//     return orders;
//   } catch (error) {
//     throw new Error(" Error al obtener el pedido");
//   }
// }
async function getOrder({ fechaInicio, fechaFin, estado }) {
  try {
    const orders = await getOrders({ fechaInicio, fechaFin, estado });
    return orders;
  } catch (error) {
    throw new Error("Error al obtener el pedido");
  }
}

// Agrega más funciones de controladores según tus necesidades

module.exports = {
  createOrder,
  getOrderById,
  getOrder,
  cancelOrderController,
  completeOrderController,
  // Agrega más funciones de controladores aquí
};
