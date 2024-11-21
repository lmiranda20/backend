const mongoose = require('mongoose');
const Hechizo = require ("../models/HechizosModel");

//Obtener todos los hechizos
exports.getHechizos = async (req, res) => {
    try{
        const hechizos = await Hechizo.find();
        res.json(hechizos);
    } catch(err){
        res.status(500).json( { message: err.message} )
    }
} 

//Crear hechizos
exports.createHechizos = async (req, res) => {
    const hechizo= new Hechizo({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        nivel : req.body.nivel,
    })
    try{
        const nuevoHechizo = await hechizo.save();
        res.status(201).json(nuevoHechizo);
    } catch(err){
        res.status(400).json( { message: err.message} )
    }
} 

// Obtener un hechizo por id
exports.getHechizosById = async (req, res) => {
    try{
        const hechizos = await Hechizo.findById(req.params.id);
        if(hechizos){
        res.json(hechizos);
    } else{
        res.status(404).json({ message: 'hechizo no encontrado'})
    }
    } catch(err){
        res.status(500).json( { message: err.message} )
    }
} 

//Actualizar hechizo por id
exports.updateHechizos = async (req, res) => {
    try{
        const hechizo = await  Hechizo.findById(req.params.id);
        if(hechizo){
                hechizo.nombre= req.body.nombre || hechizo.nombre;
                hechizo.descripcion= req.body.descripcion || hechizo.descripcion;
                hechizo.nivel = req.body.nivel || hechizo.nivel;

            const hechizoActualizado = await hechizo.save() 
            res.json (hechizoActualizado);
        }else{
            res.status(404).json({message: 'Hechizo no encontrado'});
        }
        }
        catch(err){
        res.status(400).json( { message: err.message} )
    }
};

// Obtener un hechizo por id
exports.deleteHechizos = async (req, res) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        res.status(400).json ( { message: "Id no valido" } )
    }
    try{
        const hechizo = await Hechizo.findById(req.params.id);
        if(hechizo){
        await hechizo.deleteOne();
        res.json({message : 'Hechizo eliminado'});
    } else{
        res.status(404).json({ message: 'hechizo no encontrado'})
    }
    } catch(err){
        res.status(500).json( { message: err.message} )
    }
} 
