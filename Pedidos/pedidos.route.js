const express = require("express");
const router = express.Router();
const { authenticate } = require("../Auth/auth.middleware");
const pedidosController = require("./pedidos.controller");
const { get } = require("mongoose");

async function createOrder(req, res) {
  try {
    const usuarioActual = req.user;
    //req.body.cliente = usuarioActual;
    const pedidoDatos = {
      cliente: usuarioActual,
      ...req.body,
    };
    const order = await pedidosController.createOrder(pedidoDatos, res);

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getOrder(req, res) {
  try {
    const order = await pedidosController.getOrder(req.query);
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// async function getOrderByIds(req, res) {
//   try {
//     const orderId = req.params.id;
//     const order = await pedidosController.getOrderById(orderId);
//     res.status(200).json(order);
//   } catch (error) {
//     res.status(404).json({ error: error.message });
//   }
// }

async function cancelOrders(req, res) {
  try {
    const ownerId = req.user;
    const client = await pedidosController.getOrderById(req.params.id);
    const cliente = client.cliente;
    if (cliente.equals(ownerId)) {
      const orderId = req.params.id;
      const order = await pedidosController.cancelOrderController(orderId);
      res.status(200).json({ message: "Pedido cancelado exitosamente" });
    } else {
      return res
        .status(401)
        .json({ message: "No tienes permisos para cancelar este pedido" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function completeOrders(req, res) {
  try {
    const ownerId = req.user;
    const vendor = await pedidosController.getOrderById(req.params.id);
    const vendedor = vendor.vendedor;
    if (vendedor.equals(ownerId)) {
      const orderId = req.params.id;
      const order = await pedidosController.completeOrderController(orderId);
      res.status(200).json({ message: "Pedido completado exitosamente" });
    } else {
      return res
        .status(401)
        .json({ message: "No tienes permisos para completar este pedido" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Rutas
router.get("/Ver", getOrder);
router.post("/CreateOrder", authenticate, createOrder);
router.patch("/CancelarPedido/:id", authenticate, cancelOrders);
router.patch("/CompletarPedido/:id", authenticate, completeOrders);
//router.get('/:id', orderController.getOrderById);

// Agrega más rutas según tus necesidades

module.exports = router;
