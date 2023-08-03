const mongoose = require('mongoose');

const utilisateurSchema= mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        nom: String,
        prenom: String,
        email: String,
        password:String
    }
);

module.exports = mongoose.model('Utilisateur',utilisateurSchema);