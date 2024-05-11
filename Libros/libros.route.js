const express = require("express");
const router = express.Router();
const { readProductoConFiltros, getProductoById, createProducto, updateProducto, sfdeleteProducto } = require("./libros.controller");
const { respondWithError, throwCustomError } = require("../utils/functions");
const { authenticate } = require("../Auth/auth.middleware");

async function GetProductos(req, res) {
  try {
    // llamada a controlador con los filtros
    if(req.user !== req.query.propietario){
      newQuery = { ...req.query, propietario: req.user};
      const resultadosBusqueda = await readProductoConFiltros(newQuery);
      res.status(200).json({
        ...resultadosBusqueda,
        msg: "Exito. 👍",
      });
    }else{
    const resultadosBusqueda = await readProductoConFiltros(req.query);
    res.status(200).json({
      ...resultadosBusqueda,
      msg: "Exito. 👍",
    });
    }
   
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
      propietario: ownerId, // Asignar el ID del propietario al campo propietario del producto
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
    //console.log(req.body._id);
    const buscarLibros = await getProductoById(req.body._id);
    const ownerId = buscarLibros.propietario;
    const userActive = req.user;
    //console.log("Propietario -> ",ownerId," Usuario Activo -> ",userActive);
    if (ownerId.equals(userActive)) {
      updateProducto(req.body);
    res.status(200).json({
      mensaje: "Exito. 👍",
    });
    }else{
      throwCustomError(401, "No tienes permisos para modificar este libro");
    }
  } catch (e) {
    respondWithError(res, e);
  }
}

async function SoftDeleteProducto(req, res) {
  UserActive = req.user;
  buscarLibros = await getProductoById(req.params.id);
  try {
    // llamada a controlador con los datos
    if (buscarLibros.propietario.equals(UserActive)) {
      await sfdeleteProducto(req.params.id, { habilitado: false });
    } else {
      throwCustomError(401, "No tienes permisos para eliminar este libro");
    }
    //await sfdeleteProducto(req.params.id, { habilitado: false });
    res.status(200).json({
      mensaje: "Exito. 👍, Libro eliminado correctamente",
    });
  } catch (e) {
    respondWithError(res, e);
  }
}

router.get("/Ver", GetProductos);
router.get("/VerUser", authenticate, GetProductos);
router.post("/CreateLibro", authenticate, PostProducto);
router.patch("/Actualizar", authenticate, PatchProductos);
router.patch("/softeliminar/:id", authenticate, SoftDeleteProducto);


module.exports = router;
