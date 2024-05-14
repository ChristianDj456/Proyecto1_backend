const mongoose = require('mongoose');

const schemaUsuario = new mongoose.Schema({
    nombre: {type: String, required: true},
    apellido: {type: String, required: true},
    correo: {type: String, required: true, unique: true},
    contrasena: {type: String, required: true},
    direccion_envio: {
      calle: {
      type: String,
      required: true
    },
    ciudad: {
      type: String,
      required: true
    },
    estado: {
      type: String,
      required: true
    },
    codigo_postal: {
      type: String,
      required: true
    }
  },
  /*historial_compras: [
    {
      id_pedido: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pedido'
      },
      fecha_compra: {
        type: Date,
        default: Date.now
      },
      libros_comprados: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Libro'
      }],
      estado_pedido: {
        type: String,
        enum: ['en progreso', 'completado', 'cancelado'],
        default: 'en progreso'
      }
    }
  ],*/
  habilitado: {
    type: Boolean,
    default: true
  },
  fecha_creacion: {
    type: Date,
    default: Date.now
  },
  fecha_modificacion: {
    type: Date,
    default: Date.now
  }
  }, {
    versionKey: false,
    timestamps: true
});

const Model = mongoose.model('Usuario', schemaUsuario);

/*
{
  "nombre": "Cristian De Jesus",
  "apellido": "Chavez Sarmiento",
  "correo": "christiandj@gmail.com",
  "contrasena": "norte456",
  "direccion_envio": {
    "calle": "49#8c-24",
    "ciudad": "Barranquilla",
    "estado": "Atlantico",
    "codigo_postal": "80001"
  }
}
*/

module.exports = Model;