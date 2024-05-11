const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    productos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto', // Referencia al modelo de productos
        required: true
    }],
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario' // Referencia al modelo de usuarios
        
    },
    vendedor: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario' // Referencia al modelo de usuarios
        
    },
    precioTotal: {
        type: Number
    },
    estado: {
        type: String,
        enum: ['pendiente', 'completado', 'cancelado'],
        default: 'pendiente'
    }
},
{versionKey: false}, 
{ timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;