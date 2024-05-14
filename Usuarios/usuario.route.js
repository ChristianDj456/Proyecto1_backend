const express = require('express')
const router = express.Router();
//const { readUsuarioConFiltros, updateUsuario, deleteUsuario } = require("./auth.controller");
const { readUsuarioConFiltros, getUsuarioById, updateUsuario, sfdeleteUsuario } = require("./usuario.controller");
const { respondWithError } = require('../utils/functions');
const { authenticate } = require('../Auth/auth.middleware');

async function GetUsuarios(req, res) {
    console.log(req.query);
    try {
        // llamada a controlador con los filtros
        const resultadosBusqueda = await readUsuarioConFiltros(req.query);

        res.status(200).json({
            ...resultadosBusqueda
        })
    } catch(e) {
        res.status(500).json({msg: ""})
    }
}


async function PatchUsuarios(req, res) {
    try {
        // llamada a controlador con los datos
        updateUsuario(req.body);

        res.status(200).json({
            mensaje: "Exito. 👍"
        })
    } catch(e) {
        respondWithError(res, e);
    }
}

// async function DeleteUsuarios(req, res) {
//     try {
//         // llamada a controlador con los datos
//         deleteUsuario(req.params.id);

//         res.status(200).json({
//             mensaje: "Exito. 👍"
//         })
//     } catch(e) {
//         respondWithError(res, e);
//     }
// }

async function SoftDeleteUsuarios(req, res) {
    userActive = req.user;
    buscarUsuario = await getUsuarioById(req.params.id);
    // console.log(buscarUsuario._id, userActive);

    try {

    if (buscarUsuario._id.equals(userActive)) {
        // llamada a controlador con los datos
        sfdeleteUsuario(req.params.id, { habilitado: false});

        res.status(200).json({
            mensaje: "Exito. 👍"
        })
           
        }else{
            throwCustomError(401, "No tienes permisos para modificar este usuario");
        }
    } catch(e) {
        respondWithError(res, e);
    }
}

router.get("/Ver", GetUsuarios);
router.get("/", authenticate, GetUsuarios);
router.patch("/", authenticate, PatchUsuarios);
router.patch("/:id", authenticate, SoftDeleteUsuarios);

module.exports = router;