const express = require("express");
const router = express.Router();
const {
  readProductoConFiltros,
  createProducto,
  updateProducto,
  sfdeleteProducto
} = require("./producto.controller");
const { respondWithError, throwCustomError } = require("../utils/functions");
const { authenticate } = require("../Auth/auth.middleware");

async function GetProductos(req, res) {
  try {
    // llamada a controlador con los filtros
    const resultadosBusqueda = await readProductoConFiltros(req.query);

    /*for (let i = 0; i < resultadosBusqueda.resultados.length; i++) {
      if (resultadosBusqueda.resultados[i].habilitado === false) {
        resultadosBusqueda.resultados.splice(i, 1);
      }
    }*/
    res.status(200).json({
      ...resultadosBusqueda,
      msg: "Exito. 👍",
    });
  } catch (e) {
    res.status(500).json({ msg: "" });
  }
}

async function PostProducto(req, res) {
  try {
    // llamada a controlador con los datos
    const ownerId = req.user;
    const productoData = {
      ...req.body,
      propietario: ownerId, // Asignar el nombre completo del propietario al campo propietario del producto
    };
    await createProducto(productoData);
    res.status(200).json({
      mensaje: "Exito. 👍",
    });
  } catch (e) {
    respondWithError(res, e);
  }
}

async function PatchProductos(req, res) {
  try {
    // llamada a controlador con los datos
    updateProducto(req.body);
    console.log(req.body);
    res.status(200).json({
      mensaje: "Exito. 👍",
    });
  } catch (e) {
    respondWithError(res, e);
  }
}

async function SoftDeleteProducto(req, res) {
  try {
    await sfdeleteProducto(req.params.id, { habilitado: false });
    res.status(200).json({
      mensaje: "Exito. 👍, Libro eliminado correctamente",
    });
  } catch (e) {
    respondWithError(res, e);
  }
}

router.get("/Ver", GetProductos);
router.post("/CreateProducto", authenticate, PostProducto);
router.patch("/Actualizar", authenticate, PatchProductos);
router.patch("/softeliminar/:id", authenticate, SoftDeleteProducto);


module.exports = router;
