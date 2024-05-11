const orderActions = require("./pedidos.actions");
const { getProductoById } = require("../Libros/libros.actions");
const { getOnlyPropietario, getTotal, getOrders, cancelOrder } = require("./pedidos.actions");

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
  precioTotal = await getTotal(productos);
  try {
    const request = {
      ...req.productos,
      precioTotal: precioTotal,
      productos: productos,
    };
    const order = await orderActions.createOrder(request);
    //console.log(order);
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


async function cancelOrderController(req, res) {
  try {
    const orderId = req.params.orderId;
    const order = await cancelOrder(orderId);
    res.status(200).json({ message: "Pedido cancelado exitosamente", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
// async function getOrderById(req, res) {
//   try {
//     const orderId = req.params.id;
//     const order = await orderActions.getOrderById(orderId);
//     res.status(200).json(order);
//   } catch (error) {
//     res.status(404).json({ error: error.message });
//   }
// }

async function getOrder(req, res) {
  try {
    const orders = await getOrders(req.query);
    res.status(200).json(orders);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}
// Agrega más funciones de controladores según tus necesidades

module.exports = {
  createOrder,
  //getOrderById,
  getOrder,
  cancelOrderController,
  // Agrega más funciones de controladores aquí
};
