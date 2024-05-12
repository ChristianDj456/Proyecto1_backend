const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    productos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "../Libros/libros.model.js", // Referencia al modelo de productos
        required: true,
      },
    ],
    cliente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "..Usuario/usuario.model.js", // Referencia al modelo de usuarios
    },
    vendedor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "..Usuario/usuario.model.js", // Referencia al modelo de usuarios
    },
    precioTotal: {
      type: Number,
    },
    estado: {
      type: String,
      enum: ["pendiente", "completado", "cancelado"],
      default: "pendiente",
    },
    fecha_creacion: {
      type: Date,
      default: Date.now,
    },
    fecha_modificacion: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
