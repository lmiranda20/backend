const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// Rutas para registrar un nuevo usurio

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send("El usuario ya existe");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });

    await newUser.save();
    console.log("Usuario registrado: ", newUser);
    res.status(201).send("Usuario registardo con éxito");
  } catch (err) {
    console.error("Error al registrar el usuario: ", err);
  }
});

//Rutas para iniciar seccion

router.post("/login", async (req, res) =>{
    const { username, password } = req.body;
    try{
        const user = await User.findOne({ username })
        if(!user){
            return res.status(401).send ('Usuario no encontrado')
        }
        const match= await bcrypt.compare(password, user.password);
        if(!match){
            console.error('Contrasela incorrecta para el usuario', username);
            return res.status(401).send("Contraseña incorrecta")
        }
        req.session.user = user.username
        res.send(`usuario ${user.username} ha iniciado sesion`)
    }catch(err){
        res.status(500).send('error en el servidor')
    }
})

//Ruta para cerrar sesion
router.get('/logout', (req, res) =>{
    req.session.destroy(err =>{
        if(err){
            return res.status(500).send('Error al cerrar sesion')
        }
        res.send('Sesion cerrada')
    })
})

// Ruta protegid

router.get('/protegida', (req, res) =>{
    if(req.session.user){
        res.send(`Bienvenido, ${req.session.user} `)
    }else{
        res.status(401).send('No autorizado')
    }
})
module.exports = router;