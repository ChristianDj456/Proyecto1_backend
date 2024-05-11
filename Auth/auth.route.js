const express = require("express");
const router = express.Router();
const { createUsuario, VerifyLogin } = require("./auth.controller");
const { respondWithError } = require("../utils/functions");

async function register(req, res) {
  try {
    // llamada a controlador con los datos
    await createUsuario(req.body);
    res.status(200).json({
      mensaje: "Exito. 👍",
    });
  } catch (e) {
    respondWithError(res, e);
  }
}
async function login(req, res) {
  try {
    // llamada a controlador con los datos
    const logedUser = await VerifyLogin(req.body);
    //console.log(logedUser);
    res.status(200).json({
      logedUser,
    });
  } catch (e) {
    respondWithError(res, e);
  }
}

router.post("/Register", register);
router.get("/Login", login);

module.exports = router;
