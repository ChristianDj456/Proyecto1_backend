const mongoose = require("mongoose");

const schemaProducto = new mongoose.Schema({
    titulo: {type: String, required: true},
    autor: {type: String, required: true},
    genero: {type: String},
    fecha_publicacion: {type: Date, required: true},
    casa_editorial: {type: String, required: true},
    estado: {type: String, required: true},
    habilitado: {type: Boolean, required: true, default: true},
    precio: {type: Number, required: true},
    propietario: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuarios', required: false},
  }, {
    versionKey: false,
    timestamps: true
});
  /* 
  Para crear un nuevo libro, se debe enviar un objeto con la siguiente estructura:
  {
  "titulo": "Harry Potter y el prisionero de Azkaban",
  "autor": "J.K. Rowling",
  "genero": "Fantasía",
  "fecha_publicacion": "1999-07-08",
  "casa_editorial": "Bloomsbury",
  "estado": "Nuevo",
  "precio": 150
}
  */
const Model = mongoose.model('Producto', schemaProducto);

module.exports = Model;