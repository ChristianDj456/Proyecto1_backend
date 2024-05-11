
/*
function throwCustomError(code, msg) {
    throw new Error(JSON.stringify({code, msg}));
}


function respondWithError(res, e) {
    const err = JSON.parse(e.message);
    res.status(err.code).json({
        mensaje: "Fallido. ✌",
        err: err.msg,
    })
}

*/
function throwCustomError(code, msg) {
    const error = new Error(msg);
    error.code = typeof code === 'number' ? code : 500;  // Asegura que el código es un número, si no, usa 500
    throw error;
}


function respondWithError(res, error) {
    // Asegúrate de que el código de estado exista y sea válido
    const statusCode = error.code && Number.isInteger(error.code) ? error.code : 500; // Usa 500 como código por defecto

    res.status(statusCode).json({
        mensaje: "Fallido. ✌",
        err: error.message,
    });
}

module.exports = {
    throwCustomError,
    respondWithError
}