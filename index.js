const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.get("/", (req,res) => {
    res.status(200).json({});
})

const rutasLibros = require("./Libros/libros.route")
app.use('/libros', rutasLibros);

const rutasUsuario = require("./Auth/auth.route")
app.use('/Usuarios', rutasUsuario);

const rutasPedidos = require("./Pedidos/pedidos.route")
app.use('/Pedidos', rutasPedidos);

// aqui va la connection string VVVVV
//mongoose.connect('mongodb+srv://christiandj456:IMisbWoYMQayKqR5@cluster0.2mhtbwg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
//mongoose.connect('mongodb://127.0.0.1:27017/myapp');
mongoose.connect(process.env.MONGODB_URL);
//mongoose.connect('mongodb+srv://christiandj456:<password>@cluster0.2mhtbwg.mongodb.net/');


app.listen(8080);

