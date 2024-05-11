const express = require("express");
const router = express.Router();
const { authenticate } = require("../Auth/auth.middleware");
const pedidosController = require("./pedidos.controller");
const { get } = require("mongoose");

async function createOrder(req, res) {
  try {
    usuarioActual = req.user;

    req.body.cliente = usuarioActual;
    const pedidoDatos = {
      ...req.body,
      cliente: usuarioActual
    };
    //console.log(pedidoDatos);
    const order = await pedidosController.createOrder(pedidoDatos, res);

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Rutas
router.post("/CreateOrder", authenticate, createOrder);
//router.get('/:id', orderController.getOrderById);

// Agrega más rutas según tus necesidades

module.exports = router;
