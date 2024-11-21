const express = require("express");
const mongoose = require("mongoose")
const cors = require('cors');
const session = require('express-session');
const hechizosRouter = require('./routes/hechizosRoutes');
const userRouter = require('./routes/userRoutes');

require("dotenv").config();
const app = express();

// Middleware
app.use(cors());//Permite solicitudes de diferentes origentes
app.use(express.json());

//Configguracion de la session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}))

//Rutas
app.use("/api/hechizos", hechizosRouter);
app.use("/api/users", userRouter);

//Conexion a la base de datos
mongoose.connect(process.env.MONGODB_URI)
.then(()=> console.log('Conectado a MongoDB'))
.catch(err => console.error('Error al conectar a MongoDB', err))


//iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>{
    console.log(`servidor escuchando en http://localhost:${PORT}`)
})
