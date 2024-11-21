const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // Esto crea un índice único
    },
    password: {
        type: String,
        required: true,
    },
});


module.exports = mongoose.model('User', userSchema)
